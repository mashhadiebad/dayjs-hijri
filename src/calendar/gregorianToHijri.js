import { HIJRI_OFFSET, MONTH_STARTS } from "./constant.js";

function gregorianToJulianDayNumber(year, month, day) {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const julianDayNumber =
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    B -
    1524.5;
  return julianDayNumber;
}

function FindTheUmmAlQuraMonthDataIndex(modifiedChronologicalJulianDayNumber) {
  let i;
  for (i = 0; i < MONTH_STARTS.length; i++) {
    if (MONTH_STARTS[i] > modifiedChronologicalJulianDayNumber) break;
  }
  return i;
}

const gregorianToHijri = (year, month, day) => {
  const JulianDayNumber = gregorianToJulianDayNumber(year, month, day);
  const modifiedChronologicalJulianDayNumber = JulianDayNumber - 2400000;
  const monthDataIndex = FindTheUmmAlQuraMonthDataIndex(
    modifiedChronologicalJulianDayNumber,
  );
  let hijriMonth;
  let hijriDay;
  const hijriLunarNumber = monthDataIndex + HIJRI_OFFSET;
  const hijriYear = Math.floor((hijriLunarNumber - 1) / 12) + 1;
  const calculatedHijriDay =
    modifiedChronologicalJulianDayNumber - MONTH_STARTS[monthDataIndex - 1] + 1;
  const calculatedHijriMonth = hijriLunarNumber - 12 * (hijriYear - 1);
  const hijriMonthLength =
    MONTH_STARTS[monthDataIndex] - MONTH_STARTS[monthDataIndex - 1];

  if (calculatedHijriDay > hijriMonthLength && calculatedHijriMonth === 12) {
    hijriMonth = 1;
    hijriDay = 1;
  } else if (
    calculatedHijriDay > hijriMonthLength &&
    calculatedHijriMonth !== 12
  ) {
    hijriMonth = calculatedHijriMonth + 1;
    hijriDay = 1;
  } else {
    hijriMonth = Math.ceil(calculatedHijriMonth);
    hijriDay = Math.ceil(calculatedHijriDay);
  }
  return [hijriYear, hijriMonth, hijriDay];
};

export default gregorianToHijri;
