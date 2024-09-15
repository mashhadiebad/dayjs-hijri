import ar from "dayjs/esm/locale/ar";

import hdate from "./calendar.js";
import * as C from "./constant.js";

export default (o, Dayjs, dayjs) => {
  const proto = Dayjs.prototype;
  const U = proto.$utils();
  const $isHijri = (v) => v.$C === "hijri";
  const $prettyUnit = U.prettyUnit || U.p;
  const $isUndefined = U.isUndefined || U.u;
  const $padStart = U.padStart || U.s;
  const $monthDiff = U.monthDiff || U.m;
  const $absFloor = U.absFloor || U.a;
  const wrapperOfTruth = (action) =>
    function (...args) {
      const unsure = action.bind(this)(...args);
      unsure.$C = this.$C;
      if (unsure.isHijri()) {
        unsure.InitHijri();
      }
      return unsure;
    };

  // keep calendar on date manipulation
  proto.startOf = wrapperOfTruth(proto.startOf);
  proto.endOf = wrapperOfTruth(proto.endOf);
  proto.add = wrapperOfTruth(proto.add);
  proto.subtract = wrapperOfTruth(proto.subtract);
  proto.set = wrapperOfTruth(proto.set);
  const oldParse = proto.parse;
  const oldInit = proto.init;
  const oldStartOf = proto.startOf;
  const old$Set = proto.$set;
  const oldAdd = proto.add;
  const oldFormat = proto.format;
  const oldDiff = proto.diff;
  const oldYear = proto.year;
  const oldMonth = proto.month;
  const oldDate = proto.date;
  const oldDaysInMonth = proto.daysInMonth;
  const oldToArray = proto.toArray;

  dayjs.$C = "gregory";
  // First Day Of Week
  dayjs.$fdow = 6; // 0: sunday, ...

  dayjs.calendar = function (calendar) {
    dayjs.$C = calendar;
    return dayjs;
  };

  proto.calendar = function (calendar) {
    const that = this.clone();
    that.$C = calendar;
    if (that.isHijri()) {
      that.InitHijri();
    }
    return that;
  };

  proto.isHijri = function () {
    return $isHijri(this);
  };

  dayjs.en.hmonths =
    "Muharram_Safar_Rabi al-Awwal_Rabi al-Thani_Jumada al-Awwal_Jumada al-Thani_Rajab_Shaban_Ramadan_Shawwal_Dhu al-Qadah_Dhu al-Hijjah".split(
      "_",
    );
  dayjs.locale("ar", { ...ar, ...C.ar }, true);

  const wrapper = function (date, instance) {
    return dayjs(date, {
      locale: instance.$L,
      utc: instance.$u,
      calendar: instance.$C,
    });
  };

  proto.init = function (cfg = {}) {
    oldInit.bind(this)(cfg);

    if (this.isHijri()) {
      this.InitHijri();
    }
  };

  proto.parse = function (cfg) {
    let reg;
    this.$C = cfg.calendar || this.$C || dayjs.$C;
    // eslint-disable-next-line no-cond-assign
    if (
      cfg.jalali &&
      typeof cfg.date === "string" &&
      /.*[^Z]$/i.test(cfg.date) && // looking for a better way
      (reg = cfg.date.match(C.REGEX_PARSE))
    ) {
      // 1397-08-08 or 13970808
      const [y, m, d] = hdate.G(
        parseInt(reg[1], 10),
        parseInt(reg[2], 10),
        parseInt(reg[3] || 1, 10),
      );
      cfg.date = `${y}-${m}-${d}${reg[4] || ""}`;
    }
    return oldParse.bind(this)(cfg);
  };

  proto.InitHijri = function () {
    const [hy, hm, hd] = hdate.J(this.$y, this.$M + 1, this.$D);
    this.$hy = hy;
    this.$hM = hm - 1;
    this.$hD = hd;
  };

  proto.startOf = function (units, startOf) {
    // startOf -> endOf
    if (!$isHijri(this)) {
      return oldStartOf.bind(this)(units, startOf);
    }
    const isStartOf = !$isUndefined(startOf) ? startOf : true;
    const unit = $prettyUnit(units);
    const instanceFactory = (d, m, y = this.$hy) => {
      const [gy, gm, gd] = hdate.G(y, m + 1, d);
      const ins = wrapper(new Date(gy, gm - 1, gd), this);
      return (isStartOf ? ins : ins.endOf(C.D)).$set("hour", 1); // prevent daylight saving issue in safari
    };
    const WModifier = (this.$W + (7 - dayjs.$fdow)) % 7;
    switch (unit) {
      case C.Y:
        return isStartOf
          ? instanceFactory(1, 0)
          : instanceFactory(0, 0, this.$hy + 1);
      case C.M:
        return isStartOf
          ? instanceFactory(1, this.$hM)
          : instanceFactory(
              0,
              (this.$hM + 1) % 12,
              this.$hy + parseInt((this.$hM + 1) / 12, 10),
            );
      case C.W:
        return isStartOf
          ? instanceFactory(this.$hD - WModifier, this.$hM)
          : instanceFactory(this.$hD + (6 - WModifier), this.$hM);
      default:
        return oldStartOf.bind(this)(units, startOf);
    }
  };

  proto.$set = function (units, int) {
    if (!$isHijri(this)) {
      return old$Set.bind(this)(units, int);
    }
    const unit = $prettyUnit(units);
    const instanceFactory = (d, m, y = this.$hy) => {
      const [gy, gm, gd] = hdate.G(y, m + 1, d);
      this.$d.setFullYear(gy);
      this.$d.setMonth(gm - 1);
      this.$d.setDate(gd);
      return this;
    };
    switch (unit) {
      case C.DATE:
      case C.D:
        instanceFactory(int, this.$hM);
        break;
      case C.M:
        instanceFactory(this.$hD, int);
        break;
      case C.Y:
        instanceFactory(this.$hD, this.$hM, int);
        break;
      default:
        return old$Set.bind(this)(units, int);
    }
    this.init();
    return this;
  };

  proto.add = function (number, units) {
    if (!$isHijri(this)) {
      return oldAdd.bind(this)(number, units);
    }
    number = Number(number); // eslint-disable-line no-param-reassign
    // units === 'ms' hard code here, will update in next release
    const unit =
      units && (units.length === 1 || units === "ms")
        ? units
        : $prettyUnit(units);
    const instanceFactory = (u, n) => {
      const date = this.set(C.DATE, 1).set(u, n + number);
      return date.set(C.DATE, Math.min(this.$hD, date.daysInMonth()));
    };
    if (["M", C.M].indexOf(unit) > -1) {
      const n = this.$hM + number;
      const y = n < 0 ? -Math.ceil(-n / 12) : parseInt(n / 12, 10);
      const d = this.$hD;
      const x = this.set(C.D, 1)
        .add(y, C.Y)
        .set(C.M, n - y * 12);
      return x.set(C.D, Math.min(x.daysInMonth(), d));
    }
    if (["y", C.Y].indexOf(unit) > -1) {
      return instanceFactory(C.Y, this.$hy);
    }
    if (["d", C.D].indexOf(unit) > -1) {
      const date = new Date(this.$d);
      date.setDate(date.getDate() + number);
      return wrapper(date, this);
    }

    return oldAdd.bind(this)(number, units);
  };

  proto.format = function (formatStr, localeObject) {
    if (!$isHijri(this)) {
      return oldFormat.bind(this)(formatStr, localeObject);
    }
    const str = formatStr || C.FORMAT_DEFAULT;
    const locale = localeObject || this.$locale();
    const { hmonths } = locale;
    return str.replace(C.REGEX_FORMAT, (match) => {
      if (match.indexOf("[") > -1) return match.replace(/\[|\]/g, "");
      switch (match) {
        case "YY":
          return String(this.$hy).slice(-2);
        case "YYYY":
          return String(this.$hy);
        case "M":
          return String(this.$hM + 1);
        case "MM":
          return $padStart(this.$hM + 1, 2, "0");
        case "MMM":
          return hmonths[this.$hM].slice(0, 3);
        case "MMMM":
          return hmonths[this.$hM];
        case "D":
          return String(this.$hD);
        case "DD":
          return $padStart(this.$hD, 2, "0");
        default:
          return oldFormat.bind(this)(match, localeObject);
      }
    });
  };

  proto.diff = function (input, units, float) {
    if (!$isHijri(this)) {
      return oldDiff.bind(this)(input, units, float);
    }
    const unit = $prettyUnit(units);
    const that = dayjs(input);
    let result = $monthDiff(this, that);
    switch (unit) {
      case C.Y:
        result /= 12;
        break;
      case C.M:
        break;
      default: // milliseconds
        return oldDiff.bind(this)(input, units, float);
    }
    return float ? result : $absFloor(result);
  };

  proto.$g = function (input, get, set) {
    if ($isUndefined(input)) return this[get];
    return this.set(set, input);
  };

  proto.year = function (input) {
    if (!$isHijri(this)) {
      return oldYear.bind(this)(input);
    }
    return this.$g(input, "$hy", C.Y);
  };

  proto.month = function (input) {
    if (!$isHijri(this)) {
      return oldMonth.bind(this)(input);
    }
    return this.$g(input, "$hM", C.M);
  };

  proto.date = function (input) {
    if (!$isHijri(this)) {
      return oldDate.bind(this)(input);
    }
    return this.$g(input, "$hD", C.D);
  };

  proto.daysInMonth = function () {
    if (!$isHijri(this)) {
      return oldDaysInMonth.bind(this)();
    }
    return this.endOf(C.M).$hD;
  };

  /**
   * toArray function moved to official plugin
   * Check function existence before override
   */
  if (oldToArray) {
    proto.toArray = function () {
      if (!$isHijri(this)) {
        return oldToArray.bind(this)();
      }
      return [
        this.$hy,
        this.$hM,
        this.$hD,
        this.$H,
        this.$m,
        this.$s,
        this.$ms,
      ];
    };
  }

  proto.clone = function () {
    return wrapper(this.toDate(), this);
  };
};
