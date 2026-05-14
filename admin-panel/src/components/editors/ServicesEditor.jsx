import React, { useState, useEffect } from "react";
import { getFile, saveFile } from "../../api/githubApi";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

export default function ServicesEditor({ repoInfo }) {
  const [data, setData] = useState([]);
  const [sha, setSha] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const filePath = "src/data/services.json";

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
        "Update Services section via Admin Panel"
      );
      setSha(newSha.content.sha);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  const handleAddService = () => {
    setData((prev) => [...prev, { title: "", description: "", icon: "fa-check", features: [""], result: "" }]);
  };

  const handleUpdateService = (index, field, value) => {
    const newServices = [...data];
    newServices[index][field] = value;
    setData(newServices);
  };

  const handleRemoveService = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateFeature = (serviceIndex, featureIndex, value) => {
    const newServices = [...data];
    newServices[serviceIndex].features[featureIndex] = value;
    setData(newServices);
  };

  const handleAddFeature = (serviceIndex) => {
    const newServices = [...data];
    newServices[serviceIndex].features.push("");
    setData(newServices);
  };

  const handleRemoveFeature = (serviceIndex, featureIndex) => {
    const newServices = [...data];
    newServices[serviceIndex].features.splice(featureIndex, 1);
    setData(newServices);
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-electric-blue" size={32} /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Services Section</h2>
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

      <div className="space-y-6">
        {data.map((service, sIndex) => (
          <div key={sIndex} className="bg-dark-surface border border-gray-800 rounded-xl p-6 relative">
            <button 
              onClick={() => handleRemoveService(sIndex)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-500"
            >
              <Trash2 size={20} />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Service #{sIndex + 1}</h3>
            
            <div className="grid gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => handleUpdateService(sIndex, "title", e.target.value)}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-electric-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Icon (FontAwesome class)</label>
                <input
                  type="text"
                  value={service.icon}
                  onChange={(e) => handleUpdateService(sIndex, "icon", e.target.value)}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-electric-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea
                  value={service.description}
                  onChange={(e) => handleUpdateService(sIndex, "description", e.target.value)}
                  rows={2}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-electric-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Result (Bottom highlight)</label>
                <input
                  type="text"
                  value={service.result}
                  onChange={(e) => handleUpdateService(sIndex, "result", e.target.value)}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-electric-blue"
                />
              </div>
            </div>

            <div className="mt-4 border-t border-gray-800 pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-400">Features</label>
                <button onClick={() => handleAddFeature(sIndex)} className="text-electric-blue text-sm flex items-center hover:text-blue-400">
                  <Plus size={14} className="mr-1" /> Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {service.features.map((feat, fIndex) => (
                  <div key={fIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => handleUpdateFeature(sIndex, fIndex, e.target.value)}
                      className="flex-1 bg-dark-bg border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-electric-blue"
                    />
                    <button onClick={() => handleRemoveFeature(sIndex, fIndex)} className="text-red-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={handleAddService}
          className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 flex flex-col items-center justify-center hover:border-electric-blue hover:text-electric-blue transition-colors"
        >
          <Plus size={24} className="mb-2" />
          <span className="font-medium">Add New Service</span>
        </button>
      </div>
    </div>
  );
}
