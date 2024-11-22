import { GET_ALL_TRACKERS, UPDATE_TRACKERS} from "./actionType";

const initialState = {
  trackers: [],
};

const trackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TRACKERS:
      return { ...state, trackers: action.payload };
      case UPDATE_TRACKERS:
        const idx = state.trackers.findIndex((track) =>track.id === action.payload.id)
          state.trackers[idx] = action.payload
          return state
    default:
      return state;
  }
};

export default trackerReducer;
