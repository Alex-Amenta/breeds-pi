import { GET_DOGS, GET_DOGS_ID, GET_DOGS_NAME, POST_DOGS, GET_TEMPERAMENTS, FILTER_TEMPERAMENTS, ORDER_BY_NAME, ORDER_BY_WEIGHT, FILTER_BY_ORIGEN } from "./types";
import axios from 'axios';

const URL_DOGS = "http://localhost:3001/dogs";
const URL_TEMPERAMENTS = "http://localhost:3001/temperaments";

const getDogs = () => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(URL_DOGS);
            const dogs = apiData.data;
            dispatch({ type: GET_DOGS, payload: dogs });
        } catch (error) {
            console.log(error);
        }
    }
};

const getDogsById = (id) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(`${URL_DOGS}/${id}`);
            const dogsId = apiData.data;
            dispatch({ type: GET_DOGS_ID, payload: dogsId });
        } catch (error) {
            console.log(error);
        }
    }
};

const getDogsByName = (name) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(`${URL_DOGS}?name=${name}`);
            const dogsName = apiData.data;
            dispatch({ type: GET_DOGS_NAME, payload: dogsName });
        } catch (error) {
            console.log(error);
        }
    }
};

const postDogs = (newDog) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.post(URL_DOGS, newDog);
            const createDog = apiData.data;
            dispatch({ type: POST_DOGS, payload: createDog });
        } catch (error) {
            console.log(error);
        }
    }
};

const getTemperaments = () => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(URL_TEMPERAMENTS);
            const temperaments = apiData.data;
            dispatch({ type: GET_TEMPERAMENTS, payload: temperaments });
        } catch (error) {
            console.log(error);
        }
    }
};

// Filtrar por temperamentos
const filterByTemperament = (temperament) => {
    return (dispatch) => {
        dispatch({
            type: FILTER_TEMPERAMENTS,
            payload: temperament
        })
    }
};

// Filtrar perros por origen (API o base de datos)
const filterBySource = (source) => {
    return (dispatch) => {
        dispatch({
            type: FILTER_BY_ORIGEN,
            payload: source
        })
    }
};

// Filtrar nombres de perros en orden alfabetico (asc, desc)
const orderByName = (order) => {
    return (dispatch) => {
        dispatch({
            type: ORDER_BY_NAME,
            payload: order
        })
    }
};

// Filtrar por peso (asc, desc)
const orderByWeight = (order) => {
    return (dispatch) => {
        dispatch({
            type: ORDER_BY_WEIGHT,
            payload: order
        })
    }
};

export {
    getDogs,
    getDogsById,
    getDogsByName,
    postDogs,
    getTemperaments,
    filterByTemperament,
    filterBySource,
    orderByName,
    orderByWeight
}