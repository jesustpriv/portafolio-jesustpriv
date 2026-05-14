import React, { useState, useEffect } from "react";
import { getFile, saveFile } from "../../api/githubApi";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

export default function AboutEditor({ repoInfo }) {
  const [data, setData] = useState({ bio: "", skills: [] });
  const [sha, setSha] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const filePath = "src/data/about.json";

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
        "Update About section via Admin Panel"
      );
      setSha(newSha.content.sha);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  const handleAddSkill = () => {
    setData((prev) => ({ ...prev, skills: [...prev.skills, { label: "", icon: "" }] }));
  };

  const handleUpdateSkill = (index, field, value) => {
    const newSkills = [...data.skills];
    newSkills[index][field] = value;
    setData((prev) => ({ ...prev, skills: newSkills }));
  };

  const handleRemoveSkill = (index) => {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-electric-blue" size={32} /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">About Section</h2>
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

      <div className="bg-dark-surface border border-gray-800 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
          <textarea
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            rows={5}
            className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric-blue resize-none"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-400">Skills</label>
            <button onClick={handleAddSkill} className="text-electric-blue hover:text-blue-400 text-sm flex items-center">
              <Plus size={16} className="mr-1" /> Add Skill
            </button>
          </div>
          <div className="space-y-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-3 bg-dark-bg p-3 rounded-lg border border-gray-700">
                <input
                  type="text"
                  placeholder="Skill Label"
                  value={skill.label}
                  onChange={(e) => handleUpdateSkill(index, "label", e.target.value)}
                  className="flex-1 bg-transparent border-none text-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Icon name"
                  value={skill.icon}
                  onChange={(e) => handleUpdateSkill(index, "icon", e.target.value)}
                  className="w-1/3 bg-transparent border-l border-gray-700 pl-3 text-white focus:outline-none"
                />
                <button onClick={() => handleRemoveSkill(index)} className="text-red-400 hover:text-red-500 p-1">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {data.skills.length === 0 && <p className="text-sm text-gray-500 italic">No skills added.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
