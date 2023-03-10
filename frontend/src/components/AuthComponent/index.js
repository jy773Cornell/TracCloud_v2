import React, {lazy, useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import {useState} from "react";
import {getToken} from "../../utils";

const Loading = lazy(() => import('../../pages/Loading'))
const Layout = lazy(() => import('../../pages/Layout'))

export default function AuthComponent({onUIDReceived}) {
    const [authStatus, setAuthStatus] = useState("loading")
    const [uid, setUID] = useState("")

    async function AuthCheck() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: getToken(),
            }),
        };
        await fetch("/api/auth/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setUID(data.uid);
                        onUIDReceived(data.uid);
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
