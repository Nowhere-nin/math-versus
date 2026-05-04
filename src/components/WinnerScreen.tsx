import type { Team } from "../types/game";

interface Props {
    winner: Team;
    onRestart: () => void;
}

export default function WinnerScreen({ winner, onRestart }: Props) {
    return (
        <div className="screen-card">
            <h1>¡Ganó el equipo {winner}!</h1>
            <p>La partida ha terminado.</p>

            <button onClick={onRestart}>Volver al menú</button>
        </div>
    )
}
