import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string | null;
}

const MealsPage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';

  const [meals, setMeals] = useState<Meal[]>([]);
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });
  const [adding, setAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const fetchMeals = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/meals`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMeals(data);
      } else {
        console.error('Expected an array of meals but got:', data);
      }
    } catch (err) {
      console.error('Failed to fetch meals:', err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/meals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      if (res.ok) {
        setForm({ name: '', price: '', image: '', description: '' });
        setIsModalOpen(false);
        fetchMeals();
      }
    } catch {
      alert('Failed to add meal');
    }
    setAdding(false);
  };

  const handleDelete = async (mealId: number) => {
    const confirm = await Swal.fire({
      title: 'Delete this meal?',
      text: 'This will permanently remove the meal.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#e11d48',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/meals/${mealId}`, {
          method: 'DELETE',
        });
        if (res.ok) fetchMeals();
      } catch (err) {
        console.error('Failed to delete meal:', err);
      }
    }
  };

const handleOrder = async (mealId: number) => {
    const meal = meals.find((m) => m.id === mealId);
    if (!meal) return;

    const userId = localStorage.getItem('userId'); // or however you store it

    await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: Number(userId),
        meal_id: meal.id,
        quantity: 1,
        total: meal.price
      }),
    });

    Swal.fire({
      icon: 'success',
      title: 'Order placed!',
      text: `Your order for ${meal.name} was successful.`,
      confirmButtonColor: '#2563eb',
    }).then(() => {
      navigate('/orders');
    });

  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">Meals</h2>

      {isAdmin && (
        <>
          <button
            className="btn mb-4 px-6 py-2 font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-lg"
            onClick={() => {
              setIsModalOpen(true);
              dialogRef.current?.showModal();
            }}
          >
            Add New Meal
          </button>

          <dialog
  ref={dialogRef}
  className={`modal ${isModalOpen ? 'modal-open' : ''} backdrop-blur-sm`}
>
  <form
    method="dialog"
    onSubmit={handleAddMeal}
    className="modal-box rounded-xl p-6 bg-gradient-to-br from-indigo-100 via-white to-cyan-100 border border-primary shadow-xl text-base-content"
  >
    <button
      type="button"
      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-100 text-error"
      onClick={() => {
        setIsModalOpen(false);
        dialogRef.current?.close();
      }}
    >
      ✕
    </button>

    <h3 className="text-2xl font-bold text-center mb-6 text-primary drop-shadow">🍽️ Add a New Meal</h3>

    <div className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Meal Name"
        className="input input-bordered w-full bg-white shadow-sm focus:shadow-md focus:outline-none"
        required
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price (Ksh)"
        className="input input-bordered w-full bg-white shadow-sm focus:shadow-md"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Short Description"
        className="input input-bordered w-full bg-white shadow-sm focus:shadow-md"
      />
      <input
        type="file"
        accept="image/*"
        className="file-input file-input-bordered w-full file-input-accent shadow-sm"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'RestaurantManagementSystem');

          try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dtm601o6j/image/upload', {
              method: 'POST',
              body: formData,
            });
            const data = await res.json();
            if (data.secure_url) {
              setForm((prev) => ({ ...prev, image: data.secure_url }));
            }
          } catch (err) {
            console.error('Image upload failed:', err);
            alert('Failed to upload image.');
          }
        }}
      />
      {form.image && (
        <img
          src={form.image}
          alt="Uploaded preview"
          className="mt-2 w-full max-h-40 object-cover rounded shadow border"
        />
      )}
    </div>

    <div className="modal-action mt-6">
      <button
        className="btn w-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white font-bold shadow hover:shadow-md hover:scale-[1.02] transition"
        type="submit"
        disabled={adding}
      >
        {adding ? 'Adding...' : '✅ Add Meal'}
      </button>
    </div>
  </form>
</dialog>

        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={
                  meal.image && meal.image.startsWith('http')
                    ? meal.image
                    : 'https://placehold.co/300x180?text=No+Image'
                }
                alt={meal.name}
                className="w-full h-48 object-cover rounded-t"
                onError={(e) => {
                  const fallback = 'https://placehold.co/300x180?text=No+Image';
                  if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                    (e.currentTarget as HTMLImageElement).src = fallback;
                  }
                }}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{meal.name}</h3>
              <p>{meal.description}</p>
              <div className="card-actions flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-secondary">{`Ksh ${meal.price}`}</span>
                <button
                  className="ml-4 px-10 py-2 rounded-full shadow font-bold text-white bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600"
                  onClick={() => handleOrder(meal.id)}
                >
                  Order Now
                </button>
              </div>
{isAdmin && (
  <div className="flex justify-around gap-2 mt-4">
    <button
      className="px-6 py-2 rounded-full shadow font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
      onClick={() => {
        setForm({
          name: meal.name,
          price: String(meal.price),
          description: meal.description,
          image: meal.image || '',
        });
        setIsModalOpen(true);
        dialogRef.current?.showModal();
      }}
    >
      ✏️ Edit
    </button>

    <button
      className="px-6 py-2 rounded-full shadow font-bold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
      onClick={() => handleDelete(meal.id)}
    >
      🗑️ Remove
    </button>
  </div>
)}




              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
