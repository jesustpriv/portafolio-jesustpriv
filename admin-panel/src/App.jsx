import React, { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

// Editors
import HeroEditor from './components/editors/HeroEditor';
import AboutEditor from './components/editors/AboutEditor';
import ProjectsEditor from './components/editors/ProjectsEditor';
import PlansEditor from './components/editors/PlansEditor';
import ContactEditor from './components/editors/ContactEditor';
import ServicesEditor from './components/editors/ServicesEditor';
import ExperienceEditor from './components/editors/ExperienceEditor';

function App() {
  const [repoInfo, setRepoInfo] = useState(null);
  const [currentSection, setCurrentSection] = useState('hero');

  if (!repoInfo) {
    return <AuthScreen onConnect={setRepoInfo} />;
  }

  const renderEditor = () => {
    switch (currentSection) {
      case 'hero': return <HeroEditor repoInfo={repoInfo} />;
      case 'about': return <AboutEditor repoInfo={repoInfo} />;
      case 'services': return <ServicesEditor repoInfo={repoInfo} />;
      case 'experience': return <ExperienceEditor repoInfo={repoInfo} />;
      case 'projects': return <ProjectsEditor repoInfo={repoInfo} />;
      case 'plans': return <PlansEditor repoInfo={repoInfo} />;
      case 'contact': return <ContactEditor repoInfo={repoInfo} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-dark-bg text-white overflow-hidden">
      <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <div className="flex-1 flex flex-col">
        <TopBar repoInfo={repoInfo} onLogout={() => setRepoInfo(null)} />
        <main className="flex-1 overflow-y-auto p-8">
          {renderEditor()}
        </main>
      </div>
    </div>
  );
}

export default App;
