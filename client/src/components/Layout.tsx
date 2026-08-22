import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  User,
  Clock,
  Calendar,
  DollarSign,
  Users,
  FileText,
  LogOut,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.role === 'admin' || user?.role === 'hr';
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate to signin even if there's an error
      navigate('/signin');
    } finally {
      setLoggingOut(false);
    }
  };

  const navItems = isAdmin
    ? [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/employees', icon: Users, label: 'Employees' },
        { path: '/attendance', icon: Clock, label: 'Attendance' },
        { path: '/leave', icon: Calendar, label: 'Leave Requests' },
        { path: '/payroll', icon: DollarSign, label: 'Payroll' },
        { path: '/reports', icon: FileText, label: 'Reports' },
        { path: '/profile', icon: User, label: 'Profile' },
      ]
    : [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/profile', icon: User, label: 'Profile' },
        { path: '/attendance', icon: Clock, label: 'Attendance' },
        { path: '/leave', icon: Calendar, label: 'Leave Requests' },
        { path: '/payroll', icon: DollarSign, label: 'Payroll' },
      ];

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      <nav className="border-b border-[#d9ddd4] bg-[#fffdf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between min-h-20 py-3">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-[#e85d45]">Dayflow<span className="text-[#197c78]">.</span></h1>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:items-center sm:gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center px-3 py-2 text-sm font-semibold rounded-sm ${
                        isActive
                          ? 'bg-[#17211f] text-white'
                          : 'text-[#687470] hover:bg-[#e5ebe3] hover:text-[#17211f]'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="text-sm font-semibold text-[#197c78] hover:text-[#bf3f31] transition-colors cursor-pointer px-2 py-1"
                title="Click to view your profile"
              >
                {user?.username || 
                 (user?.profile?.first_name && user?.profile?.last_name 
                  ? `${user.profile.first_name} ${user.profile.last_name}`.trim()
                  : user?.profile?.first_name || user?.email || 'User')}
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center px-3 py-2 text-sm leading-4 font-semibold text-white bg-[#197c78] hover:bg-[#12615e] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
              >
                {loggingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Exiting...
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default Layout;

