interface IBaseResponse {
  hasError: boolean;
}

export interface IAuthResponse extends IBaseResponse {
  authenticated: boolean;
  missingActivityCount: number;
  fullName: string;
}

export interface IExpenseItem {
  date: string;
  projectKey: string;
  currencyKey: string;
  description: string;
  expense: string;
  plug: string;
}

export interface IKeyValuePair {
  key: string;
  value: string;
}

export interface IKeyValuePairResponse extends IBaseResponse {
  keyValuePairs: IKeyValuePair[];
}
