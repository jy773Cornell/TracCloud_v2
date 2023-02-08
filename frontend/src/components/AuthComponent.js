import React, {lazy, useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import {useState} from "react";
import {getToken} from "../utils";

const Loading = lazy(() => import('../pages/Loading'))

function AuthComponent({children}) {

    const [authStatus, setAuthStatus] = useState("loading")

    function AuthCheck() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: getToken(),
            }),
        };
        fetch("/api/auth/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setAuthStatus("authorized");
                } else {
                    setAuthStatus("unauthorized");
                }
            })
    }

    useEffect(() => {
        AuthCheck();
    }, [])

    if (authStatus === "loading") {
        return (
            <Loading/>
        )
    } else if (authStatus === "authorized") {
        return <>{children}</>
    } else if (authStatus === "unauthorized") {
        return <Navigate to="/login" replace/>
    }
}

export default AuthComponent
