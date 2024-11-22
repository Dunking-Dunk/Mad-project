import {
  ADD_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  GET_ALL_ANNOUNCEMENT,
  REFRESH_ANNOUNCEMENT,
} from "./actionType";

const initialState = {
  announcements: [],
  refreshing: false,
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ANNOUNCEMENT:
      return { ...state, announcements: action.payload };
    case REFRESH_ANNOUNCEMENT:
      return { ...state, refreshing: action.payload };
    case ADD_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [...state.announcements, action.payload],
      };
    case DELETE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: state.announcements.filter(
          (data) => data.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default busReducer;
