import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : [],
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPaste: (state, action) => {
            const paste = action.payload
            state.pastes.push(paste);
            localStorage.setItem("pastes",
                JSON.stringify(state.pastes));
        },

        updatePaste: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);
            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
            }
        },

        resetPaste: (state, action) => {
            state.pastes = [];
            localStorage.removeItem("pastes")
        },

        removefromPaste: (state, action) => {
            const pasteId = action.payload;

            console.log(pasteId);

            const index = state.pastes.findIndex((item) =>
                item._id === pasteId);
            
            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem("pastes", JSON.stringify
                (state.pastes));
            }
        }
    }
}
)

export const { addToPaste, updatePaste, resetPaste, removefromPaste } = pasteSlice.actions

export default pasteSlice.reducer