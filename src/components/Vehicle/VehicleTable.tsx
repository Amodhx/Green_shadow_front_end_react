import {useSelector} from "react-redux";
import VehicleModel from "../../model/VehicleModel.ts";

function VehicleTable(){
    const vehicles : VehicleModel[] = useSelector((state:any) => state.vehicles)
    console.log(vehicles)
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
                        <tr key={vehicle.vehicle_id} className="hover:bg-green-100">
                            <td className="p-2">{vehicle.vehicle_id}</td>
                            <td className="p-2">{vehicle.licence_plate_number}</td>
                            <td className="p-2">{vehicle.vehicle_category}</td>
                            <td className="p-2">{vehicle.fuel_type}</td>
                            <td className="p-2">{vehicle.status}</td>
                            <td className="p-2">{vehicle.staff_id}</td>
                            <td className="p-2">{vehicle.remarks}</td>
                            <td className="p-2">
                                <button className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 rounded">Edit</button>
                            </td>
                            <td className="p-2">
                                <button className="bg-red-500 text-white px-2 py-1 hover:bg-red-600 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default VehicleTable