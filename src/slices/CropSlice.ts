import CropModel from "../model/CropModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api_call from "../services/api.call.ts";

const initialCrops: CropModel[] = []

export const getCrops = createAsyncThunk(
    'crops/getCrops',
    async () =>{
        try {
            const response:any = await Api_call.getApiCall('/crop/getAllCrops');
            console.log(response)
            return response.data;
        }catch (err){
            console.log(err);
        }
    }
)
const cropSlice = createSlice({
    name : 'crops',
    initialState : initialCrops,
    reducers :{
        addCrop: (state, action) => {
            state.push(action.payload);
        },
        updateCrop: (state, action) => {
            const index = state.findIndex(crop => crop.crop_id === action.payload.crop_id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        deleteCrop: (state, action) => {
            return state.filter(crop => crop.crop_id !== action.payload.crop_id);
        }
    },
    extraReducers : (builder) =>{
        builder
            .addCase(getCrops.fulfilled, (state,action)=>{
                console.log(state)
                return action.payload;
            })
            .addCase(getCrops.pending, (state,action)=>{
                console.log("Pending get Crops: ", state , action.payload);
            })
            .addCase(getCrops.rejected,(state,action) =>{
                console.error("Failed to get crops: ",state,action.payload);
            })
    }
})

export const {addCrop, updateCrop, deleteCrop} = cropSlice.actions;
export default cropSlice.reducer;