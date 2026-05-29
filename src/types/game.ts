export type Operator = "+" | "-" | "*" | "/";

export interface Question {
    num1: number;
    num2: number;
    operator: Operator;
    answer: number;
}

export type GradeLevel = "1-basic" | "2-basic" | "3-basic" | "4-basic" | "5-basic" | "6-basic" | "7-basic" | "8-basic";

export type Team = "A" | "B";