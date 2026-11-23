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
    time: number;
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
    time,
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
        <div className="screen-card start-card">
            <h1>Matemáticas</h1>
            <p>Configura la partida</p>

            <div className="setting-group">

                {/* Modo duelo */}
                <div className="setting-row">
                    <div className="checkbox-wrapper-2">
                        <input
                            type="checkbox"
                            id="duel-toggle"
                            checked={duelMode}
                            className="sc-gJwTLC ikxBAC"
                            onChange={(e) => onDuelModeChange(e.target.checked)}
                        />
                    </div>
                    <div className="setting-text">
                        <label htmlFor="duel-toggle">Modo duelo</label>
                        <small className="hint">Cada equipo responde preguntas de su propio curso</small>
                    </div>
                </div>

                {/* Cursos */}
                <div className="grade-row">
                    <div className={duelMode ? "grade-field grade-field-a" : "grade-field"}>
                        <label htmlFor="grade-a">{duelMode ? "Equipo A (azul)" : "Curso"}</label>
                        <select
                            id="grade-a"
                            value={gradeLevel}
                            onChange={(e) => onGradeLevelChange(e.target.value as GradeLevel)}
                        >
                            {GRADES.map((g) => (
                                <option key={g.value} value={g.value}>{g.label}</option>
                            ))}
                        </select>
                    </div>

                    {duelMode && (
                        <div className="grade-field grade-field-b">
                            <label htmlFor="grade-b">Equipo B (rojo)</label>
                            <select
                                id="grade-b"
                                value={gradeLevelB}
                                onChange={(e) => onGradeLevelBChange(e.target.value as GradeLevel)}
                            >
                                {GRADES.map((g) => (
                                    <option key={g.value} value={g.value}>{g.label}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Tiempo limitado */}
                <div className="setting-row">
                    <div className="checkbox-wrapper-2">
                        <input
                            type="checkbox"
                            id="timer-toggle"
                            checked={useTimer}
                            className="sc-gJwTLC ikxBAC"
                            onChange={(e) => onTimerChange(e.target.checked)}
                        />
                    </div>
                    <div className="setting-text">
                        <label htmlFor="timer-toggle">Tiempo limitado</label>
                        <small className="hint">Si se acaba el tiempo, se salta la pregunta</small>
                    </div>
                </div>

                {useTimer && (
                    <div className="setting-row setting-sub">
                        <label htmlFor="time-duration">Segundos por pregunta (5 a 60):</label>
                        <input
                            className="time-input"
                            type="number"
                            min="5"
                            max="60"
                            id="time-duration"
                            placeholder="5"
                            defaultValue={time}
                            onChange={(e) => handleTimeChange(e.target.value)}
                        />
                    </div>
                )}

                {/* Por turnos */}
                <div className="setting-row">
                    <div className="checkbox-wrapper-2">
                        <input
                            type="checkbox"
                            id="shift-toggle"
                            checked={shift && !duelMode}
                            disabled={duelMode}
                            className="sc-gJwTLC ikxBAC"
                            onChange={(e) => onShiftChange(e.target.checked)}
                        />
                    </div>
                    <div className="setting-text">
                        <label htmlFor="shift-toggle">Por turnos</label>
                        <small className="hint">
                            {duelMode ? "No disponible en modo duelo" : "Los equipos se alternan para responder"}
                        </small>
                    </div>
                </div>

                {/* Dispositivos externos */}
                <div className="setting-row">
                    <div className="checkbox-wrapper-2">
                        <input
                            type="checkbox"
                            id="web-toggle"
                            checked={useWebControllers}
                            className="sc-gJwTLC ikxBAC"
                            onChange={(e) => setWebControllers(e.target.checked)}
                        />
                    </div>
                    <div className="setting-text">
                        <label htmlFor="web-toggle">Usar dispositivos externos</label>
                        <small className="hint">Los jugadores responden desde tablets o celulares</small>
                    </div>
                </div>
            </div>

            <button className="start-btn" onClick={onStart}>Comenzar partida</button>
        </div>
    )
}
