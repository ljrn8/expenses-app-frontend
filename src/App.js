import Verification from "./components/Verification";
import Registration from "./components/Registration";
import ErrorPage from "./components/ErrorPage";
import Success from "./components/Success";
// import App from "./App";
import Portal, { loader as portalLoader } from "./components/Portal";
// import 'bootstrap/dist/css/bootstrap/min/css';
import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import {useState, useEffect} from "react"
import Cookies from 'js-cookie';

/**
 * TODO's
 * children routers
 * proper contacting
 * make 'exists' port
 * better styling
 * replace error catching
 * portal refresh
// TODO change all to arrow fucntions
 */

export function setJWTToCookie(jwt) {
    if (jwt !== null && !(jwt === "")) { 
        Cookies.set('token', jwt, { expires: 7, secure: true })
        console.log("cookie: " + Cookies.get('token') + ", set with jwt", + jwt);
    } else {
        console.log("warning: attempt to set empty token");
    } 
    // window.location.reload();
}

export function getJWTFromCookie() {
    return Cookies.get('token');
}

export const isAuthenticated = () => {
    const jwt = Cookies.get('token');
    if (!jwt) {
      return false;
    }
    // TODO
    // try {
    //   const decodedToken = jwt.decode(jwtToken);
    //   if (decodedToken && decodedToken.exp > Date.now() / 1000) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } catch (error) {
    //   console.error('Error decoding JWT:', error);
    //   return false;
    // }
    return true;
  };

export default function App() {

    const PrivateRoute = ({ element: Element, ...rest }) => {
        return (
            <Routes>
                <Route
                {...rest}
                element={isAuthenticated() ? <Element /> : <Navigate to="/login" />}
                />
            </Routes>
        );
    };

    const router = createBrowserRouter([
        {   
            path: "/",
            element: <Verification />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/registration",
            element: <Registration />,
        },
        {
            path: "/success",
            element: <Success />,
        },
        {
            path: "/portal/:username/*",
            element: <PrivateRoute element={<Portal />} />,
            loader: portalLoader,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
};
  