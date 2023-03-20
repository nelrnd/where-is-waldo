import '../styles/Footer.css';
import GitHubIcon from '../assets/icons/github.png';

const Footer = () => {
  return (
    <footer className="Footer">
      <img src={GitHubIcon} alt="GitHub icon" className="icon" />
      <p>
        Created by{' '}
        <a href="https://github.com/nelrnd" target="_blank" rel="noreferrer">
          Nel
        </a>
      </p>
    </footer>
  );
};

export default Footer;
