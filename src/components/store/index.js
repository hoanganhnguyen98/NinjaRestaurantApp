import {createStore, applyMiddleware} from 'redux';
import languageReducer from '../../redux/reducers';

const store = createStore(languageReducer);

export default store;
