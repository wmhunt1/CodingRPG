import '../StyleSheets/GameStyle.css';

interface SettingsProps {
    back: () => void;
}
function Settings({back}:SettingsProps) {
  return (
      <div className="settings">
          <h2>Settings</h2>
          <button className="menu-button" onClick={back}>
              Back
          </button>
      </div>
  );
}

export default Settings;