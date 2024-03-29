/* eslint-disable no-useless-catch */
import axios, { AxiosInstance } from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuthStateAction } from "../store/reducers/authSlice";

const productApi: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BE_URL_PRODUCTS,
})

const userApi: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BE_URL_USER,
})

const userApiProfile:  AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BE_URL_USER,
})

const refreshToken = async () => {

    try {
      const response = await userApi.post('/refresh-token', {
        refreshToken: localStorage.getItem('refreshToken'),
      });
  
      const newAccessToken = response?.data?.accessToken;
      localStorage.setItem('accessToken', newAccessToken);
  
      return newAccessToken;
    } catch (error) {
		throw error;
    }
  };

  productApi.interceptors.request.use((config: any) => {
    const accessToken = localStorage.getItem('accessToken');
  
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  
    return config;
  });

  userApiProfile.interceptors.request.use((config: any) => {
    const accessToken = localStorage.getItem('accessToken');
  
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  
    return config;
  });

  productApi.interceptors.response.use(
    (response) => response,
    async (error) => {

      const dispatch = useDispatch()
      const navigate = useNavigate()

      const originalRequest = error.config;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const newAccessToken = await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return productApi(originalRequest);
        } catch (refreshError) {

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(resetAuthStateAction());
          navigate('/');

        }
      }
  
      throw error;
    }
  );

  export {productApi, userApi, userApiProfile};