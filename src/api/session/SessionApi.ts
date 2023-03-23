import axiosInstance from '../common/axiosInstance';
import { LoginResponse, CreateUserResponse, Login } from './SessionApiResponse';
import { CreateUserRequest, LoginRequest } from './SessionApiRequest';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const postLogin = async (request: LoginRequest): Promise<Login> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    `/users/login`,
    request,
  );
  return data.data;
};

export const postCreateUser = async (
  request: CreateUserRequest,
): Promise<Login> => {
  const { data } = await axiosInstance.post<CreateUserResponse>(
    `${baseUrl}/users`,
    request,
  );
  return data.data;
};
