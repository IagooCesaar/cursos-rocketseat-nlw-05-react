export function convertDurationToTimeSting(duration: number): string {
  // console.log('durantion', duration)
  const oneHour = 60 * 60;
  const hours = Math.floor(duration / oneHour);
  const minutes = Math.floor((duration % oneHour) / 60)
  const seconds = Math.floor(duration % 60);

  const timeString = [hours, minutes, seconds]
    .map(
      unit => String(unit).padStart(2, '0')
    )
    .join(':');
  return timeString
}