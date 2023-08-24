import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/cardsContainer/CardsContainer";
import { useEffect } from "react";
import { getDogs } from "../../redux/actions";
import Filter from "../../components/filter/Filter";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      <Filter />
      <CardsContainer />
    </>
  );
};

export default Home;
