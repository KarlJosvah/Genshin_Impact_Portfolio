interface MenuButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <div
      className={`menu-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};


export default MenuButton;
