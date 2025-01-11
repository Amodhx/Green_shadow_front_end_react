import EquipmentTable from "../components/Equipment/EquipmentTable.tsx";
import {useState} from "react";
import EquipmentModal from "../components/Equipment/EquipmentModal.tsx";
import AddNewButton from "../components/AddNewButton.tsx";

function Equipment() {

    const [isModalShow, setIsModalShow] = useState(false)
    const openModal = () => setIsModalShow(true);
    const closeModal = () => setIsModalShow(false);
    return(
        <>
            <div className="flex items-center justify-between w-full h-16 bg-gray-50 p-4 mt-12">
                <div>
                    <h1 className="block text-xl font-semibold text-gray-700">Equipment Details</h1>
                    <select
                        id="equipment"
                        className="mt-4 block w-40 h-10 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700">
                        <option>All Equipment</option>
                        <option>All Equipment</option>
                        <option>All Equipment</option>
                        <option>All Equipment</option>
                        <option>All Equipment</option>
                    </select>
                </div>
                <AddNewButton openModal={openModal} text={'Add New Equipment'}/>
            </div>
            <EquipmentTable/>
            {isModalShow && (
                <EquipmentModal closeModal={closeModal}/>
            )}
        </>
    )
}

export default Equipment;