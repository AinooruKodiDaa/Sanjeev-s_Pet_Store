export type DateType = number | Date;

export type ParseStringDateInterface = (
	date: DateType | string,
	format: FormatOpts
) => Date;

export type FormatOpts =
	| "EEE do yyyy"
	| "dd-MM-yyyy"
	| "dd/MM/yyyy"
	| "dd-MM-yyyy HH:mm"
	| "dd-MM-yyyy HH:mm:ss" 
	|"dd-MM-yyyy hh:mm:ss"
	|"dd-MM-yyyy hh:mm aa"
	| "dd/MM/yyyy hh:mm aa"| "dd/MM/yyyy hh:mm:ss aa"
	| "HH:mm"//24h
	| "hh:mm aa"//12h
	| "MMM"
	| "MMM dd"
	| "MMMM"
	| "yyyy";

/* Functions */
export type FormatDateInterface = (
	date: DateType,
	format?: FormatOpts
) => string;
