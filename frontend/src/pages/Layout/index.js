import React from 'react'
import {Outlet} from "react-router-dom";
import './index.scss'

function Layout() {
    return (
        <div className="layout">

            <Outlet/>
        </div>
    )
}

export default Layout