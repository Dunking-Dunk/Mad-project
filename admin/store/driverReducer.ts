'use client'
import api from '@/api/axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createDriver = createAsyncThunk('driver/createDriver', async (body: {
    name: string
    phoneNumber: number,
    image: string
},thunkAPI) => {
    try {
        const res = await api.post('/driver', body)
        const data = await res.data;
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err})
    }
})

export const deleteDriver = createAsyncThunk('driver/deleteDriver',  async (id:string,thunkAPI) => {
    try {
         await api.delete(`/driver/${id}`);
        return id;
    } catch (err) {
        if (err)
        return thunkAPI.rejectWithValue({ error: err });
      }
})


interface driverState {
    drivers: any[]
    loading: boolean
    error: {} | null
}

const initialState:driverState= {
    drivers: [],
    loading: false,
    error: null
  }
  

const driverReducer = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        setDrivers: (state, action) => {
            state.drivers = action.payload
        },
        updateDriver: (state, action) => { 
            const idx = state.drivers.findIndex((driver) => driver.id === action.payload.id)
           state.drivers[idx] = action.payload
        }
    },
    extraReducers: (builder) => {   
        builder.addCase(createDriver.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(createDriver.fulfilled, (state, action) => {
            state.drivers.push(action.payload)
            state.loading = false
        })
        builder.addCase(createDriver.rejected, (state, action) => {
            // state.error = action.payload.error
            state.loading = false
        })
        builder.addCase(deleteDriver.fulfilled, (state, action) => {
            
            state.drivers = state.drivers.filter(
                (driver) => driver.id !== action.payload
              );
           } )
    }
})

export const {setDrivers, updateDriver} = driverReducer.actions
export default driverReducer.reducer