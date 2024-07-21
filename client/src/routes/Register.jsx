import { React, useState } from 'react'
import axios from "../axiosConfig.js"
import Loading from '../components/Loading.jsx';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (fieldIsBlank(username) || fieldIsBlank(email) || fieldIsBlank(password) || fieldIsBlank(confirmation)){
      setLoading(false);
      return;
    }

    if (password == confirmation) {
      axios.post(SERVER_URL + "/register", { username, email, password })
      .then(result => { 
        setLoading(false);
        if (result.status === 200){
          if (result.data.message) {
            return handleError(result.data.message);
          }
          window.location.replace(CLIENT_URL + "/login");
        } else {
          return handleError("Something wrong happened :(");
        }
      })
      .catch(err => {
        setLoading(false);
        return handleError("Something wrong happened :(");
      });
    } else {
      setLoading(false);
      return handleError("Please input the same password");
    }
  }

  const fieldIsBlank = (field) => {
    if (field.length == 0) {
      handleError("Please fill out all fields");
      return true;
    }
    return false;
  }

  const handleError = (message) => {
    setLoading(false);
    setErrorMessage(message);
  }

  return (
    loading ? <Loading /> : 
    <div className="pt-20">
      <h1 className="text-center text-5xl font-semibold">Register</h1>
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
            <label className="w-20 self-center">Email</label>
            <input
              type="text"
              value={email}
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="px-4 py-2 rounded-full"
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="flex flex-row gap-5">
            <label className="w-20 self-center">Confirm</label>
            <input
              type="password"
              value={confirmation}
              placeholder="Confirm Password"
              name="confirmation"
              className="px-4 py-2 rounded-full"
              onChange={(e) => setConfirmation(e.target.value)}
            />
          </div>
          <div id="ErrorMessage" className={`whitespace-pre-wrap text-red-500 ${errorMessage ? '' : 'hidden'}`}>
          <p>* {errorMessage}</p>
          </div>
          <button type="submit" className="clickable w-1/2 self-center">
            Sign Up
          </button>
        </form>
      </section>
    </div>
  )
}

export default Register