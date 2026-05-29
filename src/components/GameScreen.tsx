import { useEffect, useState } from "react";
import Calculator from "./Calculator";
import QuestionDisplay from "./QuestionDisplay";
import { ScoreBar } from "./ScoreBar";
import type { GradeLevel, Question, Team } from "../types/game";
import { generateQuestion } from "../utils/generateQuestion";

import { useLottie }  from "lottie-react";
import tugOfWarAnimation from "../assets/TugOfwarAnim.json";

import redWin from "../assets/RedWin.json";
import blueWin from "../assets/BlueWin.json";

import { useFirebaseGame } from "../hooks/useFirebaseGame";

interface Props {
    gradeLevel: GradeLevel;
    handleWinner: (winner: Team) => void;
    useTimer: boolean;
    time: number;
    handleExit: () => void;
    shift: boolean;
    useWebControllers: boolean;
}

export const GameScreen = ({gradeLevel, handleWinner, useTimer, time, handleExit, shift, useWebControllers}: Props) => {

    const [currentAnimData, setCurrentAnimData] = useState<object>(tugOfWarAnimation);

    const options = {
      animationData: currentAnimData,
      loop: currentAnimData === tugOfWarAnimation
    }
    
    const { View } = useLottie(options);

    const [redShift, setRedShift] = useState(true);
    const [blueShift, setBlueShift] = useState(true);
    
    const [question, setQuestion] = useState<Question>(generateQuestion(gradeLevel));
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(50);
    
    const [timeLeft, setTimeLeft] = useState(time);
    
    const handleSkip = () => {
      setQuestion(generateQuestion(gradeLevel));
      
      if(!shift) {
        setTimeLeft(time);
      }
  
      setMessage("Se saltó la pregunta");
    }

    const handleShift = (actualTeam: string) => {
      if(actualTeam === "A") {
        setBlueShift(!blueShift)
        setRedShift(true)
      } else if(actualTeam === "B") {
        setRedShift(!redShift)
        setBlueShift(true)
      }
    }

    useEffect( () => {
      if (!useTimer) return;

      const interval = setInterval( () => {
        setTimeLeft( (prev) => {
          if (prev <= 1) {
            handleSkip();
            if(shift) {
              if (blueShift) {
                handleShift("A")
              } else if (redShift) {
                handleShift("B")
              }
            }
            return time;
          }
          return prev -1
        })
      }, 1000);

      return () => clearInterval(interval);
    }, [question, useTimer])

  const handleAnswer = (team: Team, value: number) => {
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
      setMessage("¡El equipo B ganó la partida!");
      setCurrentAnimData(redWin);
      
      setTimeout(() => {
        handleWinner("B");
      }, 5000);
      return;
    }

    // GANA EQUIPO A (Azul)
    if (limitedProgress === 100) {
      setMessage("¡El equipo A ganó la partida!");
      setCurrentAnimData(blueWin);
      
      setTimeout(() => {
        handleWinner("A");
      }, 5000);
      return;
    }

    setTimeLeft(time);
    setQuestion(generateQuestion(gradeLevel));
  };

  const { roomCode } = useFirebaseGame(useWebControllers, handleAnswer);

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
        <div style={{fontSize: '1.5rem', fontWeight:'bold',
          color: timeLeft < 5 ? 'red' : 'black',
          marginBottom: '10px'
        }}>
          Tiempo: {timeLeft} segundos
        </div>
      )}

      <QuestionDisplay question={question} />

      <ScoreBar progress={progress} />

      <div className='calculators-container'>
        <Calculator team='A' onSubmit={handleAnswer} disabled={!blueShift}/>
        { View }
        <Calculator team='B' onSubmit={handleAnswer} disabled={!redShift}/>
      </div>

      <p className='message-text'>{message}</p>

      <div className='skip-button'>
        <button onClick={handleSkip}>Saltar pregunta</button>
      </div>

    </div>
  )
}
