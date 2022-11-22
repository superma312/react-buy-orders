import axios, { AxiosResponse } from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const get = async <T>(
  path: string,
): Promise<T | null> => {
  try {
    const res: AxiosResponse<T> = await axios.get(`${baseUrl}/${path}`);

    if (res.status === 200) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.log("API Get Error: ", error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};
