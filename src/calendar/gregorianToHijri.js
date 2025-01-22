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
    1524;
  return julianDayNumber;
}

function FindTheUmmAlQuraMonthDataIndex(modifiedChronologicalJulianDayNumber) {
  return MONTH_STARTS.findIndex(
    (start) => start >= modifiedChronologicalJulianDayNumber,
  );
}

const gregorianToHijri = (year, month, day) => {
  const JulianDayNumber = gregorianToJulianDayNumber(year, month, day);
  const modifiedChronologicalJulianDayNumber = JulianDayNumber - 2400000;
  // const monthDataIndex = FindTheUmmAlQuraMonthDataIndex(
  //   modifiedChronologicalJulianDayNumber,
  // );
  // let hijriMonth;
  // let hijriDay;
  // const hijriLunarNumber = monthDataIndex + HIJRI_OFFSET;
  // const hijriYear = Math.floor((hijriLunarNumber - 1) / 12) + 1;
  // const calculatedHijriDay =
  //   modifiedChronologicalJulianDayNumber - MONTH_STARTS[monthDataIndex - 1] + 1;
  // const calculatedHijriMonth = hijriLunarNumber - 12 * (hijriYear - 1);
  // const hijriMonthLength =
  //   MONTH_STARTS[monthDataIndex + 1] - MONTH_STARTS[monthDataIndex];
  //
  // if (calculatedHijriDay > hijriMonthLength && calculatedHijriMonth === 12) {
  //   console.log({
  //     condition: 1,
  //     calculatedHijriDay,
  //     calculatedHijriMonth,
  //     hijriMonthLength,
  //   });
  //   hijriMonth = 1;
  //   hijriDay = 1;
  // } else if (
  //   calculatedHijriDay > hijriMonthLength &&
  //   calculatedHijriMonth !== 12
  // ) {
  //   console.log({
  //     condition: 2,
  //     calculatedHijriDay,
  //     calculatedHijriMonth,
  //     hijriMonthLength,
  //   });
  //   hijriMonth = calculatedHijriMonth + 1;
  //   hijriDay = 1;
  // } else {
  //   console.log({
  //     condition: 3,
  //     calculatedHijriDay,
  //     calculatedHijriMonth,
  //     hijriMonthLength,
  //   });
  //   hijriMonth = Math.ceil(calculatedHijriMonth);
  //   hijriDay = Math.ceil(calculatedHijriDay);
  // }
  // }
  const bisect = (arr, x) => {
    let low = 0;
    let high = arr.length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (arr[mid] < x) low = mid + 1;
      else high = mid;
    }
    return low;
  };
  const index = MONTH_STARTS.includes(modifiedChronologicalJulianDayNumber)
    ? bisect(MONTH_STARTS, modifiedChronologicalJulianDayNumber)
    : bisect(MONTH_STARTS, modifiedChronologicalJulianDayNumber) - 1;
  const months = index + HIJRI_OFFSET;
  const years = months / 12;
  const hijriYear = Math.floor(years) + 1;
  const hijriMonth = months - Math.floor(years) * 12 + 1;
  const hijriDay = MONTH_STARTS.includes(modifiedChronologicalJulianDayNumber)
    ? 1
    : modifiedChronologicalJulianDayNumber - MONTH_STARTS[index] + 1;
  const hijriMonthLength = MONTH_STARTS.includes(
    modifiedChronologicalJulianDayNumber,
  )
    ? MONTH_STARTS[index + 2] - MONTH_STARTS[index + 1]
    : MONTH_STARTS[index + 1] - MONTH_STARTS[index];
  return [hijriYear, hijriMonth, hijriDay, hijriMonthLength];
};

export default gregorianToHijri;
