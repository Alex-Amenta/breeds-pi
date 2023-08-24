import { Link } from "react-router-dom";
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
    <div className={styles.backgroundImage}>
      <h1>Welcome to Dogs</h1>
      <h2>Discover unique and fascinating dog breeds!</h2>
      <Link to="/home">
        <button><span className={styles.buttonTop}>Get Into</span></button>
      </Link>
    </div>
    </div>
  );
};

export default Landing;
