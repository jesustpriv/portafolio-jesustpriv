import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
import { validateToken } from "../api/githubApi";

export default function AuthScreen({ onConnect }) {
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await validateToken(token, owner, repo);
      onConnect({ token, owner, repo });
    } catch (err) {
      setError(err.message || "Failed to connect to the repository.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Light Leak Glow */}
      <div className="bg-glow-violet top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="glass-premium w-full max-w-md rounded-2xl p-8 z-10 relative">
        <div className="flex items-center justify-center mb-8 text-electric-blue">
          <GithubIcon size={48} />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Connect to GitHub
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Personal Access Token (PAT)
            </label>
            <input
              type="password"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue transition-colors"
              placeholder="ghp_xxxxxxxxxxxx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              GitHub Username / Org
            </label>
            <input
              type="text"
              required
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue transition-colors"
              placeholder="e.g. jesustpriv"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Repository Name
            </label>
            <input
              type="text"
              required
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue transition-colors"
              placeholder="e.g. portafolio-jesustpriv"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-electric-blue hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 mt-6"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <span>Connect</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
