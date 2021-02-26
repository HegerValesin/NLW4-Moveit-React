import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://pbs.twimg.com/profile_images/1250948318236155905/mnN8e8SS_400x400.jpg" alt="Heger Valesin"/>
            <div>
                <strong>Heger Valesin</strong>
                <p>
                    <img src="icons/level.svg" alt="Leve"/>
                    Level {level}
                    </p>
            </div>
        </div>
    );
}