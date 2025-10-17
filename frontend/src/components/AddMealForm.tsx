import React, { useState } from 'react';

const AddMealForm = ({ onMealAdded }: { onMealAdded: () => void }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMeal = { name, description, price: parseFloat(price) };

    try {
      const res = await fetch('http://localhost:5000/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeal),
      });

      if (res.ok) {
        setName('');
        setDescription('');
        setPrice('');
        onMealAdded(); // Refresh meal list
      }
    } catch (err) {
      console.error('Error adding meal:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mb-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">Add New Meal</h2>

      <input
        type="text"
        placeholder="Meal name"
        className="input input-bordered w-full mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="textarea textarea-bordered w-full mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price (Ksh)"
        className="input input-bordered w-full mb-4"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <button
        type="submit"
        className="btn btn-primary w-full rounded-full"
      >
        🍽️ Add Meal
      </button>
    </form>
  );
};

export default AddMealForm;
