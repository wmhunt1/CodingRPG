import { hero } from "../Models/Character";
import './Game.css';
import "../Scripts/gameScripts";

const newHero = new hero("Hero")
function Game() {
    return (
        <div id="game">
            <div id="stats">
                <span className="stat">Name: <strong><span id="xpText">{newHero.name}</span></strong></span>
                <span className="stat">XP: <strong><span id="xpText">{newHero.currentXP}/{newHero.maxXP}</span></strong></span>
                <span className="stat">Health: <strong><span id="healthText">{newHero.currentHP}/{newHero.maxHP}</span></strong></span>
                <span className="stat">Gold: <strong><span id="goldText">{newHero.gold}</span></strong></span>
            </div>
            <div id="controls">
                <button id="button1">Go to store</button>
                <button id="button2">Go to cave</button>
                <button id="button3">Fight dragon</button>
            </div>
            <div id="monsterStats">
                <span className="stat">Monster Name: <strong><span id="monsterName"></span></strong></span>
                <span className="stat">Health: <strong><span id="monsterHealth"></span></strong></span>
            </div>
            <div id="text">
                Welcome to Coding RPG.
            </div>
        </div>
    );
}

export default Game;