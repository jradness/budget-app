import Image from "next/image";
import styles from "./page.module.css";
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/account/login">Login Screen</Link>
      <Link href="/account/register">Register Screen</Link>
    </main>
  );
}
