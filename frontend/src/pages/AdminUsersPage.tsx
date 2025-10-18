import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminUsersPage = () => {
  const role = localStorage.getItem('role');
  if (role !== 'admin') return <Navigate to="/unauthorized" replace />;

  const initialUsers = [
    { id: 1, username: 'Admin', email: 'admin@example.com', role: 'admin' },
    { id: 2, username: 'Slight', email: 'slight@example.com', role: 'user' },
    { id: 3, username: 'Jane', email: 'jane@example.com', role: 'user' },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto bg-[#1a1a1a] border border-[#2c2c2c] rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent text-center mb-8 drop-shadow-lg">
          👥 User Management
        </h1>

        <div className="flex justify-end mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered bg-[#101010] text-white placeholder-gray-400 border-pink-500 focus:outline-none focus:ring focus:ring-pink-600 w-full max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-xl">
          <table className="table table-zebra w-full text-center">
            <thead className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white text-sm font-bold uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#2a2a2a] transition">
                    <td>{user.id}</td>
                    <td className="font-semibold text-cyan-300">{user.username}</td>
                    <td className="text-gray-300">{user.email}</td>
                    <td>
                      <span
                        className={`badge px-3 py-1 font-medium text-xs ${
                          user.role === 'admin'
                            ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white'
                            : 'bg-gradient-to-r from-green-500 to-lime-500 text-black'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md disabled:opacity-40"
                        disabled={user.role === 'admin'}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-gray-500 italic">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
