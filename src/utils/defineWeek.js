import { startOfWeek, endOfWeek, format } from "date-fns";
import { de as deLocale } from "date-fns/locale";

const defineWeek = () => {
  const today = new Date();
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  const sunday = endOfWeek(today, { weekStartsOn: 1, weekEndsOn: 0 });

  const formattedMonday = format(monday, "yyyy-MM-dd");
  const formattedSunday = format(sunday, "yyyy-MM-dd");
  const shortMonday = format(monday, "dd.MM.", { locale: deLocale });
  const shortSunday = format(sunday, "dd.MM.", { locale: deLocale });

  return { formattedMonday, formattedSunday, shortMonday, shortSunday };
};

export { defineWeek };
