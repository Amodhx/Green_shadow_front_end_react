import {configureStore} from "@reduxjs/toolkit";
import VehicleSlice from "../slices/VehicleSlice.ts";
import EquipmentSlice from "../slices/EquipmentSlice.ts";
import StaffSlice from "../slices/StaffSlice.ts";

export const store = configureStore({
    reducer:{
        vehicles : VehicleSlice,
        equipments : EquipmentSlice,
        staffs : StaffSlice
    }
})