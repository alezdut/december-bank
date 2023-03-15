import axios from 'axios';
import {
  postLoginResponse,
  postCreateUserResponse,
  loginResponse,
} from './SessionApiResponse';
import { postCreateUserRequest, postLoginRequest } from './SessionApiRequest';

const baseUrl = 'https://decemberbank.inhouse.decemberlabs.com/api';

export const postLogin = async (
  request: postLoginRequest,
): Promise<loginResponse> => {
  const { data } = await axios.post<postLoginResponse>(
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
  request: postCreateUserRequest,
): Promise<loginResponse> => {
  const { data } = await axios.post<postCreateUserResponse>(
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
