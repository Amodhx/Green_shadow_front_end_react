import React, {useEffect, useState} from "react";
import ModalButton from "../ModalButton.tsx";
import StaffModel from "../../model/StaffModel.ts";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import {saveStaff, updateStaff} from "../../slices/StaffSlice.ts";
import {AppDispatch} from "../../store/Store.ts";
import FieldModel from "../../model/FieldModel.ts";
import EquipmentModel from "../../model/EquipmentModel.ts";
import VehicleModel from "../../model/VehicleModel.ts";

function StaffModal({closeModal,selectedStaff}: {closeModal: () => void,selectedStaff?:StaffModel | null}) {
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    const  dispatch = useDispatch<AppDispatch>();
    const fields: FieldModel[] = useSelector((state: any) => state.fields);
    const equipments : EquipmentModel[] = useSelector((state : any)=> state.equipments);
    const vehicles:VehicleModel[] = useSelector((state:any)=>state.vehicles);

    useEffect(() => {
        let fieldIdsList = fields.map((field) => field.field_code);
        let equipmentIdsList = equipments.map((equipment)=>equipment.equipment_id);
        let vehicleIdsList = vehicles.map((vehicle)=>vehicle.vehicle_code);
        setFieldIds([...fieldIds,...fieldIdsList])
        setEquipmentIds([...equipmentIds,...equipmentIdsList])
        setVehicleIds([...vehicleIds,...vehicleIdsList])
        if (selectedStaff){
            setButtonText("Update Staff")
            set_first_name(selectedStaff.first_name)
            set_last_name(selectedStaff.last_name)
            set_designation(selectedStaff.designation)
            set_gender(selectedStaff.gender)
            set_joined_date(selectedStaff.joined_date)
            set_dob(selectedStaff.dob)
            set_address_line_01(selectedStaff.address_line_01)
            set_address_line_02(selectedStaff.address_line_02)
            set_address_line_03(selectedStaff.address_line_03)
            set_address_line_04(selectedStaff.address_line_04)
            set_address_line_05(selectedStaff.address_line_05)
            set_contact(selectedStaff.contact_number)
            set_email(selectedStaff.email)
            set_role(selectedStaff.role)
            if (selectedStaff.field_staff_details != undefined){
                setAdditionalFields(selectedStaff.field_staff_details)
            }
            if (selectedStaff.vehicle != undefined){
                setAdditionalVehicles(selectedStaff.vehicle)
            }
            if (selectedStaff.equipment_staff_details != undefined){
                setAdditionalEquipments(selectedStaff.equipment_staff_details)
            }



        }
    }, [selectedStaff]);

    function onFormSubmitClick(){
        const staff = new StaffModel('1',first_name,last_name,designation,gender,joined_date,dob,address_line_01,address_line_02,
            address_line_03,address_line_04,address_line_05,contact,email,role,additionalFields,additionalEquipments,additionalVehicles);
        if (selectedStaff){
            staff.setStaffId(selectedStaff.staff_id)
            Swal.fire({
                title: "Do you want to Update the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateStaff(staff))
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }else {
            dispatch(saveStaff(staff))
            Swal.fire({
                title: "Saved!",
                icon: "success",
                draggable: true
            });
        }
        closeModal();
    }
    const [designationOptions] = useState(['Select Designation','MANAGER','SENIOR_ASSISTANT_MANAGER',
        'ASSISTANT_MANAGER','ADMIN_HR_STAFF','OFFICE_ASSISTANT','SENIOR_AGRONOMIST','AGRONOMIST',
        'SOIL_SCIENTIST','SENIOR_TECHNICIAN','SUPERVISOR','LABOR']);
    const [genderOptions] = useState(['Select Gender','MALE','FEMALE'])
    const [roleOptions] = useState(['Select Role','MANAGER','ADMINISTRATIVE','SCIENTIST','OTHER'])

    const [buttonText,setButtonText] = useState('Save Staff')


    const [first_name,set_first_name] = useState('')
    const [last_name,set_last_name] = useState('')
    const [designation,set_designation] = useState('')
    const [gender,set_gender] = useState('')
    const [joined_date,set_joined_date] = useState('')
    const [dob,set_dob] = useState('')
    const [address_line_01,set_address_line_01] = useState('')
    const [address_line_02,set_address_line_02] = useState('')
    const [address_line_03,set_address_line_03] = useState('')
    const [address_line_04,set_address_line_04] = useState('')
    const [address_line_05,set_address_line_05] = useState('')
    const [contact,set_contact] = useState('')
    const [email,set_email] = useState('')
    const [role,set_role] = useState('')

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
    function removeFieldIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedFields = [...additionalFields]
        updatedFields.splice(index,1)
        setAdditionalFields(updatedFields);
    }
    function removeVehicleIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedVehicle = [...additionalVehicles]
        updatedVehicle.splice(index,1)
        setAdditionalVehicles(updatedVehicle);
    }
    function removeEquipmentIdSelector(index:number,event:any){
        event.preventDefault()
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
                        <h5 className="text-lg font-semibold">{selectedStaff ? 'Edit Staff Details' : 'Add New Staff Details'}</h5>
                    </div>
                    <div className="px-6 py-4">
                        <form className="space-y-4 max-h-[520px] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">First Name</label>
                                    <input
                                        onChange={(e) =>{
                                            set_first_name(e.target.value)
                                        }}
                                        value={first_name}
                                        type="text"
                                        placeholder="First name"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Last Name</label>
                                    <input
                                        onChange={(e) =>{
                                            set_last_name(e.target.value)
                                        }}
                                        value={last_name}
                                        type="text"
                                        placeholder="Last name"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Designation</label>
                                    <select
                                        onChange={(e)=>{
                                            set_designation(e.target.value)
                                        }}
                                        value={designation}
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded">
                                        {designationOptions.map((designation) => (
                                            <option key={designation} value={designation}>
                                                {designation}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Gender</label>
                                    <select
                                        onChange={(e)=>{
                                            set_gender(e.target.value);
                                        }}
                                        value={gender}
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded">
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
                                        onChange={(e)=>{
                                            set_joined_date(e.target.value)
                                        }}
                                        value={joined_date}
                                        type="text"
                                        placeholder="Enter Joined Date"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">DOB</label>
                                    <input
                                        onChange={(e)=>{
                                            set_dob(e.target.value)
                                        }}
                                        value={dob}
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
                                        onChange={(e)=>{
                                            set_address_line_01(e.target.value)
                                        }}
                                        value={address_line_01}
                                        type="text"
                                        placeholder="Enter Building No"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address Line 02</label>
                                    <input
                                        onChange={(e)=>{
                                            set_address_line_02(e.target.value)
                                        }}
                                        value={address_line_02}
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
                                        onChange={(e)=>{
                                            set_address_line_03(e.target.value)
                                        }}
                                        value={address_line_03}
                                        type="text"
                                        placeholder="Enter Main City"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address Line 04</label>
                                    <input
                                        onChange={(e)=>{
                                            set_address_line_04(e.target.value)
                                        }}
                                        value={address_line_04}
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
                                        onChange={(e)=>{
                                            set_address_line_05(e.target.value)
                                        }}
                                        value={address_line_05}
                                        type="text"
                                        placeholder="Enter Postal Code"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Contact Number</label>
                                    <input
                                        onChange={(e)=>{
                                            set_contact(e.target.value)
                                        }}
                                        value={contact}
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
                                        onChange={(e)=>{
                                            set_email(e.target.value)
                                        }}
                                        value={email}
                                        type="text"
                                        placeholder="Enter Email"
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Role</label>
                                    <select
                                        onChange={(e)=>{
                                            set_role(e.target.value)
                                        }}
                                        value={role}
                                        className="w-full px-4 py-2 bg-gray-700 text-white rounded">
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
                                    {additionalFields != undefined && additionalFields.map((_, index) => (
                                        <>
                                            <div key={index} className={'flex'}>
                                                <div className={'w-[200px]'}>
                                                    <select
                                                        value={selectedStaff?.field_staff_details[index]}
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
                                                        onClick={(e) => {
                                                            removeFieldIdSelector(index,e)
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
                                    {additionalEquipments != undefined && additionalEquipments.map((_, index) => (
                                        <>
                                            <div key={index} className={'flex'}>
                                                <div className={'w-[200px]'}>
                                                    <select
                                                        value={selectedStaff?.equipment_staff_details[index]}
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
                                                        onClick={(e) => {
                                                            removeEquipmentIdSelector(index,e)
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
                                    {additionalVehicles != undefined && additionalVehicles.map((_, index) => (
                                        <>
                                            <div key={index} className={'flex'}>
                                                <div className={'w-[200px]'}>
                                                    <select
                                                        value={selectedStaff?.vehicle[index]}
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
                                                        onClick={(e) => {
                                                            removeVehicleIdSelector(index,e)
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
                        </form>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-700 flex justify-end space-x-3">
                        <ModalButton closeModal={closeModal} submitClick={onFormSubmitClick} buttonText={buttonText}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffModal;