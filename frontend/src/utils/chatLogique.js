import moment from "moment/moment";
import "moment/locale/fr";

export default function dateFormateHour(date) {
  let d = moment(date);
  return d.locale("fr").format("HH:mm");
}
export function dateFormateDay(date) {
  let d = moment(date);
  let today = moment();

  var yesterday = moment().subtract(1, "days"); // la date d’hier
  var isYesterday = d.isSame(yesterday, "day"); //

  let isWithin7Days = d.isBefore(today) && today.diff(d, "days") <= 7;

  if (d.isSame(today, "day")) {
    return "Aujurd'hui";
  } else if (isYesterday) {
    return "Hier";
  } else if (isWithin7Days) {
    return d.locale("fr").format("dddd");
  } else {
    return d.locale("fr").format("DD/MM/YYYY");
  }
}
