import React, { useState, useEffect } from "react";
import { getFile, saveFile } from "../../api/githubApi";
import { Loader2, Save } from "lucide-react";

export default function HeroEditor({ repoInfo }) {
  const [data, setData] = useState({
    name: "",
    brand: "",
    tagline: "",
    primaryCTA: "",
    secondaryCTA: ""
  });
  const [sha, setSha] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, loading, saving, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const filePath = "src/data/hero.json";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setStatus("loading");
    try {
      const { content, sha } = await getFile(repoInfo.token, repoInfo.owner, repoInfo.repo, filePath);
      if (content) {
        setData(JSON.parse(content));
        setSha(sha);
      }
      setStatus("idle");
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  const handleSave = async () => {
    setStatus("saving");
    setErrorMessage("");
    try {
      const newSha = await saveFile(
        repoInfo.token,
        repoInfo.owner,
        repoInfo.repo,
        filePath,
        JSON.stringify(data, null, 2),
        sha,
        "Update Hero section via Admin Panel"
      );
      setSha(newSha.content.sha);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-electric-blue" size={32} /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Hero Section</h2>
        <div className="flex items-center space-x-4">
          {status === "success" && <span className="text-sm text-green-400">✓ Saved — deploy triggered</span>}
          {status === "error" && <span className="text-sm text-red-400">✗ Error: {errorMessage}</span>}
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="flex items-center space-x-2 bg-electric-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {status === "saving" ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span>Save Section</span>
          </button>
        </div>
      </div>

      <div className="bg-dark-surface border border-gray-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Brand</label>
          <input
            type="text"
            value={data.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Tagline</label>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => handleChange("tagline", e.target.value)}
            className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Primary CTA</label>
            <input
              type="text"
              value={data.primaryCTA}
              onChange={(e) => handleChange("primaryCTA", e.target.value)}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Secondary CTA</label>
            <input
              type="text"
              value={data.secondaryCTA}
              onChange={(e) => handleChange("secondaryCTA", e.target.value)}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
