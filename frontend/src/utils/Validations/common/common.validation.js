export const checkNumber = (value) => {
  if (value === undefined || value === null) {
    return false;
  }
  // value = PersianToEnglish(value);
  var patt = new RegExp(`^09[0-9]{2}[0-9]{7}$`);
  return patt.test(value);
};

export function isValidIranianNationalCode(value) {
  if (!/^\d{10}$/.test(value)) return false;

  var check = +value[9];
  var sum = 0;
  var i;
  for (i = 0; i < 9; ++i) {
    sum += +value[i] * (10 - i);
  }
  sum %= 11;

  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
}
