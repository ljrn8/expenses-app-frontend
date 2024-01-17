import Verification from "./components/Verification";
import Registration from "./components/Registration";
import ErrorPage from "./components/ErrorPage";
import Success from "./components/Success";
// import App from "./App";
import Portal, { loader as portalLoader } from "./components/Portal";
// import 'bootstrap/dist/css/bootstrap/min/css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
 */

export function setJWTToCookie(jwt) {
    jwt !== null && !jwt.equals("") ? Cookies.set('token', jwt, { expires: 7, secure: true })
        : console.log("warning: attempt to set empty token");
}

export function getJWTFromCookie() {
    return Cookies.get('token');
}

export default function App() {

    const PrivateRoute = ({ element: Element, ...rest }) => {
        return (
            <Route
            {...rest}
            element={isAuthenticated() ? <Element /> : <Navigate to="/login" />}
            />
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
            path: "/portal/:username",
            element: <PrivateRoute element={<Portal />} />,
            loader: portalLoader,
        },
    ]);

    return (
        <Routes>
            <RouterProvider router={router} />
        </Routes>
    );
};
  