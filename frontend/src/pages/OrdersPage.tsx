import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(location.state?.meal || null);

  useEffect(() => {
    if (!meal) {
      navigate('/meals');
    }
  }, [meal, navigate]);

  if (!meal) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="card bg-base-100 shadow-xl max-w-md w-full">
        <figure>
          <img
            src={meal.image || 'https://placehold.co/400x200?text=Meal'}
            alt={meal.name}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{meal.name}</h2>
          <p>{meal.description}</p>
          <span className="text-lg font-bold text-secondary">Ksh {meal.price}</span>
          <div className="alert alert-success mt-4">
            <span>✅ Your order has been placed successfully!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
