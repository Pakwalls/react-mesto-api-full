import { Link, useHistory } from 'react-router-dom';
import headerLogo from '../images/header_logo.svg';


function Header({isLoggedIn, email, onLogout}) {
  const currentLocation = useHistory().location.pathname;
  
  return (
    <header className="header">
      <Link to="/">
        <img src={headerLogo} alt="логотип страницы" className="header__logo" />
      </Link>
      <div className="header__container">
        <p className="header__email">{email}</p>
        {currentLocation === "/sign-in" && <Link to="sign-up" className="header__page-link hover-animated">Регистрация</Link>}
        {currentLocation === "/sign-up" && <Link to="sign-in" className="header__page-link hover-animated">Войти</Link>}
        {isLoggedIn && <button onClick={onLogout} className="header__exit-btn hover-animated">Выйти</button>}
      </div>
    </header>
  );
}

export default Header;
