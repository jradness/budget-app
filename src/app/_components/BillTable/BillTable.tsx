'use client'
import React, { useState, useMemo } from 'react';
import {Spinner, Modal, Table, Button, Form, Row, Col, Card, Container, ToastContainer, Toast} from 'react-bootstrap';
import {useBillService} from "../../_services/useBillService";

const INIT_BILL = { name: '', dueDayOfMonth: '', billAmount: '' };

const BillsList = () => {
  const { monthlyBills, handleBill, deleteBill} = useBillService()
  const [activeBill, setActiveBill] = useState(INIT_BILL);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Toast will disappear after 3 seconds
  };

  const handleEditClick = (bill) => {
    setIsEditing(true)
    setActiveBill({ ...bill });
  };

  const cancelEdit = () => {
    setActiveBill(INIT_BILL);
    setIsEditing(false);
  }

  const handleSaveClick = async () => {
    const cleanedBill = {
      ...activeBill,
      dueDate: parseInt(activeBill.dueDayOfMonth),
      amount: parseFloat(activeBill.billAmount)
    };
    await handleBill(cleanedBill);
    if (cleanedBill?._id) {
      displayToast('Bill updated successfully');
    } else {
      displayToast('Added Bill successfully');
    }
    setActiveBill(INIT_BILL);
    setIsEditing(false);
  };

  const handleConfirmDelete = (bill) => {
    handleShowModal();
    setActiveBill(bill);
  }

  const handleDeleteBill = async () => {
    try {
      setIsProcessing(true);
      await deleteBill(activeBill);
      setIsProcessing(false);
      setShowModal(false);
      setActiveBill(INIT_BILL);
      displayToast('Bill deleted successfully');
    } catch (error) {
      console.log('Error deleting bill')
    }
  }

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setActiveBill(prevState => ({ ...prevState, [field]: value }));
  };

  const renderBillField = (bill, field) => {
    if (activeBill._id === bill._id) {
      return (
        <Form.Control
          type="text"
          value={activeBill[field]}
          onChange={(e) => handleInputChange(e, field)}
        />
      );
    }
    return bill[field];
  };

  const sortedBills = useMemo(() => monthlyBills?.sort((a, b) => a.dueDayOfMonth - b.dueDayOfMonth), [monthlyBills]);
  const totalBillsAmount = useMemo(() => sortedBills?.reduce((accumulator, bill) => {
    return accumulator + bill.billAmount;
  }, 0), [sortedBills]);

  return (
    <Container>
      <h2>Bill Management</h2>
        <Card>
          <Card.Body>
            <h4>Add a Bill</h4>
            <Form className="pb-5">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Bill Name"
                    value={!isEditing ? activeBill.name : null}
                    onChange={(e) => setActiveBill(prevState => ({ ...prevState, name: e.target.value }))}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Due Date (Day of Month)"
                    value={!isEditing && activeBill.dueDayOfMonth}
                    onChange={(e) => setActiveBill(prevState => ({ ...prevState, dueDayOfMonth: e.target.value }))}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Amount ($)"
                    value={!isEditing && activeBill.billAmount}
                    onChange={(e) => setActiveBill(prevState => ({ ...prevState, billAmount: e.target.value }))}
                  />
                </Col>
                <Col>
                  <Button onClick={handleSaveClick}>Add New Bill</Button>
                </Col>
              </Row>
            </Form>
            <h4>Current Bills: ${totalBillsAmount?.toFixed(2)}/mo</h4>
            <Table striped bordered hover size="sm">
              <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th className="text-end">Due Date</th>
                <th className="text-end">Amount</th>
                <th className="text-end">Actions</th>
              </tr>
              </thead>
              <tbody>
              {sortedBills ? sortedBills.map((bill, index) => (
                <tr key={bill._id}>
                  <td>{index + 1}</td>
                  <td>{renderBillField(bill, 'name')}</td>
                  <td className="text-end">{renderBillField(bill, 'dueDayOfMonth')}</td>
                  <td className="text-end">{renderBillField(bill, 'billAmount')}</td>
                  <td className="text-end">
                    {activeBill._id === bill._id ? (
                      <>
                      <Button variant="success" onClick={handleSaveClick}>Save</Button>
                      {' '}
                      <Button variant="danger" onClick={cancelEdit}>Cancel</Button>
                      </>
                  ) : (
                      <>
                      <Button variant="info" onClick={() => handleEditClick(bill)}>Edit</Button>
                      {' '}
                      <Button variant="danger" onClick={() => handleConfirmDelete(bill)}>Delete</Button>
                      </>
                    )}
                  </td>
                </tr>
              )) : null}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
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
              <p>Are you sure you want to delete this bill?</p>
            </>
          ) : (
            <div style={{ textAlign: 'center'}}>
              <h5>Deleting bill...</h5>
              <Spinner animation="border" variant="primary" />
          </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Nevermind, keep this bill
          </Button>
          <Button variant="danger" onClick={handleDeleteBill}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BillsList;
