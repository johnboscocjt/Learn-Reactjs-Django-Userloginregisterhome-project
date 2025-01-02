import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// url does not match with django default port, which is the url we need when in deployment for both front end and backend, connection for backend needed in the deployment environment
// when running locally dont use this: it will give you error like 404, 400
const apiUrl = "/choreo-apis/backend-3959763937:8000";

// on local environment use the following:
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// });

// Use API URL from .env or fallback to localhost:8000
// const apiUrl = "http://localhost:8000";


// import the url for backend serve from .env file
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

// adding interceptor on the object, authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        // passing the jwt token,create the authorization header which automatically handle for us by axios
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export the object that we have added interceptor on,
// now we gonna use api oject rather than axios by default
export default api;