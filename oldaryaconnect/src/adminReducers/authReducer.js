import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../helpers/axios"

// defining initial State:
const initialState = {
    userToken: null,
    userInfo: {

    },
    authenticate: false,
    authenticating: false,
    error: null,
    message: '',
    Users: []
}

// createAsyncThunk for handling async actions, it takes type of action as its first argument
export const authCredentials = createAsyncThunk('authCredentials', async (user) => {
    const res = await axiosInstance.post('/admin/signin', {...user}) // splitting up email and password coming as argument

    // if sign in details were correct:
    if(res.status === 200)
    {
        // extracting token and user from the response:
        const {token, user} = res.data
        localStorage.setItem('otoken', token) // storing token in localStorage
        localStorage.setItem('ouser', JSON.stringify(user)); // storing user in localStorage in the form of string 
    }
    else
    {
        if(res.status === 400)
        {
            console.log("Axios fail ho gaya bhai!");
        }
    }

    return res.data;
})

// sign up async action:
export const signUpCredentials = createAsyncThunk('signupCredentials', async (user) => {
    const res = await axiosInstance.post('/admin/signup', {...user}) // splitting up firstName, lastName, email and password coming as argument

    // if sign in details were correct:
    if(res.status === 200)
    {
        // extracting token and user from the response:
        const {token, user} = res.data
        localStorage.setItem('admintoken', token) // storing token in localStorage
        localStorage.setItem('adminuser', JSON.stringify(user)); // storing user in localStorage in the form of string 
    }
    else
    {
        if(res.status === 400)
        {
            console.log("Axios fail ho gaya bhai!");
        }
    }

    return res.data;
})

// action to sign out admin:
export const signoutAction = createAsyncThunk('signout', async () => {
    try
    {
        const res = axiosInstance.post('/admin/signout');
        if(res.status == 200)
        {
            localStorage.clear();
        }
        else
        {
            console.log(res.data.error)
        }
    }
    catch(error)
    {
        console.log(error.message)
    }
})

// google sign in:
export const googleLogin = createAsyncThunk('googleLogin', async (payload) => {
    const res = axiosInstance.post('/google/login', payload);
})

export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
    const headers = {
        'auth-token': localStorage.getItem('admintoken')
    }

    const res = await axiosInstance.get('/getUsers', {headers});
    console.log(res);
    return res.data
})

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,

    // Reducers:
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('admintoken');
            state.userToken = null
            state.authenticate = false
        },

        // on refreshing token becomes null in data (not in localStorage) so to remove this problem this reducer and action is used:
        isUserLoggedIn: (state, action) => {
            const token = localStorage.getItem('admintoken');
            if(token)
            {
                const user = JSON.parse(localStorage.getItem('adminuser')) // parsing into json as user is stored in the form of string in the localStorage
                state.authenticate = true
                state.authenticating = false
                state.userToken = token
                state.userInfo = user
            }

            else
            {
                state.authenticating = false
                state.authenticate = false
            }
        }
    },

    // extrareducers for async actions:
    extraReducers: (builder) => {
        builder.addCase(authCredentials.pending, (state) => {
            state.authenticating = true
        })

        builder.addCase(authCredentials.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            state.userToken = action.payload.token
            state.userInfo = action.payload.user
        })

        builder.addCase(authCredentials.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = false
            // state.error = action.payload.error
        })

        builder.addCase(signUpCredentials.pending, (state) => {
            state.authenticating = true
        })

        builder.addCase(signUpCredentials.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            state.userToken = action.payload.token
            state.userInfo = action.payload.user
            state.message = action.payload.message
        })

        builder.addCase(signUpCredentials.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = false
        })
        
        builder.addCase(getAllUsers.pending, (state) => {
            state.authenticating = false
        })

        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            state.Users = action.payload
        })

        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.authenticating = false
        })
    }
})

export default authSlice.reducer
export const { logout, isUserLoggedIn } = authSlice.actions