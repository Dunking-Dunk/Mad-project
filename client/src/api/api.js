import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.118.114:4000/api",
});
