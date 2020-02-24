import { IAuthResponse, IExpenseItem } from "./models";
import moment from "moment";

export const baseUrl = "https://ilooppowerapps.veripark.com";
// export const baseUrl = "http://localhost:58145";

export const defaultDateFormat = "DD MMM YYYY";

export const AuthResponseDafaults: IAuthResponse = {
  authenticated: false,
  hasError: true,
  missingActivityCount: 0,
  fullName: ""
};

export const ExpenseItemDefaults: IExpenseItem = {
  currencyKey: "",
  date: moment().format(defaultDateFormat),
  description: "",
  expense: "",
  projectKey: "",
  plug: ""
};
