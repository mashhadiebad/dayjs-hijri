import gregorianToHijri from "../src/calendar/gregorianToHijri";
import calendarData from "./calendar.js";
import hijriToGregorian from "../src/calendar/hijriToGregorian";

describe("gregorianToHijri function", () => {
  calendarData.forEach(({ hy, hm, hd, gy, gm, gd }) => {
    test(`converts ${gy}-${gm}-${gd} to Hijri date ${hy}-${hm}-${hd}`, () => {
      const [hijriYear, hijriMonth, hijriDay] = gregorianToHijri(gy, gm, gd);
      expect(hijriYear).toBe(hy);
      expect(hijriMonth).toBe(hm);
      expect(hijriDay).toBe(hd);
    });
  });
});

describe("hijriToGregorian function", () => {
  calendarData.forEach(({ hy, hm, hd, gy, gm, gd }) => {
    test(`converts ${hy}-${hm}-${hd} to Gregorian date ${gy}-${gm}-${gd}`, () => {
      const [gregoryYear, gregoryMonth, gregoryDay] = hijriToGregorian(
        hy,
        hm,
        hd,
      );
      expect(gregoryYear).toBe(gy);
      expect(gregoryMonth).toBe(gm);
      expect(gregoryDay).toBe(gd);
    });
  });
});

describe("hijriMonthLength", () => {
  calendarData.forEach(({ hml, hy, hm, hd, gy, gm, gd }) => {
    test(`get ${gy}-${gm}-${gd} hijri month length ${hy}-${hm}-${hd}`, () => {
      const [hijriYear, hijriMonth, hijriDay, hijriMonthLength] =
        gregorianToHijri(gy, gm, gd);
      expect(hijriMonthLength).toBe(hml);
    });
  });
});
