import type { FC } from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ value, max }) => {
  if (max === 0) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className="bg-gray-300 h-4 rounded-full text-xs text-center text-gray-500">
          No tasks
        </div>
      </div>
    );
  }

  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-black">
        {Math.round(percentage)}%
      </div>
    </div>
  );
}; 