import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogsById } from "../../redux/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dogDetails = useSelector((state) => state.dogDetails);

  const verifiquedTemperament = () => {
    const temperaments = dogDetails.temperaments;

    if (typeof temperaments === "string") {
      return temperaments;
    } else if (Array.isArray(temperaments)) {
      const dbTemperaments = temperaments
        .map((temp) => temp.name)
        .slice(0, 3)
        .join(", ");
      return dbTemperaments;
    }
  };

  useEffect(() => {
    dispatch(getDogsById(id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      <h1>Dog Detail</h1>
      {!dogDetails ? (
        <h2>Loading...</h2>
      ) : (
        <div className={styles.cardContainer}>
          <div className={styles.imageContainer}>
            <img src={dogDetails.image} alt={dogDetails.name} />
          </div>
          <div className={styles.infoContainer}>
            <h2>{dogDetails.name}</h2>
            <div className={styles.info}>
              {dogDetails.min_weight && (
                <p>
                  <b>Weight: </b>
                  {dogDetails.min_weight} - {dogDetails.max_weight}
                </p>
              )}
              {dogDetails.min_height && (
                <p>
                  <b>Height: </b>
                  {dogDetails.min_height} - {dogDetails.max_height}
                </p>
              )}
              <p>
                <b>Temperaments: </b>
                {verifiquedTemperament()}
              </p>
              <p>
                <b>Years of life: </b>
                {dogDetails.life_spanMin} - {dogDetails.life_spanMax}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
