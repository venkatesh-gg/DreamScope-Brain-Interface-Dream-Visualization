import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Brain, Home, Video, Activity, User, Zap } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/dreams', icon: Video, label: 'Dream Library' },
    { path: '/brain-activity', icon: Activity, label: 'Brain Activity' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700/50">
      <div className="p-6">
        <div 
          className="flex items-center space-x-3 mb-8 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <div className="relative">
            <Brain className="w-8 h-8 text-primary-500" />
            <Zap className="w-4 h-4 text-neural-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DreamScope</h1>
            <p className="text-xs text-gray-400">Neural Interface v2.1</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-primary-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-primary-500/10 to-neural-500/10 rounded-lg border border-primary-500/20">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-400">EEG Connected</span>
          </div>
          <p className="text-xs text-gray-400">Neural headset active</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;