import React from 'react';
import {Table} from "react-bootstrap";
import { Container } from "react-bootstrap";

const ForecastTable = ({ calculatedBills }) => {
  return (
    <Container>
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
