import { useState } from 'react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Users, ChevronDown, Store, ShoppingBag, GraduationCap, TrendingUp, Shield } from 'lucide-react';
import { AuthModal } from './AuthModal';

export function RoleSwitcher() {
  const { role, switchRole, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [targetRole, setTargetRole] = useState<UserRole>('customer');

  const roles: { value: UserRole; label: string; icon: any; color: string }[] = [
    { value: 'guest', label: 'Guest / Public', icon: Users, color: '#6B7280' },
    { value: 'customer', label: 'Customer', icon: ShoppingBag, color: '#4A90E2' },
    { value: 'vendor', label: 'Vendor', icon: Store, color: '#56A45E' },
    { value: 'educator', label: 'Educator', icon: GraduationCap, color: '#F2994A' },
    { value: 'investor', label: 'Investor', icon: TrendingUp, color: '#F5C33C' },
    { value: 'admin', label: 'Admin', icon: Shield, color: '#2D3748' }
  ];

  const currentRole = roles.find(r => r.value === role) || roles[0];
  const Icon = currentRole.icon;

  const handleRoleChange = (newRole: UserRole) => {
    if (newRole === 'guest') {
        switchRole('guest');
        setIsOpen(false);
        return;
    }

    if (!isAuthenticated) {
        setTargetRole(newRole);
        setShowAuthModal(true);
        setIsOpen(false);
        return;
    }

    switchRole(newRole);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-[100]">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all"
            style={{ borderColor: currentRole.color }}
          >
            <Icon className="w-5 h-5" style={{ color: currentRole.color }} />
            <span className="text-sm text-gray-900">Role: {currentRole.label}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-xs text-gray-500">Switch Role {isAuthenticated ? '(Updates Profile)' : '(Requires Login)'}</p>
                </div>
                {roles.map((r) => {
                  const RoleIcon = r.icon;
                  return (
                    <button
                      key={r.value}
                      onClick={() => handleRoleChange(r.value)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                        role === r.value ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: r.color + '20' }}
                      >
                        <RoleIcon className="w-5 h-5" style={{ color: r.color }} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-gray-900">{r.label}</p>
                        <p className="text-xs text-gray-500">
                          {r.value === 'guest' && 'Public marketplace view'}
                          {r.value === 'customer' && 'Shopping & orders'}
                          {r.value === 'vendor' && 'Vendor dashboard'}
                          {r.value === 'educator' && 'Learning hub management'}
                          {r.value === 'investor' && 'Investment metrics'}
                          {r.value === 'admin' && 'System administration'}
                        </p>
                      </div>
                      {role === r.value && (
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        defaultRole={targetRole}
      />
    </>
  );
}
