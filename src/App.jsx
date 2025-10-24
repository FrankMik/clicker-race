import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import GameButton from "./components/Buttons.jsx";
import WinnerMessage from "./components/WinnerMessage.jsx";
import useGameLogic from "./hooks/GameLogic.js";
const beepSound = new Audio("/sounds/beep.mp3");
const goSound = new Audio("/sounds/go.mp3");
const victorySound = new Audio("/sounds/victory.mp3");



export default function App() {
  const {
    playerScore,
    computerScore,
    gameActive,
    winner,
    timeLeft,
    handlePlayerClick,
    startGame,
    countdown
  } = useGameLogic(50, 200, 10); 

  const [clickEffects, setClickEffects] = useState([]);

  useEffect(() => {
    if (!countdown) return;

    if (countdown === "Los!") {
      goSound.play().catch(() => {});
    } else {
      beepSound.play().catch(() => {});
    }
  }, [countdown]);

  useEffect(() => {
  if (!winner) return;

  victorySound.play().catch(() => {});
}, [winner]);


  const addClickEffect = () => {
  const id = Date.now();
  const x = Math.random() * 80 + 10; 
  const y = Math.random() * 50 + 10; 
  setClickEffects(prev => [...prev, { id, x, y }]);
  setTimeout(() => {
    setClickEffects(prev => prev.filter(effect => effect.id !== id));
  }, 800); 
}

const handlePlayerClickWithEffect = () => {
  handlePlayerClick(); 
  addClickEffect();    
};

  return (
    <div className="app">
      <Header />

      <h3>⏱ Zeit: {timeLeft}s</h3>

      {countdown && (
        <div className="countdown">
          <h2 className={countdown === "Los!" ? "los" : ""}>{countdown}</h2>
        </div>
      )}

      <Scoreboard 
      player={playerScore} 
      computer={computerScore} 
      targetScore={50} 
      />

      {clickEffects.map(effect => (
        <span
          key={effect.id}
          className="click-emoji"
          style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
        >
          ✨
        </span>
      ))}

      <WinnerMessage winner={winner} />

      <GameButton
        gameActive={gameActive}
        winner={winner}
        onClick={handlePlayerClickWithEffect}
        onStart={startGame}
      />
      

    </div>
  );
}
