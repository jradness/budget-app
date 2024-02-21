import React from 'react';
import DashboardTabs from '../../_components/DashboardTabs/DashboardTabs';
import {Container} from "react-bootstrap";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Account from '../../_components/Account/Account';

const Dashboard = async () => {
 return (
  <Account>
    <DashboardTabs />
  </Account>
  );
};

export default withPageAuthRequired(Dashboard, { returnTo: '/' });
