export interface Login {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  tokenExpiration: number;
}

export interface CreateUser extends Login {
  accounts: {
    id: number;
    currency: string;
  }[];
}

export interface LoginResponse {
  data: Login;
  errors: string[];
}

export interface CreateUserResponse {
  data: CreateUser;
}
