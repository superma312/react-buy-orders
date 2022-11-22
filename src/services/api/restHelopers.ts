import axios, { AxiosResponse } from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const get = async <T>(path: string): Promise<T | null> => {
  try {
    const res: AxiosResponse<T> = await axios.get(`${baseUrl}/${path}`);

    if (res.status === 200) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.log('API Get Error: ', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const post = async <T>(
  path: string,
  data: T
): Promise<T | undefined> => {
  try {
    const res: AxiosResponse<T> = await axios.post(`${baseUrl}/${path}`, data);
    if (res.status === 200 && res.data instanceof Object) {
      return res.data;
    }
    return;
  } catch (e) {
    console.error('API POST Error: ', e);
    throw e;
  }
};

export const put = async <T>(path: string, data: T): Promise<T | undefined> => {
  try {
    const res: AxiosResponse<T> = await axios.put(`${baseUrl}/${path}`, data);
    if (res.status === 200 && res.data instanceof Object) {
      return res.data;
    }
    return;
  } catch (e) {
    console.error('API POST Error: ', e);
    throw e;
  }
};

export const del = async (path: string) => {
  try {
    const res: AxiosResponse = await axios.delete(`${baseUrl}/${path}`);

    if (res.status === 200) {
      return res;
    }
    return;
  } catch (e) {
    console.error('API DELETE Error: ', e);
    throw e;
  }
};
