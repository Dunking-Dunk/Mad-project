'use client'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import BusReducer from './busReducer'
import StopReducer from './stopReducer'
import TrackerReducer from './trackerReducer'
import DriverReducer from './driverReducer'
import AnnouncementReducer from './announcementReducer'

const store = configureStore({
    reducer: {
        Bus: BusReducer,
        Stop: StopReducer,
        Tracker: TrackerReducer,
        Driver: DriverReducer,
        Announcement: AnnouncementReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store