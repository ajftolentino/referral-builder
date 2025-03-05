import axios from 'axios';
import { Response } from 'types';

interface ApiParams {
  url: string;
  method?: 'DELETE' | 'GET' | 'POST' | 'PUT';
  data?: { [key: string]: any };
  headers?: { [key: string]: string };
}

interface ApiWithAuthParams extends ApiParams {
  token: string;
}

export const callApi = async <T>(
  apiParams: ApiParams
): Promise<Response<T>> => {
  const { data = {}, headers = {}, method = 'GET', url } = apiParams;

  const params: { [key: string]: any } = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if ((method === 'POST' || method === 'PUT') && Object.keys(data).length > 0) {
    params.data = data;
  }

  console.log('[DEBUG:API]', url, method, headers, data);

  return axios(url, params)
    .then((response?: any) => {
      return new Promise<Response<T>>((resolve) => {
        resolve(response as Response<T>);
      });
    })
    .catch((error?: any) => {
      return new Promise<Response<T>>((resolve) =>
        resolve(error.response as Response<T>)
      );
    });
};

export const callApiWithAuth = (apiParams: ApiWithAuthParams) => {
  const { data = {}, headers = {}, method = 'GET', token, url } = apiParams;
  const jwtHeaders = { ...headers };
  if (token) {
    jwtHeaders.Authorization = `Bearer ${token}`;
  }
  return callApi({ data, headers: jwtHeaders, method, url });
};
