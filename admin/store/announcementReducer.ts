'use client'
import api from '@/api/axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createAnnouncement = createAsyncThunk('announcement/createAnnouncement', async (body: {}, thunkAPI) => {
    try {
        const res = await api.post('/announcement', body)
        const data = await res.data;
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err })
    }
})

export const deleteAnnouncement = createAsyncThunk('announcement/deleteAnnouncement', async (id: string, thunkAPI) => {
    try {
        await api.delete(`/announcement/${id}`);
        return id;
    } catch (err) {
        if (err)
            return thunkAPI.rejectWithValue({ error: err });
    }
})


interface announcementState {
    announcements: any[]
    loading: boolean
    error: {} | null
}

const initialState: announcementState = {
    announcements: [],
    loading: false,
    error: null
}


const announcementReducer = createSlice({
    name: 'announcement',
    initialState,
    reducers: {
        setAnnouncements: (state, action) => {
            state.announcements = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createAnnouncement.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createAnnouncement.fulfilled, (state, action) => {
            state.announcements.push(action.payload)
            state.loading = false
        })
        builder.addCase(createAnnouncement.rejected, (state, action) => {
            // state.error = action.payload.error
            state.loading = false
        })
        builder.addCase(deleteAnnouncement.fulfilled, (state, action) => {

            state.announcements = state.announcements.filter(
                (announcement) => announcement.id !== action.payload
            );
        })
    }
})

export const { setAnnouncements } = announcementReducer.actions
export default announcementReducer.reducer