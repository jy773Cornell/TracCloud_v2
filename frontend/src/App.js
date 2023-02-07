import React, {lazy, Component} from "react";
import {render} from "react-dom";

const Login = lazy(() => import('./pages/Login'))

function App() {
    return (
        <div>
            <Login/>
        </div>
    )
}

export default App
