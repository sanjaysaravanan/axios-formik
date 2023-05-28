import axios from "axios";


const movieInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/movies`,
  timeout: 5000,
});

const usersInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/users`,
  timeout: 5000,
});

movieInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('React Going to make API with config', config);
  const { accessToken } = JSON.parse(localStorage.getItem('user_details') || '{}');
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      'accesstoken': accessToken
    }
  }
  return newConfig;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
movieInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // if (response.config.method === 'get') {
  //   alert('Data Loaded Successfully');
  // } else if (response.config.method === 'post') {
  //   alert('Data Created Successfully');
  // } else if (response.config.method === 'put') {
  //   alert('Data Edited Successfully');
  // } else if (response.config.method === 'delete') {
  //   alert('Data Deleted Successfully');
  // }

  console.log('Line 45', response)
  if (response.status === 401) {
    localStorage.clear();
  }

  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    localStorage.clear();
    // not the best solution
    // eslint-disable-next-line no-restricted-globals
    // location.reload();
  }
  return Promise.reject(error);
});

export {
  movieInstance,
  usersInstance
}