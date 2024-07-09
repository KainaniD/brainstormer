import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import Loading from './components/Loading.jsx'
import { UserProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider
        router={router}
        fallbackElement={<Loading />}
      />
    </UserProvider>
  </React.StrictMode>
)
