import { Reducer } from "redux";
import { Credentials, CredentialsState, CredentialsTypes } from "./types";

const INITIAL_STATE: CredentialsState = {
    data: {} as Credentials,
    loading: false,
    error: false,
}

const reducer: Reducer<CredentialsState> = (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case CredentialsTypes.AUTHENTICATE_REQUEST:
            return { ...state, loading: true };
        case CredentialsTypes.AUTHENTICATE_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload };
        case CredentialsTypes.AUTHENTICATE_FAILURE:
            return { ...state, loading: false, error: true, data: {} as Credentials };
        case CredentialsTypes.AUTHENTICATE_CLEAR:
            return INITIAL_STATE;
        default:
            return state
    }
}

export default reducer;