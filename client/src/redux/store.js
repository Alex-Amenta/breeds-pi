import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducer";

// esto conecta con la extensión del navegador => REDUX DEVTOOLS || compose de redux 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // permite hacer las request
)
 
export default store;