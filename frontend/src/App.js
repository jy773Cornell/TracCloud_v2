import React, {lazy, Component} from "react";
import {render} from "react-dom";
import {unstable_HistoryRouter as HistoryRouter, Routes, Route} from "react-router-dom";
import {history} from './utils'

const Login = lazy(() => import('./pages/Login'))
const UserProfile = lazy(() => import('./pages/UserProfile'))

function App() {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path="/" component={Login}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="profile" element={<UserProfile/>}/>
                </Route>
            </Routes>
        </HistoryRouter>
    )
}

export default App
