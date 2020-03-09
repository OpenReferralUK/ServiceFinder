import { SAVE_PREVIOUS_PAGE, SAVE_TEMPORAL_SEARCHES, SHOW_RESULTS } from "../Actions/types";

const init_data = {
    home: false,
    showResults: false,
    previousPage: ''
}

const tempSearches = function (state = init_data, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'SET_HOME':
            stateCopy.home = true;
            return stateCopy;
        case SAVE_TEMPORAL_SEARCHES:
            stateCopy.searches = action.payload;
            return stateCopy;
        case SHOW_RESULTS:
            stateCopy.showResults = action.payload;
            return stateCopy;
        case SAVE_PREVIOUS_PAGE:
            stateCopy.previousPage = action.payload;
            return stateCopy;
        default: return stateCopy;
    }
}

export default tempSearches;