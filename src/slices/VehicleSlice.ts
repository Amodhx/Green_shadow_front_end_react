import VehicleModel from "../model/VehicleModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api_call from "../services/api.call.ts";

const initialVehicles :VehicleModel[] = []
export const saveVehicle = createAsyncThunk(
    'vehicle/saveVehicle',
    async (vehicle:VehicleModel,{rejectWithValue})=>{
        try {
            const response:any = await Api_call.postApiCall('/vehicle/saveVehicle',vehicle);
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
export const getVehicles = createAsyncThunk(
    'vehicle/getAllVehicles',
    async ()=>{
        try {
            const response :any = await Api_call.getApiCall('/vehicle/getAllVehicle');
            return response.data;
        }catch (err){
            console.log(err);
        }
    }
)
export const updateVehicle = createAsyncThunk(
    'vehicle/updateVehicle',
    async (vehicle:VehicleModel,{rejectWithValue})=>{
        try {
            const response:any = await Api_call.patchApiCall('/vehicle/updateVehicle',vehicle);
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
export const deleteVehicle = createAsyncThunk(
    'vehicle/deleteVehicle',
    async (vehicle:VehicleModel,{rejectWithValue})=>{
        try {
            const response:any = await Api_call.deleteApiCall('/vehicle/deleteVehicle',vehicle.vehicle_code);
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)

const vehicleSlice = createSlice({
    name : 'vehicle',
    initialState : initialVehicles,
    reducers :{},
    extraReducers : (builder)=>{
        builder
            .addCase(getVehicles.pending,(state, action)=>{
                console.log("PENDING get vehicle: ",state,action.payload);
            })
            .addCase(getVehicles.rejected,(state, action)=>{
                console.error("Failed to get vehicle: ",state,action.payload);
            })
            .addCase(getVehicles.fulfilled,(state, action)=>{
                console.log(state)
                return action.payload;
            });
        builder
            .addCase(saveVehicle.pending,(state, action)=>{
                console.log("PENDING save vehicle: ",state,action.payload);
            })
            .addCase(saveVehicle.rejected,(state, action)=>{
                console.error("Failed to save vehicle: ",state,action.payload);
            })
            .addCase(saveVehicle.fulfilled,(state, action)=>{
                console.log(state)
                state.push(action.payload);
            });
        builder
            .addCase(updateVehicle.pending,(state, action)=>{
                console.log("PENDING update vehicle: ",state,action.payload);
            })
            .addCase(updateVehicle.rejected,(state, action)=>{
                console.error("Failed to update vehicle: ",state,action.payload);
            })
            .addCase(updateVehicle.fulfilled,(state, action)=>{
                let updatedVehicle:VehicleModel = action.payload;
                const index = state.findIndex((vehicle)=>vehicle.vehicle_code === updatedVehicle.vehicle_code);
                if (index != -1){
                    state[index] = action.payload;
                }
            });
        builder
            .addCase(deleteVehicle.pending,(state, action)=>{
                console.log("PENDING delete vehicle: ",state,action.payload);
            })
            .addCase(deleteVehicle.rejected,(state, action)=>{
                console.error("Failed to delete vehicle: ",state,action.payload);
            })
            .addCase(deleteVehicle.fulfilled,(state, action)=>{
                state = state.filter(vehicle => vehicle.vehicle_code !== action.payload.vehicle_code);
                return state;
            })

    }
})

export default vehicleSlice.reducer;
