import { Reducer } from "redux";
import { Person, PersonState, PersonTypes } from "./types";

const INITIAL_STATE: PersonState = {
    data: {} as Person,
    loading: false,
    error: false,
}

const reducer: Reducer<PersonState> = (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case PersonTypes.PERSON_REQUEST:
            return { ...state, loading: true };
        case PersonTypes.PERSON_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload };
        case PersonTypes.PERSON_FAILURE:
            return { ...state, loading: false, error: true, data: {} as Person };
        case PersonTypes.PERSON_CLEAR:
            return INITIAL_STATE;
        default:
            return state
    }
}

export default reducer;