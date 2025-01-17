/* eslint-disable */
/*
   JavaScript functions for Umm Al-Qura Calendar
   Based on astronomical calculations for Saudi Arabia
   This program is public domain.
*/

// Umm Al-Qura Calendar Data Coefficients
const UMM_AL_QURA_DATA = [
  28607, 28642, 28677, 28712, 28747, 28782, 28817, 28852, 28887, 28922, 28957,
  28992, 29027, 29062, 29097, 29132, 29167, 29202, 29237, 29272, 29307, 29342,
  29377, 29412, 29447, 29482, 29517, 29552, 29587, 29622, 29657, 29692, 29727,
  29762, 29797, 29832, 29867, 29902, 29937, 29972, 30007, 30042, 30077, 30112,
  30147, 30182, 30217, 30252, 30287, 30322, 30357, 30392, 30427, 30462, 30497,
  30532, 30567, 30602, 30637, 30672, 30707, 30742, 30777, 30812, 30847, 30882,
  30917, 30952, 30987, 31022, 31057, 31092, 31127, 31162, 31197, 31232, 31267,
  31302, 31337, 31372, 31407, 31442, 31477, 31512, 31547, 31582, 31617, 31652,
  31687, 31722, 31757, 31792, 31827, 31862, 31897, 31932, 31967, 32002, 32037,
  32072, 32107, 32142, 32177, 32212, 32247, 32282, 32317, 32352, 32387, 32422,
];

// Convert Umm Al-Qura date to Julian Day
function u2j(year, month, day) {
  const startJD = UMM_AL_QURA_DATA[(year - 1300) * 12 + (month - 1)];
  return startJD + day - 1;
}

// Convert Julian Day to Umm Al-Qura date
function j2u(jd) {
  let startYear = 1300;
  let totalMonths = (jd - UMM_AL_QURA_DATA[0]) / 29.5;
  let year = startYear + Math.floor(totalMonths / 12);
  let month = Math.floor(totalMonths % 12);
  let day = jd - u2j(year, month + 1, 1) + 1;

  return [year, month + 1, Math.floor(day)];
}

// Convert Gregorian date to Julian Day
function g2j(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

// Convert Julian Day to Gregorian date
function j2g(jd) {
  let a = jd + 32044;
  let b = Math.floor((4 * a + 3) / 146097);
  let c = a - Math.floor((b * 146097) / 4);

  let d = Math.floor((4 * c + 3) / 1461);
  let e = c - Math.floor((1461 * d) / 4);
  let m = Math.floor((5 * e + 2) / 153);

  let day = e - Math.floor((153 * m + 2) / 5) + 1;
  let month = m + 3 - 12 * Math.floor(m / 10);
  let year = b * 100 + d - 4800 + Math.floor(m / 10);

  return [year, month, day];
}

// Convert Gregorian to Umm Al-Qura
function g2u(year, month, day) {
  const jd = g2j(year, month, day);
  return j2u(jd);
}

// Convert Umm Al-Qura to Gregorian
function u2g(year, month, day) {
  const jd = u2j(year, month, day);
  return j2g(jd);
}

export default {
  toUmmAlQura: g2u, // Gregorian to Umm Al-Qura
  toGregorian: u2g, // Umm Al-Qura to Gregorian
};
