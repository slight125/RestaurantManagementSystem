import { Navigate } from 'react-router-dom';

const AdminAnalyticsPage = () => {
  const role = localStorage.getItem('role');
  if (role !== 'admin') return <Navigate to="/unauthorized" replace />;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-12 flex flex-col items-center justify-center">
      {/* Header & Icon */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="p-5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 animate-pulse shadow-lg">
          <svg className="w-12 h-12 text-black drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 17a4 4 0 01-4-4V7a4 4 0 118 0v6a4 4 0 01-4 4zm0 0v4m0 0h2m-2 0H9" />
          </svg>
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg">
          Admin Analytics
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          Get insights into orders, revenue, and customer trends — all lit up with color-coded clarity and a sleek modern feel.
        </p>
      </div>

      {/* Stat Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-4xl">
        <div className="p-6 bg-[#1a1a1a] rounded-lg border-l-4 border-indigo-500 shadow-xl hover:scale-[1.02] transition">
          <p className="text-indigo-400 font-semibold text-sm mb-2">Total Orders</p>
          <h3 className="text-3xl font-bold text-indigo-200">1,245</h3>
        </div>
        <div className="p-6 bg-[#1a1a1a] rounded-lg border-l-4 border-pink-500 shadow-xl hover:scale-[1.02] transition">
          <p className="text-pink-400 font-semibold text-sm mb-2">Revenue</p>
          <h3 className="text-3xl font-bold text-pink-200">Ksh 540,000</h3>
        </div>
        <div className="p-6 bg-[#1a1a1a] rounded-lg border-l-4 border-yellow-400 shadow-xl hover:scale-[1.02] transition">
          <p className="text-yellow-300 font-semibold text-sm mb-2">Active Customers</p>
          <h3 className="text-3xl font-bold text-yellow-100">320</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
