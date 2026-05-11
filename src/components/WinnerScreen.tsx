import type { Team } from "../types/game";
import celebrationBlue from "../assets/CelebrationBlue.json";
import celebrationRed from "../assets/CelebrationRed.json";
import { useLottie } from "lottie-react";

interface Props {
    winner: Team;
    onRestart: () => void;
}

export default function WinnerScreen({ winner, onRestart }: Props) {

    const currentAnimData = winner === 'B' ? celebrationRed : celebrationBlue;

    const options = {
        animationData: currentAnimData,
        loop: true
    }

    const { View } = useLottie(options);

    return (
        <div className="screen-card">
            <h1>¡Ganó el equipo {winner}!</h1>
            <p>La partida ha terminado.</p>
            <div style={{ maxWidth: "40%"}}>
                { View }
            </div>
            <button onClick={onRestart}>Volver al menú</button>
        </div>
    )
}
