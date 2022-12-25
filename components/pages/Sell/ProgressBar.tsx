import { useState } from 'react';

export interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative h-6 py-2">
      <div className="absolute top-0 bottom-0 left-0 w-full h-full rounded-sm bg-recandy-blue-200"></div>
      <div
        style={{
          width: `${progress}%`,
        }}
        className="absolute top-0 bottom-0 left-0 h-full transition-all duration-150 bg-recandy-blue-700"
      ></div>
      <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-full h-full">
        <span className="text-xs font-semibold text-white">{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
