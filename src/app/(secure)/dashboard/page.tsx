import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {Account, DashboardTabs} from '@components/index';

const Dashboard = async () => {
 return (
  <Account>
    <DashboardTabs />
  </Account>
  );
};

export default withPageAuthRequired(Dashboard, { returnTo: '/' });
