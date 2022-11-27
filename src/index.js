import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from 'components/pages/HomePage/HomePage';
import AddMessagePage from 'components/pages/AddMessagePage/AddMessagePage';
import AboutPage from 'components/pages/AboutPage/AboutPage';
import EditPage from 'components/pages/EditPage/EditPage';
import LoginPage from 'components/pages/LoginPage/LoginPage';
import RegisterPage from 'components/pages/RegisterPage/RegisterPage';

import './index.css';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/add',
    element: <AddMessagePage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/edit/:messageId',
    element: <EditPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);


// 1. Przenies formularz sluzacy do dodawania elementow do listy, do podstrony add. W momencie jak uda sie dodac nowy rekord, to przekieruj uzytkownika na strone glowna

// 2. Wyrzuc funkcje getMessage oraz editMessage do pliku helpers/http.js (w EditPage.js)