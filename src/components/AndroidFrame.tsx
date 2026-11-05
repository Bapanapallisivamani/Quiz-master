import React from 'react';
import { Wifi, Battery, Signal, ArrowLeft, Circle, Square } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  isFullscreen: boolean;
  isDark: boolean;
  onBackPress?: () => void;
  onHomePress?: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  isFullscreen,
  isDark,
  onBackPress,
  onHomePress,
}) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isFullscreen) {
    return (
      <div className={`w-full min-h-[600px] flex flex-col ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} relative`}>
        {children}
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[410px] h-[780px] bg-slate-900 rounded-[44px] p-3 shadow-2xl ring-1 ring-slate-800/80 shadow-purple-950/20 flex flex-col select-none">
      {/* Device Outer Frame Bezels & Buttons */}
      <div className="absolute -left-[5px] top-28 w-[3px] h-10 bg-slate-700 rounded-l-sm" />
      <div className="absolute -left-[5px] top-42 w-[3px] h-14 bg-slate-700 rounded-l-sm" />
      <div className="absolute -right-[5px] top-32 w-[3px] h-16 bg-slate-700 rounded-r-sm" />

      {/* Screen Glass Area */}
      <div className={`relative w-full h-full rounded-[34px] overflow-hidden flex flex-col ${isDark ? 'bg-[#12111A] text-slate-100' : 'bg-[#F6F7FB] text-slate-900'} transition-colors duration-200`}>
        {/* Android Status Bar */}
        <div className={`h-8 px-6 pt-1 flex items-center justify-between text-xs font-medium z-30 select-none ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <span className="tabular-nums font-semibold text-[13px]">{currentTime}</span>

          {/* Camera Punchhole */}
          <div className="w-3.5 h-3.5 bg-black rounded-full ring-2 ring-slate-800/20 mx-auto" />

          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Dynamic App Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
          {children}
        </div>

        {/* Android Navigation Pill / 3-Button Nav Bar */}
        <div className={`h-8 flex items-center justify-around px-12 z-30 ${isDark ? 'bg-[#12111A]/90 border-t border-slate-800/40' : 'bg-[#F6F7FB]/90 border-t border-slate-200/60'} backdrop-blur-sm select-none`}>
          <button
            onClick={onBackPress}
            title="Android Back"
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onHomePress}
            title="Android Home"
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <Circle className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onBackPress}
            title="Android Overview"
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
