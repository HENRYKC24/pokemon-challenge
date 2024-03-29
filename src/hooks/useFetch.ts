import { useCallback, useState } from 'react';
import axios, { AxiosInstance, AxiosResponse, CreateAxiosDefaults } from 'axios';

type Data = {
  message: string,
};

type Response = {
  status: number,
  data: Data,
};

type Request = {}

type RequestError = string | {
  response: undefined | Response,
  request: undefined | Request,
  message: undefined | string,
};

const normalizeError = (err: RequestError) => {
  if (!err) {
    return { message: 'An unknown error encountered. Please try again.' };
  }

  if (typeof err === 'string') {
    return { message: err };
  }

  const { response } = err;
  if (response) {
    if (response.status === 404) {
      return { message: 'Record Not Found!' };
    }

    return { message: response.data.message || JSON.stringify(response.data) };
  }

  if (err.request) {
    return { message: 'Server is not responding. One possibility is that CORS is disabled on server. Check your console to see' };
  }

  if (err.message) {
    return { message: err.message };
  }

  return { message: 'An unknown error encountered. Please try again.' };
};

const instantiate = (headers = null) : AxiosInstance  => {
  const config : CreateAxiosDefaults = { responseType: 'json' };
  if (headers) config.headers = headers;
  return axios.create(config);
};

/**
 * @param {string} path absolute url
 * @param {object} headers
 * @returns Promise that resolves to fetched data when request is successful
 * and rejects with error when request fails
 */
export const get = (path: string) : Promise<AxiosResponse> => new Promise((resolve, reject) => {
  instantiate().get(path)
    .then(({ data }) => resolve(data))
    .catch((err) => {
      reject(normalizeError(err));
    });
});

const useFetch = () => {
  const [result, setResult] = useState<AxiosResponse | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback((url: string) => {
    setLoading(true);

    get(url)
      .then((data) => {
        setLoading(false);
        setResult(data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return {
    error,
    fetch,
    loading,
    result,
  };
};

export default useFetch;
