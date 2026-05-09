import AttributeRow from '../components/ui/AttributeRow.tsx';
import '../styles/AttributesSection.css';

const ShurikenStar = ({ size = 25 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" className="shuriken-star">
    <path d="M12 2L14 8.5 Q14.5 9.5 15.5 10 L22 12 L15.5 14 Q14.5 14.5 14 15.5 L12 22 L10 15.5 Q9.5 14.5 8.5 14 L2 12 L8.5 10 Q9.5 9.5 10 8.5 Z" />
  </svg>
);

const HP_Icon = () => (
  <img src="/assets/svg/water-droplet.svg" alt="HP" style={{ width: '32px', height: '40px', filter: 'brightness(0) invert(1)' }} />
);

const AttributesSection = () => {
  return (
    <div className="sidebar-right">
      <h1 className="character-name">Albedo</h1>

      <div className="attributes-header">
        <div className="stars-container">
          {[1, 2, 3, 4, 5, 6].map(i => <ShurikenStar key={i} />)}
        </div>

        <button className="constellation-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
          </svg>
        </button>
      </div>

      <div className="level-info">
        <div className="level-text">
          Level 90 <span className="level-cap">/ 90</span>
        </div>
        <div className="level-bar-bg level-bar-container">
          <div className="level-bar-fill" style={{ width: '100%' }}></div>
        </div>
      </div>

      <div className="stats-list">
        <AttributeRow label="Max HP" value="24,219" icon={<HP_Icon />} />
        <AttributeRow label="ATK" value="1,145" icon={<HP_Icon />} />
        <AttributeRow label="DEF" value="2,632" icon={<HP_Icon />} />
        <AttributeRow label="Elemental Mastery" value="0" icon={<HP_Icon />} />
        <AttributeRow label="Max Stamina" value="240" icon={<HP_Icon />} />
      </div>

      <button className="details-btn">Details</button>

      <div className="friendship-info">
        <span className="friendship-label">
          <span className="friendship-heart">♥</span> Friendship
        </span>
        <span style={{ fontWeight: 'bold' }}>10</span>
      </div>
      <div className="friendship-bar" style={{ marginBottom: '20px' }}>
        <div className="friendship-progress"></div>
      </div>

      <div className="description-container">
        <p className="description-text">
          A genius known as the Kreideprinz, he is the Chief Alchemist and Captain of the Investigation Team of the Knights of Favonius.
        </p>
      </div>
    </div>
  );
};


export default AttributesSection;


