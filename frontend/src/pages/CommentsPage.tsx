import { useState, useEffect } from 'react';

const mockComments = [
  {
    id: 1,
    user: "Mwikali Njeri",
    message: "Loved the chapati and beef stew! Will definitely come back. 😋",
    date: "2025-06-24",
  },
  {
    id: 2,
    user: "Brian Oloo",
    message: "The order took a bit long, but the food made up for it. Kudos to the driver 🚴‍♂️",
    date: "2025-06-25",
  },
  {
    id: 3,
    user: "Faith Kimani",
    message: "Super clean UI and friendly staff. Feels modern and local!",
    date: "2025-06-26",
  },
];

export default function CommentsPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(mockComments);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-6 py-10 space-y-8">
      <h2 className="text-4xl font-bold border-b border-gray-700 pb-3">💬 Customer Comments</h2>

      <div className="space-y-6">
        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-[#1c1c1c] border border-gray-700 rounded-lg p-5 shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-pink-400">{c.user}</h3>
              <span className="text-sm text-gray-400">{new Date(c.date).toDateString()}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
