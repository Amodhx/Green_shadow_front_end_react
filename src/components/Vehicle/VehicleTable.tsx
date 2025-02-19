import {useDispatch, useSelector} from "react-redux";
import VehicleModel from "../../model/VehicleModel.ts";
import {useEffect, useState} from "react";
import VehicleModal from "./VehicleModal.tsx";
import {deleteVehicle, getVehicles} from "../../slices/VehicleSlice.ts";
import Swal from 'sweetalert2';
import {AppDispatch} from "../../store/Store.ts";


function VehicleTable(){
    useEffect(() => {
        if (vehicles.length ===0){
            dispatch(getVehicles())
        }
    }, []);
    const dispatch = useDispatch<AppDispatch>();
    const vehicles : VehicleModel[] = useSelector((state:any) => state.vehicles)
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel | null>(null);
    function updateVehicleDetails(vehicleId:string){
        const vehicle = vehicles.find((v: VehicleModel) => v.vehicle_code === vehicleId);
        if (vehicle){
            setSelectedVehicle(vehicle)
        }
    }
    function deleteVehicleDetails(vehicle_id:string){
        const vehicle = vehicles.find((v:VehicleModel) => v.vehicle_code === vehicle_id);
        if (vehicle){
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteVehicle(vehicle))
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        }
    }
    function closeModal() {
        setSelectedVehicle(null);
    }
    return(
        <>
            <div className="table-container container mx-auto p-4 rounded-lg overflow-hidden">
                <table className="min-w-full border-collapse overflow-auto">
                    <thead>
                    <tr className="bg-green-500 text-white text-left rounded-t-lg">
                        <th className="p-2 rounded-l-lg">Vehicle ID</th>
                        <th className="p-2">Licence Plate Number</th>
                        <th className="p-2">Vehicle Category</th>
                        <th className="p-2">Fuel Type</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Staff Id</th>
                        <th className="p-2">Remarks</th>
                        <th className="p-2">Edit</th>
                        <th className="p-2 rounded-r-lg">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vehicles.map((vehicle :VehicleModel) => (
                        <tr key={vehicle.vehicle_code} className="hover:bg-green-100">
                            <td className="p-2">{vehicle.vehicle_code}</td>
                            <td className="p-2">{vehicle.licence_plate_number}</td>
                            <td className="p-2">{vehicle.vehicle_category}</td>
                            <td className="p-2">{vehicle.fuel_type}</td>
                            <td className="p-2">{vehicle.status}</td>
                            <td className="p-2">{vehicle.staff_id}</td>
                            <td className="p-2">{vehicle.remarks}</td>
                            <td className="p-2">
                                <button onClick={()=>{
                                    updateVehicleDetails(vehicle.vehicle_code)
                                }} className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 rounded">Edit</button>
                            </td>
                            <td className="p-2">
                                <button
                                    onClick={()=>{
                                        deleteVehicleDetails(vehicle.vehicle_code);
                                    }}
                                    className="bg-red-500 text-white px-2 py-1 hover:bg-red-600 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {selectedVehicle && (
                <VehicleModal
                    closeModal={closeModal}
                    selectedVehicle={selectedVehicle} // Pass the selected vehicle
                />
            )}
        </>
    )
}

export default VehicleTable