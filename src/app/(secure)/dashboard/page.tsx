import React from 'react';
import DashboardTabs from '../../_components/DashboardTabs/DashboardTabs';
import {Container} from "react-bootstrap";
// import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

const Dashboard = async () => {
  // const session = await getSession();
 return (
    <Container>
      {/* {session && session?.user && (
        <div>{session.user.email} - <a href="/api/auth/logout">Logout</a></div>
      )} */}
      <h1>Money Budgeting App</h1>
      {/* <DashboardTabs /> */}
      </Container>
  );
};

export default Dashboard;
// export default withPageAuthRequired(Dashboard, { returnTo: '/' });
