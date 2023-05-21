const today = new Date();

function currentDate(): string {
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}

function currentTime(): number {
  return today.getTime();
}

export { currentDate, currentTime };
