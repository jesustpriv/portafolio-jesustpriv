import React from "react";
import { LogOut } from "lucide-react";

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function TopBar({ repoInfo, onLogout }) {
  return (
    <header className="h-16 bg-dark-surface border-b border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center space-x-2 text-gray-300">
        <GithubIcon size={20} />
        <span className="font-medium">
          {repoInfo.owner} / <span className="text-white">{repoInfo.repo}</span>
        </span>
        <span className="px-2 py-1 ml-4 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full">
          Connected
        </span>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
      >
        <LogOut size={16} />
        <span>Disconnect</span>
      </button>
    </header>
  );
}
