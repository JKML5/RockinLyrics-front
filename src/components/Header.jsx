import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="header">
      <a href="/">
        <img src={logo} alt="Logo Rockin'1000" className="header__logo" />
      </a>{' '}
    </header>
  );
}

export default Header;
