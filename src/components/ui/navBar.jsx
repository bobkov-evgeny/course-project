import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <ul className="nav mt-2 mb-3">
            <li className="nav-item ">
                <Link className="nav-link active" to="/main">
                    Main
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/login">
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/users">
                    Users
                </Link>
            </li>
        </ul>
    );
};

export default NavBar;
