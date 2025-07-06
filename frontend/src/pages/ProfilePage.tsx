import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
        setImageUrl(data.profile_image);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'RestaurantManagementSystem');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dtm601o6j/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, profile_image: imageUrl }),
      });

      if (res.ok) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Profile updated successfully',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          background: '#1a1a1a',
          color: '#00ffcc',
        });
      } else {
        Swal.fire('Oops', 'Something went wrong while saving.', 'error');
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-xl bg-[#1b1b1b] border border-[#292929] rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-500 bg-clip-text text-center mb-8">
          👤 My Profile
        </h1>

        {/* Avatar Upload */}
        <label htmlFor="avatarUpload" className="flex flex-col items-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            id="avatarUpload"
            onChange={handleImageChange}
            className="hidden"
            disabled={uploading}
          />
          <div className="avatar relative group">
            <div className="w-32 rounded-full ring-4 ring-cyan-500 ring-offset-2 ring-offset-[#1b1b1b] overflow-hidden shadow-md hover:scale-105 transition">
              <img
                src={imageUrl || 'https://placehold.co/200x200?text=Avatar'}
                alt="Profile"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-2 right-2 p-2 bg-cyan-500 text-black rounded-full shadow hover:bg-cyan-600 transition">
              📷
            </div>
          </div>
          {uploading && (
            <span className="mt-3 text-sm text-pink-400 animate-pulse">Uploading...</span>
          )}
        </label>

        <div className="form-control mt-8">
          <label className="label text-sm text-gray-400">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered bg-[#111] text-white border-cyan-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div className="form-control mt-4 mb-6">
          <label className="label text-sm text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered bg-[#111] text-white border-cyan-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        <button
          onClick={handleSave}
          className="btn w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white font-bold shadow-md hover:shadow-lg transition hover:scale-[1.03]"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
