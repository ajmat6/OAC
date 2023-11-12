import { configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer' // importing 
import productReducer from '../reducers/productReducer'
import noteReducer from '../reducers/noteReducer';

const store = configureStore({
    reducer: { // object of reducers -> acts like combineReducers of redux in redux toolkit
        auth: authReducer,
        product: productReducer,
        aNotes: noteReducer
    },

    // to solve non-serializable error in console
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store; // exporting store: