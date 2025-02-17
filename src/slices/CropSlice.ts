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
export const deleteCrop = createAsyncThunk(
    'crops/deleteCrop',
    async (crop:CropModel,{rejectWithValue} )=>{
        try {
            const response:any = await Api_call.deleteApiCall('/crop/deleteCrop',crop.crop_code);
            return response.data;
        }catch (err){
            return rejectWithValue(err)
        }
    }
)
export const updateCrop = createAsyncThunk(
    'crops/updateCrop',
    async (crop:CropModel,{rejectWithValue})=>{
        try {
            const formData = new FormData();
            formData.append("crop_code", crop.crop_code);
            formData.append("crop_common_name", crop.crop_common_name);
            formData.append("crop_scientific_name", crop.crop_scientific_name);
            formData.append("category", crop.category);
            formData.append("season", crop.season);
            formData.append("field_code_list", crop.field_list.join(",")); // Convert array to comma-separated string
            if (crop.crop_image){
                console.log(typeof crop.crop_image);
                formData.append("crop_image", crop.crop_image);
            }
            const response:any = await Api_call.patchApiCallWithFormData('/crop/updateCrop',formData)
            console.log(response)
            return response.data;
        }catch (err){
            console.log(err);
            return rejectWithValue(err);
        }
    }
)
export const saveCrop = createAsyncThunk(
    'crops/saveCrop',
    async (crop : CropModel, { rejectWithValue }) =>{
        try {
            const formData = new FormData();
            formData.append("crop_code", crop.crop_code);
            formData.append("crop_common_name", crop.crop_common_name);
            formData.append("crop_scientific_name", crop.crop_scientific_name);
            formData.append("category", crop.category);
            formData.append("season", crop.season);
            formData.append("field_code_list", crop.field_list.join(",")); // Convert array to comma-separated string
            if (crop.crop_image){
                formData.append("crop_image", crop.crop_image);
            }

            const response : any = await Api_call.postApiCallWithFromData('/crop/saveCrop',formData)
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
const cropSlice = createSlice({
    name : 'crops',
    initialState : initialCrops,
    reducers :{},
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
            });
        builder
            .addCase(saveCrop.fulfilled, (state,action)=>{
                console.log(state)
                state.push(action.payload);
            })
            .addCase(saveCrop.pending, (state,action)=>{
                console.log("PENDING save Crops: ",state,action.payload);
            })
            .addCase(saveCrop.rejected, (state,action)=>{
                console.error("Failed to save Crops: ",state,action.payload);
            });
        builder
            .addCase(updateCrop.pending,(state,action)=>{
                console.log("PENDING update Crops: ",state,action.payload);
            })
            .addCase(updateCrop.rejected,(state,action)=>{
                console.error("Failed to update Crops: ",state,action.payload);
            })
            .addCase(updateCrop.fulfilled,(state, action) =>{
                let updatedCrop:CropModel = action.payload;
                const index = state.findIndex((crop) => crop.crop_code === updatedCrop.crop_code);
                if (index !== -1) {
                    state[index] = updatedCrop;
                }
            });
        builder
            .addCase(deleteCrop.pending,(state, action)=>{
                console.log("PENDING Delete Crops: ",state,action.payload);
            })
            .addCase(deleteCrop.rejected,(state, action)=>{
                console.error("Failed to delete Crops: ",state,action.payload);
            })
            .addCase(deleteCrop.fulfilled,(state, action)=>{
                state = state.filter(crop => crop.crop_code !== action.payload.crop_code);
                return state;
            })
    }
})
export default cropSlice.reducer;