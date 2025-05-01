const graphLong = {
  nodes: [
    {
      id: 'Columbus',
      lat: 39.9612,
      lng: -82.9988,
      type: 'travel',
      startDate: '7/26',
      notes: `Leave Columbus morning of 7/30 to chicago. If we decide to take a sprinter van, we make need to pick up the van in Chicago.`,
      imageUrl: ''
    },
    {
      id: 'Chicago',
      lat: 41.8781,
      lng: -87.6298,
      type: 'visit',
      startDate: '7/27',
      endDate: '7/28',
      notes: `Hang out in Chicago. we can do a museum, beach day, etc. Probably makes sense to stayin a hotel or airbnb instead of camp. if we are doing sprinter van, may need to pick up.`,
      imageUrl: ''
    },
    {
      id: 'Sioux Falls',
      lat: 43.5446,
      lng: -96.7311,
      type: 'travel',
      startDate: '7/28',
      notes: `Passthrough location with good camping. We can camp and then head out the next morning. Look into Jellystone or KOA.`,
      imageUrl: ''
    },
    {
      id: 'Keystone',
      lat: 43.8816,
      lng: -103.4591,
      type: 'travel',
      startDate: '7/29',
      notes: `Hang out and camp/see Mount Rushmore. Might be cool to come up with a mini-lesson on indigenous culture.`,
      imageUrl: '/images/rushmore.jpeg'
    },
    {
      id: 'Mount Rushmore',
      lat: 43.8803,
      lng: -103.4538,
      type: 'visit',
      startDate: '7/30',
      notes: `Hang out and camp/see Mount Rushmore. Might be cool to come up with a mini-lesson on indigenous culture.`,
      imageUrl: '/images/rushmore.jpeg'
    },
    {
      id: 'Cody',
      lat: 44.5263,
      lng: -109.0565,
      type: 'travel',
      startDate: '7/31',
      notes: `The intro point to Yellowstone. So we can stop and see some sites or just rest and then go to Old Faithful/Yellowstone the next morning.`,
      imageUrl: ''
    },
    {
      id: 'Yellowstone',
      lat: 44.4280,
      lng: -110.5885,
      type: 'visit',
      startDate: '8/1',
      notes: `Camp and explore the park. See Old Faithful if we want. I think we can do more research and find a great camping spot here, ideally with some kind of swim area.`,
      imageUrl: '/images/faithful.jpeg'
    },
    {
      id: 'Missoula',
      lat: 46.8721,
      lng: -113.9940,
      type: 'travel',
      startDate: '8/2',
      notes: `Pass through location, but it is beautiful here. We can find a nice camp ground. Lolo campground seems like one if we make good time and have time to see the sunset, etc.`,
      imageUrl: '/images/missoula.jpeg'
    },
    {
      id: 'Seattle',
      lat: 47.6062,
      lng: -122.3321,
      type: 'travel',
      startDate: '8/3',
      notes: `travel into Seattle`,
      imageUrl: ''
    },
    {
      id: 'Seattle Visit',
      lat: 47.6062,
      lng: -122.3321,
      type: 'visit',
      startDate: '8/4',
      endDate: '8/6',
      notes: `Visit Seattle and see friends. Scott will work these days`,
      imageUrl: '/images/albacha.webp'
    },
    {
      id: 'Lund',
      lat: 49.9833,
      lng: -124.7667,
      type: 'travel',
      startDate: '8/7',
      notes: `Long travel day with ferries and driving`,
      imageUrl: '/images/lund1.png'
    },
    {
      id: 'Lund Visit',
      lat: 49.9833,
      lng: -124.7667,
      type: 'visit',
      startDate: '8/8',
      endDate: '8/13',
      notes: `Visit with the gang in Lund. Ultimate rest and relaxation. Scott will work these days`,
      imageUrl: '/images/lund1.png'
    },
    {
      id: 'Vancouver Travel',
      lat: 49.2827,
      lng: -123.1207,
      type: 'travel',
      startDate: '8/14',
      notes: `Get Alexis to Vancouver for cruise. I can go with Alexis and come back, or Alexis can go on her own`,
      imageUrl: ''
    },
    {
      id: 'Lund (Scott & Jack)',
      lat: 49.9833,
      lng: -124.7667,
      type: 'visit',
      startDate: '8/15',
      endDate: '8/22',
      notes: `Jack and Scott in Lund. Alexis on cruise. Scott will work these days`,
      imageUrl: '/images/lund1.png'
    },
    {
      id: 'Vancouver Pickup',
      lat: 49.2827,
      lng: -123.1207,
      type: 'travel',
      startDate: '8/23',
      notes: `Travel to Vancouver to meet Alexis. Bye bye Lund`,
      imageUrl: '/images/vancouver.jpeg'
    },
    {
      id: 'Vancouver Day Visit',
      lat: 49.2827,
      lng: -123.1207,
      type: 'visit',
      startDate: '8/24',
      notes: `Pick up Alexis. Visit Vancouver for the day`,
      imageUrl: '/images/vancouver.jpeg'
    },
    {
      id: 'Seattle Return',
      lat: 47.6062,
      lng: -122.3321,
      type: 'travel',
      startDate: '8/25',
      notes: `Return to Seattle`,
      imageUrl: ''
    },
    {
      id: 'Seattle Final Visit',
      lat: 47.6062,
      lng: -122.3321,
      type: 'visit',
      startDate: '8/26',
      endDate: '8/28',
      notes: `Visit Seattle and see friends. Scott will work these days`,
      imageUrl: '/images/albacha.webp'
    },
    {
      id: 'Portland',
      lat: 45.5152,
      lng: -122.6784,
      type: 'travel',
      startDate: '8/29',
      notes: `Travel to Portland after work. Half day in Seattle. Stay with cousin James`,
      imageUrl: '/images/portland.jpeg'
    },
    {
      id: 'Boise',
      lat: 43.6150,
      lng: -116.2023,
      type: 'travel',
      startDate: '8/30',
      notes: `Visit with James’ family, then drive to Boise.`,
      imageUrl: ''
    },
    {
      id: 'Denver',
      lat: 39.7392,
      lng: -104.9903,
      type: 'travel',
      startDate: '8/31',
      notes: `May hit a hotel along the way`,
      imageUrl: ''
    },
    {
      id: 'Denver Visit',
      lat: 39.7392,
      lng: -104.9903,
      type: 'visit',
      startDate: '9/1',
      endDate: '9/3',
      notes: `Stay with Lena in Denver. Scott will work these days`,
      imageUrl: ''
    },
    {
      id: 'St. Louis',
      lat: 38.6270,
      lng: -90.1994,
      type: 'travel',
      startDate: '9/4',
      notes: `Quick overnight in St. Louis. Dinner with Joe if time permits. `,
      imageUrl: ''
    },
    {
      id: 'Columbus Return',
      lat: 39.9612,
      lng: -82.9988,
      type: 'travel',
      startDate: '9/5',
      notes: `Final travel day.`,
      imageUrl: ''
    }
  ],  
  edges: [
    {
      from: 'Columbus',
      to: 'Chicago',
      distance: '360 miles',
      timeInCar: '6.0h',
      phase: 'early',
    },
    {
      from: 'Chicago',
      to: 'Sioux Falls',
      distance: '570 miles',
      timeInCar: '9.25h',
      phase: 'early',
    },
    {
      from: 'Sioux Falls',
      to: 'Keystone',
      distance: '340 miles',
      timeInCar: '5.75h',
      phase: 'early',
    },
    {
      from: 'Keystone',
      to: 'Cody',
      distance: '370 miles',
      timeInCar: '7.25h',
      phase: 'early',
    },
    {
      from: 'Cody',
      to: 'Old Faithful',
      distance: '140 miles',
      timeInCar: '3.0h',
      phase: 'early',
    },
    {
      from: 'Old Faithful',
      to: 'Missoula',
      distance: '340 miles',
      timeInCar: '5.5h',
      phase: 'early',
    },
    {
      from: 'Missoula',
      to: 'Seattle',
      distance: '490 miles',
      timeInCar: '8.0h',
      phase: 'early',
    },
    {
      from: 'Seattle',
      to: 'Lund',
      distance: 'ferries + drive',
      timeInCar: '8.75h',
      phase: 'early',
    },
    {
      from: 'Lund',
      to: 'Vancouver',
      distance: 'ferries + drive',
      timeInCar: '4.75h',
      phase: 'early',
    },
    {
      from: 'Vancouver',
      to: 'Seattle Return',
      distance: '140 miles',
      timeInCar: '2.75h',
      phase: 'late',
    },
    {
      from: 'Seattle Return',
      to: 'Portland',
      distance: '170 miles',
      timeInCar: '3.0h',
      phase: 'late',
    },
    {
      from: 'Portland',
      to: 'Boise',
      distance: '430 miles',
      timeInCar: '7.25h',
      phase: 'late',
    },
    {
      from: 'Boise',
      to: 'Denver',
      distance: '830 miles',
      timeInCar: '13.25h',
      phase: 'late',
    },
    {
      from: 'Denver',
      to: 'St. Louis',
      distance: '850 miles',
      timeInCar: '13.25h',
      phase: 'late',
    },
    {
      from: 'St. Louis',
      to: 'Columbus Return',
      distance: '420 miles',
      timeInCar: '7.0h',
      phase: 'late',
    },
  ]  
};

export default graphLong;