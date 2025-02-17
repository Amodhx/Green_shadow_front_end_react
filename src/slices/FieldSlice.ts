import FieldModel from "../model/FieldModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api_call from "../services/api.call.ts";

const initialFields:FieldModel[] = []

export const saveField = createAsyncThunk(
    'field/saveField',
    async (field:FieldModel,{rejectWithValue})=>{
        try {
            const formData = new FormData();
            formData.append("field_code",field.field_code)
            formData.append("field_name",field.field_name)
            formData.append("field_location",field.filed_location)
            formData.append("extent_size",field.extent_size)
            formData.append("staff_list",field.staff_list.join(","))
            formData.append("crop_list",field.crops_list.join(","))
            if (field.field_image){
                formData.append("field_image",field.field_image);
            }
            formData.append("equipments_list",field.equipment_list.join(","))

            const response:any = await Api_call.postApiCallWithFromData('/field/saveField',formData)
            return response.data;
        }catch (err) {
            return rejectWithValue(err);
        }
    }
)
export const updateField = createAsyncThunk(
    'field/updateField',
    async (field:FieldModel,{rejectWithValue})=>{
        try {
            const formData = new FormData();
            formData.append("field_code",field.field_code)
            formData.append("field_name",field.field_name)
            formData.append("field_location",field.filed_location)
            formData.append("extent_size",field.extent_size)
            formData.append("staff_list",field.staff_list.join(","))
            formData.append("crop_list",field.crops_list.join(","))
            if (field.field_image){
                formData.append("field_image",field.field_image);
            }
            formData.append("equipments_list",field.equipment_list.join(","))

            const response:any = await Api_call.patchApiCallWithFormData('/field/updateField',formData)
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
export const deleteField = createAsyncThunk(
    'field/deleteField',
    async (field:FieldModel,{rejectWithValue})=>{
        try {
            const response:any = await Api_call.deleteApiCall('/field/deleteField',field.field_code);
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
export const getFields = createAsyncThunk(
    'field/getAllFields',
    async ()=>{
        try {
            const response:any = await Api_call.getApiCall('/field/getAllField');
            return response.data;
        }catch (err){
            console.log(err);
        }
    }
)
const fieldSlice = createSlice({
    name : "fields",
    initialState : initialFields,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(getFields.pending,(state, action)=>{
                console.log("PENDING get fields: ",state,action.payload);
            })
            .addCase(getFields.rejected,(state, action)=>{
                console.error("Failed to get fields: ",state,action.payload);
            })
            .addCase(getFields.fulfilled,(state, action)=>{
                console.log(state)
                return action.payload;
            });
        builder
            .addCase(saveField.pending,(state, action)=>{
                console.log("PENDING save fields: ",state,action.payload);
            })
            .addCase(saveField.rejected,(state, action)=>{
                console.error("Failed to save fields: ",state,action.payload);
            })
            .addCase(saveField.fulfilled,(state, action)=>{
                console.log(state)
                state.push(action.payload);
            });
        builder
            .addCase(updateField.pending,(state, action)=>{
                console.log("PENDING update fields: ",state,action.payload);
            })
            .addCase(updateField.rejected,(state, action)=>{
                console.error("Failed to update fields: ",state,action.payload);
            })
            .addCase(updateField.fulfilled,(state, action)=>{
                let updatedField:FieldModel = action.payload;
                const index = state.findIndex((field) => field.field_code === updatedField.field_code);
                if (index !== -1){
                    state[index] = action.payload;
                }
            })
        builder
            .addCase(deleteField.pending,(state, action)=>{
                console.log("PENDING delete fields: ",state,action.payload);
            })
            .addCase(deleteField.rejected,(state, action)=>{
                console.error("Failed to delete fields: ",state,action.payload);
            })
            .addCase(deleteField.fulfilled,(state, action)=>{
                state = state.filter(field => field.field_code !== action.payload.field_code);
                return state;
            })
    }
})

export default fieldSlice.reducer;