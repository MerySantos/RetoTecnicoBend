import createStore from 'redux-zero';
import {list, botonescalculadora} from './BotonesCalculadora';

const initialState = {
    list: list,
    buttons: botonescalculadora,
    result: "0",
    calculation: "",
    reset: false,
};

const store = createStore(initialState);
export default store;