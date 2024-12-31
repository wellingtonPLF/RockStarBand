import axios from 'axios';
import { LocalStorageUtil } from '@utils/local-storage'

export let protocol = 'https://'
let baseURL = "http://192.168.0.14:3000"
const hostname = new LocalStorageUtil().getToken('backendHostname');

const api = axios.create({
  baseURL: hostname ? (hostname.includes(protocol) ? hostname : baseURL) : baseURL,
  headers: {
    'ngrok-skip-browser-warning': 1,
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default api;