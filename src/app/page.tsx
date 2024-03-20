import s from "./page.module.css";
import { Button } from "react-bootstrap";

export default function Home() {

  const returnLink = `/api/auth/login?returnTo=${encodeURIComponent('/dashboard')}`;
  return (
    <main className={s.main}>
      <div className={s.homeWrapper}>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <h1>Welcome to Budget Radness 💰</h1>
        <p className={s.appDescription}>Overview: This app helps give you better insights into “approximately” what bills fall into a given pay-period and what your leftover spending is for a <b>bi-weekly pay schedule</b>.
        <br />
        <br />
        <b>NOTE:</b> Calculations are made on “fixed” bill due dates that you provide. Needless to say (though I&apos;m gonna say it 😉), in real-life, actual bill due dates vary depending on weekends, holidays, etc.</p>
        <h3 className={s.featureTitle}>Features:</h3>
        <ul className={s.featureList}>
          <li>Securely create and login to your account via <a style={{textDecoration: "underline"}}href="https://auth0.com/">Auth0</a></li>
          <li>Database enforces TLS/SSL (Transport Layer Security/Secure Sockets Layer) to encrypt all network traffic. TLS/SSL ensures that database network traffic is only readable by the intended client.</li>
          <li>Forecast bi-weekly pay. Know exactly what bills fall within those 2 weeks, bill total, and left overspending for those two weeks.</li>
          <li>Add/update financial details to calculate forecasted pay periods.</li>
          <li>Add/update/delete recurring expense for the pay period</li>
          <li>Safely and securely delete your account</li>
          <li>Support for weekly, bi-monthly, monthly pay schedules coming soon.</li>
        </ul>
        <small>(v1.0.1 Beta 1)</small>
        <Button className={s.subText} href={returnLink}>Login / Sign Up</Button>
      </div>
    </main>
  );
}
