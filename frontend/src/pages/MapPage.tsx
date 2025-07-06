// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const MapPage = () => {
//   const position: [number, number] = [-1.286389, 36.817223]; // Nairobi

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Our Locations</h2>
//       <MapContainer center={position} zoom={13} style={{ height: '400px' }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={position}>
//           <Popup>Main Branch - Nairobi</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// const MealsPage = () => {
//   const [meals, setMeals] = useState([]);
//   const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });
//   const [adding, setAdding] = useState(false);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/meals`)
//       .then(res => res.json())
//       .then(data => setMeals(data));
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAddMeal = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setAdding(true);
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/meals`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...form, price: Number(form.price) }),
//       });
//       const data = await res.json();
//       setMeals([...meals, data]);
//       setForm({ name: '', price: '', image: '', description: '' });
//     } catch (err) {
//       alert('Failed to add meal');
//     }
//     setAdding(false);
//   };

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-6 text-primary">Meals</h2>
//       {/* Add Meal Form */}
//       <form onSubmit={handleAddMeal} className="mb-8 flex flex-wrap gap-4 items-end bg-base-100 p-4 rounded shadow">
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Meal Name"
//           className="input input-bordered"
//           required
//         />
//         <input
//           name="price"
//           value={form.price}
//           onChange={handleChange}
//           placeholder="Price"
//           type="number"
//           className="input input-bordered"
//           required
//         />
//         <input
//           name="image"
//           value={form.image}
//           onChange={handleChange}
//           placeholder="Image URL"
//           className="input input-bordered"
//         />
//         <input
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="input input-bordered"
//         />
//         <button className="btn btn-success" type="submit" disabled={adding}>
//           {adding ? 'Adding...' : 'Add Meal'}
//         </button>
//       </form>
//       {/* Meals Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {meals.map((meal: any) => (
//           <div key={meal.id} className="card bg-base-100 shadow-xl">
//             <figure>
//               <img src={meal.image || "https://placehold.co/400x200?text=Meal"} alt={meal.name} className="w-full h-48 object-cover"/>
//             </figure>
//             <div className="card-body">
//               <h3 className="card-title">{meal.name}</h3>
//               <p>{meal.description}</p>
//               <div className="card-actions flex justify-between items-center mt-4">
//                 <span className="text-lg font-bold text-secondary">Ksh {meal.price}</span>
//                 <button className="btn btn-primary ml-4 px-10 py-2 rounded-full shadow font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-200">
//                   Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MealsPage;

