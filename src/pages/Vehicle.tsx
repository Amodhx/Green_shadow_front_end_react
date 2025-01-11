import VehicleTable from "../components/Vehicle/VehicleTable.tsx";
import {useState} from "react";
import VehicleModal from "../components/Vehicle/VehicleModal.tsx";

function Vehicle(){
    const [isModalShow, setIsModalShow] = useState(false)
    const openModal = () => setIsModalShow(true);
    const closeModal = () => setIsModalShow(false);
    return(
        <>
            <div className="flex items-center justify-between w-full h-16 bg-gray-50 p-4 mt-12">
                <div>
                    <h1 className="block text-xl font-semibold text-gray-700">Vehicle Details</h1>
                    <select
                        id="vehicle"
                        className="mt-4 block w-40 h-10 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700">
                        <option>All Vehicle</option>
                        <option>All Vehicle</option>
                        <option>All Vehicle</option>
                        <option>All Vehicle</option>
                        <option>All Vehicle</option>
                    </select>
                </div>
                <button
                    onClick={openModal}
                    className="mt-8 h-10 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Add New Vehicle
                </button>
            </div>
            <VehicleTable/>
            {isModalShow && (
                <VehicleModal closeModal={closeModal}/>
            )}
        </>
    )
}

export default Vehicle;