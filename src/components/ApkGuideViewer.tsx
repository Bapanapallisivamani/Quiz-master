import React from 'react';
import { Terminal, ShieldCheck, CheckCircle2, FileText, Cpu, Download } from 'lucide-react';
import { downloadFlutterProjectZip } from '../utils/zipExport';

export const ApkGuideViewer: React.FC = () => {
  return (
    <div className="w-full flex-1 overflow-y-auto p-4 md:p-6 space-y-6 text-slate-800 dark:text-slate-200">
      {/* College Programme Attribution Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-blue-900/10 border border-purple-200 dark:border-purple-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
              IITM Pravartak & BodhBridge Flutter Lab
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              QuizMaster – Android Release & Submission Guide
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Prepared for students of Kallam Haranadhareddy Institute of Technology (KHIT), Guntur.
            </p>
          </div>

          <button
            onClick={() => downloadFlutterProjectZip()}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all self-start md:self-auto cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Project ZIP</span>
          </button>
        </div>
      </div>

      {/* 3 Steps to Run & Compile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 font-black text-sm flex items-center justify-center mb-3">
            1
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Setup in Android Studio
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
            Unzip the project, open Android Studio, select "Open an Existing Flutter Project", and fetch dependencies:
          </p>
          <div className="p-2.5 rounded-lg bg-slate-900 text-purple-300 font-mono text-[11px]">
            flutter pub get
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-black text-sm flex items-center justify-center mb-3">
            2
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Run Automated Tests
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
            Execute the included widget test suite verifying splash launch, home dashboard, category filtering, and validation:
          </p>
          <div className="p-2.5 rounded-lg bg-slate-900 text-purple-300 font-mono text-[11px]">
            flutter test
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-black text-sm flex items-center justify-center mb-3">
            3
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Generate Release APK
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
            Compile the standalone Android application package suitable for installation on physical Android devices:
          </p>
          <div className="p-2.5 rounded-lg bg-slate-900 text-purple-300 font-mono text-[11px]">
            flutter build apk --release
          </div>
        </div>
      </div>

      {/* APK Compilation Details */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Release APK Compilation Instructions
        </h3>

        <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            When you run <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-purple-600 dark:text-purple-400">flutter build apk --release</code>, the Flutter compiler tree-shakes unused code, runs Ahead-Of-Time (AOT) compilation into native ARM binary instructions, and outputs the final package at:
          </p>

          <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
            build/app/outputs/flutter-apk/app-release.apk
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-xs pt-2">
            Optimized Split-Per-ABI APKs (Recommended for smaller downloads):
          </h4>
          <p>
            To generate smaller, architecture-specific APKs tailored for 64-bit phones:
          </p>
          <div className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto">
            flutter build apk --split-per-abi
          </div>
        </div>
      </div>

      {/* Defect Log Template Summary */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1B2E] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Defect Log Template Summary
          </h3>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            All 6 Defects Resolved & Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-2 pr-3">ID</th>
                <th className="py-2 pr-3">Module</th>
                <th className="py-2 pr-3">Defect Description</th>
                <th className="py-2 pr-3">Severity</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-medium">
              <tr>
                <td className="py-2.5 font-mono text-purple-600 dark:text-purple-400">DEF-001</td>
                <td className="py-2.5">quiz_screen.dart</td>
                <td className="py-2.5">Rapid clicks on next button skipped questions</td>
                <td className="py-2.5 text-amber-500 font-semibold">Medium</td>
                <td className="py-2.5 text-emerald-500 font-bold">Closed</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-purple-600 dark:text-purple-400">DEF-002</td>
                <td className="py-2.5">quiz_provider.dart</td>
                <td className="py-2.5">Periodic timer kept ticking after exiting quiz</td>
                <td className="py-2.5 text-rose-500 font-semibold">High</td>
                <td className="py-2.5 text-emerald-500 font-bold">Closed</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-purple-600 dark:text-purple-400">DEF-003</td>
                <td className="py-2.5">add_question_screen.dart</td>
                <td className="py-2.5">Identical choices allowed in custom question form</td>
                <td className="py-2.5 text-amber-500 font-semibold">Medium</td>
                <td className="py-2.5 text-emerald-500 font-bold">Closed</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-purple-600 dark:text-purple-400">DEF-004</td>
                <td className="py-2.5">answer_option.dart</td>
                <td className="py-2.5">Dark theme text contrast on high-res AMOLED</td>
                <td className="py-2.5 text-slate-400">Low</td>
                <td className="py-2.5 text-emerald-500 font-bold">Closed</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-purple-600 dark:text-purple-400">DEF-005</td>
                <td className="py-2.5">storage_service.dart</td>
                <td className="py-2.5">Custom questions lost on app process death</td>
                <td className="py-2.5 text-rose-600 font-black">Critical</td>
                <td className="py-2.5 text-emerald-500 font-bold">Closed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
