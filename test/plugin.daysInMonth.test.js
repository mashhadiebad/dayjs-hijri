import dayjs from "dayjs";
import hijri from "../src";

dayjs.extend(hijri);

it("dayInMonth, months with 30 days", () => {
  expect(
    dayjs("1446/07/13", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(30);
  expect(
    dayjs("1446/09/01", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(30);
  expect(
    dayjs("1446/11/13", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(30);
});

it("dayInMonth, months with 29 days", () => {
  expect(
    dayjs("1446/08/13", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(29);
  expect(
    dayjs("1446/10/01", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(29);
  expect(
    dayjs("1446/12/03", { hijri: true }).calendar("hijri").daysInMonth(),
  ).toEqual(29);
});

it("dayInMonth, months with 31 days in gregory", () => {
  expect(dayjs("2025/01/13").daysInMonth()).toEqual(31);
});
