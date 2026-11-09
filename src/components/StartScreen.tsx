import type { GradeLevel } from "../types/game";

const GRADES: { value: GradeLevel; label: string }[] = [
    { value: "1-basic", label: "1° Básico" },
    { value: "2-basic", label: "2° Básico" },
    { value: "3-basic", label: "3° Básico" },
    { value: "4-basic", label: "4° Básico" },
    { value: "5-basic", label: "5° Básico" },
    { value: "6-basic", label: "6° Básico" },
    { value: "7-basic", label: "7° Básico" },
    { value: "8-basic", label: "8° Básico" },
];

interface Props {
    gradeLevel: GradeLevel;
    onGradeLevelChange: (grade: GradeLevel) => void;

    gradeLevelB: GradeLevel;
    onGradeLevelBChange: (grade: GradeLevel) => void;
    duelMode: boolean;
    onDuelModeChange: (value: boolean) => void;

    useTimer: boolean;
    onTimerChange: (value: boolean) => void;

    onStart: () => void;
    onTimeChange: (value: number) => void;
    shift: boolean;
    onShiftChange: (value:boolean) => void;

    useWebControllers: boolean;
    setWebControllers: (value:boolean) => void;
}

export default function StartScreen({
    gradeLevel,
    onGradeLevelChange,
    gradeLevelB,
    onGradeLevelBChange,
    duelMode,
    onDuelModeChange,
    useTimer,
    onTimerChange,
    onStart,
    onTimeChange,
    shift,
    onShiftChange,
    useWebControllers,
    setWebControllers,
}: Props ) {

    // Mantiene el tiempo siempre entre 5 y 60 (y evita NaN si el campo queda vacío)
    const handleTimeChange = (raw: string) => {
        const parsed = parseInt(raw);
        if (isNaN(parsed)) {
            onTimeChange(5);
            return;
        }
        onTimeChange(Math.min(60, Math.max(5, parsed)));
    };

    return (
        <div className="screen-card">
            <h1>Matemáticas</h1>
            <p>Selecciona el curso para comenzar</p>

            <div>
                <div className="checkbox-wrapper-2">
                    <input
                        type="checkbox"
                        id="duel-toggle"
                        checked={duelMode}
                        className="sc-gJwTLC ikxBAC"
                        onChange={(e) => onDuelModeChange(e.target.checked)}
                    />
                </div>
                <label htmlFor="duel-toggle">¿Modo duelo? (cada equipo con su curso)</label>
            </div>

            <label htmlFor="grade-a">{duelMode ? "Equipo A (azul):" : "Curso:"}</label>
            <select
                id="grade-a"
                value={gradeLevel}
                onChange={(e) => onGradeLevelChange(e.target.value as GradeLevel)}
            >
                {GRADES.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                ))}
            </select>

            {duelMode && (
                <>
                    <label htmlFor="grade-b">Equipo B (rojo):</label>
                    <select
                        id="grade-b"
                        value={gradeLevelB}
                        onChange={(e) => onGradeLevelBChange(e.target.value as GradeLevel)}
                    >
                        {GRADES.map((g) => (
                            <option key={g.value} value={g.value}>{g.label}</option>
                        ))}
                    </select>
                </>
            )}

            <div>
                <div className="checkbox-wrapper-2">
                    <input type="checkbox" id="timer-toggle" checked={useTimer} className="sc-gJwTLC ikxBAC" onChange={ (e) => onTimerChange(e.target.checked) }/>
                </div>
                <label htmlFor="timer-toggle">¿Activar tiempo limitado? (mínimo 5s - máximo 60s)</label>
            </div>
            <input
                type="number"
                min="5"
                max="60"
                id="time-duration"
                placeholder="5"
                onChange={ (e) => handleTimeChange(e.target.value) }
                disabled={!useTimer}
            />

            <div>
                <div className="checkbox-wrapper-2">
                    <input
                        type="checkbox"
                        id="shift-toggle"
                        checked={shift && !duelMode}
                        disabled={duelMode}
                        className="sc-gJwTLC ikxBAC"
                        onChange={ (e) => onShiftChange(e.target.checked) }
                    />
                </div>
                <label htmlFor="shift-toggle">¿Por turnos? {duelMode && "(no disponible en duelo)"}</label>
            </div>

            <div>
                <div className="checkbox-wrapper-2">
                    <input type="checkbox" id="web-toggle" checked={useWebControllers} className="sc-gJwTLC ikxBAC" onChange={ (e) => setWebControllers(e.target.checked) }/>
                </div>
                <label htmlFor="web-toggle">¿Usar dispositivos externos?</label>
            </div>

            <button onClick={onStart}>Comenzar partida</button>
        </div>
    )
}
