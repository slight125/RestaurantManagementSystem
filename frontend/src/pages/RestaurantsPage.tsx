import { useState, useEffect } from 'react';

const mockRestaurants = [
  { id: 1, name: "TamuTamu Kitchen", location: "Nairobi", cuisine: "Swahili Fusion" },
  { id: 2, name: "Hustle Bites", location: "Laikipia", cuisine: "Grill & Fast Food" },
  { id: 3, name: "The Garden Table", location: "Nyeri", cuisine: "Vegetarian Delight" },
];

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    setRestaurants(mockRestaurants);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-10 space-y-8">
      <h2 className="text-4xl font-bold border-b border-gray-700 pb-3">🍴 Restaurants</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="bg-[#1f1f1f] border border-gray-700 rounded-lg shadow-lg hover:shadow-xl p-6 transition-transform hover:scale-[1.02]"
          >
            <h3 className="text-2xl font-semibold mb-2 text-emerald-400">{r.name}</h3>
            <p className="text-sm text-gray-300">
              <span className="text-gray-400">📍 Location:</span> {r.location}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-gray-400">🍽️ Cuisine:</span> {r.cuisine}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
