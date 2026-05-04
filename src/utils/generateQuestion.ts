// import type { Question, Operator, GradeLevel } from "../types/game";

// const operators: Operator[] = ["+", "-", "*"];

// export function generateQuestion(gradeLevel: GradeLevel): Question {

//     let maxNumber = 10;
//     let allowedOperators: Operator[] = ["+"];

//     switch (gradeLevel) {
//         case "1-basic":
//         maxNumber = 10;
//         allowedOperators = ["+"];
//         break;

//         case "2-basic":
//         maxNumber = 20;
//         allowedOperators = ["+", "-"];
//         break;

//         case "3-basic":
//         maxNumber = 50;
//         allowedOperators = ["+", "-", "*"];
//         break;

//         case "4-basic":
//         maxNumber = 100;
//         allowedOperators = ["+", "-", "*"];
//         break;

//         case "5-basic":
//         maxNumber = 200;
//         allowedOperators = ["+", "-", "*"];
//         break;

//         case "6-basic":
//         maxNumber = 500;
//         allowedOperators = ["+", "-", "*"];
//         break;

//         case "7-basic":
//         maxNumber = 500;
//         allowedOperators = ["+", "-", "*"];
//         break;

//         case "8-basic":
//         maxNumber = 500;
//         allowedOperators = ["+", "-", "*"];
//         break;
//     }

//     const num1 = Math.floor(Math.random() * maxNumber) + 1;
//     const num2 = Math.floor(Math.random() * maxNumber) + 1;
//     // const operator = operators[Math.floor(Math.random() * operators.length)];

//     const operator = allowedOperators[Math.floor(Math.random() * allowedOperators.length)];

//     let answer = 0;

//     switch (operator) {
//         case "+":
//             answer = num1 + num2;
//             break;
//         case "-":
//             answer = num1 - num2;
//             break;
//         case "*":
//             answer = num1 * num2;
//             break;
//     }

//     return {num1, num2, operator, answer};

// }

import type { Question, Operator, GradeLevel } from "../types/game";

// const operators: Operator[] = ["+", "-", "*"];

export function generateQuestion(gradeLevel: GradeLevel): Question {
    
    // 1. LÓGICA ESPECIAL PARA 4-BASIC (Tablas de multiplicar)
    if (gradeLevel === "4-basic") {
        // Generamos dos factores entre 1 y 10
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator: Operator = "*";

        return {
            num1,
            num2,
            operator,
            answer: num1 * num2
        };
    }

    let maxNumber = 10;
    let allowedOperators: Operator[] = ["+"];

    switch (gradeLevel) {
        case "1-basic":
        maxNumber = 10;
        allowedOperators = ["+"];
        break;

        case "2-basic":
        maxNumber = 20;
        allowedOperators = ["+", "-"];
        break;

        case "3-basic":
        maxNumber = 50;
        allowedOperators = ["+", "-", "*"];
        break;

        case "5-basic":
        maxNumber = 200;
        allowedOperators = ["+", "-", "*"];
        break;

        case "6-basic":
        maxNumber = 500;
        allowedOperators = ["+", "-", "*"];
        break;

        case "7-basic":
        maxNumber = 500;
        allowedOperators = ["+", "-", "*"];
        break;

        case "8-basic":
        maxNumber = 500;
        allowedOperators = ["+", "-", "*"];
        break;
    }

    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    // const operator = operators[Math.floor(Math.random() * operators.length)];

    const operator = allowedOperators[Math.floor(Math.random() * allowedOperators.length)];

    let answer = 0;

    switch (operator) {
        case "+":
            answer = num1 + num2;
            break;
        case "-":
            answer = num1 - num2;
            break;
        case "*":
            answer = num1 * num2;
            break;
    }

    return {num1, num2, operator, answer};

}