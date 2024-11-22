import {
  CREATE_BUS,
  DELETE_BUS,
  GET_ALL_BUSES,
  GET_ALL_GPS_TRACKER,
  GET_BUS,
  UPDATE_BUS,
  DELETE_TRACKER,
  CREATE_TRACKER,
} from "./actions/actionType";

const initialState = {
  buses: [],
  bus: {},
  trackers: [],
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BUSES:
      return { ...state, buses: action.payload };
    case CREATE_BUS:
      return { ...state, buses: [...state.buses, action.payload] };
    case CREATE_TRACKER:
      return { ...state, trackers: [...state.trackers, action.payload] };
    case GET_BUS:
      return { ...state, bus: action.payload };
    case GET_ALL_GPS_TRACKER:
      return { ...state, trackers: action.payload };
    case DELETE_BUS:
      return {
        ...state,
        buses: state.buses.filter((data) => data.id !== action.payload),
      };
    case DELETE_TRACKER:
      return {
        ...state,
        trackers: state.trackers.filter((data) => data.id !== action.payload),
      };
    case UPDATE_BUS:
      const buses = state.buses.filter((data) => data.id !== action.payload.id);
      return {
        ...state,
        buses: [...buses, action.payload.data],
      };
    default:
      return state;
  }
};

export default busReducer;
