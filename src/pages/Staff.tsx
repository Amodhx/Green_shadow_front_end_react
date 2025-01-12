import '../css/Table.css'
import StaffTable from "../components/Staff Page/StaffTable.tsx";
import {useState} from "react";
import StaffModal from "../components/Staff Page/StaffModal.tsx";
import AddNewButton from "../components/AddNewButton.tsx";
function Staff(){
    const [isModalShow, setIsModalShow] = useState(false)
    const openModal = () => setIsModalShow(true);
    const closeModal = () => setIsModalShow(false);
    return(
        <>
            <div className="flex items-center justify-between w-full h-16 bg-gray-50 p-4 mt-12">
                <div>
                    <h1 className="block text-xl font-semibold text-gray-700">Staff Details</h1>
                    <select
                        id="staff"
                        className="mt-4 block w-40 h-10 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700">
                        <option>All Staff</option>
                        <option>All Staff</option>
                        <option>All Staff</option>
                        <option>All Staff</option>
                        <option>All Staff</option>
                        <option>All Staff</option>
                    </select>
                </div>
                <AddNewButton openModal={openModal} text={'Add New Staff'}/>
            </div>
            <StaffTable/>
            {isModalShow && (
                <StaffModal closeModal={closeModal}/>
            )}
        </>
    )
}

export default Staff;