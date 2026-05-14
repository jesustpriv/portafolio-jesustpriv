import React from "react";
import { LayoutDashboard, User, FolderGit2, CreditCard, Mail, Briefcase, FileText } from "lucide-react";

export default function Sidebar({ currentSection, setCurrentSection }) {
  const sections = [
    { id: "hero", label: "Hero", icon: <LayoutDashboard size={20} /> },
    { id: "about", label: "About", icon: <User size={20} /> },
    { id: "services", label: "Services", icon: <Briefcase size={20} /> },
    { id: "experience", label: "Experience", icon: <FileText size={20} /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 size={20} /> },
    { id: "plans", label: "Plans", icon: <CreditCard size={20} /> },
    { id: "contact", label: "Contact", icon: <Mail size={20} /> },
  ];

  return (
    <aside className="w-64 bg-dark-surface border-r border-gray-800 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white tracking-wider">
          ADMIN<span className="text-electric-blue">.PANEL</span>
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === section.id
                ? "bg-electric-blue text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {section.icon}
            <span className="font-medium">{section.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
