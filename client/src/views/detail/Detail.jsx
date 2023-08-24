import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogsById } from "../../redux/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dogDetails = useSelector((state) => state.dogDetails);

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
              {dogDetails.weight && (
                <p>
                  <b>Weight: </b>
                  {dogDetails.weight}
                </p>
              )}
              {dogDetails.height && (
                <p>
                  <b>Height: </b>
                  {dogDetails.height}
                </p>
              )}
              <p>
                <b>Temperaments: </b>
                {dogDetails.temperament}
              </p>
              <p>
                <b>Years of life: </b>
                {dogDetails.life_span}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
