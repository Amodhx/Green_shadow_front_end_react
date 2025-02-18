import EquipmentModel from "../model/EquipmentModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api_call from "../services/api.call.ts";

const initialEquipments:EquipmentModel[] = []

export const deleteEquipment = createAsyncThunk(
    'equipment/deleteEquipment',
    async (equipment:EquipmentModel,{rejectWithValue})=>{
        try {
            const  response:any =await Api_call.deleteApiCall('',equipment.equipment_id);
            return  response.data;
        }catch (err){
            return rejectWithValue(err);
        }}
)
export const updateEquipment = createAsyncThunk(
    'equipment/updateEquipment',
    async (equipment:EquipmentModel,{rejectWithValue})=>{
        try {
            const response :any = await Api_call.patchApiCall('/equipment/updateEquipment',equipment);
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
export const getEquipments = createAsyncThunk(
    'equipments/getAllEquipments',
    async ()=>{
        try {
            const response : any = await Api_call.getApiCall('/equipment/getAllEquipments');
            return response.data;
        }catch (err){
            console.log(err)
        }
    }
)
export const saveEquipment = createAsyncThunk(
    'equipments/saveEquipment',
    async (equipment:EquipmentModel,{rejectWithValue})=>{
        try {
            const response:any = await Api_call.postApiCall('/equipment/saveEquipment',equipment);
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)

const EquipmentSlice = createSlice({
    name : 'equipment',
    initialState : initialEquipments,
    reducers : {},
    extraReducers : (builder)=>{
        builder
            .addCase(getEquipments.pending,(state, action)=>{
                console.log("PENDING get equipments: ",state,action.payload);
            })
            .addCase(getEquipments.rejected,(state,action)=>{
                console.error("Failed to get equipments: ",state,action.payload);
            })
            .addCase(getEquipments.fulfilled,(state,action)=>{
                console.log(state)
                return action.payload;
            })
        builder
            .addCase(saveEquipment.pending,(state, action)=>{
                console.log("PENDING save equipments: ",state,action.payload);
            })
            .addCase(saveEquipment.rejected,(state, action)=>{
                console.error("Failed to save equipments: ",state,action.payload);
            })
            .addCase(saveEquipment.fulfilled,(state, action)=>{
                console.log(state)
                state.push(action.payload);
            })
        builder
            .addCase(updateEquipment.pending,(state, action)=>{
                console.log("PENDING update equipments: ",state,action.payload);
            })
            .addCase(updateEquipment.rejected,(state, action)=>{
                console.error("Failed to update equipments: ",state,action.payload);
            })
            .addCase(updateEquipment.fulfilled,(state, action)=>{
                let updatedEquipment:EquipmentModel = action.payload;
                const index = state.findIndex((equipment) => equipment.equipment_id === updatedEquipment.equipment_id)
                if (index !== -1){
                    state[index] = action.payload;
                }
            })
        builder
            .addCase(deleteEquipment.pending,(state, action)=>{
                console.log("PENDING delete equipments: ",state,action.payload);
            })
            .addCase(deleteEquipment.rejected,(state, action)=>{
                console.error("Failed to delete equipments: ",state,action.payload);
            })
            .addCase(deleteEquipment.fulfilled,(state,action) =>{
                state = state.filter(equipment => equipment.equipment_id !== action.payload.equipment_id)
                return state;
            })
    }
})

export default EquipmentSlice.reducer;