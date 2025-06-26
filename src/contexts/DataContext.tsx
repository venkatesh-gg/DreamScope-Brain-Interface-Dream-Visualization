import React, { createContext, useContext, useState, useEffect } from 'react';

interface BrainwaveData {
  timestamp: number;
  alpha: number;
  beta: number;
  theta: number;
  delta: number;
  gamma: number;
}

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
  sleepPhase: 'REM' | 'NREM1' | 'NREM2' | 'NREM3';
}

interface DataContextType {
  brainwaveData: BrainwaveData[];
  dreams: Dream[];
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  generateDream: (description?: string) => Promise<Dream>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Sample dream data
const sampleDreams: Dream[] = [
  {
    id: '1',
    title: 'Flying Over Neon Cities',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnail: 'https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    duration: 45,
    timestamp: '2024-01-20T02:15:00Z',
    emotions: ['wonder', 'freedom', 'excitement'],
    brainwavePattern: 'high-theta-rem',
    description: 'Soaring through a futuristic cityscape with vivid neon lights',
    sleepPhase: 'REM'
  },
  {
    id: '2',
    title: 'Ocean of Stars',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnail: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    duration: 67,
    timestamp: '2024-01-19T01:30:00Z',
    emotions: ['tranquility', 'awe', 'mysticism'],
    brainwavePattern: 'balanced-alpha-theta',
    description: 'Swimming through a cosmic ocean filled with glowing stars',
    sleepPhase: 'REM'
  },
  {
    id: '3',
    title: 'Childhood Memory Palace',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnail: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    duration: 89,
    timestamp: '2024-01-18T03:45:00Z',
    emotions: ['nostalgia', 'warmth', 'comfort'],
    brainwavePattern: 'low-beta-high-alpha',
    description: 'Exploring rooms from childhood home with surreal twists',
    sleepPhase: 'NREM2'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brainwaveData, setBrainwaveData] = useState<BrainwaveData[]>([]);
  const [dreams, setDreams] = useState<Dream[]>(sampleDreams);
  const [isRecording, setIsRecording] = useState(false);

  // Simulate real-time brainwave data
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newData: BrainwaveData = {
        timestamp: now,
        alpha: 8 + Math.random() * 4 + Math.sin(now / 1000) * 2,
        beta: 12 + Math.random() * 8 + Math.cos(now / 800) * 3,
        theta: 4 + Math.random() * 4 + Math.sin(now / 1200) * 2,
        delta: 1 + Math.random() * 3 + Math.cos(now / 1500) * 1,
        gamma: 30 + Math.random() * 10 + Math.sin(now / 600) * 5,
      };

      setBrainwaveData(prev => {
        const updated = [...prev, newData];
        return updated.slice(-100); // Keep last 100 data points
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const generateDream = async (description?: string): Promise<Dream> => {
    // Simulate AI dream generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const dreamTitles = [
      'Quantum Forest Walk',
      'Digital Butterfly Garden',
      'Crystalline Mountain Peak',
      'Ethereal Dance Floor',
      'Time-Twisted Library',
      'Floating Island Adventure'
    ];
    
    const thumbnails = [
      'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      'https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      'https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    ];

    const newDream: Dream = {
      id: Date.now().toString(),
      title: dreamTitles[Math.floor(Math.random() * dreamTitles.length)],
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
      duration: Math.floor(Math.random() * 60) + 30,
      timestamp: new Date().toISOString(),
      emotions: ['curiosity', 'wonder', 'creativity'],
      brainwavePattern: 'ai-generated',
      description: description || 'AI-generated dream based on current brainwave patterns',
      sleepPhase: 'REM'
    };

    setDreams(prev => [newDream, ...prev]);
    return newDream;
  };

  return (
    <DataContext.Provider value={{
      brainwaveData,
      dreams,
      isRecording,
      startRecording,
      stopRecording,
      generateDream
    }}>
      {children}
    </DataContext.Provider>
  );
};