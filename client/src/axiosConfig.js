import axios from 'axios';

const instance = axios.create({
  withCredentials: true, // send cookies with requests
});

export default instance;