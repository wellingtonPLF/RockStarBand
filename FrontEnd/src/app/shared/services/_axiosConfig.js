import axios from 'axios';
import { LocalStorageUtil } from '@utils/local-storage'

const hostname = new LocalStorageUtil().getToken('backendHostname');
let baseURL = 'http://localhost:3000/'

const api = axios.create({
  baseURL: hostname ? (hostname.includes('http://') ? hostname : baseURL) : baseURL,
  withCredentials: true
});

export default api;