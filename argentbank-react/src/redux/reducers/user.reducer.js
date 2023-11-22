import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistConfig from '../persistConfig';

// "tat général du slice "user"
const initialState = {
    user: {
        email: '',
        token: '',
        firstName: '',
        lastName: '',
        userName: ''
    },
    status: 'idle',
    error: '',
}

// gère la connexion de l'utilisateur
export const userLogIn = createAsyncThunk(
    'user/logIn',
    async ({ email, password }, thunkApi) => {
        try {

            // appel APi pour la connexion
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ email, password })
            }).then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Error: User not found!")
                }
            }).then(data => {
                return data
            })

            // appel fonction pour avoir les infos de l'utilisateur
            const user = await getUserInfos(response.body.token)

            // retour de données pour le traitement par le reducer
            return { email: email, data: user.body, token: response.body.token }
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

// edit du surnom
export const editUserName = createAsyncThunk(
    'user/editUserName',
    async ({ userName, token }, thunkApi) => {
        try{

            // appel API pour éditer le surnom
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ userName })
            }).then(res => {
                if (res.ok) {
                    console.log(userName)
                    return res.json()
                }         
            })
            return response
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

// informations de l'utilisateur
async function getUserInfos(token) {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
    })
    return response
}

// création du slice 'user'
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(userLogIn.fulfilled, (state, action) => {

            // modification de l'état en cas de connexion réussie
            state.user = {
                email: action.payload.email,
                token: action.payload.token,
                firstName: action.payload.data.firstName,
                lastName: action.payload.data.lastName,
                userName: action.payload.data.userName
            };
            state.status = 'success';
            state.error = '';
        })
            .addCase(userLogIn.rejected, (state, action) => {

                // modification de l'état en cas d'échec
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase('LOGOUT', (state) => {

                // modification de l'état lors de la déconnexion
                state.user = { token: '' }
                state.status = 'idle'
                state.error = ''
            })
            .addCase(editUserName.fulfilled, (state, action) => {

                // modification du nom d'utilisateur après une édition réussie
                let user = state.user
                user.userName = action.payload.body.userName
                state.user = user
            })

    }
});

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export default persistedUserReducer 
