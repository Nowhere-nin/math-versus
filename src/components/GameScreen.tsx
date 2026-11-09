import { useEffect, useRef, useState } from "react";
import Calculator from "./Calculator";
import QuestionDisplay from "./QuestionDisplay";
import { ScoreBar } from "./ScoreBar";
import type { GradeLevel, Question, Team } from "../types/game";
import { generateQuestion } from "../utils/generateQuestion";

import { useLottie }  from "lottie-react";
import tugOfWarAnimation from "../assets/TugOfwarAnimRemix.json";

import redWin from "../assets/RedWin.json";
import blueWin from "../assets/BlueWin.json";

import { useFirebaseGame } from "../hooks/useFirebaseGame";

import "../Duel.css";

interface Props {
    gradeLevelA: GradeLevel;
    gradeLevelB: GradeLevel;
    duelMode: boolean;
    handleWinner: (winner: Team) => void;
    useTimer: boolean;
    time: number;
    handleExit: () => void;
    shift: boolean;
    useWebControllers: boolean;
}

export const GameScreen = ({
  gradeLevelA,
  gradeLevelB,
  duelMode,
  handleWinner,
  useTimer,
  time,
  handleExit,
  shift,
  useWebControllers
}: Props) => {

    const [currentAnimData, setCurrentAnimData] = useState<object>(tugOfWarAnimation);

    const options = {
      animationData: currentAnimData,
      loop: currentAnimData === tugOfWarAnimation
    }

    const { View } = useLottie(options);

    const [redShift, setRedShift] = useState(true);
    const [blueShift, setBlueShift] = useState(true);

    // Preguntas iniciales (en modo normal ambos equipos comparten la misma)
    const [initial] = useState(() => {
      const a = generateQuestion(gradeLevelA);
      return { a, b: duelMode ? generateQuestion(gradeLevelB) : a };
    });
    const [questionA, setQuestionA] = useState<Question>(initial.a);
    const [questionB, setQuestionB] = useState<Question>(initial.b);

    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(50);
    const [gameOver, setGameOver] = useState(false);

    const [timeLeftA, setTimeLeftA] = useState(time);
    const [timeLeftB, setTimeLeftB] = useState(time);

    const setGameFinishedRef = useRef<((winner: Team) => void)>(null);

    // Renueva la pregunta de un equipo (o de ambos si no es duelo) y reinicia su tiempo
    const refreshQuestion = (team: Team) => {
      if (!duelMode) {
        const q = generateQuestion(gradeLevelA);
        setQuestionA(q);
        setQuestionB(q);
        setTimeLeftA(time);
      } else if (team === "A") {
        setQuestionA(generateQuestion(gradeLevelA));
        setTimeLeftA(time);
      } else {
        setQuestionB(generateQuestion(gradeLevelB));
        setTimeLeftB(time);
      }
    };

    const handleSkip = (team: Team) => {
      if (gameOver) return;
      refreshQuestion(team);
      setMessage(duelMode ? `Equipo ${team} saltó su pregunta` : "Se saltó la pregunta");
    };

    const handleShift = (actualTeam: string) => {
      if(actualTeam === "A") {
        setBlueShift(!blueShift)
        setRedShift(true)
      } else if(actualTeam === "B") {
        setRedShift(!redShift)
        setBlueShift(true)
      }
    }

    // El reloj baja cada segundo...
    useEffect(() => {
      if (!useTimer || gameOver) return;

      const interval = setInterval(() => {
        setTimeLeftA((p) => p - 1);
        if (duelMode) setTimeLeftB((p) => p - 1);
      }, 1000);

      return () => clearInterval(interval);
    }, [useTimer, duelMode, gameOver]);

    // ...y cuando llega a 0 se salta la pregunta de ese equipo
    useEffect(() => {
      if (!useTimer || gameOver || timeLeftA > 0) return;

      handleSkip("A");
      if (shift) {
        if (blueShift) handleShift("A");
        else if (redShift) handleShift("B");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeftA]);

    useEffect(() => {
      if (!useTimer || !duelMode || gameOver || timeLeftB > 0) return;

      handleSkip("B");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeftB]);

  const handleAnswer = (team: Team, value: number) => {
    if (gameOver) return;

    const question = team === "A" ? questionA : questionB;

    if (value !== question.answer) {
      setMessage(`¡Equipo ${team}: respuesta incorrecta!`);
      return;
    }

    const newProgress = team === "A" ? progress + 10 : progress - 10;
    const limitedProgress = Math.max(0, Math.min(100, newProgress));

    setProgress(limitedProgress);
    setMessage(`¡Equipo ${team}: respuesta correcta!`);

    if(shift){
      handleShift(team)
    }

    // GANA EQUIPO B (Rojo)
    if (limitedProgress === 0) {
      setGameOver(true);
      setMessage("¡El equipo B ganó la partida!");
      setCurrentAnimData(redWin);

      if(useWebControllers && setGameFinishedRef.current) {
        setGameFinishedRef.current("B")
      }

      setTimeout(() => {
        handleWinner("B");
      }, 5000);
      return;
    }

    // GANA EQUIPO A (Azul)
    if (limitedProgress === 100) {
      setGameOver(true);
      setMessage("¡El equipo A ganó la partida!");
      setCurrentAnimData(blueWin);

      if(useWebControllers && setGameFinishedRef.current) {
        setGameFinishedRef.current("A")
      }

      setTimeout(() => {
        handleWinner("A");
      }, 5000);
      return;
    }

    refreshQuestion(team);
  };

  const { roomCode, setGameFinished } = useFirebaseGame(useWebControllers, handleAnswer);

  useEffect( () => {
    setGameFinishedRef.current = setGameFinished;
  },[setGameFinished]);

  return (
    <div className='app-container'>
      <div className='exit-button'>
        <button onClick={handleExit}>Salir</button>
      </div>

      {useWebControllers && roomCode && (
        <div className="room-code-display" style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2>Código de la sala: {roomCode}</h2>
          <p>Ingresa este código en tu dispositivo para jugar</p>
        </div>
      )}

      { useTimer && (
        <div className="timers-row">
          <span style={{ color: timeLeftA < 5 ? 'red' : 'black' }}>
            {duelMode ? "Azul: " : "Tiempo: "}{timeLeftA}s
          </span>
          {duelMode && (
            <span style={{ color: timeLeftB < 5 ? 'red' : 'black' }}>
              Rojo: {timeLeftB}s
            </span>
          )}
        </div>
      )}

      {duelMode ? (
        <div className="duel-questions">
          <div className="duel-question duel-question-a">
            <small>Equipo A · {gradeLevelA}</small>
            <QuestionDisplay question={questionA} />
          </div>
          <div className="duel-question duel-question-b">
            <small>Equipo B · {gradeLevelB}</small>
            <QuestionDisplay question={questionB} />
          </div>
        </div>
      ) : (
        <QuestionDisplay question={questionA} />
      )}

      <ScoreBar progress={progress} />

      <div className='calculators-container'>
        { !useWebControllers ? <Calculator team='A' onSubmit={handleAnswer} disabled={!blueShift}/> : "" }
        { View }
        { !useWebControllers ? <Calculator team='B' onSubmit={handleAnswer} disabled={!redShift}/> : "" }
      </div>

      <p className='message-text'>{message}</p>

      <div className='skip-button'>
        {duelMode ? (
          <>
            <button className='btn-skip' onClick={() => handleSkip("A")}>Saltar (Azul)</button>
            <button className='btn-skip'  onClick={() => handleSkip("B")}>Saltar (Rojo)</button>
          </>
        ) : (
          <button onClick={() => handleSkip("A")}>Saltar pregunta</button>
        )}
      </div>

    </div>
  )
}
