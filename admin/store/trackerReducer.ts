'use client'
import { createSlice } from "@reduxjs/toolkit";


interface trackerState {
    trackers: any[]
    loading: boolean
    error: { message: string } | null
}

const initialState: trackerState = {
    trackers: [],
    loading: false,
    error: null
}


const trackerReducer = createSlice({
    name: 'tracker',
    initialState,
    reducers: {
        setTrackers: (state, action) => {
            state.trackers = action.payload
        },
        changeCoords: (state, action) => {
            const idx = state.trackers.findIndex((track) => track.id === action.payload.id)
            state.trackers[idx] = action.payload
        }
    }
})

export const { setTrackers, changeCoords } = trackerReducer.actions
export default trackerReducer.reducer