# Day.js Hijri Plugin
A lightweight Day.js plugin for Hijri calendar conversion and formatting.

![npm](https://img.shields.io/npm/v/dayjs-hijri)
![Downloads](https://img.shields.io/npm/dw/dayjs-hijri)
![Build Status](https://img.shields.io/github/actions/workflow/status/mashhadiebad/dayjs-hijri/tests.yml)
[![codecov](https://codecov.io/gh/mashhadiebad/dayjs-hijri/branch/main/graph/badge.svg)](https://codecov.io/gh/mashhadiebad/dayjs-hijri)


This plugin adds Hijri calendar (Based on Umm al-Qura calculations) support to Day.js, enabling developers to seamlessly convert and manipulate Hijri dates while leveraging Day.js's lightweight API.

## Installation
NPM
```
npm install --save dayjs-hijri
```
YARN
```
yarn add dayjs-hijri
```

## Usage
```javascript
import dayjs from 'dayjs'
import dayjsHijri from 'dayjs-hijri'

dayjs.extend(dayjsHijri)
```

### Parse Date
- Parse Gregory date
```js
const date = dayjs('2025-01-07T16:00:00.000Z');
```
- Parse hijri date that only gives you a dayjs object that has only Gregory date
```js
const date = dayjs('1446-10-17', { hijri: true });
```

### Changing calendar
If you want to all new instanses of dayjs use `hijri` calendar, you can set default calendar
```javascript
dayjs.calendar('hijri') // hijri Calendar
// OR
dayjs.calendar('gregory') // Gregorian Calendar
```

also you can create a hijri date without changing default calendar
```javascript
const date = dayjs()
const hijriDate = date.calendar('hijri')
```

### Multiple Locale
with combination of `calendar` and `locale` we have multi language for real
```javascript
dayjs('2025-01-07').calendar('hijri').locale('en').format('DD MMMM YYYY') // '07 Rajab 1446'
dayjs('1446-07-07').calendar('gregory').locale('ar').format('DD MMMM YYYY') // '07 ینایر 2025'
```

## Live Demo
Try the plugin live on CodeSandbox: [Open Demo](https://codesandbox.io/s/example-dayjs-hijri).

## License
MIT © 2025 M25D