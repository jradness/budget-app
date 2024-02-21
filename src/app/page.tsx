import styles from "./page.module.css";
import { Button } from "react-bootstrap";

export default function Home() {

  const returnLink = `/api/auth/login?returnTo=${encodeURIComponent('/dashboard')}`;
  return (
    <main className={styles.main}>
      <div>
        <h1>Welcome to Budget Radness 💸</h1>
        <Button className={styles.subText} href={returnLink}>Login / Sign Up</Button>
      </div>
    </main>
  );
}
