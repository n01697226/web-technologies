import bob from "lodash";

const holidays = [
  { name: "Christmas", date: new Date("2025-12-25") },
  { name: "Canada Day", date: new Date("2025-07-01") },
  { name: "New Years", date: new Date("2026-01-01") },
  { name: "My Birthday", date: new Date("2025-10-21") },
];

let today = new Date();

holidays.forEach((holiday) => {
  const timeDifference = holiday.date - today;
  const daysTill = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  console.log(`${holiday.name} is in ${daysTill} days`);
});

const randomHoliday = bob.sample(holidays);
console.log(randomHoliday);

const indexChristmas = bob.findIndex(holidays, { name: "Christmas" });
console.log(`Index of Christmas: ${indexChristmas}`);

const indexCanadaDay = bob.findIndex(holidays, { name: "Canada Day" });
console.log(`Index of Canada Day: ${indexCanadaDay}`);
