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
    image: "",
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
    image: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });

  const [selectTemperament, setSelectTemperament] = useState([]);

  const handleTemperamentSelected = (e) => {
    const temperamentSelect = e.target.value;

    if (selectTemperament.includes(temperamentSelect)) {
      return alert("Temperature is already selected");
    }

    if (selectTemperament.length > 8) {
      return alert("Maximum 8 temperatures please");
    }

    // Agregar la temp seleccionada a la lista de temp seleccionadas
    setSelectTemperament([...selectTemperament, temperamentSelect]);

    setNewDog({
      ...newDog,
      temperaments: [...newDog.temperaments, temperamentSelect],
    });

    setErrors({ ...errors, temperaments: "" });
  };

  const handleRemoveTemperament = (temp) => {
    setSelectTemperament(selectTemperament.filter((t) => t !== temp));
    setNewDog({
      ...newDog,
      temperaments: newDog.temperaments.filter((t) => t !== temp),
    });
  };

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
          image: "",
          min_height: "",
          max_height: "",
          min_weight: "",
          max_weight: "",
          life_spanMin: "",
          life_spanMax: "",
          temperaments: [],
        });
        setSelectTemperament([]);
        alert("Dog created successfully!");
      })
      .catch((error) => console.error(error.message));
  };

  const disabled =
    newDog.name === "" ||
    newDog.image === "" ||
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

        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={newDog.image}
          onChange={handleChange}
        />
        {errors.image && <p className={styles.error_message}>{errors.image}</p>}

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
          onChange={handleTemperamentSelected}
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

        {/* Lista de temperamentos seleccionados */}
        <div className={styles.tempContainer}>
          {selectTemperament.map((temp) => (
            <div key={temp} className={styles.selectTemp}>
              <h3>{temp}</h3>
              <button
                type="button"
                onClick={() => handleRemoveTemperament(temp)}
              >
                <span className={styles.buttonRemove}>
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "white" }}
                  ></i>
                </span>
              </button>
            </div>
          ))}
        </div>

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
