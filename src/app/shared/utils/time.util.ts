const SECONDS = 60;

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':');
  return Number(hours) * SECONDS + Number(minutes);
}

export function minutesToTime(minutes: number): string {
  const totalMinutes = minutes % SECONDS;
  const totalHours = (minutes - totalMinutes) / SECONDS;
  return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}`;
}
