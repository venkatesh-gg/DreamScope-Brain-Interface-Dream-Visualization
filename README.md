# 🧠 DreamScope - AI Dream Visualization Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)

DreamScope is an advanced AI-powered application that visualizes, simulates, and plays back users' dreams by analyzing brainwave data collected from EEG or BLE headsets. This futuristic brain-machine interface processes brain activity patterns during sleep to reconstruct visual dreams using AI video generation.

![DreamScope Dashboard](https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2)

## ✨ Features

### 🧠 Brain-Interface Simulation
- **Real-time EEG Monitoring**: Simulates BLE/EEG hardware integration for brainwave collection
- **Live Data Streaming**: WebSocket-based real-time brainwave data visualization
- **Multi-frequency Analysis**: Tracks Alpha, Beta, Theta, Delta, and Gamma wave patterns
- **Sleep Phase Detection**: Identifies REM, NREM1, NREM2, and NREM3 sleep stages

### 🎬 AI Dream Visualization
- **Dream Generation**: Creates AI-powered video representations of dreams based on brainwave patterns
- **Emotion Analysis**: Automatically detects and tags emotions (wonder, fear, excitement, tranquility)
- **Pattern Recognition**: Analyzes brainwave signatures to generate contextual dream content
- **Video Reconstruction**: Converts neural patterns into short AI-generated video clips

### 📚 Dream Library
- **Personal Gallery**: Secure storage and playback of generated dream videos
- **Advanced Search**: Filter dreams by emotions, sleep phases, duration, and timestamps
- **Metadata Tracking**: Comprehensive dream analytics including duration, emotions, and brainwave patterns
- **Dream History**: Timeline view of all recorded dream sessions

### 📊 Brain Activity Dashboard
- **Real-time Visualization**: Interactive charts showing live brainwave frequencies
- **Historical Analysis**: Track brain activity patterns over time
- **Session Management**: Start/stop recording with visual feedback
- **Neural Insights**: AI-powered recommendations based on brain activity patterns

### 🔐 User Authentication & Security
- **Secure Login**: JWT-based authentication with encrypted data storage
- **Profile Management**: Comprehensive user profiles with neural characteristics
- **Privacy Controls**: End-to-end encryption for all brainwave and dream data
- **Achievement System**: Gamified experience tracking user milestones

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser with WebGL support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dreamscope.git
   cd dreamscope
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Login
Use any email and password combination to access the demo environment.

## 🏗️ Architecture

### Frontend Stack
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Vite 5.4.2** - Lightning-fast build tool
- **React Router 6.21.0** - Client-side routing
- **Chart.js 4.4.1** - Interactive data visualization
- **Framer Motion 10.16.16** - Smooth animations
- **Lucide React** - Beautiful icon library

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── charts/         # Data visualization components
│   ├── dreams/         # Dream-related components
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components
├── contexts/           # React Context providers
├── pages/              # Main application pages
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎯 Core Components

### Brain Activity Monitor
```typescript
// Real-time brainwave visualization
const BrainwaveChart: React.FC = () => {
  const { brainwaveData } = useData();
  // Chart.js integration for live EEG data
};
```

### Dream Generation Engine
```typescript
// AI-powered dream creation
const generateDream = async (description?: string): Promise<Dream> => {
  // Simulates AI dream generation based on brainwave patterns
  // Returns generated dream with metadata
};
```

### Neural Data Context
```typescript
// Centralized state management for brain data
interface DataContextType {
  brainwaveData: BrainwaveData[];
  dreams: Dream[];
  isRecording: boolean;
  generateDream: (description?: string) => Promise<Dream>;
}
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3001
VITE_WEBSOCKET_URL=ws://localhost:3001
VITE_AI_SERVICE_URL=http://localhost:5000
```

### Tailwind Configuration
Custom color palette for neural interface theming:
```javascript
colors: {
  primary: { 500: '#00F5FF' },    // Cyan for primary actions
  neural: { 500: '#4ECDC4' },     // Teal for neural data
  dream: { 500: '#FF6B6B' },      // Coral for dream content
}
```

## 📱 Features Deep Dive

### Real-time Brainwave Monitoring
- **100Hz Sampling Rate**: High-frequency data collection simulation
- **5-Channel EEG**: Alpha, Beta, Theta, Delta, Gamma wave tracking
- **Live Visualization**: Real-time charts with smooth animations
- **Data Buffer**: Maintains last 100 data points for analysis

### Dream Metadata System
Each generated dream includes:
- **Timestamp**: Exact recording time
- **Duration**: Length of dream sequence
- **Emotions**: AI-detected emotional content
- **Sleep Phase**: REM/NREM classification
- **Brainwave Pattern**: Dominant frequency signature
- **Thumbnail**: AI-generated preview image

### User Experience Features
- **Responsive Design**: Optimized for desktop and mobile
- **Dark Theme**: Neural interface aesthetic
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Comprehensive feedback during operations
- **Error Handling**: Graceful error recovery

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- **ESLint**: Configured with React and TypeScript rules
- **TypeScript**: Strict mode enabled for type safety
- **Prettier**: Code formatting (recommended)
- **Husky**: Git hooks for pre-commit checks (optional)

### Testing Strategy
```bash
# Unit tests for components
npm run test:unit

# Integration tests for contexts
npm run test:integration

# E2E tests for user flows
npm run test:e2e
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Environment Setup
- **Development**: Local Vite server with hot reload
- **Staging**: Docker container with production build
- **Production**: CDN deployment with optimized assets

## 🔮 Future Roadmap

### Phase 1: Core Enhancement
- [ ] Real EEG hardware integration
- [ ] Advanced AI dream generation models
- [ ] Cloud storage for dream data
- [ ] Mobile app development

### Phase 2: Advanced Features
- [ ] Multi-user dream sharing
- [ ] Dream similarity analysis
- [ ] Sleep cycle optimization
- [ ] Biometric integration

### Phase 3: Platform Expansion
- [ ] VR dream playback
- [ ] Social dream networks
- [ ] Clinical research tools
- [ ] API for third-party integration

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow React best practices
- Maintain component modularity
- Write descriptive commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Chart.js** - Excellent charting library for data visualization
- **Tailwind CSS** - Beautiful utility-first CSS framework
- **Lucide React** - Comprehensive icon library
- **Framer Motion** - Smooth animation library
- **Pexels** - High-quality stock images for demo content

## 📞 Support

- **Documentation**: [docs.dreamscope.ai](https://docs.dreamscope.ai)
- **Issues**: [GitHub Issues](https://github.com/your-username/dreamscope/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/dreamscope/discussions)
- **Email**: support@dreamscope.ai

---

<div align="center">
  <p>Built with ❤️ for the future of dream visualization</p>
  <p>© 2024 DreamScope. All rights reserved.</p>
</div>
