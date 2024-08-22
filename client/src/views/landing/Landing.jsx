import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import imageDog from "../../images/dog-hero-2.webp";
import TotalAvatars from "../../components/ui/TotalAvatars";
import { Rating } from "@mui/material";

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <h1>Uncover Dog Breeds</h1>
        <img className={styles.dogImage} src={imageDog} alt="Dog image" />
        <article className={styles.content}>
          <div className={styles.contentAvatars}>
            <h2>Trusted by Dog Lovers</h2>
            <p>
              <strong>4.8</strong> (1.5k reviews)
            </p>
            <Rating value={4.5} precision={0.5} readOnly />
            <TotalAvatars />
          </div>
          <div className={styles.contentAbout}>
            <h3>Explore and Create</h3>
            <p>
              Uncover all dog breeds and even create your own. Start your
              exploration now!
            </p>
            <Link to="/home">
              <button>
                <span className={styles.buttonTop}>Get started</span>
              </button>
            </Link>
          </div>
        </article>

        
      </div>
    </div>
  );
};

export default Landing;
