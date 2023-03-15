export interface loginResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  tokenExpiration: number;
}

export interface createUserResponse extends loginResponse {
  accounts: {
    id: number;
    currency: string;
  }[];
}

export interface postLoginResponse {
  data: loginResponse;
  errors: string[];
}

export interface postCreateUserResponse {
  data: createUserResponse;
}
