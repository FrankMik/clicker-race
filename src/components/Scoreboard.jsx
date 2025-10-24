export default function Scoreboard({ player, computer, targetScore = 50 }) {
  const playerPercent = Math.min((player / targetScore) * 100, 100);
  const computerPercent = Math.min((computer / targetScore) * 100, 100);

  return (
    <div className="scoreboard">
      <h2>Du: {player}</h2>
      <div className="progress-bar">
        <div
          className="progress player"
          style={{ width: `${playerPercent}%` }}
        ></div>
      </div>

      <h2>Computer: {computer}</h2>
      <div className="progress-bar">
        <div
          className="progress computer"
          style={{ width: `${computerPercent}%` }}
        ></div>
      </div>
    </div>
  );
}
