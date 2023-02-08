import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import {useState} from "react";

function AuthComponent({children}) {

    const [authStatus, setAuthStatus] = useState("loading")

    function AuthCheck() {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        };
        fetch("/api/auth", requestOptions)
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
            <div style={{textAlign: 'center', marginTop: 200}}>
                loading...
            </div>
        )
    } else if (authStatus === "authorized") {
        return <>{children}</>
    } else if (authStatus === "unauthorized") {
        return <Navigate to="/login" replace/>
    }
}

export default AuthComponent
