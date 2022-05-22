function createWeek(inputDate) {
  const inputDay = inputDate.getUTCDay();

  // get sunday
  const newDay = new Date(inputDate);
  newDay.setDate(newDay.getUTCDate() - inputDay);
  newDay.setUTCHours(0);
  newDay.setUTCMinutes(0);
  newDay.setUTCSeconds(0);
  newDay.setUTCMilliseconds(0);

  // complete week
  const week = [new Date(newDay)];
  while (
    newDay.setUTCDate(newDay.getUTCDate() + 1) &&
    newDay.getUTCDay() !== 0
  ) {
    week.push(new Date(newDay));
  }
  // push next sunday
  week.push(new Date(newDay));

  return week;
}

const utils = { createWeek };

module.exports = utils;
