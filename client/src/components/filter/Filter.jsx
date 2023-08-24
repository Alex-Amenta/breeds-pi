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

const Filter = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.allTemperaments);

  // Estado para almacenar el temperamento seleccionado
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const handleChange = (actionCreator) => (e) => {
    dispatch(actionCreator(e.target.value));
  };

  const handleTemperamentChange = (e) => {
    const selectedTemps = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setSelectedTemperaments(selectedTemps);
    dispatch(
      filterByTemperament(selectedTemps.length > 0 ? selectedTemps : null)
    );
  };

  const handleResetTemperament = () => {
    setSelectedTemperaments([]);
    dispatch(filterByTemperament(null));
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <div className={styles.scrollableContainer}>
        <label>Filter by Temperaments:</label>
        <select
          multiple
          value={selectedTemperaments}
          onChange={handleTemperamentChange}
          className={styles.selectTemperament}
        >
          {temperaments.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
        <button onClick={handleResetTemperament}>
          <i
            className="fa-solid fa-arrows-rotate"
            style={{ color: "#ffffff" }}
          ></i>
        </button>
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
