import '../StyleSheets/GameStyle.css';

interface SettingsProps {
    back: () => void;
}
function Settings({back}:SettingsProps) {
  return (
      <div id="Settings" className="game-layout-grid">
          <div className="toolbar">
              <h2>Settings</h2>
          </div>
          <div className="game-content-left">
          </div>
          <div className="game-content-main">
          </div>
          <div className="area-options">
              <button className='area-button' onClick={() => back()}>Back</button>
          </div>
          <div className="game-content-bottom">
              <h3>Placeholder</h3>
              <p>Placeholder for Bottom Panel</p>
          </div>
      </div>
  );
}

export default Settings;