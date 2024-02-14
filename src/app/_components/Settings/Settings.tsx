import React, {useEffect, useState} from 'react';
import {Container, Button, Col, Form, Row, Card} from "react-bootstrap";
import {useBillService} from "../../_services/useBillService";
import useDebounce from "../../_hooks/useDebounce";

const Settings = () => {
  const billService = useBillService();
  const startDate = billService?.paymentOptions?.payStartDate;
  const endDate = billService?.paymentOptions?.payEndDate;
  const [show, setShow] = useState(false);
  const [activeBill, setActiveBill] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [state, setState] = useState({
    payStartDate: startDate,
    payEndDate: endDate,
    biWeeklyIncome: 4912,
    expenseCategories: [],
  });

  const debouncedValue = useDebounce(state, 1000);


  useEffect(() => {
    console.log('state effect');
  }, [debouncedValue]);
console.log(billService);

  const hello = () => {
    const paymentOptions = {
      payStartDate: '2024-01-04T00:00:00-06:00',
      payEndDate: '2024-12-19T00:00:00-06:00',
    }
  const financialDetails = {
    annualIncome: 152000,
    payDayAmount: 4912,
    paymentSchedule: 'bi-weekly'
  }

  const expenseCategory =  {
      // _id: '65c95ca1b4f8a3e11b407530', amount: 250
      // _id: '65c9649cb4f8a3e11b407792', amount: 1200
    name: 'Stuff', amount: 200
    }

    billService.setState('paymentOptions', {expenseCategory});
  }

  const handleAddExpenseClicked = () => {

  }

  const handleInputChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const generatePayDates = () => {
    let dates = [];
    let currentDate = new Date(startDate);
    const endDateObject = new Date(endDate);

    while (currentDate <= endDateObject) {
      dates.push(currentDate.toLocaleDateString());
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 14));
    }

    return dates;
  }

  return (
     <Container>
       {/*<button onClick={hello}>Hello</button>*/}
       <Form>

        <Card>
          <Card.Body>
            {/* Bi-Weekly Income */}
            <Form.Group>
              <Form.Label><b>Bi-Weekly Income ($):</b></Form.Label>
              <Col>
                <Form.Control
                    type="number"
                    value={state.biWeeklyIncome}
                    onChange={(e) => handleInputChange('biWeeklyIncome', parseFloat(e.target.value))}
                />
              </Col>
            </Form.Group>
            <br/>
            <div>Select a Date rang to forecast pay periods.
              <small><i>(i.e first pay date and last pay date of year)</i></small>
            </div>
            {/* Start Date */}
            <Form.Group>
              <Form.Label><b>Start Date:</b></Form.Label>
              <Col>
                <Form.Control
                    type="date"
                    value={startDate?.substring(0, 10)}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </Col>
            </Form.Group>
            {/* End Date */}
            <Form.Group>
              <Form.Label><b>End Date:</b></Form.Label>
              <Col>
                <Form.Control
                    type="date"
                    value={endDate?.substring(0, 10)}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </Col>
            </Form.Group>
            <br/>
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
               <h3>Add Recurring Expense</h3>
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
                 <Button onClick={handleAddExpenseClicked}>Add Expense</Button>
               </Col>
             </Row>
           </Card.Body>
         </Card>
       </Form>
       {billService.expenseCategories.map(item => (
           <div>{item.name}: {item.amount}</div>
       ))}
      </Container>
  );
};

export default Settings;


