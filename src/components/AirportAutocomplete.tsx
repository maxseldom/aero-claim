import React, { useState, useEffect, useRef } from 'react';
import airportsData from '../data/airports.json';

type Airport = {
  icao: string;
  iata: string;
  name: string;
  city: string;
  country: string;
};

const airports = airportsData as Airport[];

interface AirportAutocompleteProps {
  value: string; // The selected ICAO code
  onChange: (icao: string) => void;
  placeholder?: string;
  name?: string;
}

export const AirportAutocomplete: React.FC<AirportAutocompleteProps> = ({ value, onChange, placeholder, name }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Airport[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Initialize query with the display name if value is already set
  useEffect(() => {
    if (value) {
      const selected = airports.find(a => a.icao === value);
      if (selected) {
        setQuery(`${selected.name} (${selected.icao})`);
      } else {
        setQuery(value);
      }
    } else {
      setQuery('');
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val); // Bubble up the raw typed value initially in case they don't click a suggestion
    
    if (val.length < 2) {
      setIsOpen(false);
      setResults([]);
      return;
    }

    const searchStr = val.toLowerCase();
    
    // Filter logic: search ICAO, IATA, Name, or City
    const filtered = airports.filter(a => {
      return (
        a.icao.toLowerCase().includes(searchStr) ||
        a.iata.toLowerCase().includes(searchStr) ||
        a.name.toLowerCase().includes(searchStr) ||
        a.city.toLowerCase().includes(searchStr)
      );
    }).slice(0, 15); // Limit to top 15 results for performance

    setResults(filtered);
    setIsOpen(true);
  };

  const handleSelect = (airport: Airport) => {
    setQuery(`${airport.name} (${airport.icao})`);
    onChange(airport.icao); // Send only the ICAO code back to the form
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        name={name}
        placeholder={placeholder || 'Search by city, airport name, or ICAO code...'}
        value={query}
        onChange={handleInputChange}
        onFocus={() => {
          if (query.length >= 2 && results.length > 0) setIsOpen(true);
          // If they click in and it already has a full value, we might want to clear it so they can search easily
          // But for now, just let them edit.
        }}
        autoComplete="off"
        required
      />
      
      {isOpen && results.length > 0 && (
        <ul className="autocomplete-dropdown animate-fade-in" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          maxHeight: '250px',
          overflowY: 'auto',
          backgroundColor: 'var(--surface-color)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          zIndex: 1000,
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          {results.map((airport) => (
            <li
              key={airport.icao}
              onClick={() => handleSelect(airport)}
              style={{
                padding: '10px 15px',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{airport.name}</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {airport.city ? `${airport.city}, ` : ''}{airport.country}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'var(--primary-color)', fontWeight: 'bold', display: 'block' }}>{airport.icao}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>IATA: {airport.iata}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
