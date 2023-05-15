import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice"
import modalReducer from "./modalViewSlice"

const store = configureStore({
    reducer: {
        basket: basketReducer,
        modal: modalReducer
    }
})

export default store