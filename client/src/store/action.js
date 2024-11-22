import {
  GET_ALL_BUSES,
  GET_ALL_STOPS,
  GET_USER_COORDS,
  GET_QUICK_STATS,
  GET_BUS,
  GET_ALL_ANNOUNCEMENT,
  REFRESH_ANNOUNCEMENT,
  REFRESH_BUSES,
  ADD_BUS,
  ADD_STOP,
  DELETE_BUS,
  DELETE_STOP,
  ADD_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  APP_STATUS,
  GET_ALL_TRACKERS,
  UPDATE_TRACKERS,
} from "./actionType";
import api from "../api/api";

export const getBuses = (search) => async (dispatch) => {
  try {
    const { data } = await api.get(
      search ? `/bus?search=${search}` : "/bus?populate=true"
    );
    dispatch({
      type: GET_ALL_BUSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSortBuses = (query) => async (dispatch) => {
  try {
    const { data } = await api.get(
      query === "all" ? "/bus?populate=true" : `/bus?timing=${query}`
    );
    dispatch({
      type: GET_ALL_BUSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getBus = (busId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/bus/${busId}?populate=true`);
    dispatch({
      type: GET_BUS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllStop = () => async (dispatch) => {
  try {
    const { data } = await api.get("/stop?populate=true");
    dispatch({
      type: GET_ALL_STOPS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getQuickStats = () => async (dispatch) => {
  try {
    const { data } = await api.get("/data/quick-stats");
    dispatch({
      type: GET_QUICK_STATS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserLocation = (location) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_COORDS,
      payload: location.coords,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllAnnouncements = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/announcement`);
    dispatch({
      type: GET_ALL_ANNOUNCEMENT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const refreshAnnouncement = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REFRESH_ANNOUNCEMENT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const refreshBuses = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REFRESH_BUSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createFeedback = (data) => async (dispatch) => {
  try {
    await api.post(`/feedback`, data);
    // dispatch({
    //   type: CREATE_FEEDBACK,
    // });
  } catch (err) {
    console.log(err);
  }
};

export const addBus = (bus) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_BUS,
      payload: bus,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addStop = (stop) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_STOP,
      payload: stop,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteStop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_STOP,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBus = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_BUS,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addAnnouncement = (announcement) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ANNOUNCEMENT,
      payload: announcement,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAnnouncement = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ANNOUNCEMENT,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const appStatusState = (status) => async (dispatch) => {
  try {
    dispatch({
      type: APP_STATUS,
      payload: status,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllTracker = () => async (dispatch) => {
  try {
    const { data } = await api.get('/gps-tracking')
    dispatch({
      type: GET_ALL_TRACKERS,
      payload: data
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateTracker = (tracker) => async (dispatch) => { 
  try {
    dispatch({
      type: UPDATE_TRACKERS,
      payload: tracker
    })
  } catch (err) {
    console.log(err)
  }
}