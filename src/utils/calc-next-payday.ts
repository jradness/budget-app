export const addDaysUTC = (date, days) => {
  const d = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ));
  d.setUTCDate(d.getUTCDate() + days);
  return d;
};

export const calculateNextPayday = (paydayStart, paymentSchedule) => {
  let paydayInterval;

  switch (paymentSchedule) {
    case 'weekly':
      paydayInterval = 7;
      break;
    case 'bi-weekly':
      paydayInterval = 14;
      break;
    case 'yearly':
      paydayInterval = 365;
      break;
    default:
      throw new Error('Unsupported schedule');
  }

  // Budget runs payday → day before next payday
  return addDaysUTC(paydayStart, paydayInterval - 1);
};
