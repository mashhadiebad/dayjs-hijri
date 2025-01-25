# إضافة Day.js Hijri
مكون إضافي خفيف الوزن لإضافة دعم التقويم الهجري إلى مكتبة Day.js.

![npm](https://img.shields.io/npm/v/dayjs-hijri)  
![Downloads](https://img.shields.io/npm/dw/dayjs-hijri)  
![Build Status](https://img.shields.io/github/actions/workflow/status/mashhadiebad/dayjs-hijri/tests.yml)  
[![codecov](https://codecov.io/gh/mashhadiebad/dayjs-hijri/branch/main/graph/badge.svg)](https://codecov.io/gh/mashhadiebad/dayjs-hijri)

يضيف هذا المكون دعم التقويم الهجري (بناءً على حسابات أم القرى) إلى مكتبة Day.js، مما يتيح للمطورين تحويل ومعالجة التواريخ الهجرية بسهولة مع الاستفادة من واجهة برمجة Day.js الخفيفة.

## التثبيت

### باستخدام NPM
```bash
npm install --save dayjs-hijri
```

### باستخدام YARN
```bash
yarn add dayjs-hijri
```

## كيفية الاستخدام
```javascript
import dayjs from 'dayjs'
import dayjsHijri from 'dayjs-hijri'

dayjs.extend(dayjsHijri)
```

### تحليل التواريخ

#### تحليل التاريخ الميلادي:
```javascript
const date = dayjs('2018-04-04T16:00:00.000Z');
```

#### تحليل التاريخ الهجري:
يمنحك كائنًا من Day.js يحتوي فقط على التاريخ الميلادي:
```javascript
const date = dayjs('1446-10-17', { hijri: true });
```

### تغيير التقويم الافتراضي
إذا كنت ترغب في جعل جميع مثيلات `dayjs` تستخدم التقويم الهجري افتراضيًا، يمكنك إعداد التقويم الافتراضي كالتالي:
```javascript
dayjs.calendar('hijri') // التقويم الهجري
// أو
dayjs.calendar('gregory') // التقويم الميلادي
```

#### إنشاء تاريخ هجري دون تغيير التقويم الافتراضي:
```javascript
const date = dayjs()
const hijriDate = date.calendar('hijri')
```

### دعم لغات متعددة
باستخدام `calendar` و`locale` معًا، يمكننا الحصول على تواريخ متعددة اللغات بسهولة:
```javascript
dayjs().calendar('hijri').locale('en').format('DD MMMM YYYY') // '13 Shahrivar 1397'
dayjs().calendar('gregory').locale('ar').format('DD MMMM YYYY') // '04 سپتامبر 2018'
```

## تجربة المكون المباشر
جرب المكون الإضافي مباشرة على CodeSandbox: [افتح التجربة](https://codesandbox.io/s/example-dayjs-hijri).

## الرخصة
MIT © 2025 M25D