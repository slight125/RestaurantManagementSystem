import { useState, useEffect } from 'react';

interface City {
  id: number;
  city: string;
  state: string;
  population: string;
}

const mockCities: City[] = [
  { id: 1, city: "Nairobi", state: "Nairobi County", population: "4.4M" },
  { id: 2, city: "Mombasa", state: "Mombasa County", population: "1.2M" },
  { id: 3, city: "Kisumu", state: "Kisumu County", population: "610K" },
  { id: 4, city: "Nakuru", state: "Nakuru County", population: "570K" },
];

export default function CityAndStatePage() {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    setCities(mockCities);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10 space-y-8">
      <h2 className="text-4xl font-bold border-b border-gray-700 pb-3">🏙️ Cities & States</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((c) => (
          <div
            key={c.id}
            className="bg-[#1c1c1c] border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300 hover:scale-[1.02]"
          >
            <h3 className="text-2xl font-semibold text-sky-400 mb-2">{c.city}</h3>
            <p className="text-sm text-gray-300">
              <span className="text-gray-400">🗺️ State:</span> {c.state}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-gray-400">👥 Population:</span> {c.population}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
