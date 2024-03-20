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
        <p className={s.appDescription}>
          Discover enhanced clarity in managing your finances with our app.
          Designed to provide a clearer view of your bi-weekly budget, it estimates which bills align with each pay period and calculates your available spending money.
        <br />
        <br />
        <b>Important to Note: </b>
        The app operates on the bill due dates you input.
        Remember, real-life scenarios might differ as actual bill due dates can shift due to weekends, holidays, and other variables.
        We've got you covered with these estimations, but always stay attuned to the actual dates.
        </p>
        <h3 className={s.featureTitle}>Features:</h3>
        <ul className={s.featureList}>
        <li>Secure account creation and login using <a style={{textDecoration: "underline"}} href="https://auth0.com/">Auth0</a> for enhanced security.</li>
        <li>Enhanced data protection with TLS/SSL encryption, safeguarding all network traffic for your peace of mind.</li>
        <li>Accurately forecast your bi-weekly pay, including detailed insights into bills due, total bill amount, and discretionary spending for each pay period.</li>
        <li>Easily manage your finances by adding or updating your financial details for pay period forecasting.</li>
        <li>Conveniently add, modify, or remove recurring expenses to align with your pay schedule.</li>
        <li>Secure and straightforward account deletion process, ensuring your privacy and peace of mind.</li>
        <li>Coming soon: Support for additional pay schedules including weekly, bi-monthly, and monthly.</li>
        </ul>
        <small>(v1.0.1 Beta 1)</small>
        <Button className={s.subText} href={returnLink}>Login / Sign Up</Button>
      </div>
    </main>
  );
}
