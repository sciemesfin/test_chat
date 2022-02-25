import { createSlice } from "@reduxjs/toolkit"
import "../services/firebase.config";
import auth from "../services/auth";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase.config";

const initialState = {
    user: {},
    access_token: ""
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            state.user = action.payload
            state.access_token = action.payload.access_token
        },
        setSignOut: (state) => {
            state.access_token = null
        },
        selectUser: (state, action) => {
            state.user = action.payload
        }
    }
});

export const { setSignIn, setSignOut, selectUser } = authSlice.actions;

export const selectedUser = (state) => state.user.user

export const readUsers = async (state) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let data = []
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
    });
    return data
}

export const hasLoggedIn = async (state) => await auth.isAuthenticated()



export default authSlice.reducer;