import React, {useEffect, useState} from "react";
import ModalButton from "../ModalButton.tsx";
import StaffModel from "../../model/StaffModel.ts";

function StaffModal({closeModal,selectedStaff}: {closeModal: () => void,selectedStaff:StaffModel}) {
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    useEffect(() => {
        setFieldIds([...fieldIds,'F001','F002'])
        setEquipmentIds([...equipmentIds,'E001','E002'])
        setVehicleIds([...vehicleIds,'V001','V002'])
        if (selectedStaff){
            setButtonText("Update Staff")
        }
    }, [selectedStaff]);

    function onFormsubmitClick(){
        closeModal();
    }
    const [designationOptions] = useState(['Select Designation','MANAGER','SENIOR_ASSISTANT_MANAGER',
        'ASSISTANT_MANAGER','ADMIN_HR_STAFF','OFFICE_ASSISTANT','SENIOR_AGRONOMIST','AGRONOMIST',
        'SOIL_SCIENTIST','SENIOR_TECHNICIAN','SUPERVISOR','LABOR']);
    const [genderOptions] = useState(['Select Gender','MALE','FEMALE'])
    const [roleOptions] = useState(['Select Role','MANAGER','ADMINISTRATIVE','SCIENTIST','OTHER'])

    const [buttonText,setButtonText] = useState('Save Staff')


    const [additionalFields,setAdditionalFields] = useState<string[]>([])
    const [additionalVehicles,setAdditionalVehicles] = useState<string[]>([])
    const [additionalEquipments,setAdditionalEquipments] = useState<string[]>([])

    const [fieldIds,setFieldIds] = useState<string[]>(['Select Field Id'])
    const [vehicleIds,setVehicleIds] = useState<string[]>(['Select Vehicle Id'])
    const [equipmentIds,setEquipmentIds] = useState<string[]>(['Select Equipment Id'])

    const addFieldDropdown = ()=>{
        setAdditionalFields([...additionalFields,'']);
    }
    const addVehicleDropdown = ()=>{
        setAdditionalVehicles([...additionalVehicles,'']);
    }
    const addEquipmentDropdown = ()=>{
        setAdditionalEquipments([...additionalEquipments,'']);
    }
    function removeFieldIdSelector(index:number){
        const updatedFields = [...additionalFields]
        updatedFields.splice(index,1)
        setAdditionalFields(updatedFields);
    }
    function removeVehicleIdSelector(index:number){
        const updatedVehicle = [...additionalVehicles]
        updatedVehicle.splice(index,1)
        setAdditionalVehicles(updatedVehicle);
    }
    function removeEquipmentIdSelector(index:number){
        const updatedEquipment = [...additionalEquipments]
        updatedEquipment.splice(index,1)
        setAdditionalEquipments(updatedEquipment);
    }
    function setSelectedFieldId(index:number , e:any){
        const updatedField = [...additionalFields];
        updatedField[index] = e.target.value;
        setAdditionalFields(updatedField)
    }
    function setSelectedVehicleId(index:number , e:any){
        const updatedVehicle = [...additionalVehicles];
        updatedVehicle[index] = e.target.value;
        setAdditionalVehicles(updatedVehicle)
    }
    function setSelectedEquipmentId(index:number , e:any){
        const updatedEquipment = [...additionalEquipments];
        updatedEquipment[index] = e.target.value;
        setAdditionalEquipments(updatedEquipment)
    }
    return(
        <>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                role="dialog"
                aria-labelledby="newStaffModalLabel"
                aria-hidden="true"
                onClick={handleOutsideClick}
            >
                <div className="bg-gray-800 text-white rounded-lg shadow-lg max-w-4xl w-full">
                    <div className="px-6 py-4 border-b border-gray-700">
                        <h5 className="text-lg font-semibold">Add New Staff Details</h5>
                    </div>
                    <div className="px-6 py-4">
                        <form className="space-y-4 max-h-[520px] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Designation</label>
                                    <select className="w-full px-4 py-2 bg-gray-700 text-white rounded">
                                        {designationOptions.map((designation) => (
                                            <option key={designation} value={designation}>
                                                {designation}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Gender</label>
                                    <select className="w-full px-4 py-2 bg-gray-700 text-white rounded">
                                        {genderOptions.map((gender) => (
                                            <option key={gender} value={gender}>{gender}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Joined Date</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Joined Date"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">DOB</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Date of Birth"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address Line 01</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Building No"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address Line 02</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Lane"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address Line 03</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Main City"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address Line 04</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Main State"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address Line 05</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Postal Code"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Contact Number</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Contact Number"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Email"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Role</label>
                                    <select className="w-full px-4 py-2 bg-gray-700 text-white rounded">
                                        {roleOptions.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                {/* Field List */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="form-label">
                                            Field
                                        </label>
                                        <button
                                            onClick={addFieldDropdown}
                                            type="button"
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            Add Field
                                        </button>
                                    </div>
                                    <select
                                        name="staffEquipment"
                                        className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                    >
                                        <option>Select Field Id</option>
                                    </select>
                                    {additionalFields.map((_, index) => (
                                        <>
                                            <div key={index} className={'flex'}>
                                                <div className={'w-[200px]'}>
                                                    <select
                                                        value={selectedStaff?.field_list[index]}
                                                        onChange={(e) => {
                                                            setSelectedFieldId(index, e)
                                                        }}
                                                        key={index}
                                                        className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                                    >
                                                        {fieldIds.map((e) => (
                                                            <option key={e} value={e}>{e}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            removeFieldIdSelector(index)
                                                        }}
                                                        className={'mt-2 ml-4 h-[40px] w-[70px] bg-green-500 text-white rounded-md hover:bg-red-500'}>Remove
                                                    </button>
                                                </div>


                                            </div>
                                        </>
                                    ))}
                                </div>
                                {/*Equipment List*/}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="form-label">
                                            Equipment
                                        </label>
                                        <button
                                            onClick={addEquipmentDropdown}
                                            type="button"
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            Add Equipment
                                        </button>
                                    </div>
                                    <select
                                        name="fieldEquipment"
                                        className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                    >
                                        <option>Select Field Id</option>
                                    </select>
                                    {additionalEquipments.map((_, index) => (
                                        <>
                                            <div key={index} className={'flex'}>
                                                <div className={'w-[200px]'}>
                                                    <select
                                                        value={selectedStaff?.equipment_list[index]}
                                                        onChange={(e) => {
                                                            setSelectedEquipmentId(index, e)
                                                        }}
                                                        key={index}
                                                        className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                                    >
                                                        {equipmentIds.map((e) => (
                                                            <option key={e} value={e}>{e}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            removeEquipmentIdSelector(index)
                                                        }}
                                                        className={'mt-2 ml-4 h-[40px] w-[70px] bg-green-500 text-white rounded-md hover:bg-red-500'}>Remove
                                                    </button>
                                                </div>


                                            </div>
                                        </>
                                    ))}
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                {/* Vehicle List */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="form-label">
                                            Vehicle
                                        </label>
                                        <button
                                            onClick={addVehicleDropdown}
                                            type="button"
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            Add Vehicle
                                        </button>
                                    </div>
                                    <select
                                        className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                    >
                                        <option>Select Vehicle Id</option>
                                    </select>
                                    {additionalVehicles.map((_, index) => (
                                        <>
                                            <div key={index} className={'flex'}>
                                                <div className={'w-[200px]'}>
                                                    <select
                                                        value={selectedStaff?.vehicle_list[index]}
                                                        onChange={(e) => {
                                                            setSelectedVehicleId(index, e)
                                                        }}
                                                        key={index}
                                                        className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                                    >
                                                        {vehicleIds.map((e) => (
                                                            <option key={e} value={e}>{e}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            removeVehicleIdSelector(index)
                                                        }}
                                                        className={'mt-2 ml-4 h-[40px] w-[70px] bg-green-500 text-white rounded-md hover:bg-red-500'}>Remove
                                                    </button>
                                                </div>


                                            </div>
                                        </>
                                    ))}
                                </div>
                                <div>

                                </div>

                            </div>

                            {/* Add additional input fields in similar manner */}
                            {/*<div>*/}
                            {/*    <div className="flex justify-between items-center mb-2">*/}
                            {/*        <label className="text-sm font-medium">Fields</label>*/}
                            {/*        <button*/}
                            {/*            type="button"*/}
                            {/*            className="bg-green-500 text-white px-3 py-1 rounded"*/}
                            {/*            onClick={addField}*/}
                            {/*        >*/}
                            {/*            Add Field*/}
                            {/*        </button>*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        {fields.map((_, index) => (*/}
                            {/*            <div className="mt-2" key={index}>*/}
                            {/*                <select className="w-full px-4 py-2 bg-gray-700 text-white rounded">*/}
                            {/*                    <option>Select Field</option>*/}
                            {/*                    /!* Add field options *!/*/}
                            {/*                </select>*/}
                            {/*            </div>*/}
                            {/*        ))}*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/* Similar setup for Vehicles and Equipment */}
                        </form>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-700 flex justify-end space-x-3">
                        <ModalButton closeModal={closeModal} submitClick={onFormsubmitClick} buttonText={buttonText}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffModal;