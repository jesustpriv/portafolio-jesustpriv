import React, { useState, useEffect } from "react";
import { getFile, saveFile } from "../../api/githubApi";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

export default function ProjectsEditor({ repoInfo }) {
  const [data, setData] = useState({ design: [], photo: [] });
  const [sha, setSha] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const filePath = "src/data/projects.json";

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
      } else {
        setData({ design: [], photo: [] });
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
        "Update Projects via Admin Panel"
      );
      setSha(newSha.content.sha);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  const handleAddImage = (category) => {
    setData((prev) => ({
      ...prev,
      [category]: [...prev[category], ""]
    }));
  };

  const handleUpdateImage = (category, index, value) => {
    const newCategoryArray = [...data[category]];
    newCategoryArray[index] = value;
    setData((prev) => ({ ...prev, [category]: newCategoryArray }));
  };

  const handleRemoveImage = (category, index) => {
    const newCategoryArray = data[category].filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, [category]: newCategoryArray }));
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-electric-blue" size={32} /></div>;
  }

  const renderCategory = (category, title) => (
    <div className="bg-dark-surface border border-gray-800 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <button onClick={() => handleAddImage(category)} className="text-electric-blue text-sm flex items-center hover:text-blue-400">
          <Plus size={16} className="mr-1" /> Add Image
        </button>
      </div>
      <div className="space-y-3">
        {data[category].map((img, index) => (
          <div key={index} className="flex items-center space-x-3 bg-dark-bg p-3 rounded-lg border border-gray-700">
            <input
              type="text"
              placeholder="e.g. assets/design-1.webp"
              value={img}
              onChange={(e) => handleUpdateImage(category, index, e.target.value)}
              className="flex-1 bg-transparent border-none text-white focus:outline-none"
            />
            <button onClick={() => handleRemoveImage(category, index)} className="text-red-400 hover:text-red-500 p-1">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {data[category].length === 0 && <p className="text-sm text-gray-500 italic">No images in this category.</p>}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Projects Section</h2>
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

      {renderCategory("design", "Design Portfolio (assets/design-X.webp)")}
      {renderCategory("photo", "Photography Portfolio (assets/photo-X.webp)")}
    </div>
  );
}
