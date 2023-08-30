import { GET_DOGS, GET_DOGS_ID, GET_DOGS_NAME, POST_DOGS, GET_TEMPERAMENTS, FILTER_TEMPERAMENTS, ORDER_BY_NAME, ORDER_BY_WEIGHT, FILTER_BY_ORIGEN } from "./types";

const initialState = {
    allDogs: [],
    dogs: [],
    dogDetails: [],
    allTemperaments: [],
    filteredByTemperament: [],
}

const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: payload,
                dogs: payload
            }

        case GET_DOGS_ID:
            return {
                ...state,
                dogDetails: payload
            }

        case GET_DOGS_NAME:
            return {
                ...state,
                dogs: payload
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: payload
            }

        case POST_DOGS:
            return {
                ...state,
                allDogs: [...state.allDogs, payload],
                dogs: [...state.dogs, payload]
            }

        case FILTER_TEMPERAMENTS:
            const selectedTemperaments = payload;

            if (!selectedTemperaments || selectedTemperaments.length === 0) {
                return {
                    ...state,
                    dogs: state.allDogs, // Mostrar todos los perros cuando no hay temperamentos seleccionados
                    filteredByTemperament: [], // Limpiar el estado de filtrado por temperamento
                };
            }

            const filterTemperament = state.allDogs.filter((dog) => {
                if (dog.created) {
                    return dog.temperaments.map(temp => temp.name).join(', ').includes(selectedTemperaments);
                } else {
                    return dog.temperament && selectedTemperaments.some(temp => dog.temperament.includes(temp))
                }
            })

            return {
                ...state,
                dogs: filterTemperament,
                filteredByTemperament: filterTemperament
            }

        case FILTER_BY_ORIGEN:
            const filteredDogs = payload === 'API'
                ? state.allDogs.filter(dog => !dog.created) //Filtrar perros API
                : state.allDogs.filter(dog => dog.created); //Filtrar perros creados DB

            return {
                ...state,
                dogs: payload === 'All' ? state.allDogs : filteredDogs
            }

        case ORDER_BY_NAME:
            const alphaOrderName = [...state.dogs].sort((a, b) => {
                if (payload === 'asc') {
                    return a.name < b.name ? -1 : 1
                } else {
                    return a.name > b.name ? -1 : 1
                }
            });

            return {
                ...state,
                dogs: alphaOrderName
            }

        case ORDER_BY_WEIGHT:
            if (!payload && payload.length === 0) {
                return {
                    ...state,
                    dogs: state.allDogs
                }
            }
            const orderByWeight = [...state.dogs].sort((dogA, dogB) => {
                const averageWeightA = (parseFloat(dogA.min_weight) + parseFloat(dogA.max_weight)) / 2;
                const averageWeightB = (parseFloat(dogB.min_weight) + parseFloat(dogB.max_weight)) / 2;

                if (payload === "asc") {
                    return averageWeightA - averageWeightB; // Ascendente
                } else {
                    return averageWeightB - averageWeightA; // Descendente
                }
            })

            return {
                ...state,
                dogs: orderByWeight
            }

        default:
            return { ...state }
    }
}


export default rootReducer;