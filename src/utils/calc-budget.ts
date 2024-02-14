const calculateBudget = (bills, start, end, income, tithe, grocery) => {
  let leftover = income;

  const { totalBillAmount, billNames } = bills.reduce(
      (accumulator, bill) => {
        let billYear = start.getFullYear();
        let billMonth = start.getMonth();

        // Check if the bill due date is in the next month
        if (bill.dueDate < start.getDate()) {
          billMonth++;
          if (billMonth > 11) {
            billMonth = 0;
            billYear++;
          }
        }

        const billDueDate = new Date(billYear, billMonth, bill.dueDayOfMonth);

        if (billDueDate >= start && billDueDate <= end) {
          accumulator.totalBillAmount += bill.billAmount;
          accumulator.billNames.push(bill.name);
        }

        return accumulator;
      },
      { totalBillAmount: 0, billNames: [] }
  );

  leftover -= totalBillAmount;
  leftover -= tithe;
  leftover -= grocery;
  billNames.push("Tithing", "Grocery Budget");

  return {
    leftoverSpending: leftover.toFixed(2),
    totalBillAmount: totalBillAmount.toFixed(2),
    billNames: billNames.join(', ')
  };
};


export default calculateBudget;
