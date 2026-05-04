// import { useEffect, useState } from "react";
// import Calculator from "./Calculator"
// import QuestionDisplay from "./QuestionDisplay"
// import { ScoreBar } from "./ScoreBar"
// import type { GradeLevel, Question, Team } from "../types/game";
// import { generateQuestion } from "../utils/generateQuestion";

// import { useLottie }  from "lottie-react";
// // import tugOfWarAnimation from "../assets/tug.json";
// import tugOfWarAnimation from "../assets/TugOfwarAnim.json";

// interface Props {
//     gradeLevel: GradeLevel;
//     handleWinner: (winner: Team) => void;
//     useTimer: boolean;
// }

// export const GameScreen = ({gradeLevel, handleWinner, useTimer}: Props) => {

//     const options = {
//       animationData: tugOfWarAnimation,
//       loop: true
//     }

//     const { View } = useLottie(options);
    
//     const [question, setQuestion] = useState<Question>(generateQuestion(gradeLevel));
//     const [message, setMessage] = useState("");
//     const [progress, setProgress] = useState(50);

//     const [timeLeft, setTimeLeft] = useState(15);

//     useEffect( () => {
//       if (!useTimer) return;

//       const interval = setInterval( () => {
//         setTimeLeft( (prev) => {
//           if (prev <= 1) {
//             handleSkip();
//             return 15;
//           }
//           return prev -1
//         })
//       }, 1000);

//       return () => clearInterval(interval);
//     }, [question, useTimer])

//     const handleAnswer = (team: Team, value: number) => {

//     if (value !== question.answer) {
//       setMessage(`¡Equipo ${team}: respuesta incorrecta!`);
//       return
//     }

//     const newProgress = team === "A" ? progress + 10 : progress - 10;
//     const limitedProgress = Math.max(0, Math.min(100, newProgress));

//     setProgress(limitedProgress);
//     setMessage(`¡Equipo ${team}: respuesta correcta!`);
//     // setQuestion(generateQuestion());

//     if (limitedProgress === 0) {
//       setMessage("¡El equipo B ganó la partida!");
//       handleWinner("B");
//     }

//     if (limitedProgress === 100) {
//       setMessage("¡El equipo A ganó la partida!");
//       handleWinner("A");
//     }

//     setTimeLeft(15);

//     setQuestion(generateQuestion(gradeLevel));
//   }

//   const handleSkip = () => {
//     setQuestion(generateQuestion(gradeLevel));
    
//     setTimeLeft(15);

//     setMessage("Se saltó la pregunta");
//   }



//   return (
//     <div className='app-container'>
//       <h1>Math Battle</h1>

//       { useTimer && (
//         <div style={{fontSize: '1.5rem', fontWeight:'bold',
//           color: timeLeft < 5 ? 'red' : 'black',
//           marginBottom: '10px'
//         }}>
//           Tiempo: {timeLeft} segundos
//         </div>
//       )}

//       <QuestionDisplay question={question} />

//       <ScoreBar progress={progress} />

//       <div className='calculators-container'>
//         <Calculator team='A' onSubmit={handleAnswer} />
//         { View }
//         {/* <DotLottieReact
//           src="..\src\assets\tug.json"
//           loop
//           autoplay
//         /> */}
//         <Calculator team='B' onSubmit={handleAnswer} />
//       </div>

//       <p className='message-text'>{message}</p>

//       <div className='skip-button'>
//         <button onClick={handleSkip}>Saltar pregunta</button>
//       </div>

//     </div>
//   )
// }


import { useEffect, useState } from "react";
import Calculator from "./Calculator"
import QuestionDisplay from "./QuestionDisplay"
import { ScoreBar } from "./ScoreBar"
import type { GradeLevel, Question, Team } from "../types/game";
import { generateQuestion } from "../utils/generateQuestion";

import { useLottie }  from "lottie-react";
// import tugOfWarAnimation from "../assets/tug.json";
import tugOfWarAnimation from "../assets/TugOfwarAnim.json";

import redWin from "../assets/RedWin.json";   // Para cuando gana el Equipo B (Rojo)
import blueWin from "../assets/BlueWin.json"; // Para cuando gana el Equipo A (Azul)

