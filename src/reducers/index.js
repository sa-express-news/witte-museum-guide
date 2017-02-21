import { combineReducers } from 'redux';

// Reducers
import markers from './map-reducer';

// Combine Reducers
const reducers = combineReducers({
    markers
});

export default reducers;