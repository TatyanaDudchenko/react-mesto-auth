// import headerLogo from '../images/header-logo.svg';
// import NavBar from './NavBar';

// function Header({signedIn, signout, email}) {
//     return (
//         <div className="header">
//             <img className="header__logo" src={headerLogo} alt="Логотип Mesto Russia"/>
//             <NavBar signedIn={signedIn} signout={signout} email={email} />
//         </div>
//     )
// }

// export default Header;

import headerLogo from '../images/header-logo.svg';
import NavBar from './NavBar';

function Header({signedIn, signout, email}) {
    return (
        <div className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип Mesto Russia"/>
            <NavBar signedIn={signedIn} signout={signout} email={email} />
        </div>
    )
}

export default Header;
