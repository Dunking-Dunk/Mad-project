import { QUICK__STATS } from "./actions/actionType";

const initialState = {
  quickStats: {},
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUICK__STATS:
      return {
        ...state,
        quickStats: action.payload,
      };
    default:
      return state;
  }
};

export default busReducer;
