import { useState, useEffect } from "react";

export default function useGameLogic(targetScore = 50, computerInterval = 200, gameTime = 10) {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [winner, setWinner] = useState(null);
  const [timeLeft, setTimeLeft] = useState(gameTime); 
  const [countdown, setCountdown] = useState(null);
  const [countingDown, setCountingDown] = useState(false);
  const [computerCanClick, setComputerCanClick] = useState(false);

  // Computer 
  useEffect(() => {
    if (gameActive && computerCanClick) {
      const interval = setInterval(() => {
        setComputerScore(prev => prev + 1);
      }, computerInterval);
      return () => clearInterval(interval);
    }
  }, [gameActive, computerInterval, computerCanClick]);

  // Countdown-Timer
 useEffect(() => {
  if (!gameActive) return;

  if (timeLeft <= 0) {     // Zeit vorbei → Gewinner bestimmen
    if (playerScore > computerScore) setWinner("Du");
    else if (computerScore > playerScore) setWinner("Computer");
    else setWinner("Unentschieden");

    setGameActive(false);
    setComputerCanClick(false);
    return;
  }

  const timer = setTimeout(() => {
    setTimeLeft(prev => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [gameActive, timeLeft]); 

  // Siegbedingung durch Punkte
  useEffect(() => {
    if (playerScore >= targetScore) {
      setWinner("Du");
      setGameActive(false);
      setComputerCanClick(false);
    } else if (computerScore >= targetScore) {
      setWinner("Computer");
      setGameActive(false);
      setComputerCanClick(false);
    }
  }, [playerScore, computerScore, targetScore]);

  const handlePlayerClick = () => {
    if (gameActive) setPlayerScore(prev => prev + 1);
  }

  const startGame = () => {
    if (countingDown) return;
    setPlayerScore(0);
    setComputerScore(0);
    setWinner(null);
    setTimeLeft(gameTime);
    setGameActive(false);
    setComputerCanClick(false);
    setCountingDown(true);
 
    let count = 3;
        setCountdown(count);
        const interval = setInterval(() => {
        count--;
        if (count > 0) {
            setCountdown(count);
        } else {
            clearInterval(interval);
            setCountdown("Los!");
            setTimeout(() => {
            setCountdown(null);
            setCountingDown(false);
            setGameActive(true);
            setTimeout(() => setComputerCanClick(true), 1000);
            }, 800);
        }
        }, 1000);
    }

  return {
    playerScore,
    computerScore,
    gameActive,
    winner,
    timeLeft,
    handlePlayerClick,
    startGame,
    countdown
  }
}
