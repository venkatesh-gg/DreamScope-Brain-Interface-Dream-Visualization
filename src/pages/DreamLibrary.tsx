import React, { useState } from 'react';
import { Search, Filter, SortDesc, Video, Calendar, Tag } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import DreamCard from '../components/dreams/DreamCard';
import DreamModal from '../components/dreams/DreamModal';

const DreamLibrary: React.FC = () => {
  const { dreams } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedDream, setSelectedDream] = useState(null);
  const [showDreamModal, setShowDreamModal] = useState(false);

  const allEmotions = Array.from(new Set(dreams.flatMap(dream => dream.emotions)));
  const allPhases = Array.from(new Set(dreams.map(dream => dream.sleepPhase)));

  const filteredDreams = dreams
    .filter(dream => 
      dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dream.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(dream => 
      selectedEmotion === '' || dream.emotions.includes(selectedEmotion)
    )
    .filter(dream => 
      selectedPhase === '' || dream.sleepPhase === selectedPhase
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'longest':
          return b.duration - a.duration;
        case 'shortest':
          return a.duration - b.duration;
        default:
          return 0;
      }
    });

  const handleDreamClick = (dream: any) => {
    setSelectedDream(dream);
    setShowDreamModal(true);
  };

  const stats = [
    { label: 'Total Dreams', value: dreams.length, icon: Video },
    { label: 'Avg Duration', value: `${Math.round(dreams.reduce((acc, d) => acc + d.duration, 0) / dreams.length)}s`, icon: Calendar },
    { label: 'Unique Emotions', value: allEmotions.length, icon: Tag }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dream Library</h1>
        <p className="text-gray-400">Explore your collection of AI-generated dreams</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center space-x-4">
                <Icon className="w-8 h-8 text-primary-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dreams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedEmotion}
                onChange={(e) => setSelectedEmotion(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none appearance-none"
              >
                <option value="">All Emotions</option>
                {allEmotions.map(emotion => (
                  <option key={emotion} value={emotion} className="capitalize">
                    {emotion}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none appearance-none"
              >
                <option value="">All Phases</option>
                {allPhases.map(phase => (
                  <option key={phase} value={phase}>
                    {phase}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <SortDesc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="longest">Longest First</option>
                <option value="shortest">Shortest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDreams.map((dream) => (
            <DreamCard 
              key={dream.id} 
              dream={dream} 
              onClick={() => handleDreamClick(dream)}
            />
          ))}
        </div>

        {filteredDreams.length === 0 && (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No dreams found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
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

export default DreamLibrary;