import { configureStore } from "@reduxjs/toolkit";

import userReducer from './user.slice'
import messageReducer from './message.slice'

export default configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});