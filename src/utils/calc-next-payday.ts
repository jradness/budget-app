const calculateNextPayday = (currentDate) => {
  const nextPayday = new Date(currentDate);
  nextPayday.setDate(nextPayday.getDate() + 13);
  return nextPayday;
}

export default calculateNextPayday;
