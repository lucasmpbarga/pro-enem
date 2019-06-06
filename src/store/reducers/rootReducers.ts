import { combineReducers } from 'redux';
import credentials from './credentials';
import person from './person';

export default combineReducers({
    credentials,
    person
});