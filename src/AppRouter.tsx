import { useAuth } from './contexts/AuthContext';
import Marketplace from './Marketplace';
import VendorDashboard from './VendorDashboard';
import { RoleSwitcher } from './components/RoleSwitcher';

export default function AppRouter() {
  const { role } = useAuth();

  // Route based on role
  const renderView = () => {
    switch (role) {
      case 'guest':
      case 'customer':
        return <Marketplace />;
      case 'vendor':
        return <VendorDashboard />;
      case 'educator':
        // TODO: Create educator dashboard
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl text-gray-900 mb-4">Educator Dashboard</h1>
              <p className="text-gray-600 mb-4">Coming soon...</p>
              <p className="text-sm text-gray-500">Switch to Vendor role to see the vendor dashboard</p>
            </div>
          </div>
        );
      case 'investor':
        // TODO: Create investor dashboard
        return (
          <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl text-white mb-4">Investor Dashboard</h1>
              <p className="text-gray-400 mb-4">Coming soon...</p>
              <p className="text-sm text-gray-500">Switch to Vendor role to see the vendor dashboard</p>
            </div>
          </div>
        );
      case 'admin':
        // TODO: Create admin dashboard
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl text-gray-900 mb-4">Admin Dashboard</h1>
              <p className="text-gray-600 mb-4">Coming soon...</p>
              <p className="text-sm text-gray-500">Switch to Vendor role to see the vendor dashboard</p>
            </div>
          </div>
        );
      default:
        return <Marketplace />;
    }
  };

  return (
    <>
      {renderView()}
      <RoleSwitcher />
    </>
  );
}
