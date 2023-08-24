import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <ul>
        <li>
          <Link className={styles.link} to="/home">
            <h2>Dogs App</h2>
          </Link>
        </li>
        <li className={styles.li2}>
          {location.pathname === "/home" && <SearchBar />}
        </li>
        <li className={styles.li1}>
          <Link className={styles.link} to="/form">
            CREATE DOG
          </Link>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/alexander-amenta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="fa-brands fa-linkedin"
              style={{ color: "#ffffff" }}
            ></i>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Alex-Amenta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="fa-brands fa-github"
              style={{ color: "#ffffff", marginRight: "20px" }}
            ></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
