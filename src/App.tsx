import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMap } from 'react-leaflet';
import { LatLngExpression, DivIcon, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import routeDataJson from '../routes.json'; 
import PasswordScreen from './PasswordScreen';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <PasswordScreen onSuccess={() => setAuthenticated(true)} />;
  }

  return <InteractiveMap />;
}

const routeData: Record<string, number[][]> = routeDataJson;

const graph = {
  nodes: [
    { id: 'Columbus', lat: 39.9612, lng: -82.9988, type: 'travel', startDate: '7/30', notes: 'Depart Columbus' },
    { id: 'Chicago', lat: 41.8781, lng: -87.6298, type: 'visit', startDate: '7/30', endDate: '7/31', notes: 'Explore Chicago' },
    { id: 'Sioux Falls', lat: 43.5446, lng: -96.7311, type: 'travel', startDate: '7/31', notes: 'Drive to Sioux Falls' },
    { id: 'Keystone', lat: 43.8816, lng: -103.4591, type: 'visit', startDate: '8/1', notes: 'Visit Mount Rushmore' },
    { id: 'Cody', lat: 44.5263, lng: -109.0565, type: 'travel', startDate: '8/2', notes: 'Devil\'s Tower, stay near Yellowstone' },
    { id: 'Old Faithful', lat: 44.4280, lng: -110.5885, type: 'visit', startDate: '8/3', notes: 'Camping Yellowstone' },
    { id: 'Missoula', lat: 46.8721, lng: -113.9940, type: 'travel', startDate: '8/4', notes: 'Drive to Missoula' },
    { id: 'Seattle', lat: 47.6062, lng: -122.3321, type: 'visit', startDate: '8/5', endDate: '8/7', notes: 'Visit Seattle' },
    { id: 'Lund', lat: 49.9833, lng: -124.7667, type: 'visit', startDate: '8/8', endDate: '8/13', notes: 'Relax in Lund' },
    { id: 'Vancouver', lat: 49.2827, lng: -123.1207, type: 'visit', startDate: '8/14', endDate: '8/15', notes: 'Alexis to Cruise' },
    { id: 'Seattle Return', lat: 47.6062, lng: -122.3321, type: 'visit', startDate: '8/23', endDate: '8/25', notes: 'Return to Seattle' },
    { id: 'Portland', lat: 45.5152, lng: -122.6784, type: 'visit', startDate: '8/26', endDate: '8/28', notes: 'Visit Portland' },
    { id: 'Boise', lat: 43.6150, lng: -116.2023, type: 'travel', startDate: '8/30', notes: 'Drive to Boise' },
    { id: 'Denver', lat: 39.7392, lng: -104.9903, type: 'visit', startDate: '9/1', endDate: '9/3', notes: 'Stay with Lena' },
    { id: 'St. Louis', lat: 38.6270, lng: -90.1994, type: 'travel', startDate: '9/4', notes: 'Drive to St. Louis' },
    { id: 'Columbus Return', lat: 39.9612, lng: -82.9988, type: 'travel', startDate: '9/5', notes: 'Return Home' }
  ],
  edges: [
    { from: 'Columbus', to: 'Chicago', distance: '360 miles', timeInCar: '6-7h', phase: 'early' },
    { from: 'Chicago', to: 'Sioux Falls', distance: '570 miles', timeInCar: '9h', phase: 'early' },
    { from: 'Sioux Falls', to: 'Keystone', distance: '340 miles', timeInCar: '6h', phase: 'early' },
    { from: 'Keystone', to: 'Cody', distance: '370 miles', timeInCar: '7h', phase: 'early' },
    { from: 'Cody', to: 'Old Faithful', distance: '140 miles', timeInCar: '3h', phase: 'early' },
    { from: 'Old Faithful', to: 'Missoula', distance: '340 miles', timeInCar: '6h', phase: 'early' },
    { from: 'Missoula', to: 'Seattle', distance: '490 miles', timeInCar: '8h', phase: 'early' },
    { from: 'Seattle', to: 'Lund', distance: 'ferries + drive', timeInCar: 'long day', phase: 'early' },
    { from: 'Lund', to: 'Vancouver', distance: 'ferries + drive', timeInCar: '-', phase: 'early' },
    { from: 'Vancouver', to: 'Seattle Return', distance: '140 miles', timeInCar: '3h', phase: 'late' },
    { from: 'Seattle Return', to: 'Portland', distance: '170 miles', timeInCar: '3h', phase: 'late' },
    { from: 'Portland', to: 'Boise', distance: '430 miles', timeInCar: '7.5h', phase: 'late' },
    { from: 'Boise', to: 'Denver', distance: '830 miles', timeInCar: '13h', phase: 'late' },
    { from: 'Denver', to: 'St. Louis', distance: '850 miles', timeInCar: '13h', phase: 'late' },
    { from: 'St. Louis', to: 'Columbus Return', distance: '420 miles', timeInCar: '6h', phase: 'late' }
  ]
};

