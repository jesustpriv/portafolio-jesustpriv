import React, { useState, useEffect } from "react";
import { getFile, saveFile } from "../../api/githubApi";
import { Loader2, Save, Plus, Trash2, Edit2 } from "lucide-react";

export default function PlansEditor({ repoInfo }) {
  const [plans, setPlans] = useState([]);
  const [sha, setSha] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const filePath = "src/data/plans.json";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setStatus("loading");
    try {
      const { content, sha } = await getFile(repoInfo.token, repoInfo.owner, repoInfo.repo, filePath);
      if (content) {
        setPlans(JSON.parse(content));
        setSha(sha);
      } else {
        setPlans([]);
      }
      setStatus("idle");
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  const handleSave = async (plansToSave) => {
    setStatus("saving");
    setErrorMessage("");
    try {
      const newSha = await saveFile(
        repoInfo.token,
        repoInfo.owner,
        repoInfo.repo,
        filePath,
        JSON.stringify(plansToSave || plans, null, 2),
        sha,
        "Update Plans via Admin Panel"
      );
      setSha(newSha.content.sha);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  const handleAdd = () => {
    const newPlan = {
      id: plans.length ? Math.max(...plans.map((p) => p.id)) + 1 : 1,
      name: "",
      price: "",
      target: "",
      includesLabel: "",
      includes: [""],
      excludes: [],
      delivery: "",
      highlighted: false,
      highlightText: ""
    };
    setEditingId(newPlan.id);
    setEditForm(newPlan);
  };

  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setEditForm({ 
      ...plan,
      includes: plan.includes || [],
      excludes: plan.excludes || [],
      includesLabel: plan.includesLabel || "",
      highlightText: plan.highlightText || ""
    });
  };

  const handleDelete = (id) => {
    if (confirm("Delete this plan?")) {
      const newPlans = plans.filter(p => p.id !== id);
      setPlans(newPlans);
      handleSave(newPlans);
    }
  };

  const saveEdit = () => {
    const isNew = !plans.some(p => p.id === editForm.id);
    let newPlans;
    if (isNew) {
      newPlans = [...plans, editForm];
    } else {
      newPlans = plans.map(p => p.id === editForm.id ? editForm : p);
    }
    setPlans(newPlans);
    setEditingId(null);
    setEditForm(null);
    handleSave(newPlans);
  };

  const handleListChange = (listName, index, value) => {
    const newList = [...editForm[listName]];
    newList[index] = value;
    setEditForm({ ...editForm, [listName]: newList });
  };

  const addListItem = (listName) => {
    setEditForm({ ...editForm, [listName]: [...(editForm[listName] || []), ""] });
  };

  const removeListItem = (listName, index) => {
    setEditForm({ ...editForm, [listName]: editForm[listName].filter((_, i) => i !== index) });
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-electric-blue" size={32} /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Plans Section</h2>
        <div className="flex items-center space-x-4">
          {status === "success" && <span className="text-sm text-green-400">✓ Saved — deploy triggered</span>}
          {status === "error" && <span className="text-sm text-red-400">✗ Error: {errorMessage}</span>}
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-electric-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Add Plan</span>
          </button>
        </div>
      </div>

      {editingId ? (
        <div className="bg-dark-surface border border-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-medium text-white mb-4">Edit Plan</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name (e.g. Plan 01 — Identidad Esencial)</label>
              <input type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Price (e.g. Desde $120)</label>
              <input type="text" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">Target Audience / Description</label>
              <input type="text" value={editForm.target} onChange={e => setEditForm({ ...editForm, target: e.target.value })} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Delivery Time (e.g. 7–10 días hábiles)</label>
              <input type="text" value={editForm.delivery} onChange={e => setEditForm({ ...editForm, delivery: e.target.value })} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Includes Label (Optional prefix text)</label>
              <input type="text" value={editForm.includesLabel} onChange={e => setEditForm({ ...editForm, includesLabel: e.target.value })} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="Incluye todo del Plan 01, más:" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-400">Includes</label>
                <button onClick={() => addListItem("includes")} className="text-electric-blue text-sm hover:underline">Add</button>
              </div>
              <div className="space-y-2">
                {(editForm.includes || []).map((f, i) => (
                  <div key={i} className="flex space-x-2">
                    <input type="text" value={f} onChange={e => handleListChange("includes", i, e.target.value)} className="flex-1 bg-dark-bg border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white" />
                    <button onClick={() => removeListItem("includes", i)} className="text-red-400 p-2"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-400">Excludes</label>
                <button onClick={() => addListItem("excludes")} className="text-red-400 text-sm hover:underline">Add</button>
              </div>
              <div className="space-y-2">
                {(editForm.excludes || []).map((f, i) => (
                  <div key={i} className="flex space-x-2">
                    <input type="text" value={f} onChange={e => handleListChange("excludes", i, e.target.value)} className="flex-1 bg-dark-bg border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white" />
                    <button onClick={() => removeListItem("excludes", i)} className="text-red-400 p-2"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={editForm.highlighted} onChange={e => setEditForm({ ...editForm, highlighted: e.target.checked })} className="w-4 h-4 text-electric-blue rounded bg-dark-bg border-gray-700" />
              <label className="text-sm font-medium text-gray-400">Highlight</label>
            </div>
            {editForm.highlighted && (
              <div className="flex-1">
                <input type="text" value={editForm.highlightText} onChange={e => setEditForm({ ...editForm, highlightText: e.target.value })} className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-sm text-white" placeholder="Highlight Text (e.g. Más elegido)" />
              </div>
            )}
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button onClick={saveEdit} disabled={status === "saving"} className="bg-electric-blue text-white px-6 py-2 rounded-lg text-sm font-medium">Save Item</button>
            <button onClick={() => setEditingId(null)} className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.id} className={`bg-dark-surface border ${plan.highlighted ? "border-electric-blue" : "border-gray-800"} rounded-xl p-6 flex flex-col justify-between relative`}>
              {plan.highlighted && <div className="absolute top-0 right-0 bg-electric-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">{plan.highlightText}</div>}
              <div>
                <h3 className="font-bold text-white text-xl pr-16">{plan.name || "Untitled"}</h3>
                <p className="text-3xl font-bold text-electric-blue my-3">{plan.price}</p>
                <p className="text-xs text-gray-400 mb-4">{plan.target}</p>
                
                {plan.includesLabel && <p className="text-sm font-medium text-white mb-2">{plan.includesLabel}</p>}
                <ul className="text-sm text-gray-300 space-y-2 mb-6">
                  {plan.includes.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-electric-blue mt-1">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.includes.length > 4 && <li className="text-gray-500 italic">+ {plan.includes.length - 4} more</li>}
                </ul>
              </div>
              <div className="flex space-x-2 border-t border-gray-800 pt-4 mt-auto">
                <button onClick={() => handleEdit(plan)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm flex justify-center items-center"><Edit2 size={14} className="mr-2"/> Edit</button>
                <button onClick={() => handleDelete(plan.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3 py-2 rounded-lg flex justify-center items-center"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
          {plans.length === 0 && <p className="col-span-3 text-center text-gray-500 py-10">No plans found. Add one!</p>}
        </div>
      )}
    </div>
  );
}
