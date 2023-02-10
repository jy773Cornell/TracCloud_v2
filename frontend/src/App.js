import React, {lazy, Suspense} from "react";
import {unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate} from "react-router-dom";
import {history} from './utils'
import AuthComponent from "./components/AuthComponent";

const Loading = lazy(() => import('./pages/Loading'))
const Login = lazy(() => import('./pages/Login'))
const HomePage = lazy(() => import('./pages/HomePage'))
const UserProfile = lazy(() => import('./pages/UserProfile'))

function App() {
    return (
        <HistoryRouter history={history}>
            <Suspense
                fallback={<Loading/>}>
                <Routes>
                    <Route path="login" element={<Login/>}/>
                    <Route eaxct path='/' element={<Navigate to="home" replace/>}/>
                    <Route path='/' element={<AuthComponent/>}>
                        <Route path="home" element={<HomePage/>}/>
                        <Route path="profile" element={<UserProfile/>}/>
                    </Route>
                    <Route path='*' element={<Navigate to="home" replace/>}/>
                </Routes>
            </Suspense>
        </HistoryRouter>
    )
}

export default App
