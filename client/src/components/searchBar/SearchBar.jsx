import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDogsByName } from "../../redux/actions";

const SearchBar = () => {
  const [dogName, setDogName] = useState("");
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dogName) {
      alert("Please enter a dog name");
    } else {
      const foundDog = dogs.find((dog) =>
        dog.name.toLowerCase().includes(dogName.toLowerCase())
      );
      if (foundDog) {
        dispatch(getDogsByName(dogName));
      } else {
        alert("Dogs not found");
      }

      setDogName("");
    }
  };

  const handleInputChange = (e) => {
    setDogName(e.target.value);
  };

  //   // // Realizar la búsqueda en tiempo real
  //   useEffect(() => {
  //     const timerId = setTimeout(() => {
  //       dispatch(getDogsByName(dogName));
  //     }, 500);

  //     return () => clearTimeout(timerId); // Limpiar el timer en cada cambio del input
  //   }, [dispatch, dogName]);

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <input
          className={styles.input}
          type="search"
          name="search"
          value={dogName}
          onChange={handleInputChange}
          placeholder="Search dog..."
        />
        <button type="submit" className={styles.lupa}>
        <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
