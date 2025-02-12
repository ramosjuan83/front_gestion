import axios from "axios"

//import { useAppStore } from "@/store/app";
//import { useCookies } from "@vueuse/integrations/useCookies";

const axiosConfig = axios.create({
  baseURL:'http://10.0.2.2:3000',
  // headers: {
  //   Authorization: get("token"),
  // },
});

export default axiosConfig;
