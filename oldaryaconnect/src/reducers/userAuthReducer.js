import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../helper/axios"

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

export const signinCredentials = createAsyncThunk('signin', async (user) => {
    const res = await axiosInstance.post('/signin', {...user}) // splitting up email and password coming as argument

    if(res.status === 200)
    {
        console.log(res, "bhai fronted ka login");
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

export const signUpCredentials = createAsyncThunk('signup', async (user) => {
    const res = await axiosInstance.post('/signup', {...user}) // splitting up firstName, lastName, email and password coming as argument
    console.log(res, "signup")
    // if(res.status === 201)
    // {
    //     // return true
    //     // const {token, user} = res.data
    //     // localStorage.setItem('otoken', token) // storing token in localStorage
    //     // localStorage.setItem('ouser', JSON.stringify(user)); // storing user in localStorage in the form of string 
    // }
    return res
})

export const verifyEmail = createAsyncThunk('verifyemail', async (form) => {
    const res = await axiosInstance.post('/user/verify-email', form);

    if(res.status === 200)
    {
        const {token, user} = res.data
        localStorage.setItem('otoken', token)
        localStorage.setItem('ouser', JSON.stringify(user));
    }

    return res.data
})

export const forgotPassword = createAsyncThunk('forgotPassword', async (form) => {
    const res = await axiosInstance.post('/user/forgot-password', form);
    console.log(res)
})

export const resetPassword = createAsyncThunk('resetPassword', async (form) => {
    const res = await axiosInstance.post('/user/reset-password', form);
    console.log(res)
})

export const signoutAction = createAsyncThunk('signout', async () => {
    try
    {
        const res = axiosInstance.post('/signout');
        if(res.status == 200)
        {
            localStorage.clear()
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

export const updateUserInfo = createAsyncThunk('updateUserInfo', async (payload) => {
    console.log(payload, "pic edit")
    const res = await axiosInstance.post('/user/update', payload)
    console.log(res)
    if(res.status === 200)
    {
        localStorage.setItem('ouser', JSON.stringify(res.data.user));
    }
    return res.data
})

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
export const adminSignUpCredentials = createAsyncThunk('adminSignupCredentials', async (user) => {
    const res = await axiosInstance.post('/admin/signup', {...user}) // splitting up firstName, lastName, email and password coming as argument

    // if sign in details were correct:
    if(res.status === 201)
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

// action to sign out admin:
export const adminSignoutAction = createAsyncThunk('adminSignout', async () => {
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

export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
    const headers = {
        'auth-token': localStorage.getItem('otoken')
    }

    const res = await axiosInstance.get('/getUsers', {headers});
    console.log(res);
    return res.data
})


const userAuthSlice = createSlice({
    name: "auth",
    initialState: initialState,

    // Reducers:
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('otoken');
            localStorage.removeItem('ouser')
            state.userToken = null
            state.authenticate = false
            state.userInfo = {}
        },

        // on refreshing token becomes null in data (not in localStorage) so to remove this problem this reducer and action is used:
        isUserLoggedIn: (state, action) => {
            const token = localStorage.getItem('otoken');
            if(token)
            {
                const user = JSON.parse(localStorage.getItem('ouser')) // parsing into json as user is stored in the form of string in the localStorage
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
        builder.addCase(signinCredentials.pending, (state) => {
            state.authenticating = true
        })

        builder.addCase(signinCredentials.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            state.userToken = action.payload.token
            state.userInfo = action.payload.user
        })

        builder.addCase(signinCredentials.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = false
            // state.error = action.payload.error
        })

        builder.addCase(signUpCredentials.pending, (state) => {
            state.authenticating = true
            state.authenticate = false
        })

        builder.addCase(signUpCredentials.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = false
            // state.userToken = action.payload.data.token
            state.userInfo = action.payload.data.user
            // state.message = action.payload.message
        })

        builder.addCase(signUpCredentials.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = false
        })

        builder.addCase(verifyEmail.pending, (state) => {
            state.authenticating = true
            state.authenticate = false
        })

        builder.addCase(verifyEmail.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            state.userToken = action.payload.token
            state.userInfo = action.payload.user
            state.message = action.payload.message
        })

        builder.addCase(verifyEmail.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = false
        })

        builder.addCase(signoutAction.pending, (state) => {
            state.authenticating = true
        })

        builder.addCase(signoutAction.fulfilled, (state, action) => {
            state.authenticate = false
            state.userToken = null
            state.userInfo = {
                name: '',
                username: '',
                email: '',
                picture: ''
            }
            localStorage.clear()
        })

        builder.addCase(signoutAction.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = false
        })

        builder.addCase(updateUserInfo.pending, (state) => {
            state.authenticating = true
            state.authenticate = true
        })

        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            state.userInfo = action.payload.user
        })

        builder.addCase(updateUserInfo.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = true
        })
    

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

        builder.addCase(adminSignUpCredentials.pending, (state) => {
            state.authenticating = true
        })

        builder.addCase(adminSignUpCredentials.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            state.userToken = action.payload.token
            state.userInfo = action.payload.user
            state.message = action.payload.message
        })

        builder.addCase(adminSignUpCredentials.rejected, (state, action) => {
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

export default userAuthSlice.reducer
export const { logout, isUserLoggedIn } = userAuthSlice.actions