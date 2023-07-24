import React, {lazy, Suspense, useRef, useState, useEffect} from "react";
import {unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate} from "react-router-dom";
import {history} from './utils'

const AuthComponent = lazy(() => import('./components/AuthComponent'))
const Loading = lazy(() => import('./components/Loading'))
const Login = lazy(() => import('./pages/Login'))
const HomePage = lazy(() => import('./pages/HomePage'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const People = lazy(() => import('./pages/People'))
const Crop = lazy(() => import('./pages/Crop'))
const Chemical = lazy(() => import('./pages/Chemical'))
const Site = lazy(() => import('./pages/Site'))
const Equipment = lazy(() => import('./pages/Equipment'))
const SprayCard = lazy(() => import('./pages/SprayCard'))
const SprayRecord = lazy(() => import('./pages/SprayRecord'))
const HarvestRecord = lazy(() => import('./pages/HarvestRecord'))
const PurchaseRecord = lazy(() => import('./pages/PurchaseRecord'))
const Report = lazy(() => import('./pages/Report'))

function App() {
    const [uid, setUID] = useState("")
    const [employerID, setEmployerID] = useState("")
    const [privilege, setPrivilege] = useState({})

    const authProps = {uid, setUID, setEmployerID, setPrivilege};

    // Using Django inner views
    function RedirectToURL({url}) {
        useEffect(() => {
            window.location.href = url;
        }, []);
        return null;
    }

    return (
        <HistoryRouter history={history}>
            <Suspense
                fallback={<Loading/>}>
                <Routes>
                    <Route path="login" element={<Login/>}/>
                    <Route path="workflow/registration" element={<RedirectToURL url={'/workflow/registration'}/>}/>
                    <Route path="workflow/password_reset" element={<RedirectToURL url={'/workflow/password_reset'}/>}/>
                    <Route eaxct path='/' element={<Navigate to="home" replace/>}/>
                    <Route path='/' element={<AuthComponent {...authProps} />}>
                        <Route path="home" element={<HomePage/>}/>
                        <Route path="profile" element={<UserProfile uid={uid}/>}/>
                        <Route path="people" element={<People uid={uid}/>}/>
                        <Route path="crop" element={<Crop uid={employerID} privilege={privilege}/>}/>
                        <Route path="site" element={<Site uid={employerID} privilege={privilege}/>}/>
                        <Route path="chemical" element={<Chemical uid={employerID} privilege={privilege}/>}/>
                        <Route path="purchase" element={<PurchaseRecord uid={employerID} privilege={privilege}/>}/>
                        <Route path="equipment" element={<Equipment uid={employerID} privilege={privilege}/>}/>
                        <Route path="spray" element={<SprayRecord uid={employerID} privilege={privilege}/>}/>
                        <Route path="spraycard" element={<SprayCard uid={uid}/>}/>
                        <Route path="report" element={<Report uid={employerID} privilege={privilege}/>}/>
                        <Route path="admin" element={<RedirectToURL url={'/admin'}/>}/>
                    </Route>
                    <Route path='*' element={<Navigate to="home" replace/>}/>
                </Routes>
            </Suspense>
        </HistoryRouter>
    )
}

export default App
