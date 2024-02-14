const parseDate = (startDate, timezoneOffsetHours) => {
  const startDateObject = new Date(startDate);
  const timezoneOffsetMinutes = timezoneOffsetHours * 60;

  const year = startDateObject.getFullYear();
  const month = String(startDateObject.getMonth() + 1).padStart(2, '0'); // Adjust for zero-based months
  const day = String(startDateObject.getDate()).padStart(2, '0');

  // Construct the date string with the specified timezone offset
  return `${year}-${month}-${day}T00:00:00${timezoneOffsetMinutes >= 0 ? '+' : '-'}${Math.abs(timezoneOffsetMinutes / 60).toString().padStart(2, '0')}:${Math.abs(timezoneOffsetMinutes % 60).toString().padStart(2, '0')}`;
};

export default parseDate;
