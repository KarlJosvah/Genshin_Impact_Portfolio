import { useState } from 'react';
import Scene from './components/three/Scene.tsx';
import SideMenu from './sections/SideMenu.tsx';
import CharacterHeader from './sections/CharacterHeader.tsx';
import { MenuType } from './constants/menuConfig.ts';
import AttributesSection from './sections/AttributesSection.tsx';
import WeaponsSection from './sections/WeaponsSection.tsx';
import TalentsSection from './sections/TalentsSection.tsx';
import ConstellationSection from './sections/ConstellationSection.tsx';
import { EQUIPPED_WEAPON, type WeaponItemData } from './constants/weapons.ts';
import './styles/main.css';
import './styles/genshinTheme.css';

function App() {
  const [activeSection, setActiveSection] = useState<MenuType>(MenuType.Attributes);
  const [isWeaponSelectionOpen, setIsWeaponSelectionOpen] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponItemData>(EQUIPPED_WEAPON);

  const isWeaponSectionActive = activeSection === MenuType.Weapons;

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
            selectedWeapon={selectedWeapon}
            onSelectWeapon={setSelectedWeapon}
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
      {!isWeaponSelectionOpen && <CharacterHeader />}
      <Scene
        isWeaponSectionActive={isWeaponSectionActive}
        selectedWeaponUrl={selectedWeapon.svgPath}
      />
      <SideMenu activeSection={activeSection} onSectionChange={handleSectionChange} />
      {renderSection()}
    </div>
  );
}

export default App;
