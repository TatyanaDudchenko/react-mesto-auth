import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar({signout, email}) {
    const location = useLocation();

    return (
        <nav className="navbar">
            {location.pathname === "/signin" && <NavLink exact className="navbar__item" to="/signup">Регистрация</NavLink>}
            {location.pathname === "/signup" && <NavLink className="navbar__item" to="/signin">Войти</NavLink>}
            {location.pathname === "/" && <button className="navbar__item navbar__item_email">{email}</button>}
            {location.pathname === "/" && <NavLink onClick={signout} className="navbar__item" to="/signin">Выйти</NavLink>}
        </nav>
    )
}

export default NavBar;
