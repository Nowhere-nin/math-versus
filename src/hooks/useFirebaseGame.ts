import { useState, useEffect, useRef } from 'react';
import { ref, set, onValue, remove, onDisconnect, update } from 'firebase/database';
import { database } from '../services/firebaseConfig';
import type { Team } from '../types/game';

export function useFirebaseGame(
        isActive: boolean,
        // Debe devolver true/false según la respuesta fue correcta o no,
        // o undefined si la respuesta se ignoró (por ejemplo, partida terminada).
        onAnswerReceived: (team: Team, value: number) => boolean | undefined
    ) {

    const [roomCode] = useState<string | null>(() => {
        if (isActive) {
            return Math.floor(1000 + Math.random() * 9000).toString();
        }
        return null;
    });

    const onAnswerReceivedRef = useRef(onAnswerReceived);
    useEffect(() => {
        onAnswerReceivedRef.current = onAnswerReceived;
    }, [onAnswerReceived]);

    useEffect(() => {
        if (!isActive || !roomCode) return;

        const roomRef = ref(database, `rooms/${roomCode}`);

        set(roomRef, {
            status: "waiting",
            winner: null,
            lastAnswer: null
        });

        onDisconnect(roomRef).remove();

        const answerRef = ref(database, `rooms/${roomCode}/lastAnswer`);
        const unsubscribe = onValue(answerRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.team && data.value !== undefined) {
                const correct = onAnswerReceivedRef.current(data.team, data.value);

                // Le avisamos a la tablet si su respuesta fue correcta o no.
                // answerTimestamp es el mismo valor que envió la tablet, así sabe
                // que este resultado corresponde a SU respuesta.
                if (correct !== undefined) {
                    set(ref(database, `rooms/${roomCode}/lastResult`), {
                        team: data.team,
                        correct,
                        answerTimestamp: data.timestamp ?? 0
                    });
                }
            }
        });

        return () => {
            unsubscribe();
            remove(roomRef);
        };
    }, [isActive, roomCode]);

    const setGameFinished = (winner: Team) => {
        if(!roomCode) return;

        const roomRef = ref(database, `rooms/${roomCode}`);
        update(roomRef, {
            status: "finished",
            winner: winner
        })
    }

    return { roomCode, setGameFinished };
}
