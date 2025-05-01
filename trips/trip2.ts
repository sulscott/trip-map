const graphShort = {
    nodes: [
      {
        id: 'Columbus',
        lat: 39.9612,
        lng: -82.9988,
        type: 'travel',
        startDate: '7/30',
        notes: `Leave Columbus morning of 7/30. Destination: Chicago.`,
        imageUrl: ''
      },
      {
        id: 'Chicago',
        lat: 41.8781,
        lng: -87.6298,
        type: 'travel',
        startDate: '7/30',
        notes: `6 hours in car. Stay in an Airbnb.`,
        imageUrl: ''
      },
      {
        id: 'Sioux Falls',
        lat: 43.5446,
        lng: -96.7311,
        type: 'travel',
        startDate: '7/31',
        notes: `9.25 hours in car. Passthrough with good camping.`,
        imageUrl: ''
      },
      {
        id: 'Keystone',
        lat: 43.8816,
        lng: -103.4591,
        type: 'travel',
        startDate: '8/1',
        notes: `5.75 hours in car. Camp near Mount Rushmore.`,
        imageUrl: ''
      },
      {
        id: 'Mount Rushmore',
        lat: 43.8803,
        lng: -103.4538,
        type: 'visit',
        startDate: '8/2',
        notes: `Hang out and see Mount Rushmore.`,
        imageUrl: ''
      },
      {
        id: 'Cody',
        lat: 44.5263,
        lng: -109.0565,
        type: 'travel',
        startDate: '8/3',
        notes: `7.25 hours in car. Destination: Cody, WY.`,
        imageUrl: ''
      },
      {
        id: 'Missoula',
        lat: 46.8721,
        lng: -113.9940,
        type: 'travel',
        startDate: '8/4',
        notes: `5.5 hours in car. Nice campgrounds.`,
        imageUrl: ''
      },
      {
        id: 'Seattle',
        lat: 47.6062,
        lng: -122.3321,
        type: 'travel',
        startDate: '8/5',
        notes: `9 hours in car. Destination: Seattle.`,
        imageUrl: ''
      },
      {
        id: 'Galley Bay',
        lat: 49.9833,
        lng: -124.7667,
        type: 'travel',
        startDate: '8/6',
        notes: `Long day but we get some ferries in the mix.`,
        imageUrl: ''
      },
      {
        id: 'Galley Bay Visit',
        lat: 49.9833,
        lng: -124.7667,
        type: 'visit',
        startDate: '8/7',
        endDate: '8/13',
        notes: `Visit with the gang in Galley Bay. Scott will work.`,
        imageUrl: ''
      },
      {
        id: 'Vancouver Travel',
        lat: 49.2827,
        lng: -123.1207,
        type: 'travel',
        startDate: '8/14',
        notes: `Get Alexis to Vancouver for cruise. Option C preferred.`,
        imageUrl: ''
      },
      {
        id: 'Galley Bay Solo',
        lat: 49.9833,
        lng: -124.7667,
        type: 'visit',
        startDate: '8/15',
        endDate: '8/22',
        notes: `Jack and Scott in Galley Bay. Alexis on cruise.`,
        imageUrl: ''
      },
      {
        id: 'Vancouver Pickup',
        lat: 49.2827,
        lng: -123.1207,
        type: 'travel',
        startDate: '8/23',
        notes: `Travel to Vancouver to meet Alexis.`,
        imageUrl: ''
      },
      {
        id: 'Vancouver Visit',
        lat: 49.2827,
        lng: -123.1207,
        type: 'visit',
        startDate: '8/24',
        notes: `Pick up Alexis. Visit Vancouver for the day.`,
        imageUrl: ''
      },
      {
        id: 'Seattle Return',
        lat: 47.6062,
        lng: -122.3321,
        type: 'travel',
        startDate: '8/25',
        notes: `Travel to Seattle.`,
        imageUrl: ''
      },
      {
        id: 'Seattle Final Visit',
        lat: 47.6062,
        lng: -122.3321,
        type: 'visit',
        startDate: '8/26',
        endDate: '8/28',
        notes: `Hang out in Seattle. Scott will work.`,
        imageUrl: ''
      },
      {
        id: 'Boise',
        lat: 43.6150,
        lng: -116.2023,
        type: 'travel',
        startDate: '8/29',
        notes: `9 hours in car. Destination: Boise.`,
        imageUrl: ''
      },
      {
        id: 'Denver',
        lat: 39.7392,
        lng: -104.9903,
        type: 'travel',
        startDate: '8/30',
        notes: `13.25 hours in car. May hit a hotel.`,
        imageUrl: ''
      },
      {
        id: 'Denver Visit',
        lat: 39.7392,
        lng: -104.9903,
        type: 'visit',
        startDate: '8/31',
        endDate: '9/2',
        notes: `Stay with Lena in Denver. Scott will work.`,
        imageUrl: ''
      },
      {
        id: 'St. Louis',
        lat: 38.6270,
        lng: -90.1994,
        type: 'travel',
        startDate: '9/3',
        notes: `13.25 hours in car.`,
        imageUrl: ''
      },
      {
        id: 'Columbus Return',
        lat: 39.9612,
        lng: -82.9988,
        type: 'travel',
        startDate: '9/4',
        notes: `Final travel day. Destination: Columbus.`,
        imageUrl: ''
      }
    ],
    edges: [
      { from: 'Columbus', to: 'Chicago', distance: '360 miles', timeInCar: '6.0h', phase: 'early' },
      { from: 'Chicago', to: 'Sioux Falls', distance: '570 miles', timeInCar: '9.25h', phase: 'early' },
      { from: 'Sioux Falls', to: 'Keystone', distance: '340 miles', timeInCar: '5.75h', phase: 'early' },
      { from: 'Keystone', to: 'Mount Rushmore', distance: '5 miles', timeInCar: '0.1h', phase: 'early' },
      { from: 'Mount Rushmore', to: 'Cody', distance: '370 miles', timeInCar: '7.25h', phase: 'early' },
      { from: 'Cody', to: 'Missoula', distance: '340 miles', timeInCar: '5.5h', phase: 'early' },
      { from: 'Missoula', to: 'Seattle', distance: '490 miles', timeInCar: '8.0h', phase: 'early' },
      { from: 'Seattle', to: 'Galley Bay', distance: 'ferries + drive', timeInCar: '8.75h', phase: 'early' },
      { from: 'Galley Bay', to: 'Vancouver Travel', distance: 'ferries + drive', timeInCar: '4.75h', phase: 'early' },
      { from: 'Vancouver Travel', to: 'Galley Bay Solo', distance: 'TBD', timeInCar: 'TBD', phase: 'late' },
      { from: 'Galley Bay Solo', to: 'Vancouver Pickup', distance: 'ferries + drive', timeInCar: '4.75h', phase: 'late' },
      { from: 'Vancouver Pickup', to: 'Vancouver Visit', distance: 'TBD', timeInCar: 'TBD', phase: 'late' },
      { from: 'Vancouver Visit', to: 'Seattle Return', distance: '140 miles', timeInCar: '2.75h', phase: 'late' },
      { from: 'Seattle Return', to: 'Seattle Final Visit', distance: 'TBD', timeInCar: 'TBD', phase: 'late' },
      { from: 'Seattle Final Visit', to: 'Boise', distance: '490 miles', timeInCar: '9.0h', phase: 'late' },
      { from: 'Boise', to: 'Denver', distance: '830 miles', timeInCar: '13.25h', phase: 'late' },
      { from: 'Denver', to: 'Denver Visit', distance: 'TBD', timeInCar: 'TBD', phase: 'late' },
      { from: 'Denver Visit', to: 'St. Louis', distance: '850 miles', timeInCar: '13.25h', phase: 'late' },
      { from: 'St. Louis', to: 'Columbus Return', distance: '420 miles', timeInCar: '7.0h', phase: 'late' }
    ]
  };

  export default graphShort;