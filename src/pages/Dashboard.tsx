import React from 'react';
import { Brain, Zap, Video, Activity, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import BrainwaveChart from '../components/charts/BrainwaveChart';
import DreamCard from '../components/dreams/DreamCard';
import DreamModal from '../components/dreams/DreamModal';

const Dashboard: React.FC = () => {
  const { brainwaveData, dreams, isRecording, startRecording, stopRecording, generateDream } = useData();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [selectedDream, setSelectedDream] = React.useState(null);
  const [showDreamModal, setShowDreamModal] = React.useState(false);

  const currentData = brainwaveData[brainwaveData.length - 1];
  const recentDreams = dreams.slice(0, 4);

  const handleGenerateDream = async () => {
    setIsGenerating(true);
    await generateDream();
    setIsGenerating(false);
  };

  const handleDreamClick = (dream: any) => {
    setSelectedDream(dream);
    setShowDreamModal(true);
  };

  const stats = [
    {
      label: 'Total Dreams',
      value: dreams.length,
      icon: Video,
      color: 'text-primary-500',
      bg: 'bg-primary-500/20',
      border: 'border-primary-500/30'
    },
    {
      label: 'Recording Hours',
      value: '47.3',
      icon: Clock,
      color: 'text-neural-500',
      bg: 'bg-neural-500/20',
      border: 'border-neural-500/30'
    },
    {
      label: 'Brain Activity',
      value: currentData ? `${Math.round(currentData.alpha + currentData.beta)}Hz` : '0Hz',
      icon: Activity,
      color: 'text-dream-500',
      bg: 'bg-dream-500/20',
      border: 'border-dream-500/30'
    },
    {
      label: 'Weekly Trend',
      value: '+12%',
      icon: TrendingUp,
      color: 'text-green-500',
      bg: 'bg-green-500/20',
      border: 'border-green-500/30'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Neural Dashboard</h1>
          <p className="text-gray-400">Monitor your brain activity and explore generated dreams</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              isRecording 
                ? 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30' 
                : 'bg-primary-500/20 text-primary-300 border border-primary-500/30 hover:bg-primary-500/30'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-primary-500'}`} />
            <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
          </button>

          <button
            onClick={handleGenerateDream}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neural-500 to-primary-500 text-white font-semibold rounded-lg hover:from-neural-600 hover:to-primary-600 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                <span>Generate Dream</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bg} backdrop-blur-sm rounded-xl p-6 border ${stat.border}`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${stat.color}`} />
                <Zap className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Real-time Brainwave Activity</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Live</span>
              </div>
            </div>
            <BrainwaveChart />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Current Readings</h3>
            <div className="space-y-4">
              {currentData && [
                { label: 'Alpha', value: currentData.alpha, color: 'bg-primary-500' },
                { label: 'Beta', value: currentData.beta, color: 'bg-neural-500' },
                { label: 'Theta', value: currentData.theta, color: 'bg-dream-500' },
                { label: 'Delta', value: currentData.delta, color: 'bg-blue-500' },
                { label: 'Gamma', value: currentData.gamma, color: 'bg-green-500' }
              ].map((wave, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${wave.color}`} />
                    <span className="text-gray-300">{wave.label}</span>
                  </div>
                  <span className="text-white font-mono">{wave.value.toFixed(1)}Hz</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Sleep Phase</h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-primary-500/30">
                <Brain className="w-8 h-8 text-primary-500" />
              </div>
              <p className="text-xl font-semibold text-white">REM Sleep</p>
              <p className="text-sm text-gray-400">Optimal for dream generation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Dreams</h2>
          <Link 
            to="/dreams"
            className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentDreams.map((dream) => (
            <DreamCard 
              key={dream.id} 
              dream={dream} 
              onClick={() => handleDreamClick(dream)}
            />
          ))}
        </div>
      </div>

      <DreamModal
        dream={selectedDream}
        isOpen={showDreamModal}
        onClose={() => {
          setShowDreamModal(false);
          setSelectedDream(null);
        }}
      />
    </div>
  );
};

export default Dashboard;