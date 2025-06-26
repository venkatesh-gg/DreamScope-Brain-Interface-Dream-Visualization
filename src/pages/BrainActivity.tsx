import React, { useState } from 'react';
import { Activity, Brain, Zap, TrendingUp, Calendar, Clock } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import BrainwaveChart from '../components/charts/BrainwaveChart';

const BrainActivity: React.FC = () => {
  const { brainwaveData, isRecording, startRecording, stopRecording } = useData();
  const [timeRange, setTimeRange] = useState('live');

  const currentData = brainwaveData[brainwaveData.length - 1];
  
  const waveTypes = [
    {
      name: 'Alpha Waves',
      frequency: '8-12 Hz',
      description: 'Relaxed, meditative state',
      value: currentData?.alpha || 0,
      color: 'text-primary-500',
      bg: 'bg-primary-500/20',
      border: 'border-primary-500/30'
    },
    {
      name: 'Beta Waves',
      frequency: '12-30 Hz',
      description: 'Alert, focused thinking',
      value: currentData?.beta || 0,
      color: 'text-neural-500',
      bg: 'bg-neural-500/20',
      border: 'border-neural-500/30'
    },
    {
      name: 'Theta Waves',
      frequency: '4-8 Hz',
      description: 'Deep meditation, REM sleep',
      value: currentData?.theta || 0,
      color: 'text-dream-500',
      bg: 'bg-dream-500/20',
      border: 'border-dream-500/30'
    },
    {
      name: 'Delta Waves',
      frequency: '0.5-4 Hz',
      description: 'Deep sleep, healing',
      value: currentData?.delta || 0,
      color: 'text-blue-500',
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/30'
    },
    {
      name: 'Gamma Waves',
      frequency: '30-100 Hz',
      description: 'High-level cognitive function',
      value: currentData?.gamma || 0,
      color: 'text-green-500',
      bg: 'bg-green-500/20',
      border: 'border-green-500/30'
    }
  ];

  const sessions = [
    {
      date: '2024-01-20',
      duration: '8.5 hours',
      quality: 'Excellent',
      dreams: 3,
      avgAlpha: 10.2,
      status: 'completed'
    },
    {
      date: '2024-01-19',
      duration: '7.2 hours',
      quality: 'Good',
      dreams: 2,
      avgAlpha: 9.8,
      status: 'completed'
    },
    {
      date: '2024-01-18',
      duration: '6.8 hours',
      quality: 'Fair',
      dreams: 1,
      avgAlpha: 8.5,
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Brain Activity Monitor</h1>
          <p className="text-gray-400">Real-time analysis of your neural patterns</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-primary-500 focus:outline-none"
          >
            <option value="live">Live Feed</option>
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last Week</option>
          </select>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              isRecording 
                ? 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30' 
                : 'bg-primary-500/20 text-primary-300 border border-primary-500/30 hover:bg-primary-500/30'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-primary-500'}`} />
            <span>{isRecording ? 'Stop Monitoring' : 'Start Monitoring'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {waveTypes.map((wave, index) => (
          <div
            key={index}
            className={`${wave.bg} backdrop-blur-sm rounded-xl p-6 border ${wave.border}`}
          >
            <div className="flex items-center justify-between mb-4">
              <Brain className={`w-6 h-6 ${wave.color}`} />
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </div>
            <div className="mb-3">
              <p className={`text-2xl font-bold ${wave.color}`}>
                {wave.value.toFixed(1)}Hz
              </p>
              <p className="text-sm font-medium text-gray-300">{wave.name}</p>
            </div>
            <div className="text-xs text-gray-400">
              <p className="mb-1">{wave.frequency}</p>
              <p>{wave.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-white">Live Brainwave Visualization</h2>
            {isRecording && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Recording</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              <span>Sample Rate: 100Hz</span>
            </div>
            <div className="text-sm text-gray-400">
              <span>Buffer: {brainwaveData.length}/100</span>
            </div>
          </div>
        </div>
        
        <BrainwaveChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Session History</h3>
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/30"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{session.date}</p>
                    <p className="text-sm text-gray-400">{session.duration} • {session.dreams} dreams</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{session.quality}</p>
                  <p className="text-xs text-gray-400">Avg α: {session.avgAlpha}Hz</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Neural Insights</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Activity className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Optimal Dream State</h4>
                <p className="text-sm text-gray-400">
                  Your theta waves are strongest between 2-4 AM, ideal for vivid dream generation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-neural-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Brain className="w-4 h-4 text-neural-500" />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Meditation Benefits</h4>
                <p className="text-sm text-gray-400">
                  Regular alpha wave patterns indicate improved relaxation and dream clarity.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-dream-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="w-4 h-4 text-dream-500" />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Peak Performance</h4>
                <p className="text-sm text-gray-400">
                  High gamma activity correlates with more creative and complex dream narratives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainActivity;