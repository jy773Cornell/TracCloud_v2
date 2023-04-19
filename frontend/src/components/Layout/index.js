import React, {lazy, useEffect, useState} from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import {StyledContainer, StyledRoot} from './styles'
import {removeToken} from "../../utils";

const LayoutAppBar = lazy(() => import('../AppBarComponent'))
const LayoutDrawer = lazy(() => import('../DrawerComponent'))

export default function Layout(props) {
    const [username, setUsername] = useState("")
    const [userType, setUserType] = useState("")
    const [menuOpen, setMenuOpen] = useState(true)

    const navigate = useNavigate();

    function toggleMenuOpen() {
        menuOpen ? setMenuOpen(false) : setMenuOpen(true);
    }

    async function handleLogout() {
        const requestOptions = {
            method: "DELETE", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/logout/", requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeToken();
                    navigate("/login");
                }
            })
    }

    async function UserInfoGet(props) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };
        await fetch("/api/user/get/" + "?uid=" + props.uid, requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setUsername(data.data.username);
                        setUserType(data.data.type);
                    })
                }
            })
    }

    useEffect(() => {
        UserInfoGet(props);
    }, [])

    return (
        <StyledRoot>
            {menuOpen ? <LayoutDrawer userType={userType} toggleMenuOpen={toggleMenuOpen}/> : null}
            <StyledContainer>
                <LayoutAppBar
                    username={username}
                    toggleMenuOpen={toggleMenuOpen}
                    handleLogout={handleLogout}
                />
                <Outlet/>
            </StyledContainer>
        </StyledRoot>
    )
}
