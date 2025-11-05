import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx' 
import './index.css'

import Home from './pages/Home.jsx'
import SearchResults from './pages/SearchResults.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Sales from './pages/Sales.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        path: '/', 
        element: <Home />,
      },
      {
        path: '/items', 
        element: <SearchResults />,
      },
      {
        path: '/item/:id', 
        element: <ProductDetail />,
      },
      {
        path: '/sales', 
        element: <Sales />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)