import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useData } from '../../contexts/DataContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BrainwaveChart: React.FC = () => {
  const { brainwaveData } = useData();
  const chartRef = useRef<ChartJS<'line', number[], string>>(null);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb',
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        borderColor: '#00F5FF',
        borderWidth: 1,
        titleColor: '#00F5FF',
        bodyColor: '#e5e7eb',
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: '#9ca3af',
          maxTicksLimit: 10,
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: '#9ca3af',
        },
        min: 0,
        max: 50,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
      },
    },
    animation: {
      duration: 0,
    },
  };

  const data = {
    labels: brainwaveData.map((_, index) => `${index}s`),
    datasets: [
      {
        label: 'Alpha Waves',
        data: brainwaveData.map(d => d.alpha),
        borderColor: '#00F5FF',
        backgroundColor: 'rgba(0, 245, 255, 0.1)',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Beta Waves',
        data: brainwaveData.map(d => d.beta),
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Theta Waves',
        data: brainwaveData.map(d => d.theta),
        borderColor: '#FF6B6B',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Delta Waves',
        data: brainwaveData.map(d => d.delta),
        borderColor: '#45B7D1',
        backgroundColor: 'rgba(69, 183, 209, 0.1)',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Gamma Waves',
        data: brainwaveData.map(d => d.gamma),
        borderColor: '#96CEB4',
        backgroundColor: 'rgba(150, 206, 180, 0.1)',
        fill: false,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="h-80 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
      <Line ref={chartRef} options={options} data={data} />
    </div>
  );
};

export default BrainwaveChart;