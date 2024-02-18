import axios from "axios"

const useSecureAxios = () => {
    
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BE_URL_USER,
    });
    
      axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            // if (error?.response?.status === 401 && error?.response?.data === "jwt expired") {
            //     dispatch(logout());
            //     window.location.href = "/";
            // }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

export default useSecureAxios
