'use client'
import api from '@/api/axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const createBus = createAsyncThunk('bus/createBus', async (body: any, thunkAPI) => {
    try {
        const res = await api.post("/bus", body);
        const data = await res.data;
        return data;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})

export const deleteBus = createAsyncThunk('bus/deleteBus', async (id: string, thunkAPI) => {
    try {
        await api.delete(`/bus/${id}`);
        return id;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})


interface BusState {
    buses: Bus[]
    loading: boolean
    error: { message: string } | null
}

const initialState: BusState = {
    buses: [],
    loading: false,
    error: null
}


const busReducer = createSlice({
    name: 'bus',
    initialState,
    reducers: {
        setBuses: (state, action) => {
            state.buses = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createBus.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(createBus.fulfilled, (state, action) => {
            state.buses.push(action.payload)
            state.loading = false
        })
        builder.addCase(createBus.rejected, (state, action: any) => {
            state.error = action.payload.error
            state.loading = false
        })
        builder.addCase(deleteBus.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteBus.fulfilled, (state, action) => {
            state.buses = state.buses.filter(
                (bus) => bus.id !== action.payload
            );
            state.loading = false
        })
        builder.addCase(deleteBus.rejected, (state, action: any) => {
            state.error = action.payload.error
            state.loading = false
        })
    }
})

export const { setBuses } = busReducer.actions
export default busReducer.reducer