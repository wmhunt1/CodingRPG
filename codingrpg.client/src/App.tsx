import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from "./Components/GameComponent"; // Changed import to match file name
// Import other components as needed

function App() {

    return (
        <BrowserRouter>
            <div className="app-container"> {/* New class for the main app container */}
                <header className="app-header"> {/* New class for the header */}
                    <h1>Coding RPG</h1>
                </header>
                <main className="app-main"> {/* New class for the main content area */}
                    <Routes>
                        <Route path="/" element={<Game />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </main>
                <footer className="app-footer"> {/* New class for the footer */}
                    Coding RPG - 2025
                </footer>
            </div>
        </BrowserRouter>
    );

}

export default App;