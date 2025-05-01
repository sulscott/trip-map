// src/trips/index.ts
import graphLong from './trips/trip1';
import graphShort from './trips/trip2';

export const TRIPS = {
  long: {
    graph: graphLong,
    routeFile: '/routes/routes.json'
  },
  short: {
    graph: graphShort,
    routeFile: '/routes/routes2.json'
  }
};
