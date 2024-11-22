import {
  CREATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  GET_ALL_ANNOUNCEMENT,
} from "./actions/actionType";

const initialState = {
  announcements: [],
};

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [...state.announcements, action.payload],
      };
    case GET_ALL_ANNOUNCEMENT:
      return {
        ...state,
        announcements: action.payload,
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

export default announcementReducer;
