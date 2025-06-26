import React from 'react';
import { X, Play, Pause, Calendar, Clock, Tag, Brain } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Dream {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  timestamp: string;
  emotions: string[];
  brainwavePattern: string;
  description: string;
  sleepPhase: string;
}

interface DreamModalProps {
  dream: Dream;
  isOpen: boolean;
  onClose: () => void;
}

const DreamModal: React.FC<DreamModalProps> = ({ dream, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/80 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative">
          <div className="aspect-video bg-black rounded-t-2xl overflow-hidden">
            <img 
              src={dream.thumbnail} 
              alt={dream.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary-500/30 hover:bg-primary-500/30 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-primary-300" />
                ) : (
                  <Play className="w-8 h-8 text-primary-300 ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{dream.title}</h2>
              <p className="text-gray-400">{dream.description}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="bg-neural-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-neural-500/30">
                <span className="text-sm text-neural-300 font-medium">{dream.sleepPhase}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-gray-400">Recorded</span>
              </div>
              <p className="text-white">{formatDistanceToNow(new Date(dream.timestamp), { addSuffix: true })}</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-neural-500" />
                <span className="text-sm font-medium text-gray-400">Duration</span>
              </div>
              <p className="text-white">{dream.duration} seconds</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-dream-500" />
                <span className="text-sm font-medium text-gray-400">Pattern</span>
              </div>
              <p className="text-white capitalize">{dream.brainwavePattern.replace('-', ' ')}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Tag className="w-4 h-4 text-dream-500" />
              <span className="text-sm font-medium text-gray-400">Detected Emotions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {dream.emotions.map((emotion, index) => (
                <div 
                  key={index}
                  className="bg-dream-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-dream-500/30"
                >
                  <span className="text-sm text-dream-300 capitalize">{emotion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamModal;