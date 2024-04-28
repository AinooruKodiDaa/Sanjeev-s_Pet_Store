import { differenceInYears, format, parse } from "date-fns";

/* Types */
import type {
  FormatDateInterface,
  FormatOpts,
  ParseStringDateInterface,
} from "./types";
import { ORG_DATE_FORMAT, ORG_DATE_TIME_FORMAT } from "../../consts";


export const ParseStringDate: ParseStringDateInterface = (date, format) => {
  if (typeof date === "string") return parse(date, format, new Date());

  return date as Date;
};

export const FormatDate: FormatDateInterface = (date, dateFormat) => {
  if (!dateFormat) dateFormat = ORG_DATE_TIME_FORMAT;
  if (!date) return "";

  return format(date, dateFormat);
};



export const GetAge = (
  date: string | Date,
  parseFormat: FormatOpts = ORG_DATE_FORMAT
) => {
  if (typeof date === "string") date = ParseStringDate(date, parseFormat);

  const today = new Date();
  const age = differenceInYears(today, date);
  return age;
};


export const convertDate = (date: Date) => {

  const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

}