import { APP_STATUS, GET_USER_COORDS } from "./actionType";

const initialState = {
  user: null,
  appState: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_COORDS:
      return { ...state, user: action.payload };
    case APP_STATUS:
      return { ...state, appState: action.payload };
    default:
      return state;
  }
};

export default userReducer;
