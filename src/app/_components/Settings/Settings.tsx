'use client'
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {Spinner, Modal, Container, Accordion, ToastContainer, Toast, Button, Col, Form, Row, Card, Table} from "react-bootstrap";
import { useBillService } from "@services/useBillService";
import { useUserService } from '@services/useUserService';
import { useUser } from '@auth0/nextjs-auth0/client';

const Settings = () => {
  const { user } = useUser();
  const router = useRouter();
  const { deleteUser } = useUserService();
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

  const INIT_EXPENSE = {name: '', amount: ''};
  const [show, setShow] = useState(false);
  const [expenseItem, setExpenseItem] = useState(INIT_EXPENSE);
  const [isEditing, setIsEditing] = useState(false);
  const [payStartDate, setPayStartDate] = useState('');
  const [payEndDate, setPayEndDate] = useState('');
  const [financialDetails, setFinancialDetails] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);


  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const radioOptions = ['weekly', 'bi-weekly', 'bi-monthly', 'monthly', 'yearly'];
  const disabledOptions = ['weekly', 'bi-monthly', 'monthly', 'yearly'];

  useEffect(() => {
    if (paymentOptions) {
      setPayStartDate(paymentOptions?.payStartDate);
      setPayEndDate(paymentOptions?.payEndDate);
      setFinancialDetails(finDetails);
    }
  }, [paymentOptions, finDetails]);

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Toast will disappear after 3 seconds
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

  const handleDateChange = async () => {
    await updatePaymentDates(payStartDate, payEndDate);
    displayToast('Payment dates updated successfully');
    
  };
  
  const handleDeleteExpense = async (expense) => {
    await deleteExpense(expense);
    displayToast('Expense deleted successfully');
  };

  const handleAddOrUpdateExpense = async () => {
    if (isEditing) {
      await updateExpense(expenseItem);
      displayToast('Expense updated successfully');
    } else {
      await addExpense(expenseItem);
      displayToast('Expense added successfully');
    }
    setExpenseItem(INIT_EXPENSE);
    setIsEditing(false);
  };

  const submitFinancialDetails = async () => {
    await updateFinancialDetails(financialDetails);
    displayToast('Financial details updated successfully');
  };

  const handleDeleteUser = async () => {
    try {
      setIsProcessing(true);
      await deleteUser(user?.sub);
      setIsProcessing(false);
      handleCloseModal();
      router.push('/api/auth/logout');
    } catch (error) {
      console.log("Error deleting account");
    }
  }

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
  <>
    <Container>
      <h2>Bill Settings</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Financial Details</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Card>
                <Card.Body>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}><b>Annual Income ($):</b></Form.Label>
                    <Col sm={10}>
                      <Form.Control 
                        type="number" 
                        name="annualIncome" 
                        value={financialDetails.annualIncome} 
                        onChange={handleFinancialDetailsChange} 
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}><b>Pay Day Amount:</b></Form.Label>
                    <Col sm={10}>
                      <Form.Control 
                        type="number" 
                        name="payDayAmount" 
                        value={financialDetails.payDayAmount} 
                        onChange={handleFinancialDetailsChange} 
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm={2}><b>Payment Schedule</b></Form.Label>
                    <Col sm={10}>
                      {radioOptions.map((option) => (
                        <Form.Check 
                          type="radio"
                          name="paymentSchedule"
                          key={option}
                          value={option}
                          disabled={disabledOptions.includes(option)}
                          label={option.charAt(0).toUpperCase() + option.slice(1)}
                          checked={financialDetails.paymentSchedule === option}
                          onChange={handleFinancialDetailsChange}
                        />
                      ))}
                    </Col>
                  </Form.Group>

                  <Button onClick={submitFinancialDetails}>Update Financial Details</Button>
                </Card.Body>
              </Card>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Payment Options</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Card>
                <Card.Body>
                  <Card.Title>Forecast Pay Periods</Card.Title>
                  <small>Select a date range to forecast bi-weekly pay periods.</small>
                  <div><small>(Example: the first and last pay date of the year)</small></div>
                  
                  <Form.Group as={Row} controlId="payStartDate" className="my-3">
                    <Form.Label column sm={2}><b>Pay Start Date</b></Form.Label>
                    <Col sm={10}>
                      <Form.Control 
                        type="date" 
                        value={payStartDate ? payStartDate.substring(0, 10) : ''}
                        onChange={(e) => setPayStartDate(e.target.value)} 
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="payEndDate" className="mb-3">
                    <Form.Label column sm={2}><b>Pay End Date</b></Form.Label>
                    <Col sm={10}>
                      <Form.Control 
                        type="date" 
                        value={payEndDate ? payEndDate.substring(0, 10) : ''}
                        onChange={(e) => setPayEndDate(e.target.value)} 
                      />
                    </Col>
                  </Form.Group>

                  <Button variant="primary" onClick={handleDateChange}>Update Dates</Button>
                  
                  <div className="mt-3">
                    <h6 onClick={() => setShow(prevState => !prevState)}>
                      {'👉 '}Click to {!show ? 'SHOW' : 'HIDE'} date range selection options based on start date
                      <div><small>*This is used to select a smaller date range vs the whole year</small></div>
                    </h6>
                    {show && (
                      <div className="justify-content-md-center">
                        {generatePayDates().map((date, index) => (
                          <Col key={index} md="auto">
                            <div className="pay-date">{date}</div>
                          </Col>
                        ))}
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Add Recurring Pay Period Expense</Accordion.Header>
          <Accordion.Body>
          <p>(i.e. Grocery Budget, Donations, etc)</p>
            <Form>
              <Card className="mt-3">
                <Card.Body>
                  <Row className="mb-3">
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

                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenseCategories?.length > 0 && expenseCategories.map(item => (
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
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Danger Area</Accordion.Header>
          <Accordion.Body>
            <Button variant='danger' onClick={handleShowModal}>Delete Account</Button>
            <br />
            <br />
            <h4>Deleting your account will:</h4>
            <ul>
              <li><b>Delete</b> your Auth0 account (the account you registered and login with)</li>
              <li><b>Delete</b> ALL user data from the database</li>
              <li>This action <b>CANNOT</b> be undone</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <ToastContainer position="top-center">
        <Toast bg="success" show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body style={{ color: 'white'}}>
            <h6>{toastMessage}</h6>
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>HOLD UP!🤚</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isProcessing ? (
            <>
              <p>Are you sure you want to delete your account?</p>
              <p>This action is permanent and CANNOT be undone.</p>
            </>
          ) : (
            <div style={{ textAlign: 'center'}}>
              <h5>🛸 Deleting your account and data...</h5>
              <Spinner animation="border" variant="primary" />
          </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Keep enjoying Budget Radness!
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  
 </>
  );
};

export default Settings;