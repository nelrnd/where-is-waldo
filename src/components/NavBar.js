import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <header className="NavBar">
      <div className="NavBar_content">
        <div className="NavBar_brand">
          <div className="NavBar_img-wrapper"></div>
          <div className="NavBar_text-wrapper">
            <span className="first-line">WHERE'S</span>
            <span className="second-line">WALDO?</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;