import { useDispatch, useSelector } from "react-redux";
import {
  filterBySource,
  filterByTemperament,
  getTemperaments,
  orderByName,
  orderByWeight,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import styles from "./Filter.module.css";

const Filter = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.allTemperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  // Estado para almacenar el temperamento seleccionado
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const handleChange = (actionCreator) => (e) => {
    dispatch(actionCreator(e.target.value));

    setCurrentPage(1);
  };

  const handleTemperamentChange = (e) => {
    const selectedTemps = [];
    const options = e.target.selectedOptions;

    for (let i = 0; i < options.length; i++) {
      selectedTemps.push(options[i].value);
    }

    setSelectedTemperaments(selectedTemps);
    dispatch(
      filterByTemperament(selectedTemps.length > 0 ? selectedTemps : null)
    );

    setCurrentPage(1);
  };

  const handleResetTemperament = () => {
    setSelectedTemperaments([]);
    dispatch(filterByTemperament(null));
  };

  return (
    <section className={styles.container}>
      <button onClick={handleResetTemperament}>
        <span className={styles.buttonReset}>
          <i
            className="fa-solid fa-arrows-rotate"
            style={{ color: "black" }}
          ></i>
        </span>
      </button>
      <div className={styles.tempContainer}>
        <label>Filter by Temperaments:</label>
        <select
          value={selectedTemperaments}
          onChange={handleTemperamentChange}
          className={styles.select}
        >
          <option value="">All temperaments</option>
          {temperaments?.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Filter by Name:</label>
        <select onChange={handleChange(orderByName)} className={styles.select}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      <div>
        <label>Filter by Weight:</label>
        <select
          onChange={handleChange(orderByWeight)}
          className={styles.select}
        >
          <option value="">All</option>
          <option value="asc">Low to hight</option>
          <option value="desc">Hight to Low</option>
        </select>
      </div>

      <div>
        <label>Filter by Origen:</label>
        <select
          onChange={handleChange(filterBySource)}
          className={styles.select}
        >
          <option value="All">All</option>
          <option value="API">API</option>
          <option value="DB">DB</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
