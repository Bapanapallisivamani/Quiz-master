import React, { useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface SplashScreenProps {
  onFinish: () => void;
  isDark: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, isDark }) => {
  useEffect(() => {
    sound.playTap();
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      onClick={onFinish}
      className={`flex-1 flex flex-col items-center justify-between p-6 select-none cursor-pointer transition-colors ${
        isDark ? 'bg-gradient-to-b from-[#1E1B2E] via-[#12111A] to-[#12111A]' : 'bg-gradient-to-b from-purple-50/60 via-[#F6F7FB] to-[#F6F7FB]'
      }`}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Animated App Icon */}
        <div className="relative mb-6 group">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#6750A4] to-[#2563EB] flex items-center justify-center shadow-xl shadow-purple-600/30 ring-4 ring-purple-500/20 transform transition-transform duration-500 hover:scale-105">
            <HelpCircle className="w-12 h-12 text-white stroke-[2.2]" />
          </div>
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-20 blur-lg -z-10 animate-pulse" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          QuizMaster
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs font-medium">
          Master Concepts Through Interactive Learning
        </p>
      </div>

      {/* Academic Credits */}
      <div className="w-full flex flex-col items-center text-center pb-6">
        <div className="w-6 h-6 border-2 border-purple-600 dark:border-purple-400 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 tracking-wide uppercase">
          Flutter Application Development Programme
        </span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          IITM Pravartak & BodhBridge Flutter Lab<br />
          Kallam Haranadhareddy Institute of Technology (KHIT), Guntur
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-3">
          Tap anywhere to skip splash
        </span>
      </div>
    </div>
  );
};
