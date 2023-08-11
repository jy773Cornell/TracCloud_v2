import React, {lazy, useEffect, useState} from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import {StyledContainer, StyledRoot} from './styles'
import {removeToken, getCookie} from "../../utils";

const LayoutAppBar = lazy(() => import('../AppBarComponent'))
const LayoutDrawer = lazy(() => import('../DrawerComponent'))

export default function Layout(props) {
    const [menuOpen, setMenuOpen] = useState(true)

    const navigate = useNavigate();

    function toggleMenuOpen() {
        menuOpen ? setMenuOpen(false) : setMenuOpen(true);
    }

    async function handleLogout() {
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },

        };
        await fetch("/api/logout/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeToken();
                    navigate("/login");
                }
            })
    }

    const drawerProps = {
        ...props,
        setMenuOpen,
    }

    const appBarProps = {
        ...props,
        toggleMenuOpen,
        handleLogout,
    }

    return (
        <StyledRoot>
            {menuOpen ? <LayoutDrawer {...drawerProps}/> : null}
            <StyledContainer>
                <LayoutAppBar {...appBarProps}/>
                <Outlet/>
            </StyledContainer>
        </StyledRoot>
    )
}
