import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSettingsClick = () => {
    navigate('/profile');
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-white">
            <h2 className="text-lg font-semibold">Welcome back, {user?.name}</h2>
            <p className="text-sm text-gray-400">Ready to explore your dreams?</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-primary-300 transition-colors">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-dream-500 rounded-full"></div>
          </button>
          
          <button 
            onClick={handleSettingsClick}
            className="p-2 text-gray-400 hover:text-primary-300 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full ring-2 ring-primary-500/30"
              />
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;