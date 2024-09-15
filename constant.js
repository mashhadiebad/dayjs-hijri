export const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})[-/]?(\d{0,2})(.*)?$/;
export const REGEX_FORMAT =
  /\[.*?\]|hY{2,4}|hM{1,4}|hD{1,2}|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

export const DATE = "date";
export const D = "day";
export const M = "month";
export const Y = "year";
export const W = "week";

export const FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";

export const ar = {
  hmonths:
    "مُحَرَّم_صَفَر_رَبِيْعُ الأَوّل_رَبِيْعُ الثَّانِي_جَمَادِي الأَوّل_جَمَادِي الثَّانِي_رَجَب_شَعْبَان_رَمَضَان_شَوَّال_ذُوالْقَعْدَة_ذُوالْحِجَّة".split(
      "_",
    ),
};
