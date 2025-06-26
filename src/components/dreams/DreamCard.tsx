import React from 'react';
import { Play, Clock, Calendar, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Dream {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  timestamp: string;
  emotions: string[];
  sleepPhase: string;
  description: string;
}

interface DreamCardProps {
  dream: Dream;
  onClick: () => void;
}

const DreamCard: React.FC<DreamCardProps> = ({ dream, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-primary-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary-500/20"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={dream.thumbnail} 
          alt={dream.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary-500/30">
            <Play className="w-6 h-6 text-primary-300 ml-1" />
          </div>
        </div>
        
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          <Clock className="w-3 h-3 text-gray-300" />
          <span className="text-xs text-gray-300">{dream.duration}s</span>
        </div>

        <div className="absolute top-3 left-3 bg-neural-500/20 backdrop-blur-sm rounded-full px-2 py-1 border border-neural-500/30">
          <span className="text-xs text-neural-300 font-medium">{dream.sleepPhase}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
          {dream.title}
        </h3>
        
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {dream.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDistanceToNow(new Date(dream.timestamp), { addSuffix: true })}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {dream.emotions.slice(0, 3).map((emotion, index) => (
            <div 
              key={index}
              className="flex items-center space-x-1 bg-dream-500/20 backdrop-blur-sm rounded-full px-2 py-1 border border-dream-500/30"
            >
              <Tag className="w-2 h-2" />
              <span className="text-xs text-dream-300 capitalize">{emotion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DreamCard;