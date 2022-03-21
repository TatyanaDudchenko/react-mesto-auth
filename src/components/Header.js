import headerLogo from '../images/header-logo.svg';

function Header() {
    return (
        <div className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип Mesto Russia"/>
        </div>
    )
}

export default Header;