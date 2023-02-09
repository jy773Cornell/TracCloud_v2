import React from 'react'
import {Outlet} from "react-router-dom";
import './index.scss'

function HomePage() {
    return (
        <div>
            HomePage
            <Outlet/>
        </div>
    )
}

export default Layout