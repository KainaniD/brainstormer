import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axiosConfig.js';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(SERVER_URL + "/currentuser")
      .then((result) => {
        setLoading(false);

        const currentUser = result.data;

        setUser(currentUser);
      })
      .catch(err => console.log(err));

  }, []);

  
  return loading ? null : (
    <UserContext.Provider value={{user:user, playerCard:playerCard}}>
      {children}
    </UserContext.Provider>
  );
};

export const currentUser = () => useContext(UserContext);