import { ADD_STOP, DELETE_STOP, GET_ALL_STOPS } from "./actionType";

const initialState = {
  stops: [],
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STOPS:
      return { ...state, stops: action.payload };
    case ADD_STOP:
      return { ...state, stops: [...state.stops, action.payload] };
    case DELETE_STOP:
      return {
        ...state,
        stops: state.stops.filter((data) => data.id !== action.payload),
      };
    default:
      return state;
  }
};

export default busReducer;
