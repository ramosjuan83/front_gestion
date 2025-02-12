import axios from "axios"

//import { useAppStore } from "@/store/app";
//import { useCookies } from "@vueuse/integrations/useCookies";

const axiosConfig = axios.create({
  baseURL:'http://127.0.0.1:3000',
  // headers: {
  //   Authorization: get("token"),
  // },
});

export default axiosConfig;
