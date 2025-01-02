import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    // check if authorized before accessing this route, custom frontend protection
    const [isAuthorized, setIsAuthorized] = useState(null);

    // as soon as we load our protected route, we try below function
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        // send a request to the backend with a refresh token to get the new access token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            // tring to send a response to this route with refresh token, which should give new access token
            // using the api, its gonna handle the base url by axios, route to access
            const res = await api.post("/api/token/refresh/", {
                // payload
                refresh: refreshToken,
            });
            // if was successful
            if (res.status === 200) {
                // new access token
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                // if there is error, we dont get new access token
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    // check if need to refresh token or we are good to go
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        // if we have the token, decode it
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        // if token expired
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    // loading , waiting for state to change
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // automatic navigate to that page, check if authorized
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;