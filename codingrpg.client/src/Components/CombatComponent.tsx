import '../StyleSheets/GameStyle.css';

function CombatComponent() {
  return (
      <div id="monsterStats">
          <span className="stat">Monster Name: <strong><span>{monster.name}</span></strong></span>
          <span className="stat">Health: <strong><span>{monster.currentHP}</span></strong></span>
      </div>
  );
}

export default CombatComponent;