import { createBrowserRouter, Outlet } from 'react-router-dom'
import App from './App.jsx'
import Profile from './routes/Profile.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import Navbar from './components/Navbar.jsx'
import { currentUser } from './context/UserContext.jsx'
import ErrorPage from './components/PageNotFound.jsx'


const AppLayout = () => {

  return (<>
    <Navbar />
    <Outlet />
  </>)

}

const NotLoggedInProtector = () => {
  const user = currentUser();

  if (user) {
    return (<>
      <ErrorPage />
    </>)
  } else {
    return (<>
      <Navbar />
      <Outlet />
    </>)
  }
}

const LoggedInProtector = () => {
  const user = currentUser();

  if (!user) {
    return (<>
      <ErrorPage />
    </>)
  } else {
    return (<>
      <Navbar />
      <Outlet />
    </>)
  }
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <App /> }
    ]
  },
  {
    path: '/',
    element: <NotLoggedInProtector />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: '/',
    element: <LoggedInProtector />,
    children: [
      { path: 'profile', element: <Profile /> },
    ]
  }
])