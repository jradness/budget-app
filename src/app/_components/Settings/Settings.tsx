'use client'
import React, {useEffect, useState} from 'react';
import {Container, Button, Col, Form, Row, Card, Table} from "react-bootstrap";
import {useBillService} from "../../_services/useBillService";

const Settings = () => {
  const {
    expenseCategories,
    paymentOptions,
    financialDetails: finDetails,
    updatePaymentDates,
    addExpense,
    updateExpense,
    deleteExpense,
    updateFinancialDetails
  } = useBillService();
  const billService = useBillService();

  const INIT_EXPENSE = {name: '', amount: ''};
  const [show, setShow] = useState(false);
  const [expenseItem, setExpenseItem] = useState(INIT_EXPENSE);
  const [isEditing, setIsEditing] = useState(false);
  const [payStartDate, setPayStartDate] = useState('');
  const [payEndDate, setPayEndDate] = useState('');
  const [financialDetails, setFinancialDetails] = useState({});
  const radioOptions = ['weekly', 'bi-weekly', 'bi-monthly', 'monthly', 'yearly'];

  useEffect(() => {
    if (paymentOptions) {
      setPayStartDate(paymentOptions?.payStartDate);
      setPayEndDate(paymentOptions?.payEndDate);
      setFinancialDetails(finDetails);
    }
  }, [paymentOptions, finDetails]);

  const handleDateChange = async () => {
    await updatePaymentDates(payStartDate, payEndDate);
  };

  const handleFinancialDetailsChange = ({ target: { name, value }}) => {
    setFinancialDetails({ ...financialDetails, [name]: value });
  };

  const handleExpenseChange = ({ target: { name, value }}) => {
    setExpenseItem({ ...expenseItem, [name]: value });
  };

  const handleEditExpense = (expense) => {
    setExpenseItem({...expense});
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setExpenseItem(INIT_EXPENSE);
    setIsEditing(false);
  }
  
  const handleDeleteExpense = (expense) => {
    deleteExpense(expense);
  };

  const handleAddOrUpdateExpense = () => {
    if (isEditing) {
      updateExpense(expenseItem);
    } else {
      addExpense(expenseItem);
    }
    setExpenseItem(INIT_EXPENSE);
    setIsEditing(false);
  };

  const submitFinancialDetails = () => {
    updateFinancialDetails(financialDetails);
  };

  const generatePayDates = () => {
    let dates = [];
    let currentDate = new Date(payStartDate);
    const endDateObject = new Date(payEndDate);
    const usLocale = 'en-US';
    while (currentDate <= endDateObject) {
      dates.push(currentDate.toLocaleDateString(usLocale, { timeZone: 'UTC'}));
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 14));
    }
    return dates;
  }

  const renderExpenseField = (expense, field) => {
    if (expenseItem._id === expense._id) {
      return (
        <Form.Control
          type="text"
          name={field}
          value={expenseItem[field]}
          onChange={(e) => handleExpenseChange(e)}
        />
      );
    }
    return expense[field];
  };

  return (
    <Container>
      <h2>Bill Settings</h2>
      <Form>
        <Card>
          <Card.Body>
            <Card.Title>Financial Details</Card.Title>
              <Form.Group as={Row}>
                <Form.Label column sm="2"><b>Annual Income ($):</b></Form.Label>
                <Col sm="10">
                  <Form.Control 
                    type="number" 
                    name="annualIncome" 
                    value={financialDetails.annualIncome} 
                    onChange={handleFinancialDetailsChange} 
                  />
                </Col>
              </Form.Group>
            {/* Bi-Weekly Income */}
            <Form.Group as={Row}>
                <Form.Label column sm="2"><b>Pay Day Amnount:</b></Form.Label>
                <Col sm="10">
                  <Form.Control 
                    type="number" 
                    name="payDayAmount" 
                    value={financialDetails.payDayAmount} 
                    onChange={handleFinancialDetailsChange} 
                  />
                </Col>
              </Form.Group>
            <Form.Group>
            <Col>
            <Form.Label><b>Payment Schedule</b></Form.Label>
            {radioOptions.map((option) => (
              <Form.Check 
                type="radio"
                name="paymentSchedule"
                key={option}
                value={option}
                label={option.charAt(0).toUpperCase() + option.slice(1)}
                checked={financialDetails.paymentSchedule === option}
                onChange={handleFinancialDetailsChange}
              />
            ))}</Col>
            </Form.Group>
            <br />
            <Button onClick={submitFinancialDetails}>Update Financial Details</Button>
          </Card.Body>
        </Card>
      </Form>
      <br />
      <br />
      <Form>
        <Card>
          <Card.Body>
          <Card.Title>Payment Options</Card.Title>
          <small>Select a Date rang to forecast pay periods.
            <i>(i.e first pay date and last pay date of year)</i>
          </small>
            {/* Start Date */}
          <Form.Group as={Row} controlId="payStartDate">
            <Form.Label column sm={2}><b>Pay Start Date</b></Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="date" 
                value={payStartDate ? payStartDate.substring(0, 10) : ''}
                onChange={(e) => setPayStartDate(e.target.value)} 
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="payEndDate">
            <Form.Label column sm={2}><b>Pay End Date</b></Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="date" 
                value={payEndDate ? payEndDate.substring(0, 10) : ''}
                onChange={(e) => setPayEndDate(e.target.value)} 
              />
            </Col>
          </Form.Group>
          <br />
          <Button variant="primary" onClick={handleDateChange}>Update Dates</Button>
          <br/>
          <br />
          <h6 onClick={() => setShow(prevState => !prevState)}>{'> '}Click to {!show ? 'SHOW' : 'HIDE'} date selection options based on current date range</h6>
            {show ? (
              <div className="justify-content-md-center">
                {generatePayDates().map((date, index) => (
                  <Col key={index} md="auto">
                    <div className="pay-date">{date}</div>
                  </Col>
                ))}
              </div>
            ): null}
          </Card.Body>
        </Card>
      </Form>

      <Form>
        <Card className="mt-5">
          <Card.Body>
            <Row>
              <h3>Add Recurring Pay Period Expense</h3>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Expense Name"
                  name="name"
                  value={!isEditing && expenseItem?.name}
                  onChange={handleExpenseChange}
              />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  name="amount"
                  placeholder="Amount ($)"
                  value={!isEditing && expenseItem?.amount}
                  onChange={handleExpenseChange}
                />
              </Col>
              <Col>
                <Button onClick={handleAddOrUpdateExpense}>Add Expense</Button>
              </Col>
            </Row>
            <br />
            <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th className="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
      {expenseCategories?.length > 0 ? expenseCategories.map(item => (
        <tr key={item._id}>
          <td>{renderExpenseField(item, 'name')}</td>
          <td>{renderExpenseField(item, 'amount')}</td>
          <td className="text-end">
            {expenseItem._id === item._id ? (
                <>
                <Button variant="success" onClick={handleAddOrUpdateExpense}>Save</Button>
                {' '}
                <Button variant="danger" onClick={cancelEdit}>Cancel</Button>
                </>
            ) : (
                <>
                <Button variant="info" onClick={() => handleEditExpense(item)}>Edit</Button>
                {' '}
                <Button variant="danger" onClick={() => handleDeleteExpense(item)}>Delete</Button>
                </>
            )}
            </td>
        </tr>
      )): null}
      </tbody>
      </Table>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
};

export default Settings;