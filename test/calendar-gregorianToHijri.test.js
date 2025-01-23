import gregorianToHijri from "../src/calendar/gregorianToHijri";
import calendarData from "./calendar.js";

describe("gregorianToHijri function", () => {
  calendarData.forEach(({ rjd, hy, hm, hd, gy, gm, gd }) => {
    test(`converts ${gy}-${gm}-${gd} to Hijri date ${hy}-${hm}-${hd}`, () => {
      const [hijriYear, hijriMonth, hijriDay] = gregorianToHijri(gy, gm, gd);
      expect(hijriYear).toBe(hy);
      expect(hijriMonth).toBe(hm);
      expect(hijriDay).toBe(hd);
    });
  });
});
