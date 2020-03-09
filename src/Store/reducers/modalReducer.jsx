import { SAVE_ITEM_ID, SAVE_BUTTON_FOR_MODAL } from "../Actions/types";

const init_data = { itemID: '' }

const modalItem = function (state = init_data, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case SAVE_ITEM_ID:
            stateCopy.itemID = action.payload;
            return stateCopy;
        case SAVE_BUTTON_FOR_MODAL:
            stateCopy.from = action.payload;
            return stateCopy;
        default: return stateCopy;
    }
}

export default modalItem;