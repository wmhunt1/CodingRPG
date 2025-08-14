import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from "./Components/GameComponent"; // Changed import to match file name
// Import other components as needed
//import { useEffect, useState } from 'react';

//interface Forecast {
//    date: string;
//    temperatureC: number;
//    temperatureF: number;
//    summary: string;
//}
function App() {
    //const [forecasts, setForecasts] = useState<Forecast[]>();
    //useEffect(() => {
    //    populateWeatherData();
    //}, []);
    //const contents = forecasts === undefined
    //    ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    //    : <table className="table table-striped" aria-labelledby="tableLabel">
    //        <thead>
    //            <tr>
    //                <th>Date</th>
    //                <th>Temp. (C)</th>
    //                <th>Temp. (F)</th>
    //                <th>Summary</th>
    //            </tr>
    //        </thead>
    //        <tbody>
    //            {forecasts.map(forecast =>
    //                <tr key={forecast.date}>
    //                    <td>{forecast.date}</td>
    //                    <td>{forecast.temperatureC}</td>
    //                    <td>{forecast.temperatureF}</td>
    //                    <td>{forecast.summary}</td>
    //                </tr>
    //            )}
    //        </tbody>
    //    </table>;
    //console.log(forecasts);
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
                 {/*   {contents}*/}
                </footer>
            </div>
        </BrowserRouter>
    );
    //async function populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    if (response.ok) {
    //        const data = await response.json();
    //        setForecasts(data);
    //    }
    //}

}

export default App;