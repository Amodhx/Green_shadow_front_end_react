import VehicleModel from "../model/VehicleModel.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialVehicles :VehicleModel[] = []

const vehicleSlice = createSlice({
    name : 'vehicle',
    initialState : initialVehicles,
    reducers :{
        addVehicle: (state, action) => {
            state.push(action.payload);
        },
        updateVehicle : (state, action) =>{
            const index = state.findIndex(vehicle => vehicle.vehicle_id === action.payload.vehicle_id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        }
    }
})
export const { addVehicle,updateVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