export function InteractiveMap() {
  const [hoveredEdgeIdx, setHoveredEdgeIdx] = useState<number | null>(null);
  const [hoveredNodeIdx, setHoveredNodeIdx] = useState<string | null>(null);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [routes, setRoutes] = useState<LatLngExpression[][]>([]);
  const [animatedRoutes, setAnimatedRoutes] = useState<LatLngExpression[][]>([]);

  function handleNext() {
    if (currentNodeIndex >= routes.length) return;
  
    const nextRoute = routes[currentNodeIndex];
  
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1000; // ⬅️ adjust this to draw slower or faster (smaller = slower)
  
      const partialRoute = nextRoute.slice(0, progress);
  
      setAnimatedRoutes((prev) => [...prev.slice(0, currentNodeIndex), partialRoute]);
  
      if (progress >= nextRoute.length) {
        clearInterval(interval);
        // fully set this route when done
        setAnimatedRoutes((prev) => [...prev.slice(0, currentNodeIndex), nextRoute]);
        setCurrentNodeIndex((prev) => prev + 1);
      }
    }, 20); // ⬅️ how fast new points are added (ms)
  }

  function handleSetNodeIndex(newIndex: number) {
    setCurrentNodeIndex(newIndex);
    setAnimatedRoutes(routes.slice(0, newIndex));
  }

  useEffect(() => {
    // build a list of routes in the same order as graph.edges
    const loadedRoutes: LatLngExpression[][] = [];
  
    for (const edge of graph.edges) {
      const key = `${edge.from}->${edge.to}`;
      const route = routeData[key];
  
      if (route) {
        loadedRoutes.push(route as LatLngExpression[]);
      } else {
        console.error(`Missing route for ${key}`);
        // fallback: draw a straight line
        const fromNode = graph.nodes.find((n) => n.id === edge.from)!;
        const toNode = graph.nodes.find((n) => n.id === edge.to)!;
        loadedRoutes.push([
          [fromNode.lat, fromNode.lng],
          [toNode.lat, toNode.lng]
        ]);
      }
    }
  
    setRoutes(loadedRoutes);
  }, []);


  function FitBounds() {
    const map = useMap();
    useEffect(() => {
      const bounds = new LatLngBounds(
        graph.nodes.map((node) => [node.lat, node.lng] as LatLngExpression)
      );
      map.flyToBounds(bounds, { 
        padding: [30, 30],
        animate: true,
        duration: 1.5
      });
    }, [map]);
    return null;
  }

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
      <MapContainer id="map" center={[43.5, -105]} zoom={4} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds />

          {/* Markers */}
          {graph.nodes.map((node) => (
            <Marker
              key={node.id}
              position={[node.lat, node.lng]}
              icon={new DivIcon({
                className: '',
                html: `<div class="dot ${node.type} ${hoveredNodeIdx === node.id ? 'glow' : ''}"></div>`,
                iconSize: [12, 12],
                iconAnchor: [6, 6],
              })}
              eventHandlers={{
                mouseover: () => setHoveredNodeIdx(node.id),
                mouseout: () => setHoveredNodeIdx(null),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                <div className="text-sm">
                  <div className="font-bold">{node.id}</div>
                  <div><strong>Type:</strong> {node.type}</div>
                  <div><strong>Dates:</strong> {node.startDate}{node.endDate ? ` - ${node.endDate}` : ''}</div>
                  <div><strong>Notes:</strong> {node.notes}</div>
                </div>
              </Tooltip>
            </Marker>
          ))}

          {/* Polylines */}
          {animatedRoutes.map((route, idx) => (
          <Polyline
            key={idx}
            positions={route}
            pathOptions={{
              color: graph.edges[idx].phase === 'early' ? '#14b8a6' : '#8b5cf6',
              weight: hoveredEdgeIdx === idx ? 8 : 4,
              opacity: hoveredEdgeIdx === idx ? 0.7 : 1,
            }}
            eventHandlers={{
              mouseover: () => setHoveredEdgeIdx(idx),
              mouseout: () => setHoveredEdgeIdx(null),
            }}
          >
            <Tooltip direction="top" offset={[0, -20]} opacity={1}>
              <div className="text-sm">
                <div><strong>From:</strong> {graph.edges[idx].from}</div>
                <div><strong>To:</strong> {graph.edges[idx].to}</div>
                <div><strong>Distance:</strong> {graph.edges[idx].distance}</div>
                <div><strong>Time in Car:</strong> {graph.edges[idx].timeInCar}</div>
              </div>
            </Tooltip>
          </Polyline>
        ))}

        </MapContainer>
      </div>

      {/* Control Panel */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        background: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => handleSetNodeIndex(Math.max(0, currentNodeIndex - 1))}
          disabled={currentNodeIndex === 0}
        >
          ⬅️
        </button>
        <button
          onClick={handleNext}
          disabled={currentNodeIndex >= routes.length}
        >
          ➡️
        </button>


        <input
          type="range"
          min="0"
          max={routes.length}
          value={currentNodeIndex}
          onChange={(e) => handleSetNodeIndex(parseInt(e.target.value))}
          style={{ width: '300px', marginTop: '10px' }}
        />
        </div>
      </div>
    </div>
  );
}
