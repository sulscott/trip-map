import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMap } from 'react-leaflet';
import { LatLngExpression, DivIcon, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import graphLong from '../trips/trip1';
import graphShort from '../trips/trip2';
import routeDataLong from '../public/routes/routes.json';
import routeDataShort from '../public/routes/routes2.json';
import PasswordScreen from './PasswordScreen';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [tripType, setTripType] = useState<'long' | 'short'>('long');

  const graph = tripType === 'long' ? graphLong : graphShort;
  const routeData: Record<string, number[][]> = tripType === 'long' ? routeDataLong : routeDataShort;

  if (!authenticated) {
    return <PasswordScreen onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <>
      {/* Trip Toggle Pills */}
      <div style={{ position: 'absolute', top: 20, left: 60, zIndex: 999 }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {(['short', 'long'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTripType(type)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: '1px solid #ccc',
                background: tripType === type ? '#6366f1' : 'white',
                color: tripType === type ? 'white' : '#333',
                fontWeight: 600,
              }}
            >
              {type === 'short' ? 'Short Trip' : 'Long Trip'}
            </button>
          ))}
        </div>
      </div>

      <InteractiveMap graph={graph} routeData={routeData} key={tripType} />
    </>
  );
}

type Graph = {
  nodes: {
    id: string;
    lat: number;
    lng: number;
    type: string;
    startDate: string;
    endDate?: string;
    notes: string;
    imageUrl: string;
  }[];
  edges: {
    from: string;
    to: string;
    distance: string;
    timeInCar: string;
    phase: string;
  }[];
};

type InteractiveMapProps = {
  graph: Graph;
  routeData: Record<string, number[][]>;
};

export function InteractiveMap({ graph, routeData }: InteractiveMapProps) {
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
      progress += 1000;

      const partialRoute = nextRoute.slice(0, progress);
      setAnimatedRoutes((prev) => [...prev.slice(0, currentNodeIndex), partialRoute]);

      if (progress >= nextRoute.length) {
        clearInterval(interval);
        setAnimatedRoutes((prev) => [...prev.slice(0, currentNodeIndex), nextRoute]);
        setCurrentNodeIndex((prev) => prev + 1);
      }
    }, 20);
  }

  function handleSetNodeIndex(newIndex: number) {
    setCurrentNodeIndex(newIndex);
    setAnimatedRoutes(routes.slice(0, newIndex));
  }

  useEffect(() => {
    const loadedRoutes: LatLngExpression[][] = [];

    for (const edge of graph.edges) {
      const key = `${edge.from}->${edge.to}`;
      const route = routeData[key];

      if (route) {
        loadedRoutes.push(route as LatLngExpression[]);
      } else {
        console.error(`Missing route for ${key}`);
        const fromNode = graph.nodes.find((n) => n.id === edge.from)!;
        const toNode = graph.nodes.find((n) => n.id === edge.to)!;
        loadedRoutes.push([
          [fromNode.lat, fromNode.lng],
          [toNode.lat, toNode.lng],
        ]);
      }
    }

    setRoutes(loadedRoutes);
    setAnimatedRoutes([]);
    setCurrentNodeIndex(0);
  }, [graph, routeData]);

  function FitBounds() {
    const map = useMap();
    useEffect(() => {
      const bounds = new LatLngBounds(
        graph.nodes.map((node) => [node.lat, node.lng] as LatLngExpression)
      );
      map.flyToBounds(bounds, {
        padding: [30, 30],
        animate: true,
        duration: 1.5,
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
              <Tooltip direction="auto" offset={[0, -10]} opacity={1} sticky>
                <div
                  className="text-sm"
                  style={{ maxWidth: '30rem', minWidth: '20rem', whiteSpace: 'pre-wrap' }}
                >
                  <div className="font-bold">{node.id}</div>
                  <div><strong>Type:</strong> {node.type}</div>
                  <div><strong>Dates:</strong> {node.startDate}{node.endDate ? ` - ${node.endDate}` : ''}</div>
                  <div><strong>Notes:</strong> {node.notes}</div>
                  {node.imageUrl && (
                    <div style={{ marginTop: '8px' }}>
                      <img
                        src={node.imageUrl}
                        alt={`Photo of ${node.id}`}
                        style={{ width: '100%', borderRadius: '4px' }}
                      />
                    </div>
                  )}
                </div>
              </Tooltip>
            </Marker>
          ))}

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
              <Tooltip direction="auto" offset={[0, -20]} opacity={1}>
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
