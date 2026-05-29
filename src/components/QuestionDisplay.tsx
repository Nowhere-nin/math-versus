import type { Question } from '../types/game';

interface Props {
    question: Question;
}

export default function QuestionDisplay( { question }: Props ) {
    return (
        <h2>
            { question.num1 } { question.operator === "*" ? "•" : question.operator } { question.num2 }
        </h2>
    )
}