interface Props {
    gradeLevel: GradeLevel;
    handleWinner: (winner: Team) => void;
    useTimer: boolean;
}

export const GameScreen = ({gradeLevel, handleWinner, useTimer}: Props) => {

    // Definimos el estado para la data de la animación
    // const [currentAnimData, setCurrentAnimData] = useState<any>(tugOfWarAnimation); // Usar este para crear la build
    const [currentAnimData, setCurrentAnimData] = useState(tugOfWarAnimation);

    // const options = {
    //   animationData: tugOfWarAnimation,
    //   loop: true
    // }

    const options = {
      animationData: currentAnimData,
      loop: currentAnimData === tugOfWarAnimation
    }

    const { View } = useLottie(options);
    
    const [question, setQuestion] = useState<Question>(generateQuestion(gradeLevel));
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(50);

    const [timeLeft, setTimeLeft] = useState(15);

    useEffect( () => {
      if (!useTimer) return;

      const interval = setInterval( () => {
        setTimeLeft( (prev) => {
          if (prev <= 1) {
            handleSkip();
            return 15;
          }
          return prev -1
        })
      }, 1000);

      return () => clearInterval(interval);
    }, [question, useTimer])

  // const handleAnswer = (team: Team, value: number) => {

  //   if (value !== question.answer) {
  //     setMessage(`¡Equipo ${team}: respuesta incorrecta!`);
  //     return
  //   }

  //   const newProgress = team === "A" ? progress + 10 : progress - 10;
  //   const limitedProgress = Math.max(0, Math.min(100, newProgress));

  //   setProgress(limitedProgress);
  //   setMessage(`¡Equipo ${team}: respuesta correcta!`);
  //   // setQuestion(generateQuestion());

  //   if (limitedProgress === 0) {
  //     setMessage("¡El equipo B ganó la partida!");
  //     handleWinner("B");
  //   }

  //   if (limitedProgress === 100) {
  //     setMessage("¡El equipo A ganó la partida!");
  //     handleWinner("A");
  //   }

  //   setTimeLeft(15);

  //   setQuestion(generateQuestion(gradeLevel));
  // }

  const handleAnswer = (team: Team, value: number) => {
    if (value !== question.answer) {
      setMessage(`¡Equipo ${team}: respuesta incorrecta!`);
      return;
    }

    const newProgress = team === "A" ? progress + 10 : progress - 10;
    const limitedProgress = Math.max(0, Math.min(100, newProgress));

    setProgress(limitedProgress);
    setMessage(`¡Equipo ${team}: respuesta correcta!`);

    // GANA EQUIPO B (Rojo)
    if (limitedProgress === 0) {
      setMessage("¡El equipo B ganó la partida!");
      setCurrentAnimData(redWin); // Cambia la animación en el View
      
      // Esperamos 3 segundos antes de ir a la pantalla de ganador final
      setTimeout(() => {
        handleWinner("B");
      }, 5000);
      return;
    }

    // GANA EQUIPO A (Azul)
    if (limitedProgress === 100) {
      setMessage("¡El equipo A ganó la partida!");
      setCurrentAnimData(blueWin); // Cambia la animación en el View
      
      setTimeout(() => {
        handleWinner("A");
      }, 5000);
      return;
    }

    setTimeLeft(15);
    setQuestion(generateQuestion(gradeLevel));
  };

  const handleSkip = () => {
    setQuestion(generateQuestion(gradeLevel));
    
    setTimeLeft(15);

    setMessage("Se saltó la pregunta");
  }



  return (
    <div className='app-container'>
      {/* <h1>Math Battle</h1> */}

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
        <Calculator team='A' onSubmit={handleAnswer} />
        { View }
        {/* <DotLottieReact
          src="..\src\assets\tug.json"
          loop
          autoplay
        /> */}
        <Calculator team='B' onSubmit={handleAnswer} />
      </div>

      <p className='message-text'>{message}</p>

      <div className='skip-button'>
        <button onClick={handleSkip}>Saltar pregunta</button>
      </div>

    </div>
  )
}
