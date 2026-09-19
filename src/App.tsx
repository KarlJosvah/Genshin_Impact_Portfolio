import { useState } from 'react';
import Scene from './components/three/Scene.tsx';
import SideMenu from './sections/SideMenu.tsx';
import CharacterHeader from './sections/CharacterHeader.tsx';
import { MenuType } from './constants/menuConfig.ts';
import AttributesSection from './sections/AttributesSection.tsx';
import WeaponsSection from './sections/WeaponsSection.tsx';
import TalentsSection from './sections/TalentsSection.tsx';
import ConstellationSection from './sections/ConstellationSection.tsx';
import './styles/main.css';
import './styles/genshinTheme.css';

function App() {
  const [activeSection, setActiveSection] = useState<MenuType>(MenuType.Attributes);
  const [isWeaponSelectionOpen, setIsWeaponSelectionOpen] = useState(false);

  const handleSectionChange = (section: MenuType) => {
    setActiveSection(section);
    setIsWeaponSelectionOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case MenuType.Attributes:
        return <AttributesSection />;
      case MenuType.Weapons:
        return (
          <WeaponsSection
            isSelectionOpen={isWeaponSelectionOpen}
            setIsSelectionOpen={setIsWeaponSelectionOpen}
          />
        );
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
      <Scene isWeaponSelectionOpen={isWeaponSelectionOpen} />
      <SideMenu activeSection={activeSection} onSectionChange={handleSectionChange} />
      {renderSection()}
    </div>
  );
}

export default App;
