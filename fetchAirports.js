import fs from 'fs';

const url = 'https://raw.githubusercontent.com/mwgg/Airports/master/airports.json';

async function fetchAirports() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const iataMap = {};
    
    for (const key in data) {
      const airport = data[key];
      if (airport.iata && airport.country) {
        iataMap[airport.iata.toUpperCase()] = airport.country.toUpperCase();
      }
    }
    
    if (!fs.existsSync('./src/data')) {
      fs.mkdirSync('./src/data', { recursive: true });
    }
    
    fs.writeFileSync('./src/data/iataToCountry.json', JSON.stringify(iataMap, null, 2));
    console.log(`Successfully mapped ${Object.keys(iataMap).length} IATA codes!`);
  } catch (e) {
    console.error("Error fetching airports:", e);
  }
}

fetchAirports();
