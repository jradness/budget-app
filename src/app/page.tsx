import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Welcome to my App</h1>
        <a className={styles.subText} href="/api/auth/login">Login / Sign Up</a>
      </div>
      {/* <Link href="/dashboard">Dashboard</Link>
      <br />
      <Link href="/account/login">Login Screen</Link>
      <a href="/api/auth/login">Login</a>
      <br />
      <Link href="/account/register">Register Screen</Link> */}
    </main>
  );
}
