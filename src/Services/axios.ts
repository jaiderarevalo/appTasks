import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://192.168.11.101:3900/app",
  headers: {
    Authorization: `Bearer ${AsyncStorage.getItem("token")}`,
  },
});
