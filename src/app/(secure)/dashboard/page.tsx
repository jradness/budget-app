'use client'
import React, {useEffect, useState} from 'react';
import {Container, Form, Tab, Tabs} from "react-bootstrap";
import calculateNextPayday from "../../../utils/calc-next-payday";
import calculateBudget from "../../../utils/calc-budget";
import isDateRangeActive from "../../../utils/is-active-date-range";
import BillTable from "../../_components/BillTable/BillTable";
import { useUserService } from "../../_services/useUserService";
import ForecastTable from "../../_components/ForecastTable/ForecastTable";
import {useBillService} from "../../_services/useBillService";
import Settings from "../../_components/Settings/Settings";


const Dashboard = () => {
  const userService = useUserService();
  const billService = useBillService();
  const { currentUser: user } = userService;
  const { monthlyBills } = billService;
  const [key, setKey] = useState('dashboard');

  const [state, setState] = useState({
    startDate: '2024-01-04',
    endDate: '2024-12-19',
    biWeeklyIncome: 4912,
    donations: 491.2,
    groceryBudget: 1000,
    calculatedBills: [],
  });

  useEffect(() => {
    if (!user) {
      userService.getCurrent('65c7b11a840eeedaeb0fc908');
    }
    if (user) {
      billService.getUserBillData();
    }
  },
  [user]);

  useEffect(() => {
    if (user && monthlyBills) {
      calculateAndDisplay();
    }
  }, [monthlyBills, state.biWeeklyIncome, state.donations, state.startDate, state.endDate]);


  const calculateAndDisplay = () => {
    const { payStartDate, payEndDate } = billService.paymentOptions;
    const start = new Date(payStartDate);
    const end = new Date(payEndDate);
    let currentDate = new Date(start);
    let calculatedResults = [];

    while (currentDate <= end) {
      const nextPayday = calculateNextPayday(currentDate);
      const budget = calculateBudget(monthlyBills, currentDate, nextPayday, state.biWeeklyIncome, state.donations, state.groceryBudget);
      const isActive = isDateRangeActive(currentDate, nextPayday);

      calculatedResults.push({
        dateRange: `${currentDate.toLocaleDateString()} - ${nextPayday.toLocaleDateString()}`,
        ...budget,
        isActive
      });

      currentDate = new Date(nextPayday);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setState(prevState => ({
      ...prevState,
      calculatedBills: calculatedResults
    }));
  }

  return (
      <Container>
        <h1>Money Budgeting App</h1>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="dashboard" title="Dashboard">
            <h2>Calculated Pay Periods:</h2>
            {(user && monthlyBills && state.calculatedBills)
              ? <ForecastTable calculatedBills={state.calculatedBills}/>
              : null
            }
          </Tab>
          <Tab eventKey="bills" title="Bills">
            <h2>Bill Management</h2>
            <BillTable />
          </Tab>
          <Tab eventKey="settings" title="Settings">
            <h2>Bill Settings</h2>
            <Settings />
          </Tab>
        </Tabs>
      </Container>
  );
};

export default Dashboard;
