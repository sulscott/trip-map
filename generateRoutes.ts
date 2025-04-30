// generateRoutes.ts
import fetch from 'node-fetch';
import fs from 'fs';

const graph = {
    nodes: [
      { id: 'Columbus', lat: 39.9612, lng: -82.9988, type: 'travel', startDate: '7/30', notes: 'Depart Columbus' },
      { id: 'Chicago', lat: 41.8781, lng: -87.6298, type: 'visit', startDate: '7/30', endDate: '7/31', notes: 'Explore Chicago' },
      { id: 'Sioux Falls', lat: 43.5446, lng: -96.7311, type: 'travel', startDate: '7/31', notes: 'Drive to Sioux Falls' },
      { id: 'Keystone', lat: 43.8816, lng: -103.4591, type: 'visit', startDate: '8/1', notes: 'Visit Mount Rushmore' },
      { id: 'Cody', lat: 44.5263, lng: -109.0565, type: 'travel', startDate: '8/2', notes: 'Devil\'s Tower, stay near Yellowstone' },
      { id: 'Yellowstone', lat: 44.4280, lng: -110.5885, type: 'visit', startDate: '8/3', notes: 'Camping Yellowstone' },
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
      { from: 'Cody', to: 'Yellowstone', distance: '140 miles', timeInCar: '3h', phase: 'early' },
      { from: 'Yellowstone', to: 'Missoula', distance: '340 miles', timeInCar: '6h', phase: 'early' },
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

const ORS_API_KEY = '5b3ce3597851110001cf6248d0d232daa6cd4630a9f002a510f29323';

async function fetchRoute(start: [number, number], end: [number, number]) {
  const startParam = `${start[1]},${start[0]}`;
  const endParam = `${end[1]},${end[0]}`;
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?start=${startParam}&end=${endParam}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': ORS_API_KEY,
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch route: ${response.status}`);
  }

  const data = await response.json();
  const coordinates: [number, number][] = data.features[0].geometry.coordinates;
  return coordinates.map(([lng, lat]) => [lat, lng]);
}

async function generateRoutes() {
    const routes: Record<string, { lat: number; lng: number }[]> = {};

  for (const edge of graph.edges) {
    const fromNode = graph.nodes.find((n) => n.id === edge.from)!;
    const toNode = graph.nodes.find((n) => n.id === edge.to)!;
    const key = `${edge.from}-${edge.to}`;
    const route = await fetchRoute([fromNode.lat, fromNode.lng], [toNode.lat, toNode.lng]);
    routes[key] = route.map(([lat, lng]) => ({ lat, lng }));
    console.log(`Fetched route: ${key}`);
  }

  fs.writeFileSync('routes.json', JSON.stringify(routes, null, 2));
  console.log('✅ Saved all routes to routes.json');
}

generateRoutes().catch(console.error);
