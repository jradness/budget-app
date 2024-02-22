import styles from "./page.module.css";
import { Button } from "react-bootstrap";

export default function Home() {

  const returnLink = `/api/auth/login?returnTo=${encodeURIComponent('/dashboard')}`;
  return (
    <main className={styles.main}>
      <div>
      <div className="wave"></div>
     <div className="wave"></div>
     <div className="wave"></div>
        <h1>Welcome to Budget Radness 💰</h1>
        <small>(Beta 0.1.0)</small>
        <Button className={styles.subText} href={returnLink}>Login / Sign Up</Button>
      </div>
    </main>
  );
}
