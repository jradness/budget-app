import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {

  const returnLink = `/api/auth/login?returnTo=${encodeURIComponent('/dashboard')}`;
  return (
    <main className={styles.main}>
      <div>
        <h1>Welcome to my 💩 App</h1>
        <a className={styles.subText} href={returnLink}>Login / Sign Up</a>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </main>
  );
}
