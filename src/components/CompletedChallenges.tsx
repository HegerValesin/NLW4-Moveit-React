import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletendChallenges.module.css';

export function CompletendChallenges(){
    const { challengesCompleted } = useContext(ChallengesContext)

    return(
        <div className={styles.completendChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}