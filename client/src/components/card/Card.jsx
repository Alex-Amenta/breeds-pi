import styles from "./Card.module.css";

const Card = (props) => {
  const URL_IMAGE =
    "https://img.freepik.com/fotos-premium/perro-dibujos-animados-sentado-sobre-fondo-azul_881695-24794.jpg?size=626&ext=jpg&ga=GA1.1.758860279.1679697857&semt=ais";

  return (
    <div className={styles.card}>
      <div className={styles.firstContent}>
        <img
          src={props.image}
          alt={props.name}
          onError={(e) => {
            e.target.src = URL_IMAGE;
            e.target.onError = null;
            e.preventDefault();
          }}
        />
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
            ? props.temperaments.map((temp) => temp.name).join(", ")
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
