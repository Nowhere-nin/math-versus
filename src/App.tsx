import './App.css';
import './components/ScoreBar.css';
import type { GradeLevel, Team } from './types/game';
import { useState } from 'react';
import WinnerScreen from './components/WinnerScreen';
import StartScreen from './components/StartScreen';
import { GameScreen } from './components/GameScreen';


function App() {

  const [screen, setScreen] = useState<"start" | "game" | "winner">("start");
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>("1-basic");
  const [winner, setWinner] = useState<Team | null>(null);

  const [useTimer, setUseTimer] = useState(false);

  const handleWinner = (winner: Team) => {
    setWinner(winner);
    setScreen("winner");
  }
  
  const handleExit = () => {
    setScreen("start")
  }

  const [time, setTime] = useState(5);
  const [shift, setShift] = useState(false);

  const [useWebControllers, setUseWebControllers] = useState(false);

  if (screen === "start") {
    return (
      <StartScreen
        gradeLevel={gradeLevel}
        onGradeLevelChange={setGradeLevel}
        useTimer= {useTimer}
        onTimerChange={setUseTimer}
        onStart={() => {
          setWinner(null);
          setScreen("game");
        }}
        onTimeChange={setTime}
        shift={shift}
        onShiftChange={setShift}
        useWebControllers={useWebControllers}
        setWebControllers={setUseWebControllers}
      />
    );
  }

  if (screen === "winner" && winner) {
    return (
      <WinnerScreen
        winner={winner}
        onRestart={() => {
          setWinner(null);
          setScreen("start");
        }}
      />
    );
  }

  if (screen === "game") {
    return (
      <GameScreen
        gradeLevel={gradeLevel}
        handleWinner={handleWinner}
        useTimer={useTimer}
        time={time}
        shift={shift}
        handleExit={handleExit}
        useWebControllers={useWebControllers}
      />
    )
  }
}

export default App
