import axios from "axios";


const movieInstance = axios.create({
  baseURL: 'https://63f9bdce897af748dcc2d723.mockapi.io/movie',
  timeout: 5000,
});

movieInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('React Going to make API with config', config);
  return config;
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
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export {
  movieInstance
}