import { DELETE_FEEDBACK, GET_ALL_FEEDBACK } from "./actions/actionType";

const initialState = {
  feedbacks: [],
};

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FEEDBACK:
      return {
        ...state,
        feedbacks: state.feedbacks.filter((data) => data.id !== action.payload),
      };
    case GET_ALL_FEEDBACK:
      return {
        ...state,
        feedbacks: action.payload,
      };
    default:
      return state;
  }
};

export default announcementReducer;
