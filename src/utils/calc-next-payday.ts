const calculateNextPayday = (currentDate, paymentSchedule) => {
  const nextPayday = new Date(currentDate);
  let payPeriodLength = 0;
  const fixedBiWeeklyPay = 13;
  switch(paymentSchedule) {
    case 'weekly':
      payPeriodLength = 7
      break;
    case 'bi-weekly':
      payPeriodLength = 14
      break;
    case 'monthly':
      payPeriodLength = 0 // length of current month
      break;
    case 'yearly':
      payPeriodLength = 365
      break;
  }
  payPeriodLength -= 1;
  nextPayday.setDate(nextPayday.getDate() + fixedBiWeeklyPay);
  return nextPayday;
}

export default calculateNextPayday;
