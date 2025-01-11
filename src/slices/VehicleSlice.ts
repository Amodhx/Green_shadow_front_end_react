import VehicleModel from "../model/VehicleModel.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialVehicles :VehicleModel[] = []

const vehicleSlice = createSlice({
    name : 'staff',
    initialState : initialVehicles,
    reducers :{
        addStaff: (state, action) => {
            state.push(action.payload); // Update the name in state with the dispatched payload
        }
    }
})
export const { addStaff } = vehicleSlice.actions;
export default vehicleSlice.reducer;
