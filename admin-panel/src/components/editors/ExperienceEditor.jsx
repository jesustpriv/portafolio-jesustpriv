import React, { useState, useEffect } from "react";
import { getFile, saveFile } from "../../api/githubApi";
import { Loader2, Save, Plus, Trash2, GripVertical } from "lucide-react";

export default function ExperienceEditor({ repoInfo }) {
  const [data, setData] = useState([]);
  const [sha, setSha] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const filePath = "src/data/experience.json";

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
        "Update Experience section via Admin Panel"
      );
      setSha(newSha.content.sha);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  const handleAddExp = () => {
    setData((prev) => [...prev, { period: "", role: "", company: "", description: "" }]);
  };

  const handleUpdateExp = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleRemoveExp = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-electric-blue" size={32} /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Experience Section</h2>
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

      <div className="space-y-4">
        {data.map((exp, index) => (
          <div key={index} className="bg-dark-surface border border-gray-800 rounded-xl p-6 relative flex gap-4">
            <div className="pt-2 text-gray-500">
              <GripVertical size={20} />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Period (e.g. 2024)</label>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => handleUpdateExp(index, "period", e.target.value)}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-electric-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleUpdateExp(index, "company", e.target.value)}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-electric-blue"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleUpdateExp(index, "role", e.target.value)}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-electric-blue"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleUpdateExp(index, "description", e.target.value)}
                  rows={2}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-electric-blue"
                />
              </div>
            </div>
            <button 
              onClick={() => handleRemoveExp(index)}
              className="text-red-400 hover:text-red-500 self-start mt-2"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        
        <button
          onClick={handleAddExp}
          className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 flex flex-col items-center justify-center hover:border-electric-blue hover:text-electric-blue transition-colors"
        >
          <Plus size={24} className="mb-2" />
          <span className="font-medium">Add New Experience Item</span>
        </button>
      </div>
    </div>
  );
}
