import VehicleModel from "../model/VehicleModel.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialVehicles :VehicleModel[] = []

const vehicleSlice = createSlice({
    name : 'vehicle',
    initialState : initialVehicles,
    reducers :{
        addVehicle: (state, action) => {
            state.push(action.payload); // Update the name in state with the dispatched payload
        }
    }
})
export const { addVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
