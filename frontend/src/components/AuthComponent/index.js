import React, {lazy, useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import {useState} from "react";
import {getToken, getCookie} from "../../utils";

const Loading = lazy(() => import('../Loading'))
const Layout = lazy(() => import('../Layout'))

export default function AuthComponent({uid, setUID, setEmployerID, setPrivilege}) {
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
            .then(async (response) => {
                if (response.ok) {
                    response.json().then(async (data) => {
                        setUID(data.uid);
                        if (data.type === "Admin") {
                            window.location.href = 'admin';
                        } else {
                            await Promise.all([EmployerIDGet(data.uid), PrivilegeGet(data.uid)]);
                            setAuthStatus("authorized");
                        }
                    })
                } else {
                    setAuthStatus("unauthorized");
                }
            })
    }

    async function EmployerIDGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/user_manage/employer/get/?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setEmployerID(data.employer_id);
                    })
                }
            })
    }

    async function PrivilegeGet(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/user_manage/privilege/get/?uid=" + uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setPrivilege(data.data);
                    })
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
