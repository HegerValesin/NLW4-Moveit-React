import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletendChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  correntExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level}
      correntExperience={props.correntExperience}
      challengesCompleted={props.challengesCompleted}
    >
        <div className={styles.container}>
          <Head>
            <title>Moveit em Next</title>
          </Head>

          <ExperienceBar />

          <CountdownProvider>
              <section>
                <div >
                  <Profile />
                  <CompletendChallenges />
                  <Countdown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </section>
          </CountdownProvider>
        </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, correntExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      correntExperience: Number(correntExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
