import {configureStore} from "@reduxjs/toolkit";
import VehicleSlice from "../slices/VehicleSlice.ts";
import EquipmentSlice from "../slices/EquipmentSlice.ts";

export const store = configureStore({
    reducer:{
        vehicles : VehicleSlice,
        equipments : EquipmentSlice
    }
})