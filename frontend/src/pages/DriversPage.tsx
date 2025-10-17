import { useState, useEffect } from 'react';

const mockDrivers = [
  { id: 1, name: "Amina Kariuki", status: "Available", location: "Nairobi CBD", ordersCompleted: 125 },
  { id: 2, name: "Joseph Mwangi", status: "On Delivery", location: "Westlands", ordersCompleted: 89 },
  { id: 3, name: "Lucy Wanjiku", status: "Offline", location: "Kasarani", ordersCompleted: 57 },
  { id: 4, name: "Kevin Otieno", status: "Available", location: "Thika Road", ordersCompleted: 102 },
];

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    setDrivers(mockDrivers);
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white px-6 py-10 space-y-8">
      <h2 className="text-4xl font-bold border-b border-gray-700 pb-3">🚚 Delivery Drivers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-[#1b1b1b] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]"
          >
            <h3 className="text-2xl font-semibold text-amber-400 mb-2">{driver.name}</h3>
            <p className="text-sm text-gray-300">
              <span className="font-medium text-gray-400">📍 Location:</span> {driver.location}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-medium text-gray-400">🎯 Status:</span>{' '}
              <span
                className={`font-bold ${
                  driver.status === 'Available'
                    ? 'text-green-400'
                    : driver.status === 'On Delivery'
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}
              >
                {driver.status}
              </span>
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-medium text-gray-400">📦 Orders Completed:</span> {driver.ordersCompleted}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
