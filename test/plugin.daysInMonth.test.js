import dayjs from "dayjs";
import hijri from "../src";

dayjs.extend(hijri);

it("dayInMonth, months with 30 days", () => {
  expect(
    dayjs("1466/01/20", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(30);
  expect(
    dayjs("1446/04/30", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(30);
  expect(
    dayjs("1430/10/02", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(30);
});

it("dayInMonth, months with 29 days", () => {
  expect(
    dayjs("1466/02/11", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(29);
  expect(
    dayjs("1443/10/06", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(29);
  expect(
    dayjs("1446/05/03", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(29);
});

it("dayInMonth, months with 31 days in gregory", () => {
  expect(dayjs("2025/01/13").daysInMonth()).toEqual(31);
});
