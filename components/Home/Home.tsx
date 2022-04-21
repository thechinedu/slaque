import styles from "./Home.module.css";

import { Logo, Menu } from "@/components/Icons";
import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">
            <a className={styles.logoContainer}>
              <Logo className={styles.logo} />
              slaque
            </a>
          </Link>

          <Menu className={styles.menu} />
        </nav>

        <section className={styles.intro}>
          <h1>Slaque is your digital HQ</h1>

          <p>
            Transform the way you work with one place for everyone and
            everything you need to get stuff done.
          </p>

          <Link href="/get-started">
            <a className={styles.try}>Try for free</a>
          </Link>

          <Link href="#">
            <a className={styles.googleSignUp}>Sign up with google</a>
          </Link>
        </section>
      </header>

      <main className={styles.main}>
        <section className={styles.pitch}>
          <h2>Move faster by organizing your work life</h2>
          <p>
            The key to productivity in Slaque is organized spaces called
            channels—a different one for everything you&apos;re working on. With
            all the people, messages and files related to a topic in one place,
            you can move a whole lot faster.
          </p>
          <video src="/threads.mp4" loop autoPlay muted />
        </section>

        <section className={styles.pitch}>
          <h2>Focus your time on your own terms</h2>
          <p>
            Give yourself the flexibility to work when, where and how you work
            best. Take control of notifications, collaborate live or on your own
            time, and find answers in conversations from across your company.
          </p>
          <video src="/focus.mp4" loop autoPlay muted />
        </section>

        <section className={styles.pitch}>
          <h2>Simplify teamwork for everyone</h2>
          <p>
            Give everyone you work with—inside and outside your company—a more
            productive way to stay in sync. Respond faster with emoji, keep
            conversations focused in channels, and simplify all your
            communication into one place.
          </p>
          <video src="/teamwork.mp4" loop autoPlay muted />
        </section>

        <section className={styles.getStarted}>
          <h2>Get started with Slaque</h2>

          <div className={styles.getStartedStep} data-step="1">
            <h3>Sign up</h3>
            <p>
              <Link href="/get-started">
                <a>Create a new Slaque workspace</a>
              </Link>{" "}
              in just a few moments. It&apos; free to use for teams of any size.
            </p>
          </div>

          <div className={styles.getStartedStep} data-step="2">
            <h3>Invite your coworkers</h3>
            <p>
              Slaque is better together (no, really, it&apos;s a bit
              underwhelming by yourself), and it&apos;s easy to invite your
              team.
            </p>
          </div>

          <div className={styles.getStartedStep} data-step="3">
            <h3>Try it out</h3>
            <p>
              Run a project, coordinate with your team, or just talk it out.
              Slaque is a blank canvas for teamwork.
            </p>
          </div>
        </section>

        <section className={styles.future}>
          <h2>Welcome to where the future works</h2>
          <Link href="/get-started">
            <a>Try for free</a>
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          &copy;{new Date().getFullYear()} Slaque Technologies. All rights
          reserved.
        </p>
      </footer>
    </>
  );
};

export default Home;
