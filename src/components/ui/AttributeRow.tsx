interface AttributeRowProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const AttributeRow: React.FC<AttributeRowProps> = ({ label, value, icon }) => {
  return (
    <div className="attribute-row">
      <div className="attribute-label-container">
        {icon && <span className="attribute-icon">{icon}</span>}
        <span>{label}</span>
      </div>
      <span className="attribute-value">{value}</span>
    </div>
  );
};


export default AttributeRow;
