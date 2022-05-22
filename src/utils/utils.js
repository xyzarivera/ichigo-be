function createWeek(inputDate) {
  const inputDay = inputDate.getUTCDay();

  // get sunday
  const newDay = new Date(inputDate);
  console.log("date", newDay.getUTCDate());
  console.log("day", inputDay);
  if (inputDay !== 0) {
    newDay.setDate(newDay.getUTCDate() - inputDay);
  }
  newDay.setUTCHours(0);
  newDay.setUTCMinutes(0);
  newDay.setUTCSeconds(0);
  newDay.setUTCMilliseconds(0);
  console.log("newDay", newDay);

  // complete week
  const week = [new Date(newDay)];
  for (let i = 0; i < 8; i++) {
    newDay.setUTCDate(newDay.getUTCDate() + 1);
    week.push(new Date(newDay));
  }

  return week;
}

const utils = { createWeek };

module.exports = utils;
