import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../redux/actions";
import validations from "./validations";

const Form = () => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.allTemperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  

  const [newDog, setNewDog] = useState({
    name: "",
    imageUrl: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_spanMin: "",
    life_spanMax: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    imageUrl: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });

  const [selectTemperament, setSelectTemperament] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setErrors(validations({ ...newDog, [name]: value }));
    setNewDog({ ...newDog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/dogs", newDog)
      .then((response) => {
        if (!response.data) {
          throw new Error("Error creating dog");
        }

        // si se creo, limpiamos el formulario
        setNewDog({
          name: "",
          imageUrl: "",
          min_height: "",
          max_height: "",
          min_weight: "",
          max_weight: "",
          life_spanMin: "",
          life_spanMax: "",
          temperaments: [],
        });
      })
      .catch((error) => console.error(error.message));
  };

  const disabled =
    newDog.name === "" ||
    newDog.imageUrl === "" ||
    newDog.temperaments.length === 0;

  return (
    <div className={styles.container}>
      <h1>Create Dog</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newDog.name}
          onChange={handleChange}
        />
        {errors.name && <p className={styles.error_message}>{errors.name}</p>}

        {/* <input type="image" src="https://img.freepik.com/fotos-premium/perro-dibujos-animados-sentado-sobre-fondo-azul_881695-24794.jpg?size=626&ext=jpg&ga=GA1.2.758860279.1679697857&semt=ais" alt="" /> */}

        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={newDog.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && (
          <p className={styles.error_message}>{errors.imageUrl}</p>
        )}

        <label>Height (min - max):</label>
        <input
          type="text"
          name="min_height"
          value={newDog.min_height}
          onChange={handleChange}
          placeholder="minimum height..."
        />
        <input
          type="text"
          name="max_height"
          value={newDog.max_height}
          onChange={handleChange}
          placeholder="maximum height..."
        />
        {errors.height && (
          <p className={styles.error_message}>{errors.height}</p>
        )}

        <label>Weight (min - max):</label>
        <input
          type="text"
          name="min_weight"
          value={newDog.min_weight}
          onChange={handleChange}
          placeholder="minimum weight..."
        />
        <input
          type="text"
          name="max_weight"
          value={newDog.max_weight}
          onChange={handleChange}
          placeholder="maximum weight..."
        />
        {errors.weight && (
          <p className={styles.error_message}>{errors.weight}</p>
        )}

        <label>Life span (min - max):</label>
        <input
          type="text"
          name="life_spanMin"
          value={newDog.life_spanMin}
          onChange={handleChange}
          placeholder="minimum life span..."
        />
        <input
          type="text"
          name="life_spanMax"
          value={newDog.life_spanMax}
          onChange={handleChange}
          placeholder="maximum life span..."
        />
        {errors.life_span && (
          <p className={styles.error_message}>{errors.life_span}</p>
        )}

        <label>Temperaments:</label>
        <select
          name="temperaments"
          value={newDog.temperaments}
          onChange={handleChange}
        >
          <option value="">Select temperaments...</option>
          {allTemperaments.map((temp) => (
            <option key={temp.id} value={temp.name}>
              {temp.name}
            </option>
          ))}
        </select>
        {errors.temperaments && (
          <p className={styles.error_message}>{errors.temperaments}</p>
        )}

        <button
          type="submit"
          disabled={disabled}
          className={!disabled ? styles.create : styles.button_create}
        >
          <span className={styles.buttonTop}>Submit</span>
        </button>
      </form>
    </div>
  );
};

export default Form;
