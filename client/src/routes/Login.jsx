import { React, useState } from 'react';
import axios from "../axiosConfig.js";
import Loading from '../components/Loading.jsx';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fieldIsBlank(username) || fieldIsBlank(password)) {
      handleError("Please fill out all fields");
    } else {
      setLoading(true);

      axios.post(SERVER_URL + "/login", { username, password })
        .then(result => {
          setLoading(false);
          if (result.status === 200) {
            if (result.data.message) {
              handleError(result.data.message);
            } else {
              window.location.replace(CLIENT_URL + "/profile");
            }
          } else {
            handleError("Something wrong happened :(");
          }
        })
        .catch(err => {
          setLoading(false);
          handleError("Something wrong happened :(");
        });
    }
  };

  const fieldIsBlank = (field) => {
    return field.length === 0;
  };

  const handleError = (message) => {
    setLoading(false);
    setErrorMessage(message);
  };

  return (
    loading ? <Loading /> :
      <div className="pt-20">
        <h1 className="text-center text-5xl font-semibold">Login</h1>
        <section className="flex flex-col items-center pt-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-row gap-5">
              <label className="w-20 self-center">Username</label>
              <input
                type="text"
                value={username}
                placeholder="Enter Username"
                autoComplete="off"
                name="username"
                className="px-4 py-2 rounded-full"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-5">
              <label className="w-20 self-center">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter Password"
                name="password"
                className="px-4 py-2 rounded-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div id="ErrorMessage" className={`flex flex-row gap-5 text-red-500 ${errorMessage ? '' : 'hidden'}`}>
              <p>* {errorMessage}</p>
            </div>
            <button type="submit" className="clickable w-1/2 self-center">
              Sign In
            </button>
          </form>
        </section>
      </div>
  );
};

export default Login;