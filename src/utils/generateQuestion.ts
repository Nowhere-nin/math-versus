import type { Question, Operator, GradeLevel } from "../types/game";
const getRandom = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

const getRandom10 = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min +1)) + min;

export function generateQuestion(gradeLevel: GradeLevel): Question {
    // Definimos valores iniciales seguros (mínimo 1 para evitar el cero)
    let num1 = getRandom(1, 10); 
    let num2 = getRandom(1, 10);
    let operator: Operator = "+";

    // 1. ASIGNACIÓN DE RANGOS POR NIVEL
    if (gradeLevel === "1-basic") {
        num1 = getRandom(1, 9);
        num2 = getRandom(1, 10 - num1); // Resultado máximo 10
        operator = "+";
    } 
    else if (gradeLevel === "2-basic") {
        num1 = getRandom(1, 49);
        num2 = getRandom(1, 50 - num1);
        operator = "+";
    }
    else if (gradeLevel === "3-basic") {
        const techos = [20, 50, 100, 500];
        const techo = techos[getRandom(0, techos.length - 1)];
        num1 = getRandom(1, techo);
        num2 = getRandom(1, techo);
        operator = Math.random() > 0.5 ? "+" : "-";
    }
    else if (gradeLevel === "4-basic") {
        num1 = getRandom(2, 10); // Evitamos el 1 para tablas más reales
        num2 = getRandom(2, 10);
        operator = "*";
    }
    else if (gradeLevel === "5-basic") {

        const bases = [2,3,4,5,6,7,8,9];
        const multiplos = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 500];


        num1 = bases[getRandom(0, (bases.length - 1))]
        num2 = multiplos[getRandom(0, (multiplos.length -1))]

        if (Math.random() < 0.25) {
            num1 = multiplos[getRandom(0, multiplos.length - 1)];
        }

        // Intercambiamos al azar para que el múltiplo de 10 no esté siempre en el mismo lado
        if (Math.random() > 0.5) [num1, num2] = [num2, num1];


        operator = "*";
    }
    else if (gradeLevel === "6-basic") {
        num1 = getRandom(2, 10); // Evitamos el 1 para tablas más reales
        num2 = getRandom(2, 10);
        operator = "*";
    }
    else if (gradeLevel === "7-basic") {
        num1 = getRandom(2, 10); // Evitamos el 1 para tablas más reales
        num2 = getRandom(2, 10);
        operator = "*";
    }
    else if (gradeLevel === "8-basic") {
        num1 = getRandom(2, 10); // Evitamos el 1 para tablas más reales
        num2 = getRandom(2, 10);
        operator = "*";
    }

    // ... puedes seguir con el resto de niveles

    // 2. CONTROL DE NEGATIVOS (El "Seguro de Vida")
    // Si es una resta y el resultado daría negativo, los intercambiamos.
    if (operator === "-" && num1 < num2) {
        const temp = num1;
        num1 = num2;
        num2 = temp;
        // O en JS moderno: [num1, num2] = [num2, num1];
    }

    // 3. CÁLCULO DE LA RESPUESTA FINAL
    let answer = 0;
    if (operator === "+") answer = num1 + num2;
    if (operator === "-") answer = num1 - num2;
    if (operator === "*") answer = num1 * num2;

    return { num1, num2, operator, answer };
}