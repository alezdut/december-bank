export interface postLoginRequest {
  email: string;
  password: string;
}

export interface postCreateUserRequest extends postLoginRequest {
  name: string;
}
