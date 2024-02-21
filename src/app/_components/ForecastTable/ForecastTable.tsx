'use client'
import React, { useState, useEffect } from 'react';
import {Table} from "react-bootstrap";
import { Container } from "react-bootstrap";
import calculateNextPayday from "../../../utils/calc-next-payday";
import calculateBudget from "../../../utils/calc-budget";
import isDateRangeActive from "../../../utils/is-active-date-range";
import {useBillService} from "../../_services/useBillService";
import { useUserService } from "../../_services/useUserService";

const ForecastTable = () => {
  const {
    monthlyBills,
    paymentOptions,
    financialDetails,
    expenseCategories,
  } = useBillService();
  
  const { currentUser } = useUserService();
  
  const [calculatedBills, setCalculatedBills] = useState([]);

  useEffect(() => {
    if (currentUser) {
      calculateAndDisplay();
    }
  }, [monthlyBills, paymentOptions, financialDetails, expenseCategories]);

  const calculateAndDisplay = () => {
    const { payStartDate, payEndDate } = paymentOptions;
    const { payDayAmount, paymentSchedule } = financialDetails;
    const start = new Date(payStartDate);
    const end = new Date(payEndDate);
    let currentDate = new Date(start);
    const calculatedResults = [];

    while (currentDate <= end) {
      const nextPayday = calculateNextPayday(currentDate, paymentSchedule);
      const budget = calculateBudget(monthlyBills, currentDate, nextPayday, payDayAmount, expenseCategories);
      const isActive = isDateRangeActive(currentDate, nextPayday);
      const usLocale = 'en-US';
      calculatedResults.push({
        dateRange: `${currentDate.toLocaleDateString(usLocale, { timeZone: 'UTC'})} - ${nextPayday.toLocaleDateString(usLocale, { timeZone: 'UTC'})}`,
        ...budget,
        isActive
      });

      currentDate = new Date(nextPayday);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setCalculatedBills(calculatedResults);
  }

  return (
    <Container>
      <h2>Calculated Pay Periods:</h2>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
          <th>Date Range</th>
          <th>$ Total Bills</th>
          <th>$ Spending</th>
          <th>Bills</th>
        </tr>
        </thead>
        {calculatedBills.length > 0 ? (
          <tbody>
          {calculatedBills.map((result, index) => (
            <tr key={index}>
              <td className="col-sm-1">{result.dateRange}</td>
              <td className="col-sm-1">${result.totalBillAmount}</td>
              <td className="col-sm-1">${result.leftoverSpending}</td>
              <td>{result.billNames}</td>
            </tr>
          ))}
          </tbody>
        ): null}
      </Table>
    </Container>
  );
};

export default ForecastTable;
