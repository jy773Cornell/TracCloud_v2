import React, {lazy, useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import {useState} from "react";
import {getToken, getCookie} from "../../utils";

const Loading = lazy(() => import('../Loading'))
const Layout = lazy(() => import('../Layout'))

export default function AuthComponent({uid, setUID}) {
    const [authStatus, setAuthStatus] = useState("loading")

    async function AuthCheck() {
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                token: getToken(),
            }),
        };
        await fetch("/api/auth/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setUID(data.uid);
                        setAuthStatus("authorized");
                    })
                } else {
                    setAuthStatus("unauthorized");
                }
            })
    }

    useEffect(() => {
        AuthCheck();
    }, [])

    if (authStatus === "loading") {
        return <Loading/>
    } else if (authStatus === "authorized") {
        return <Layout uid={uid}/>
    } else if (authStatus === "unauthorized") {
        return <Navigate to="/login" replace/>
    }
}
