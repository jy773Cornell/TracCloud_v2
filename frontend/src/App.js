import React, {lazy, Suspense} from "react";
import {unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate} from "react-router-dom";
import {history} from './utils'

const AuthComponent = lazy(() => import('./components/AuthComponent'))
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
                        <Route path="network" element={<UserProfile/>}/>
                        <Route path="crop" element={<UserProfile/>}/>
                        <Route path="site" element={<UserProfile/>}/>
                        <Route path="chemical" element={<UserProfile/>}/>
                        <Route path="equipment" element={<UserProfile/>}/>
                        <Route path="record" element={<UserProfile/>}/>
                        <Route path="report" element={<UserProfile/>}/>
                    </Route>
                    <Route path='*' element={<Navigate to="home" replace/>}/>
                </Routes>
            </Suspense>
        </HistoryRouter>
    )
}

export default App
