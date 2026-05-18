import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const PersianDateConverter = (date) => {
  if (!date) return "";

  const d = new Date(date);

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};
export const convertToUTC = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new DateObject({
      date: dateString,
      format: "YYYY/MM/DD",
      calendar: persian,
      locale: persian_fa,
    });
    return date.toDate().toISOString();
  } catch (err) {
    console.error("Invalid date:", dateString);
    return "";
  }
};
