import React, { useContext } from "react";
import './navbar.css'
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from '../../context/AuthContext';


function Navbar() {

    const signOut = useContext(AuthContext);

    const logout = () => {
        signOut.signOut()
    }

    const auth = useContext(AuthContext);

    return (

        <div>
            <nav>
                <div >
                    <ul id='navbar'>
                        {auth.user.email && (
                            <li>
                                <a href="/home">
                                    Home
                                </a>
                            </li>)}

                        {auth.user.email && (
                            <li>
                                <a href="/about">
                                    AboutUs
                                </a>
                            </li>)}

                    </ul>
                </div>
                <div id='navbar-title'>
                    <h2>BOOKIFY</h2>
                </div>
                <div id='navbar-blocks'>
                    <ul id="navbar">
                        {auth.user.role === "buyer" && (
                            <li>
                                <a href="/cart">
                                    <IconButton
                                        aria-label="Cart"
                                        size="large"
                                        sx={{ color: "white" }}
                                    >
                                        <ShoppingCartIcon sx={{ fontSize: 35 }} />
                                    </IconButton>
                                </a>
                            </li>)}

                        {auth.user.email && (
                            <li>
                                <a href="/profile">
                                    <IconButton
                                        aria-label="Profile"
                                        size="large"
                                        sx={{ color: "white" }}
                                    >
                                        <AccountBoxIcon sx={{ fontSize: 35 }} />
                                    </IconButton>
                                </a>
                            </li>)}
                        {auth.user.email && (
                            <li>
                                <a href="/login">
                                    <IconButton
                                        aria-label="LogOut"
                                        size="large"
                                        sx={{ color: "white" }}
                                        onClick={logout}
                                    >
                                        <LogoutIcon sx={{ fontSize: 35 }} />
                                    </IconButton>
                                </a>
                            </li>)}

                        {/* {!auth.user.email && (
                            <li>
                                <a href="/login">
                                    <IconButton
                                        aria-label="Login"
                                        size="large"
                                        sx={{ color: "white" }}
                                        onClick={logout}
                                    >
                                        <LoginIcon sx={{ fontSize: 35 }} />
                                    </IconButton>
                                </a>
                            </li>)} */}

                    </ul>
                </div>
            </nav>
        </div >
    )
}

export default Navbar