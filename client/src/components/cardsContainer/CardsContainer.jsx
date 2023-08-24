import { useSelector } from "react-redux";
import Card from "../card/Card";
import styles from "./CardsContainer.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../pagination/Pagination";

const CardsContainer = () => {
  const dogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  // Calculamos los indices del primer y ultimo perro de la pagina
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div className={styles.containerCards}>
        {currentDogs.map((dog) => {
          return (
            <Link to={`/detail/${dog.id}`} key={dog.id}>
              <Card
                id={dog.id}
                name={dog.name}
                image={dog.image}
                temperament={dog.temperament}
                weight={dog.weight}
              />
            </Link>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CardsContainer;
