import '../StyleSheets/GameStyle.css';

interface LoadGameProps {
    back: () => void
}
function LoadGame({back }:LoadGameProps) {
  return (
      <div className="menu" id="LoadGame">
          <h2>Saves</h2>
          <button className="menu-button" onClick={back}>
              Back
          </button>
      </div>
  );
}

export default LoadGame;