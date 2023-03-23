export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest extends LoginRequest {
  name: string;
}
