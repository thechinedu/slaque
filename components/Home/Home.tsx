import styles from "./Home.module.css";

import { Logo, Menu } from "@/components/Icons";
import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <header>
        <nav className={styles.nav}>
          <Link href="/">
            <a className={styles.logoContainer}>
              <Logo className={styles.logo} />
              slaque
            </a>
          </Link>

          <Menu className={styles.menu} />
        </nav>
      </header>
    </>
  );
};

export default Home;
