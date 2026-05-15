import { useState } from 'react';
import type { Team } from '../types/game';
import '../Calculator.css'

interface Props {
    team: Team;
    onSubmit: (team: Team, value: number) => void;
}

export default function Calculator ({ team, onSubmit }: Props) {
    const [value, setValue] = useState("");

    const handleNumberClick = (num: string) => {
        setValue((prev) => prev + num);
    };

    const handleClear = () => {
        setValue("");
    };

    const handleSubmit = () => {
        if (value === "") return;

        onSubmit(team, Number(value));
        setValue("");
    };

    return (
        <div className={`calculator calculator-team-${team.toLowerCase()}`} >
            <h3 className="calculator-title" >Equipo {team}</h3>

            <input className="calculator-display" type="text" value={value} readOnly disabled/>

            <div className="calculator-buttons" >
                <button onClick={() => handleNumberClick("1")}>1</button>
                <button onClick={() => handleNumberClick("2")}>2</button>
                <button onClick={() => handleNumberClick("3")}>3</button>

                <button onClick={() => handleNumberClick("4")}>4</button>
                <button onClick={() => handleNumberClick("5")}>5</button>
                <button onClick={() => handleNumberClick("6")}>6</button>

                <button onClick={() => handleNumberClick("7")}>7</button>
                <button onClick={() => handleNumberClick("8")}>8</button>
                <button onClick={() => handleNumberClick("9")}>9</button>

                <button className="clear-btn" onClick={handleClear}>C</button>
                <button onClick={() => handleNumberClick("0")}>0</button>
                <button className="submit-btn" onClick={handleSubmit}>=</button>
            </div>


        </div>
    )
}