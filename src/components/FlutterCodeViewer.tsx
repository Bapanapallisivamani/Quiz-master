import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Folder, Search, ExternalLink } from 'lucide-react';
import { FLUTTER_FILES, FlutterFile } from '../data/flutterFiles';
import { downloadFlutterProjectZip } from '../utils/zipExport';

export const FlutterCodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_FILES[1]); // default main.dart
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      await downloadFlutterProjectZip();
    } finally {
      setDownloading(false);
    }
  };

  const filteredFiles = FLUTTER_FILES.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.path.toLowerCase().includes(search.toLowerCase()) ||
      f.folder.toLowerCase().includes(search.toLowerCase())
  );

  // Group files by folder
  const folders = Array.from(new Set(FLUTTER_FILES.map((f) => f.folder)));

  return (
    <div className="w-full flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-xl">
      {/* File Sidebar */}
      <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col bg-slate-950/70 select-none shrink-0">
        {/* Sidebar Header */}
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Flutter Files ({FLUTTER_FILES.length})
            </span>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download complete Flutter project as ZIP"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Zipping...' : 'Download ZIP'}</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-2.5 border-b border-slate-800/80">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Dart files..."
              className="w-full h-8 pl-8 pr-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Files List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-3 max-h-[300px] md:max-h-none">
          {folders.map((folder) => {
            const filesInFolder = filteredFiles.filter((f) => f.folder === folder);
            if (filesInFolder.length === 0) return null;

            return (
              <div key={folder} className="space-y-1">
                <div className="px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
                  <span>{folder}</span>
                </div>
                {filesInFolder.map((file) => {
                  const isSelected = selectedFile.path === file.path;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />
                      <span className="truncate">{file.name}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Code Editor Panel */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {/* Editor Top Bar */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="min-w-0 pr-4">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-2 truncate">
              <span className="font-mono text-purple-400">{selectedFile.path}</span>
            </div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">
              {selectedFile.description}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy File Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Content with Line Numbers */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-300 select-text">
          <pre className="flex">
            {/* Line numbers */}
            <span className="select-none text-slate-600 text-right pr-4 border-r border-slate-800/80 mr-4">
              {selectedFile.content.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </span>

            {/* Code */}
            <code className="text-purple-100 flex-1 overflow-x-auto">
              {selectedFile.content}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
