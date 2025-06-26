import React, { useState } from 'react';
import { User, Settings, Brain, Calendar, Award, Shield, Bell, Palette } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { dreams } = useData();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const achievements = [
    {
      title: 'Dream Explorer',
      description: 'Generated your first AI dream',
      earned: true,
      date: '2024-01-15',
      icon: Brain,
      color: 'text-primary-500'
    },
    {
      title: 'Lucid Dreamer',
      description: 'Recorded 10+ hours of brain activity',
      earned: true,
      date: '2024-01-18',
      icon: Calendar,
      color: 'text-neural-500'
    },
    {
      title: 'Dream Collector',
      description: 'Saved 25 dreams to your library',
      earned: false,
      date: null,
      icon: Award,
      color: 'text-gray-500'
    },
    {
      title: 'Neural Master',
      description: 'Maintained consistent brain patterns for a week',
      earned: false,
      date: null,
      icon: Brain,
      color: 'text-gray-500'
    }
  ];

  const stats = [
    { label: 'Dreams Generated', value: dreams.length },
    { label: 'Recording Hours', value: '47.3' },
    { label: 'Days Active', value: '12' },
    { label: 'Achievements', value: achievements.filter(a => a.earned).length }
  ];

  const renderProfileTab = () => (
    <div className="space-y-8">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-neural-500 rounded-full flex items-center justify-center">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-white" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
          <p className="text-sm text-gray-500">Member since {user?.joinDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-700/30 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-700/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Neural Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-300 mb-2">Dominant Brain Patterns</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Alpha Waves</span>
                <span className="text-sm text-primary-400">High Activity</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Theta Waves</span>
                <span className="text-sm text-neural-400">Moderate Activity</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">REM Sleep</span>
                <span className="text-sm text-dream-400">Excellent Quality</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-300 mb-2">Dream Characteristics</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Avg Duration</span>
                <span className="text-sm text-white">67 seconds</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Most Common Emotion</span>
                <span className="text-sm text-white">Wonder</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Dream Clarity</span>
                <span className="text-sm text-green-400">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-700/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recording Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-300">Auto-start Recording</p>
              <p className="text-sm text-gray-400">Automatically begin monitoring when sleep is detected</p>
            </div>
            <button className="w-12 h-6 bg-primary-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-300">Dream Generation</p>
              <p className="text-sm text-gray-400">Generate dreams automatically during REM phases</p>
            </div>
            <button className="w-12 h-6 bg-gray-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-300">Dream Alerts</p>
                <p className="text-sm text-gray-400">Notify when new dreams are generated</p>
              </div>
            </div>
            <button className="w-12 h-6 bg-primary-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Interface</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Palette className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-300">Theme</p>
                <p className="text-sm text-gray-400">Neural Interface Dark</p>
              </div>
            </div>
            <select className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white text-sm">
              <option>Neural Dark</option>
              <option>Cyber Blue</option>
              <option>Dream Purple</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievementsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {achievements.map((achievement, index) => {
        const Icon = achievement.icon;
        return (
          <div
            key={index}
            className={`bg-gray-700/30 rounded-lg p-6 border ${
              achievement.earned ? 'border-primary-500/30' : 'border-gray-600/30'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                achievement.earned ? 'bg-primary-500/20' : 'bg-gray-600/20'
              }`}>
                <Icon className={`w-6 h-6 ${achievement.color}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${achievement.earned ? 'text-white' : 'text-gray-400'}`}>
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                {achievement.earned && achievement.date && (
                  <p className="text-xs text-primary-400">Earned on {achievement.date}</p>
                )}
                {!achievement.earned && (
                  <p className="text-xs text-gray-500">Not yet earned</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-700/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Data Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-primary-500 mt-1" />
            <div>
              <p className="font-medium text-gray-300">Neural Data Encryption</p>
              <p className="text-sm text-gray-400">All brainwave data is encrypted end-to-end and stored locally on your device.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <p className="font-medium text-gray-300">Dream Privacy</p>
              <p className="text-sm text-gray-400">Your generated dreams are private and never shared without explicit consent.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 bg-gray-600/50 rounded-lg hover:bg-gray-600/70 transition-colors">
            <p className="font-medium text-gray-300">Export My Data</p>
            <p className="text-sm text-gray-400">Download all your neural data and dreams</p>
          </button>
          <button className="w-full text-left px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors">
            <p className="font-medium text-red-300">Delete Account</p>
            <p className="text-sm text-gray-400">Permanently remove all data and close account</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'settings': return renderSettingsTab();
      case 'achievements': return renderAchievementsTab();
      case 'privacy': return renderPrivacyTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Profile & Settings</h1>
        <p className="text-gray-400">Manage your DreamScope account and preferences</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
        <div className="border-b border-gray-700/50">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-300'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;