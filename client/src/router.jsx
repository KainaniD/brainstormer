import { createBrowserRouter, Outlet } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Profile from './routes/Profile.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import Navbar from './components/Navbar.jsx'
import { currentUser } from './context/UserContext.jsx'
import ErrorPage from './components/PageNotFound.jsx'
import Sessions from './routes/Sessions.jsx'


const AppLayout = () => {

  return (<>
  <div className='pagewrap'>
    <Navbar />
    <Outlet />
    </div>
  </>)

}

const NotLoggedInProtector = () => {
  const user = currentUser();

  if (user) {
    return (<>
      <div className='pagewrap'>

      <ErrorPage />
      </div>
    </>)
  } else {
    return (<>
      <div className='pagewrap'>

      <Navbar />
      <Outlet />
      </div>
    </>)
  }
}

const LoggedInProtector = () => {
  const user = currentUser();

  if (!user) {
    return (<>
      <div className='pagewrap'>

      <ErrorPage />
      </div>
    </>)
  } else {
    
    return (<>
      <div className='pagewrap'>

      <Navbar />
      <Outlet />
      </div>
    </>)
  }
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <Home /> }
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
      { path: 'sessions', element: <Sessions /> }
    ]
  }
])