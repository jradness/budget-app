const calculateBudget = (monthlyBills, currentDate, nextPayday, payDayAmount, payPeriodExpenses) => {
  let leftover = payDayAmount;

  const { totalBillAmount, billNames } = monthlyBills.reduce(
      (accumulator, bill) => {
        let billYear = currentDate.getFullYear();
        let billMonth = currentDate.getMonth();

        // Check if the bill due date is in the next month
        if (bill.dueDayOfMonth < currentDate.getDate()) {
          billMonth++;
          if (billMonth > 11) {
            billMonth = 0;
            billYear++;
          }
        }

        const billDueDate = new Date(billYear, billMonth, bill.dueDayOfMonth);

        if (billDueDate >= currentDate && billDueDate <= nextPayday) {
          accumulator.totalBillAmount += bill.billAmount;
          accumulator.billNames.push(bill.name);
        }

        return accumulator;
      },
      { totalBillAmount: 0, billNames: [] }
  );

  leftover -= totalBillAmount;
  for (const { name, amount } of payPeriodExpenses) {
    leftover -= amount;
    billNames.push(`[${name}]`);
  }

  return {
    leftoverSpending: leftover.toFixed(2),
    totalBillAmount: totalBillAmount.toFixed(2),
    billNames: billNames.join(', ')
  };
};

export default calculateBudget;
