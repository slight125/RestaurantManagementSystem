const DashboardPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow border-t-4 border-green-500">
          <h4 className="text-sm text-gray-500 mb-1">Total Meals</h4>
          <p className="text-3xl font-bold text-primary">24</p>
        </div>
        <div className="bg-white p-6 rounded shadow border-t-4 border-blue-500">
          <h4 className="text-sm text-gray-500 mb-1">Total Users</h4>
          <p className="text-3xl font-bold text-primary">9</p>
        </div>
        <div className="bg-white p-6 rounded shadow border-t-4 border-yellow-500">
          <h4 className="text-sm text-gray-500 mb-1">Orders Today</h4>
          <p className="text-3xl font-bold text-primary">6</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-primary">Recent Orders</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4 font-semibold">Meal</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">Spaghetti Carbonara</td>
              <td className="p-4">Lena Wambui</td>
              <td className="p-4 text-green-600">Completed</td>
              <td className="p-4">June 26</td>
            </tr>
            <tr className="border-t">
              <td className="p-4">Classic Cheeseburger</td>
              <td className="p-4">Tom Muriuki</td>
              <td className="p-4 text-yellow-500">Pending</td>
              <td className="p-4">June 26</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
