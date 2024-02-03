export function getTimeFromDateTimeString(dateTime: string) {
  // Parse the string into a Date object
  const date = new Date(dateTime);

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes with leading zeros if necessary
  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

 return `${formattedHours}:${formattedMinutes}`;
}

export function getDynamicTimeDifference(stringDateTime: string) {
  const dateTime = new Date(stringDateTime);
  const currentDateTime = new Date();
  const dateTimeDifference = currentDateTime.getTime() - dateTime.getTime();
  const dateTimeDifferenceInHours = dateTimeDifference / (1000 * 60 * 60);

  if (dateTimeDifferenceInHours > 24) {
    return dateTime.toISOString().split('T')[0];
  }

  const dateTimeDifferenceInMinutes = dateTimeDifference / (1000 * 60);
  
  if (dateTimeDifferenceInMinutes > 60) {
    return `${new Date(dateTimeDifferenceInHours).getHours()}h`;
  }

  const dateTimeDifferenceInSeconds = dateTimeDifference / 1000;
  if (dateTimeDifferenceInSeconds > 60) {
    return `${new Date(dateTimeDifferenceInHours).getMinutes()}m`;
  }

  return `${new Date(dateTimeDifferenceInSeconds).getSeconds()}s`;
}
