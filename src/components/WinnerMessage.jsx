export default function WinnerMessage({ winner }) {
  if (!winner) return null;
  return <h2 className="winner">🏆 {winner} hat gewonnen!</h2>;
}
