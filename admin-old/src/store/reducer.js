import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import stopsReducer from "./stopReducer";
import busReducer from "./busReducer";
import announcementReducer from "./announcementReducer";
import userReducer from "./userReducer";
import notificationsReducer from "./notificationReducer";
import feedbackReducer from "./feedbackReducer";
import statsReducer from "./statsReducer";
import driverReducer from "./driverReducer";

const rootReducer = combineReducers({
  buses: busReducer,
  stops: stopsReducer,
  announcements: announcementReducer,
  users: userReducer,
  notifications: notificationsReducer,
  feedbacks: feedbackReducer,
  stats: statsReducer,
  drivers: driverReducer,
});

const configureStore = () => {
  return legacy_createStore(rootReducer, applyMiddleware(thunk));
};

export { configureStore };
