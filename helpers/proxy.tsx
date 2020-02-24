import { AuthResponseDafaults, baseUrl } from "./constants";
import {
  IAuthResponse,
  IExpenseItem,
  IKeyValuePairResponse,
  IKeyValuePair
} from "./models";

export const authanticate = (userName: string, password: string) => {
  return new Promise<IAuthResponse>((resolve, reject) => {
    fetch(baseUrl + "/api/auth/post", {
      credentials: "same-origin",
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        UserName: userName,
        Password: password
      })
    })
      .then(response => response.json())
      .then((responseJson: IAuthResponse) => {
        return resolve(responseJson);
      })
      .catch(ex => {
        console.log(ex);
        return resolve(AuthResponseDafaults);
      });
  });
};

export const getExpenseCurrencyList = () => {
  return new Promise<IKeyValuePair[]>((resolve, reject) => {
    fetch(baseUrl + "/api/user/GetExpenseCurrency", {
      credentials: "same-origin",
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((responseJson: IKeyValuePairResponse) => {
        if (responseJson.hasError == false) {
          return resolve(responseJson.keyValuePairs);
        }
        return resolve([]);
      })
      .catch(ex => {
        return resolve([]);
      });
  });
};

export const getExpenseProjectList = () => {
  return new Promise<IKeyValuePair[]>((resolve, reject) => {
    fetch(baseUrl + "/api/user/GetExpenseProjects", {
      credentials: "same-origin",
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((responseJson: IKeyValuePairResponse) => {
        if (responseJson.hasError == false) {
          return resolve(responseJson.keyValuePairs);
        }
        return resolve([]);
      })
      .catch(ex => {
        return resolve([]);
      });
  });
};

export const saveExpenses = (expenseList: IExpenseItem[]) => {
  return new Promise<boolean>((resolve, reject) => {
    fetch(baseUrl + "/api/user/SaveExpense", {
      credentials: "same-origin",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(expenseList)
    })
      .then(response => response.json())
      .then((responseJson: IKeyValuePairResponse) => {
        if (responseJson.hasError == false) {
          return resolve(true);
        }
        return resolve(false);
      })
      .catch(ex => {
        return resolve(false);
      });
  });
};
