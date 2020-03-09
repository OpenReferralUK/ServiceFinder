import {
    SAVE_AGE,
    SAVE_DAY,
    ADD_CIRCUMSTANCE,
    ADD_NEED,
    SAVE_POSTCODE,
    SAVE_PROXIMITY,
    SAVE_GENDER,
    SAVE_TYPEOFSERVICE,
    CLEAR_ALL_PREVIOUS_SEARCHES,
    CLEAR_PREVIOUS_SEARCHES_BY_ID,
    UPDATE_FAVOURITE,
    ADD_FAVOURITE,
    ADD_FAVOURITE_SERVICE,
    UPDATE_FAVOURITE_SERVICE,
    SAVE_TEXT,
    SAVE_TEMPORAL_SEARCHES,
    SAVE_ELEMENT,
    SAVE_PREVIOUS_PAGE,
    SAVE_ITEM_ID,
    SAVE_BUTTON_FOR_MODAL
} from "./types";

/**
 * Returns the action of age
 * @param {string|[number]} value 
 */
export const getAgeAction = (value) => {
    let action = {
        type: SAVE_AGE,
        payload: {
            category: 'age',
            name: 'Age',
            value,
            label: value,
            interacted: value !== ''
        },
    }
    return action;
}

/**
 * Returns the action of postcode
 * @param {string} value
 */
export const getPostcodeAction = (value) => {
    let action = {
        type: SAVE_POSTCODE,
        payload: {
            category: 'postcode',
            name: 'Postal Code',
            value,
            label: value,
            interacted: value !== ''
        }
    }
    return action;
}
/**
 * Returns the action of proximity
 * @param {string} obj 
 */
export const getProximityAction = (obj) => {
    let action = {
        type: SAVE_PROXIMITY,
        payload: {
            category: 'proximity',
            name: 'Proximity',
            value: obj.value + "",
            label: obj.label,
            interacted: obj.value !== ''
        }
    }
    return action;
}

/**
 * Returns the action of gender
 * @param {} obj 
 */
export const getGenderAction = (obj) => {
    let action = {
        type: SAVE_GENDER,
        payload: {
            category: 'gender',
            name: 'Gender',
            value: obj.value,
            label: obj.label,
            original: obj.original,
            interacted: obj.value !== ''
        }
    }
    return action;
}

/**
 * Returns the action of availability
 * @param {[{}]} data
 */
export const getAvailabilityAction = (data) => {
    let action = {
        type: SAVE_DAY,
        payload: {
            category: 'availability',
            name: 'Availability',
            data: (data === null ? [] : data),
            interacted: ((data !== []) && (data !== null) && (data.length !== 0))
        }
    }
    return action;
}

/**
 * Returns the action of circumstances
 * @param {[{}]} data
 */
export const getCircumstancesAction = (data) => {
    let action = {
        type: ADD_CIRCUMSTANCE,
        payload: {
            category: 'circumstances',
            name: 'Circumstances',
            data: (data === null ? [] : data),
            interacted: ((data !== []) && (data !== null) && (data.length !== 0))
        }
    }
    return action;
}

/**
 * Returns the action of needs
 * @param {[{}]} data
 */
export const getNeedsAction = (data) => {
    let action = {
        type: ADD_NEED,
        payload: {
            category: 'needs',
            name: 'Needs',
            data: (data === null ? [] : data),
            interacted: ((data !== []) && (data !== null) && (data.length !== 0))
        }
    }
    return action;
}

/**
 * Returns the action of service Type
 * @param {string} obj 
 */
export const getServiceTypesAction = (obj) => {
    let action = {
        type: SAVE_TYPEOFSERVICE,
        payload: {
            category: 'servicetypes',
            name: 'Service Types',
            value: obj.value,
            label: obj.label,
            original: obj,
            interacted: obj.value !== ''
        }
    }
    return action;
}

/**
 * Returns the action of clear all searches
 */
export const getClearAllSearchesAction = () => {
    return {
        type: CLEAR_ALL_PREVIOUS_SEARCHES
    }
}

/**
 * Returns the action of remove a previous search by id
 * @param {} item 
 */
export const getClearPreviousSearchesByIDAction = (item) => {
    return {
        type: CLEAR_PREVIOUS_SEARCHES_BY_ID,
        payload: item.time
    }
}

/**
 * Returns the action to update a favourite search
 * @param {} item 
 */
export const getUpdateFavouriteSearchAction = (item) => {
    return {
        type: UPDATE_FAVOURITE,
        payload: item
    }
}

/**
 * Returns the action to add a favourite search
 * @param {} item 
 */
export const getAddFavouriteSearchAction = (item) => {
    return {
        type: ADD_FAVOURITE,
        payload: item
    }
}

/**
 * Returns the action to update a favourite service
 * @param {} item 
 */
export const getUpdateFavouriteServiceAction = (item) => {
    return {
        type: UPDATE_FAVOURITE_SERVICE,
        payload: item
    }
}

/**
 * Returns the action to add a favourite service
 * @param {} item 
 */
export const getAddFavouriteServiceAction = (item) => {
    return {
        type: ADD_FAVOURITE_SERVICE,
        payload: item
    }
}

/**
 * Returns the action of postcode
 * @param {string} value
 */
export const getTextAction = (value) => {
    let action = {
        type: SAVE_TEXT,
        payload: {
            category: 'text',
            value,
            label: value,
            interacted: value !== ''
        }
    }
    return action;
}

/**
 * To save the searched elements
 * @param {[{}]} elements 
 */
export const getSaveElementsAction = (elements) => ({
    type: SAVE_ELEMENT,
    payload: elements
})

/**
 * 
 * @param {[{}]} results 
 */
export const getSaveTemporalSearchesAction = (results) => ({
    type: SAVE_TEMPORAL_SEARCHES,
    payload: results
})

/**
 * Returns the action to save the previous page
 * @param {string} page 
 */
export const getSavePreviousPageAction = (page) => ({
    type: SAVE_PREVIOUS_PAGE,
    payload: page
})

export const getSaveItemIdAction = id => ({
    type: SAVE_ITEM_ID,
    payload: id
})

export const getSaveButtonForModal = button => ({
    type: SAVE_BUTTON_FOR_MODAL,
    payload: button
})