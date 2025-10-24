export default function GameButton({ gameActive, winner, onClick, onStart }) {
  if (winner)
    return (
      <button className="button" onClick={onStart}>
        Nochmal spielen
      </button>
    );

  if (!gameActive)
    return (
      <button className="button" onClick={onStart}>
        Start
      </button>
    );

  return (
    <button className="button click" onClick={onClick}>
      Klick mich!
    </button>
  );
}
