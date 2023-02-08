import React, {lazy, Suspense} from "react";
import {unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate} from "react-router-dom";
import {history} from './utils'
import AuthComponent from "./components/AuthComponent";

const Login = lazy(() => import('./pages/Login'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Layout = lazy(() => import('./pages/Layout'))

function App() {
    return (
        <HistoryRouter history={history}>
            <Suspense
                fallback={
                    <div style={{textAlign: 'center', marginTop: 200}}>
                        loading...
                    </div>
                }>
                <Routes>
                    <Route eaxct path='/' element={<Navigate to="/profile" replace/>}/>
                    <Route path='/' element={
                        <AuthComponent>
                            <Layout/>
                        </AuthComponent>
                    }>
                        <Route path="profile" element={<UserProfile/>}/>
                    </Route>
                    <Route path="login" element={<Login/>}/>
                </Routes>
            </Suspense>
        </HistoryRouter>
    )
}

export default App
