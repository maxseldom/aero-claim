import fs from 'fs';
const envFile = fs.readFileSync('.env', 'utf-8');
const apiKey = envFile.split('=')[1].trim();

const flights = [
  { num: 'TS122', date: '2026-05-23' }
];

(async () => {
  for (const {num, date} of flights) {
    const url = `https://aerodatabox.p.rapidapi.com/flights/number/${num}/${date}`;
    try {
      const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': 'aerodatabox.p.rapidapi.com' } });
      if (res.ok) {
         const data = await res.json();
         if (!data || data.length === 0) continue;
         const flight = data[0];
         
         const scheduledArrivalStr = flight.arrival?.scheduledTime?.local || flight.arrival?.scheduledTime?.utc || flight.arrival?.scheduledTimeLocal || flight.arrival?.scheduledTimeUtc;
         const actualArrivalStr = flight.arrival?.actualTime?.local || flight.arrival?.runwayTime?.local || flight.arrival?.revisedTime?.local || flight.arrival?.actualTimeLocal || flight.arrival?.runwayTimeLocal || flight.arrival?.revisedTimeLocal;
         
         console.log(`Flight ${num}:`);
         console.log(`  Raw arrival keys:`, Object.keys(flight.arrival));
         console.log(`  Raw arrival object:`, JSON.stringify(flight.arrival, null, 2));
         console.log(`  Raw departure object:`, JSON.stringify(flight.departure, null, 2));
         console.log(`  Scheduled: ${scheduledArrivalStr}`);
         console.log(`  Actual: ${actualArrivalStr}`);
         
      } else {
         console.log(`Flight ${num}: ${res.status}`);
      }
    } catch (e) {
      console.log(e.message);
    }
  }
})();
