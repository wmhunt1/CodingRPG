// App.tsx
import './App.css';
import Game from "./Components/GameComponent";

function App() {

    return (
        <div className="app-container"> {/* New class for the main app container */}
            <header className="app-header"> {/* New class for the header */}
                <h1>Coding RPG</h1>
            </header>
            <main className="app-main"> {/* New class for the main content area */}
                <Game />
            </main>
            <footer className="app-footer"> {/* New class for the footer */}
                Coding RPG - 2025
            </footer>
        </div>
    );

}

export default App;