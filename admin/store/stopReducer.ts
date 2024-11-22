import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '@/api/axios'

export const createStop = createAsyncThunk('stop/createStop', async (body: any, thunkAPI) => {
    try {

        const res = await api.post("/stop", body);
        console.log(res)
        const data = await res.data;
        return data;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})


export const deleteStop = createAsyncThunk('stop/deleteStop', async (id: string, thunkAPI) => {
    try {
        await api.delete(`/stop/${id}`);
        return id;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})

interface stopState {
    stops: Stop[]
}

const initialState: stopState = {
    stops: []
}

const stopReducer = createSlice({
    name: 'stop',
    initialState,
    reducers: {
        setStops: (state, action) => {
            state.stops = action.payload
        },
        updateStop: (state, action) => {
            const idx = state.stops.findIndex((stop) => stop.id === action.payload.id)
            state.stops[idx] = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteStop.fulfilled, (state, action) => {
            state.stops = state.stops.filter((stop) => stop.id !== action.payload)
        })
        builder.addCase(createStop.fulfilled, (state, action) => {
            state.stops.push(action.payload)
        })
    }
})

export const { setStops, updateStop } = stopReducer.actions

export default stopReducer.reducer