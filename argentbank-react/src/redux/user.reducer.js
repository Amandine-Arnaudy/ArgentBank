import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// état général du slice "user"
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
    isAuthenticated: false,
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
            });

            if (!response.ok) {
                throw new Error("Error: User not found!");
            }

            const data = await response.json();
            const user = await getUserInfos(data.body.token);

            return { email, data: user.body, token: data.body.token };
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

// edit du surnom
export const editUserName = createAsyncThunk(
    'user/editUserName',
    async ({ userName, token }, thunkApi) => {
        try {

            // appel APi pour éditer le surnom
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ userName })
            });

            if (!response.ok) {
                console.log(userName);
                throw new Error("Error editing username!");
            }

            return response.json();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

// informations de l'utilisateur
async function getUserInfos(token) {
    try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching user information!");
        }

        return response.json();
    } catch (error) {
        console.error('Erreur dans la promesse :', error);
        return null; 
    }
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

export default userSlice.reducer 
