const isDateRangeActive = (start, end) => {
  const currentDate = new Date();
  return currentDate >= start && currentDate <= end;
}

export default isDateRangeActive;
