import { startOfWeek, endOfWeek, format, addWeeks, subWeeks } from "date-fns";
import { de as deLocale } from "date-fns/locale";

const defineWeek = (skip) => {
  let today = new Date();
  if (skip) {
    if (skip > 0) {
      today = addWeeks(today, skip);
    } else {
      today = subWeeks(today, Math.abs(skip));
    }
  }
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  const sunday = endOfWeek(today, { weekStartsOn: 1, weekEndsOn: 0 });

  const formattedMonday = format(monday, "yyyy-MM-dd");
  const formattedSunday = format(sunday, "yyyy-MM-dd");
  const shortMonday = format(monday, "dd.MM.", { locale: deLocale });
  const shortSunday = format(sunday, "dd.MM.", { locale: deLocale });

  return { formattedMonday, formattedSunday, shortMonday, shortSunday };
};

export { defineWeek };
