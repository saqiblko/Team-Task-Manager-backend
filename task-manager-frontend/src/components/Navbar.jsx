// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">📋</span>
              <span className="text-white font-bold text-xl tracking-tight">
                TaskFlow
              </span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <NavLink to="/dashboard">📊 Dashboard</NavLink>
              <NavLink to="/projects">📁 Projects</NavLink>
              <NavLink to="/tasks">✅ Tasks</NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white/10 rounded-full px-4 py-1.5">
              <div className="w-8 h-8 bg-indigo-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium leading-tight">
                  {user.name}
                </p>
                <p className="text-indigo-200 text-xs capitalize leading-tight">
                  {user.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition backdrop-blur-sm"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// simple helper for active link style
function NavLink({ to, children }) {
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition ${isActive
          ? 'bg-white/20 text-white'
          : 'text-indigo-100 hover:bg-white/10 hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
}