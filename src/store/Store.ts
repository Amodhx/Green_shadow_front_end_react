import {configureStore} from "@reduxjs/toolkit";
import VehicleSlice from "../slices/VehicleSlice.ts";

export const store = configureStore({
    reducer:{
        vehicles : VehicleSlice,
    }
})