export interface login {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  tokenExpiration: number;
}

export interface createUser extends login {
  accounts: {
    id: number;
    currency: string;
  }[];
}

export interface loginResponse {
  data: login;
  errors: string[];
}

export interface createUserResponse {
  data: createUser;
}
