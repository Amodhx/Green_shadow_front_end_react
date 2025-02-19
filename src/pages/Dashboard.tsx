import Cards from "../components/Dashboard/Cards.tsx";
import {useEffect, useState} from "react";
import Chart from "../components/Dashboard/Chart.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/Store.ts";
import {getFields} from "../slices/FieldSlice.ts";
import {getStaff} from "../slices/StaffSlice.ts";
import {getEquipments} from "../slices/EquipmentSlice.ts";
import {getLogs} from "../slices/LogSlice.ts";
import {getVehicles} from "../slices/VehicleSlice.ts";
import {getCrops} from "../slices/CropSlice.ts";

function Dashboard(){
    const [incomeData] = useState<number[]>(
        Array.from({ length: 12 }, () => Math.floor(Math.random() * 20) + 5) // Dummy data
    );
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getFields());
        dispatch(getStaff());
        dispatch(getEquipments());
        dispatch(getVehicles());
        dispatch(getCrops());
        dispatch(getLogs());
    });
    return(
        <>
            <Cards/>
            <div className="flex items-start space-x-4 mt-12">
                <div className="flex-1 mr-4 pr-4  mt-12">
                    <Chart incomeData={incomeData}/>
                </div>
                <div className="w-1/2 bg-white rounded-lg shadow-md pr-4 pl-4 mt-12">
                    <h5 className="text-center text-lg font-semibold mb-4">Calendar</h5>
                    <div className="h-64 border rounded-lg flex items-center justify-center">
                        Calendar Component
                    </div>
                </div>
            </div>


        </>
    )
}

export default Dashboard;