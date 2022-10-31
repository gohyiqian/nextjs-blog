---
title: 'All about Date'
date: '2022-10-31'
---

**Get the time now using `Date() constructor`:**

```javascript
const now = new Date();
// Mon Oct 31 2022 21:36:51 GMT+0800 (Singapore Standard Time)
```

**Get Month and Year:**

```javascript
now.getFullYear(); // 2022
now.getMonth(); // 10
```

**Get First Day of Current Month**

```javascript
const first_day_of_curr_mth = new Date(now.getFullYear(), now.getMonth(), 1);
// Sat Oct 01 2022 00:00:00 GMT+0800 (Singapore Standard Time)
```

**Get Last Day of Current Month**

```javascript
const last_day_of_curr_mth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
// Mon Oct 31 2022 00:00:00 GMT+0800 (Singapore Standard Time)
```

[Read More](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)
