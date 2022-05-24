function createWeek(inputDate) {
  const inputDay = inputDate.getUTCDay();

  // get sunday
  const newDay = new Date(inputDate);
  if (inputDay !== 0) {
    newDay.setDate(newDay.getUTCDate() - inputDay);
  }
  newDay.setUTCHours(0);
  newDay.setUTCMinutes(0);
  newDay.setUTCSeconds(0, 0);

  // complete week
  const week = [`${new Date(newDay).toISOString().split(".")[0]}Z`];
  for (let i = 0; i < 8; i++) {
    newDay.setUTCDate(newDay.getUTCDate() + 1);
    week.push(`${new Date(newDay).toISOString().split(".")[0]}Z`);
  }

  return week;
}

const utils = { createWeek };

module.exports = utils;
