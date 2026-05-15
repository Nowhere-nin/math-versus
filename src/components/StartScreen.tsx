import type { GradeLevel } from "../types/game";

interface Props {
    gradeLevel: GradeLevel;
    onGradeLevelChange: (grade: GradeLevel) => void;

    useTimer: boolean;
    onTimerChange: (value: boolean) => void;

    onStart: () => void;
    onTimeChange: (value: number) => void;
}

export default function StartScreen({
    gradeLevel,
    onGradeLevelChange,
    useTimer,
    onTimerChange,
    onStart,
    onTimeChange,
}: Props ) {
    return (
        <div className="screen-card">
            <h1>Matemáticas</h1>
            <p>Selecciona el curso para comenzar</p>

            <select
                value={gradeLevel}
                onChange={(e) =>
                onGradeLevelChange(e.target.value as GradeLevel)
                }
            >
                <option value="1-basic">1° Básico</option>
                <option value="2-basic">2° Básico</option>
                <option value="3-basic">3° Básico</option>
                <option value="4-basic">4° Básico</option>
                <option value="5-basic">5° Básico</option>
                <option value="6-basic">6° Básico</option>
                <option value="7-basic">7° Básico</option>
                <option value="8-basic">8° Básico</option>
            </select>

            <div>
                <div className="checkbox-wrapper-2">
                    <input type="checkbox" id="timer-toggle" checked={useTimer} className="sc-gJwTLC ikxBAC" onChange={ (e) => onTimerChange(e.target.checked) }/>
                </div>
                <label htmlFor="timer-toggle">¿Activar tiempo limitado? (mínimo 15s)</label>
            </div>
            <input
                type="number"
                min="15"
                max="60"
                id="time-duration"
                placeholder="15"
                onChange={ (e) => onTimeChange( parseInt(e.target.value) ) }
                disabled={!useTimer}
            />

            <button onClick={onStart}>Comenzar partida</button>
        </div>
    )
}