import StaffModel from "../model/StaffModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api_call from "../services/api.call.ts";

const initialStaffs : StaffModel[] = []
export const saveStaff = createAsyncThunk(
    'staff/saveStaff',
    async (staff:StaffModel,{rejectWithValue})=>{
        try {
            const response :any = await Api_call.postApiCall('/staff/saveStaff',staff);
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
export const getStaff = createAsyncThunk(
    'staff/getAllStaff',
    async ()=>{
        try {
            const response :any = await Api_call.getApiCall('/staff/getAllStaffs');
            return response.data;
        }catch (err){
            console.log(err);
        }
    }
)
export const updateStaff = createAsyncThunk(
    'staff/updateStaff',
    async (staff:StaffModel,{rejectWithValue}) =>{
        try {
            const response:any = await Api_call.patchApiCall('/staff/updateStaff',staff);
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
export const deleteStaff = createAsyncThunk(
    'staff/deleteStaff',
    async (staff:StaffModel,{rejectWithValue}) =>{
        try {
            const response :any = await Api_call.deleteApiCall('/staff/deleteStaff',staff.staff_id);
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)

const staffSlice = createSlice({
    name : 'staff',
    initialState : initialStaffs,
    reducers :{},
    extraReducers : (builder) =>{
        builder
            .addCase(getStaff.pending,(state, action)=>{
                console.log("PENDING get staff: ",state,action.payload);
            })
            .addCase(getStaff.rejected,(state, action)=>{
                console.error("Failed to get staff: ",state,action.payload);
            })
            .addCase(getStaff.fulfilled,(state, action)=>{
                console.log(state)
                return action.payload;
            });
        builder
            .addCase(saveStaff.pending,(state, action)=>{
                console.log("PENDING save staff: ",state,action.payload);
            })
            .addCase(saveStaff.rejected,(state, action)=>{
                console.error("Failed to save staff: ",state,action.payload);
            })
            .addCase(saveStaff.fulfilled,(state, action)=>{
                console.log(state)
                state.push(action.payload);
            });
        builder
            .addCase(updateStaff.pending,(state, action)=>{
                console.log("PENDING update staff: ",state,action.payload);
            })
            .addCase(updateStaff.rejected,(state, action)=>{
                console.error("Failed to update staff: ",state,action.payload);
            })
            .addCase(updateStaff.fulfilled,(state, action)=>{
                let updatedStaff:StaffModel = action.payload;
                const index = state.findIndex((staff)=>staff.staff_id === updatedStaff.staff_id);
                if (index != -1){
                    state[index] = action.payload;
                }
            });
        builder
            .addCase(deleteStaff.pending,(state, action)=>{
                console.log("PENDING delete staff: ",state,action.payload);
            })
            .addCase(deleteStaff.rejected,(state, action)=>{
                console.error("Failed to delete staff: ",state,action.payload);
            })
            .addCase(deleteStaff.fulfilled,(state, action)=>{
                state = state.filter(staff => staff.staff_id !== action.payload.staff_id);
                return state;
            })
    }
})

export default staffSlice.reducer;