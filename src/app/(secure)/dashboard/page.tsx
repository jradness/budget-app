import React from 'react';
import DashboardTabs from '../../_components/DashboardTabs/DashboardTabs';
import {Container} from "react-bootstrap";
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Account from '../../_components/Account/Account';

const Dashboard = async () => {
  const session = await getSession();
  console.log('session', session);
 return (
    <Container>
      <div>{session?.user?.email} - <a href="/api/auth/logout">Logout</a></div>
      <h1>Money Budgeting App</h1>
      <Account>
        <DashboardTabs />
      </Account>
      </Container>
  );
};

export default withPageAuthRequired(Dashboard, { returnTo: '/' });
