const WeaponsSection = () => {
  return (
    <div style={{ position: 'absolute', right: '100px', top: '20%', width: '400px' }}>
      <h2>TECH STACK</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ border: '1px solid var(--genshin-accent)', padding: '10px' }}>
          <h3>React</h3>
          <p>5-Star Framework</p>
        </div>
        <div style={{ border: '1px solid var(--genshin-gold)', padding: '10px' }}>
          <h3>TypeScript</h3>
          <p>4-Star Tool</p>
        </div>
      </div>
    </div>
  );
};

export default WeaponsSection;
