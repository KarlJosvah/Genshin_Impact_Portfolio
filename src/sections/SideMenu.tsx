import { MENU_ITEMS, MenuType } from '../constants/menuConfig.ts';
import MenuButton from '../components/ui/MenuButton.tsx';
import '../styles/SideMenu.css';

interface SideMenuProps {
  activeSection: MenuType;
  onSectionChange: (section: MenuType) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="side-menu-container">
      {MENU_ITEMS.map((item) => (
        <MenuButton
          key={item.id}
          label={item.label}
          isActive={activeSection === item.id}
          onClick={() => onSectionChange(item.id)}
        />
      ))}
    </div>
  );
};

export default SideMenu;
