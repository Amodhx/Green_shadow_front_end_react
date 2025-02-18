import LogModel from "../model/LogModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api_call from "../services/api.call.ts";

const initialLogs:LogModel[] = []

export const getLogs = createAsyncThunk(
    'logs/getAllLogs',
    async () =>{
        try {
            const response:any = await Api_call.getApiCall('/log/getAllLogs')
            return response.data;
        }catch (err){
            console.log(err)
        }
    }
)
export const deleteLog = createAsyncThunk(
    'logs/deleteLog',
    async (log:LogModel,{rejectWithValue})=>{
        try {
            const response:any = await Api_call.deleteApiCall('/log/deleteLog',log.log_code)
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
export const saveLog = createAsyncThunk(
    'logs/saveLog',
    async (log:LogModel,{rejectWithValue})=>{
        try {
            const formData = new FormData();
            formData.append("log_code",log.log_code)
            formData.append("log_date",log.log_date)
            formData.append("log_description",log.log_description)
            formData.append("log_type",log.log_type)
            if (log.observe_image){
                formData.append("observe_image",log.observe_image)
            }
            if (log.fields_list != undefined){
                formData.append("fields_list",log.fields_list.join(","))
            }else {
                formData.append("fields_list","")
            }
            if (log.crop_list != undefined){
                formData.append("crop_list",log.crop_list.join(","))
            }else {
                formData.append("crop_list","")
            }
            if (log.staff_list != undefined){
                formData.append("staff_list",log.staff_list.join(","))
            }else {
                formData.append("staff_list","")
            }
            const response : any = Api_call.postApiCallWithFromData('/log/saveLog',formData);
            return  response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
export const updateLog = createAsyncThunk(
    'logs/updateLog',
    async (log:LogModel,{rejectWithValue})=>{
        try {
            const formData = new FormData();
            formData.append("log_code",log.log_code)
            formData.append("log_date",log.log_date)
            formData.append("log_description",log.log_description)
            formData.append("log_type",log.log_type)
            if (log.observe_image){
                formData.append("observe_image",log.observe_image)
            }
            if (log.fields_list != undefined){
                formData.append("fields_list",log.fields_list.join(","))
            }else {
                formData.append("fields_list","")
            }
            if (log.crop_list != undefined){
                formData.append("crop_list",log.crop_list.join(","))
            }else {
                formData.append("crop_list","")
            }
            if (log.staff_list != undefined){
                formData.append("staff_list",log.staff_list.join(","))
            }else {
                formData.append("staff_list","")
            }
            const response : any = Api_call.patchApiCallWithFormData('/log/updateLog',formData);
            return  response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
const logSlice = createSlice({
    name : 'logs',
    initialState : initialLogs,
    reducers :{},
    extraReducers :  (builder) =>{
        builder
            .addCase(getLogs.pending,(state, action) =>{
                console.log("Pending get Logs: ", state , action.payload);
            })
            .addCase(getLogs.rejected,(state, action)=>{
                console.error("Failed to get logs: ",state,action.payload);
            })
            .addCase(getLogs.fulfilled,(state, action)=>{
                console.log(state)
                return action.payload;
            });
        builder
            .addCase(deleteLog.pending,(state, action)=>{
                console.log("Pending delete Logs: ", state , action.payload);
            })
            .addCase(deleteLog.rejected,(state, action)=>{
                console.error("Failed to delete logs: ",state,action.payload);
            })
            .addCase(deleteLog.fulfilled,(state, action)=>{
                state = state.filter(log =>log.log_code !== action.payload.log_code);
                return state;
            })
        builder
            .addCase(saveLog.pending,(state, action)=>{
                console.log("Pending save Logs: ", state , action.payload);
            })
            .addCase(saveLog.rejected,(state,action)=>{
                console.error("Failed to save logs: ",state,action.payload);
            })
            .addCase(saveLog.fulfilled,(state, action)=>{
                console.log(state)
                state.push(action.payload);
            })
        builder
            .addCase(updateLog.pending,(state, action)=>{
                console.log("Pending update Logs: ", state , action.payload);
            })
            .addCase(updateLog.rejected,(state, action)=>{
                console.error("Failed to update logs: ",state,action.payload);
            })
            .addCase(updateLog.fulfilled,(state, action)=>{
                let updatedLog:LogModel = action.payload;
                const index = state.findIndex((log) => log.log_code === updatedLog.log_code);
                if (index !== -1){
                    state[index] = updatedLog;
                }
            })
    }
})

export default logSlice.reducer;

