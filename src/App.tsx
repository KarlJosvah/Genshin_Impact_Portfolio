import { useState } from 'react';
import Scene from './components/three/Scene.tsx';
import SideMenu from './components/ui/SideMenu.tsx';
import CharacterHeader from './components/ui/CharacterHeader.tsx';
import { MenuType } from './constants/menuConfig.ts';
import AttributesSection from './sections/AttributesSection.tsx';
import WeaponsSection from './sections/WeaponsSection.tsx';
import TalentsSection from './sections/TalentsSection.tsx';
import ConstellationSection from './sections/ConstellationSection.tsx';
import './styles/main.css';
import './styles/genshinTheme.css';

function App() {
  const [activeSection, setActiveSection] = useState<MenuType>(MenuType.Attributes);

  const renderSection = () => {
    switch (activeSection) {
      case MenuType.Attributes:
        return <AttributesSection />;
      case MenuType.Weapons:
        return <WeaponsSection />;
      case MenuType.Talents:
        return <TalentsSection />;
      case MenuType.Constellation:
        return <ConstellationSection />;
      default:
        return <AttributesSection />;
    }
  };

  return (
    <div className="genshin-container">
      <CharacterHeader />
      <Scene />
      <SideMenu activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderSection()}
    </div>
  );
}

export default App;
