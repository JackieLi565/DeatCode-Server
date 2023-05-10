export default function currentDate(time = false): string | number {
  const today = new Date();

  if (time) {
    return today.getTime();
  }

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}
