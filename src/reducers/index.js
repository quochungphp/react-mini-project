import { combineReducers } from 'redux';
import auth from './users';
import notify from './notify';

const appReducers = combineReducers({
    notify,
	auth
});

export default appReducers;