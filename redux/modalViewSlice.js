import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    display: false,
}

export const modalViewSlice = createSlice({
    name: 'modalView',
    initialState,
    reducers: {
        showModal: (state) => {
            state.display = true
        },
        hideModal: (state) => {
            state.display = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { showModal, hideModal } = modalViewSlice.actions

export default modalViewSlice.reducer