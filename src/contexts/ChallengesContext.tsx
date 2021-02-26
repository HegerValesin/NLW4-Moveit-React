import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challengs {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContexData {
    level: number;
    correntExperience: number;
    experienceToNextLivel: number;
    challengesCompleted: number;
    activeChallenge: Challengs;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    correntExperience: number;
    challengesCompleted: number;
}


export const ChallengesContext = createContext({} as ChallengesContexData);


export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [correntExperience, setCorrentExperience] = useState(rest.correntExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [ isLevelUpMOdalOpen, setisLevelUpMOdalOpen ] = useState(false)

    const experienceToNextLivel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('correntExperience', String(correntExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, correntExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setisLevelUpMOdalOpen(true);
    }

    function closeLevelUpModal() {
        setisLevelUpMOdalOpen(false);
    }

    function startNewChallenge() {
       const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
       const challenge = challenges[randomChallengeIndex];

       setActiveChallenge(challenge)

       new Audio('/notification.mp3').play();

       if (Notification.permission === 'granted') {
           new Notification('Novo desafio ', {
               body: `Valendo ${challenge.amount}xp!`
           })
       }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if  (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        
        let finalExprerience = correntExperience + amount;

        if (finalExprerience >= experienceToNextLivel ) {
            finalExprerience = finalExprerience - experienceToNextLivel;
            levelUp();
        } 

        setCorrentExperience(finalExprerience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                correntExperience, 
                experienceToNextLivel,
                challengesCompleted, 
                levelUp, 
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
                }}
            >
               {children}

        { isLevelUpMOdalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}