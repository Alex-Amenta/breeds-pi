import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.firstContent}>
        <img src={props.image} alt={props.name} />
      </div>
      <div
        className={styles.secondContent}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${props.image})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <h2>{props.name}</h2>
        <p>{props.temperament}</p>
        <p>
          {props.temperaments
            ? props.temperaments.map((temp) => temp.name).slice(0, 3).join(", ")
            : null}
        </p>
        <p className={styles.weight}>
          {props.min_weight} - {props.max_weight} kg
        </p>
      </div>
    </div>
  );
};

export default Card;
