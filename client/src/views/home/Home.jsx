import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/cardsContainer/CardsContainer";
import { useEffect } from "react";
import { getDogs } from "../../redux/actions";
import Filter from "../../components/filter/Filter";
import Pagination from "../../components/pagination/Pagination";

const Home = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();

  const dogs = useSelector((state) => state.dogs);
  const dogsPerPage = 8;

  // Calculamos los indices del primer y ultimo perro de la pagina
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      <Filter setCurrentPage={setCurrentPage} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <CardsContainer currentDogs={currentDogs} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Home;
