import api from "../../api/api";
import axios from "axios";
import {
  GET_ALL_BUSES,
  GET_ALL_STOPS,
  CREATE_STOP,
  CREATE_BUS,
  GET_ALL_GPS_TRACKER,
  DELETE_STOP,
  DELETE_BUS,
  GET_BUS,
  UPDATE_BUS,
  CREATE_ANNOUNCEMENT,
  GET_ALL_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  GET_ALL_FEEDBACK,
  DELETE_FEEDBACK,
  SIGN_IN,
  SIGN_OUT,
  PUSH_NOTIFICATION,
  GET_ALL_NOTIFICATIONS,
  QUICK__STATS,
  GET_ALL_TRACKERS,
  DELETE_TRACKER,
  CREATE_TRACKER,
  CREATE_DRIVER,
  GET_ALL_DRIVER,
  DELETE_DRIVER,
} from "./actionType";
import moment from "moment";

export const getAllBuses = () => async (dispatch) => {
  try {
    const { data } = await api.get("/bus");
    dispatch({
      type: GET_ALL_BUSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getBus = (id, populate) => async (dispatch) => {
  try {
    const { data } = await api.get(`/bus/${id}?populate=${populate}`);
    dispatch({
      type: GET_BUS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createBus = (bus) => async (dispatch) => {
  try {
    const { data } = await api.post("/bus", bus);
    dispatch({
      type: CREATE_BUS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBus = (id) => async (dispatch) => {
  try {
    await api.delete(`/bus/${id}`);
    dispatch({
      type: DELETE_BUS,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateBus = (id, bus) => async (dispatch) => {
  console.log(bus.stops);
  try {
    const { data } = await api.put(`/bus/${id}`, bus);
    dispatch({
      type: UPDATE_BUS,
      payload: { data, id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const quickEditBus = (ids, state) => async (dispatch) => {
  try {
    await api.put(`/bus/${ids[0]}?quickedit=true`, {
      busesId: ids,
      edit: state,
    });
  } catch (err) {
    throw err;
  }
};
///////////////////////////stops/////////////////////////////////////

export const getAllStop = () => async (dispatch) => {
  try {
    const { data } = await api.get("/stop");
    dispatch({
      type: GET_ALL_STOPS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createStop = (stop) => async (dispatch) => {
  try {
    const { data } = await api.post("/stop", stop);
    dispatch({
      type: CREATE_STOP,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteStop = (id) => async (dispatch) => {
  try {
    await api.delete(`/stop/${id}`);
    dispatch({
      type: DELETE_STOP,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////////tracker//////////////////////////
export const getAllGpsTracker = () => async (dispatch) => {
  try {
    const { data } = await api.get("/gps-tracking");
    dispatch({
      type: GET_ALL_GPS_TRACKER,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////////announcement//////////////////////////
export const createAnnouncement = (content) => async (dispatch) => {
  try {
    const { data } = await api.post("/announcement", { content });
    dispatch({
      type: CREATE_ANNOUNCEMENT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAnnouncement = (id) => async (dispatch) => {
  try {
    await api.delete(`/announcement/${id}`);
    dispatch({
      type: DELETE_ANNOUNCEMENT,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllAnnouncement = () => async (dispatch) => {
  try {
    const { data } = await api.get("/announcement");
    dispatch({
      type: GET_ALL_ANNOUNCEMENT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////////feedback//////////////////////////

export const getAllFeedback = () => async (dispatch) => {
  try {
    const { data } = await api.get("/feedback");
    dispatch({
      type: GET_ALL_FEEDBACK,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFeedback = (id) => async (dispatch) => {
  try {
    await api.delete(`/feedback/${id}`);
    dispatch({
      type: DELETE_FEEDBACK,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////////authentication//////////////////////////

export const signIn = (user) => async (dispatch) => {
  try {
    const { data } = await api.post(`/users/signin`, user);
    dispatch({
      type: SIGN_IN,
      payload: data,
    });
  } catch (err) {
    throw err;
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await api.post(`/users/signout`);
    dispatch({
      type: SIGN_OUT,
    });
  } catch (err) {
    throw err;
  }
};

export const currentUser = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/users/currentuser`);
    dispatch({
      type: SIGN_IN,
      payload: data.currentUser,
    });
  } catch (err) {
    throw err;
  }
};

///////////////////////////////////////notification//////////////////////////
export const pushNotification = (message) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://app.nativenotify.com/api/notification",
      {
        appId: process.env.REACT_APP_APP_ID,
        appToken: process.env.REACT_APP_APP_TOKEN,
        dateSent: moment().format("MMMM Do YYYY, h:mm:ss a"),
        ...message,
      }
    );
  } catch (err) {
    throw err;
  }
};

export const getAllNotfications = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://app.nativenotify.com/api/notification/inbox/6812/hIdJXJ415JJ7O0VRhedjiQ"
    );
    dispatch({
      type: GET_ALL_NOTIFICATIONS,
      payload: data,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteNotification = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `https://app.nativenotify.com/api/notification/inbox/notification/6812/hIdJXJ415JJ7O0VRhedjiQ/${id}`
    );
  } catch (err) {
    throw err;
  }
};

//////////////////////////quickstats/////////////////////////////

export const getQuickStats = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/bus/quick-stats`);
    dispatch({
      type: QUICK__STATS,
      payload: data,
    });
  } catch (err) {
    throw err;
  }
};

/////////////////////getTracker////////////////////////

export const getAllTrackers = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/gps-tracking`);
    dispatch({
      type: GET_ALL_TRACKERS,
      payload: data,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteTracker = (id) => async (dispatch) => {
  try {
    await api.delete(`/gps-tracking/${id}`);
    dispatch({
      type: DELETE_TRACKER,
      payload: id,
    });
  } catch (err) {
    throw err;
  }
};

export const createTracker = (tracker) => async (dispatch) => {
  try {
    const { data } = await api.post(`/gps-tracking/`, tracker);
    dispatch({
      type: CREATE_TRACKER,
      payload: data,
    });
  } catch (err) {
    throw err;
  }
};
//////////////////////////DRIVER///////////////////////////////////
export const createDriver = (driver) => async (dispatch) => {
  try {
    const { data } = await api.post(`/driver/`, driver);
    dispatch({
      type: CREATE_DRIVER,
      payload: data,
    });
  } catch (err) {
    throw err;
  }
};

export const getAllDriver = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/driver/`);
    dispatch({
      type: GET_ALL_DRIVER,
      payload: data,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteDriver = (id) => async (dispatch) => {
  try {
    await api.delete(`/driver/${id}`);
    dispatch({
      type: DELETE_DRIVER,
      payload: id,
    });
  } catch (err) {
    throw err;
  }
};
