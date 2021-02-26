import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { correntExperience, experienceToNextLivel } = useContext(ChallengesContext);

    const porcentToNextLevel = Math.round(correntExperience * 100) / experienceToNextLivel;
    
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${porcentToNextLevel}%` }} />

                <span className={styles.currentExperience} style={{ left: `${porcentToNextLevel}%`}}>
                 {correntExperience} xp
                </span>
            </div>
            <span>{ experienceToNextLivel } xp</span>
        </header>
    );
}