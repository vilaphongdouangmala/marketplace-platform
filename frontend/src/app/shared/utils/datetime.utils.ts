export function getTimeFromDateTimeString(dateTime: string) {
  // Parse the string into a Date object
  const date = new Date(dateTime);

  // Get hours and minutes
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Format hours and minutes with leading zeros if necessary
  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

 return `${formattedHours}:${formattedMinutes}`;
}
