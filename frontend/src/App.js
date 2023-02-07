import React, {lazy, Component} from "react";
import {render} from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

const Login = lazy(() => import('./pages/Login'))
const UserProfile = lazy(() => import('./pages/UserProfile'))

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile" component={UserProfile}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App
