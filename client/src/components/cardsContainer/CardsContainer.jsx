import Card from "../card/Card";
import styles from "./CardsContainer.module.css";
import { Link } from "react-router-dom";

const CardsContainer = ({ currentDogs }) => {
  return (
    <div>
      <div className={styles.containerCards}>
        {currentDogs?.map((dog) => {
          return (
            <Link to={`/detail/${dog.id}`} key={dog.id}>
              <Card
                id={dog.id}
                name={dog.name}
                image={dog.image}
                temperament={dog.temperament}
                temperaments={dog?.temperaments}
                min_weight={dog.min_weight}
                max_weight={dog.max_weight}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CardsContainer;
