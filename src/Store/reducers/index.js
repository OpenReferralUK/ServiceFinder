import {
    combineReducers
} from 'redux'

import Interacted from './Interacted';
import SearchesReducer from './SearchesReducer';
import tempSearches from './tempSearches';
import modalReducer from './modalReducer';
import FavouritesServiceReducer from './FavouritesServicesReducer';
import FavouritesSearchesReducer from './FavouritesSearchesReducer';

export default combineReducers({
    Interacted,
    SearchesReducer,
    tempSearches,
    modalReducer,
    FavouritesSearchesReducer,
    FavouritesServiceReducer
})