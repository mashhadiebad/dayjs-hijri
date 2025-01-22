import { HIJRI_OFFSET, MONTH_STARTS } from "./constant.js";

function jdnToOrdinal(jdn) {
  return jdn - 1721425;
}

function rjdToJdn(rjd) {
  return rjd + 2400000;
}

function monthIndex(year, month) {
  const priorMonths = (year - 1) * 12 + month - 1;
  return priorMonths - HIJRI_OFFSET;
}

function toJulian(year, month, day) {
  const index = monthIndex(year, month);
  const rjd = MONTH_STARTS[index] + day - 1;
  return rjdToJdn(rjd);
}

function toGregorianFromJulian(jdn) {
  const ordinal = jdnToOrdinal(jdn);
  const date = new Date((ordinal - 719163) * 86400000);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

function hijriToGregorian(year, month, day) {
  const jdn = toJulian(year, month, day);
  const gregorian = toGregorianFromJulian(jdn);
  return [gregorian.year, gregorian.month, gregorian.day];
}

export default hijriToGregorian;
