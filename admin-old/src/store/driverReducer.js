import {
  CREATE_DRIVER,
  DELETE_DRIVER,
  GET_ALL_DRIVER,
} from "./actions/actionType";

const initialState = {
  drivers: [],
};

const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DRIVER:
      return {
        ...state,
        drivers: [...state.drivers, action.payload],
      };
    case GET_ALL_DRIVER:
      return {
        ...state,
        drivers: action.payload,
      };
    case DELETE_DRIVER:
      return {
        ...state,
        drivers: state.drivers.filter((data) => data.id !== action.payload),
      };
    default:
      return state;
  }
};

export default driverReducer;
