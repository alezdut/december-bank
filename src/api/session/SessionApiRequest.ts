export interface loginRequest {
  email: string;
  password: string;
}

export interface createUserRequest extends loginRequest {
  name: string;
}
