import Verification from "./components/Verification";
import Registration from "./components/Registration";
import ErrorPage from "./components/ErrorPage";
import Success from "./components/Success";
import Portal, { loader as portalLoader } from "./components/Portal";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
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
    return isAuthenticated() ? Cookies.get('token') : ""
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
    const router = createBrowserRouter([
        {   
            path: "/",
            element: <Verification />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/registration",
            element: <Registration />,
            errorElement: <ErrorPage />, 
        },
        {
            path: "/success",
            element: <Success />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/portal/user",
            element:  isAuthenticated() ? <Portal /> : <Navigate to="/" />,
            loader: portalLoader,
            errorElement: <ErrorPage />
        }
    ]);
    return (
        <RouterProvider router={router} />
    );
}   