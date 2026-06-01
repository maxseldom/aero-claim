import fs from 'fs';

const url = 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat';

async function fetchAirlines() {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const lines = text.split('\n');
    
    const iataMap = {};
    const icaoMap = {};
    
    for (const line of lines) {
      if (!line) continue;
      // CSV format: 130,"Aeroflot Russian Airlines","","SU","AFL","AEROFLOT","Russia","Y"
      const parts = line.match(/(?:\"([^\"]*)\"|([^,]+))/g);
      if (parts && parts.length >= 8) {
        const name = parts[1].replace(/"/g, '');
        const iata = parts[3].replace(/"/g, '');
        const icao = parts[4].replace(/"/g, '');
        const active = parts[7].replace(/"/g, '');
        
        if (active === 'Y') {
          const airlineData = { name, iata, icao };
          if (iata && iata.length === 2) iataMap[iata] = airlineData;
          if (icao && icao.length === 3) icaoMap[icao] = airlineData;
        }
      }
    }
    
    fs.writeFileSync('airlines_test.json', JSON.stringify({ iata: Object.keys(iataMap).length, icao: Object.keys(icaoMap).length }));
    console.log(`Parsed ${Object.keys(iataMap).length} active IATA airlines.`);
  } catch (e) {
    console.error(e);
  }
}
fetchAirlines();
