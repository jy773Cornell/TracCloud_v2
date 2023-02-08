import React from 'react'
import {Outlet} from "react-router-dom";
import './index.scss'

function Layout() {
    return (
        <div>
            layout
            <Outlet/>
        </div>
    )
}

export default Layout