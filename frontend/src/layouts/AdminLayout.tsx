import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = () => {
  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <AdminSidebar />
        
        <main
          className="admin-main-content"
          style={{
            flex: 1,
            marginLeft: '280px',
            minHeight: '100vh',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            width: 'calc(100% - 280px)'
          }}
        >
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-main-content {
            margin-left: 0 !important;
            width: 100% !important;
            padding-top: 60px;
          }
        }
      `}</style>
    </>
  );
};

export default AdminLayout;
