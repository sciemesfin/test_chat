import { createSlice } from "@reduxjs/toolkit"

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "../services/firebase.config";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { db } from "../services/firebase.config";
import auth from "../services/auth";

const provider = new GoogleAuthProvider();

const initialState = {
    messages: []
}

const messageSlice = createSlice({
    name: 'msgs',
    initialState,
    reducers: {
        sendMessage: async (state, action) => {
            await addDoc(collection(db, "messages"), {
                ...action.payload,
                date: new Date()
            });
        },
    }
});

export const { sendMessage } = messageSlice.actions;

export const readMessages = async (state) => {
    const q = query(collection(db, "messages"));
    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
    });

    return data
};



export default messageSlice.reducer;