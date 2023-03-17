import axios from 'axios';
import { loginResponse, createUserResponse, login } from './SessionApiResponse';
import { createUserRequest, loginRequest } from './SessionApiRequest';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const postLogin = async (request: loginRequest): Promise<login> => {
  const { data } = await axios.post<loginResponse>(
    `${baseUrl}/users/login`,
    request,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );
  return data.data;
};

export const postCreateUser = async (
  request: createUserRequest,
): Promise<login> => {
  const { data } = await axios.post<createUserResponse>(
    `${baseUrl}/users`,
    request,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );
  return data.data;
};
