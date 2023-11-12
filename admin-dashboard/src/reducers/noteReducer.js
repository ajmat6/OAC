import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    topics: []
}

export const addBanners = createAsyncThunk('addBanners', async (form) => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('token')
        }

        const res = await axiosInstance.post('/home/banners', form, {headers})
        return res;
    }

    catch(error)
    {
        console.log(error.message);
    }
})

export const addNotesTopic = createAsyncThunk('addTopic', async (payload) => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('admintoken')
        }

        const res = await axiosInstance.post('/notes/add', payload, {headers})
        console.log(res, 'addtopic');
    }

    catch(error)
    {
        console.log(error.message);
    }
})

export const getFrontTopicsAdmin = createAsyncThunk('getFrontTopicsAdmin', async () => {
    const res = await axiosInstance.get('/getnotes/admin');
    // console.log(res.data);
    return res.data
})

export const getTopics = createAsyncThunk('getTopics', async () => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('token')
        }

        const res = await axiosInstance.get('/home/getTopics', {headers})
        console.log(res, 'getTopics');
        return res;
    }

    catch(error)
    {
        console.log(error.message);
    }
})

export const addHomeProduct = createAsyncThunk('addProduct', async (form) => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('token')
        }

        console.log(form)
        const res = await axiosInstance.post('/home/addProduct', form)
        console.log(res)
        return res;
    }

    catch(error)
    {
        console.log(error.message);
    }
})

const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) =>  {
        builder.addCase(addNotesTopic.pending, (state) => {
            state.loading = true
        })

        builder.addCase(addNotesTopic.fulfilled, (state, action) => {
            state.loading = false
        })

        builder.addCase(addNotesTopic.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase(getFrontTopicsAdmin.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getFrontTopicsAdmin.fulfilled, (state, action) => {
            state.loading = false
            state.topics = action.payload
        })

        builder.addCase(getFrontTopicsAdmin.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default homeSlice.reducer