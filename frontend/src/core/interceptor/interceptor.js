import axios from "axios";
import {
  getItem,
  removeItem,
  setItem,
} from "../../utils/helper/storage.services";
import { toast } from "react-toastify";

const baseURL = "http://188.121.104.25:3001";

const instance = new axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  return response.data;
};

const onError = (err) => {
  const status = err?.response?.status;

  // if (status === 401) {
  //   toast.error("لطفا ابتدا وارد شوید");
  //   setItem("isLogin", false);
  // }
  if (status === 403) {
    toast.error("شما به این اندپوینت دسترسی ندارید");
  }
  // if (status === 401) {
  //   removeItem("token");
  // }

  return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess, onError);
instance.interceptors.request.use((opt) => {
  const token = getItem("token");
  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export default instance;
