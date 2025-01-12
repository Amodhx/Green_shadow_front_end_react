import React, {useEffect, useState} from "react";
import EquipmentModel from "../../model/EquipmentModel.ts";
import {useDispatch} from "react-redux";
import {addEquipment, updateEquipment} from "../../slices/EquipmentSlice.ts";
import Swal from "sweetalert2";
import ModalButton from "../ModalButton.tsx";

function EquipmentModal({
                            closeModal,
                            selectedEquipment,
                        }: {
    closeModal: () => void;
    selectedEquipment?: EquipmentModel | null;
}){
    const dispatch = useDispatch();

    useEffect(() => {
        setStaffIds([...staffIds,'S001','S002'])
        setFieldIds([...fieldIds,'F001','F002'])
    }, []);

    const [buttonText,setButtonText] = useState('Save Equipment')
    const [equipmentTypes] = useState(['Select Equipment Type','ELECTRONIC',"MECHANICAL"])
    const [equipmentStatus] = useState(['Select Equipment Status','AVAILABLE',"NOT AVAILABLE"])
    const [staffIds, setStaffIds] = useState<string[]>(['Select Staff Id'])
    const [fieldIds,setFieldIds] = useState<string[]>(['Select Field Id'])

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    useEffect(() => {
        if (selectedEquipment) {
            setButtonText('Update Equipment')
            set_equipment_name(selectedEquipment.equipment_name)
            set_equipment_type(selectedEquipment.type)
            set_equipment_status(selectedEquipment.status)
            set_equipment_count(selectedEquipment.count)
            setAdditionalStaff(selectedEquipment.staff_list)
            setAdditionalFields(selectedEquipment.field_list)

        }
    }, [selectedEquipment]);
    function submitBtnClick(){
        const equipmentModel = new EquipmentModel('1',equipment_name,equipment_type,equipment_count,equipment_status,additionalStaff,additionalFields);
        if (selectedEquipment){
            equipmentModel.setEquipmentId(selectedEquipment.equipment_id)
            Swal.fire({
                title: "Do you want to Update the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateEquipment(equipmentModel.toPlainObject()))
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }else {
            dispatch(addEquipment(equipmentModel.toPlainObject()));
            Swal.fire({
                title: "Saved!",
                icon: "success",
                draggable: true
            });
        }
        closeModal()
    }

    const  [equipment_name,set_equipment_name] = useState('')
    const [equipment_type,set_equipment_type] = useState('')
    const [equipment_count,set_equipment_count] = useState('')
    const [equipment_status,set_equipment_status] = useState('')
    const [additionalStaff, setAdditionalStaff] = useState<string[]>([]);
    const [additionalFields, setAdditionalFields] = useState<string[]>([]);

    const addStaffDropdown = () => {
        setAdditionalStaff([...additionalStaff, '']);
    };
    const addFieldDropdown = ()=>{
        setAdditionalFields([...additionalFields,'']);
    }
    function setSelectedStaffId(index:number , e:any){
        const updatedStaff = [...additionalStaff];
        updatedStaff[index] = e.target.value;
        setAdditionalStaff(updatedStaff)
    }
    function setSelectedFieldId(index:number , e:any){
        const updatedField = [...additionalFields];
        updatedField[index] = e.target.value;
        setAdditionalFields(updatedField)
    }
    function removeStaffIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedStaff = [...additionalStaff];
        updatedStaff.splice(index, 1);  //Modify the copy
        setAdditionalStaff(updatedStaff);
    }
    function removeFieldIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedFields = [...additionalFields]
        updatedFields.splice(index,1)
        setAdditionalFields(updatedFields);
    }
    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={handleOutsideClick}
            >
                <div className="modal-dialog modal-lg max-h-3xl max-w-2xl overflow-y-auto fixed">
                    <div className="modal-content bg-gray-800 text-white p-5 rounded-lg shadow-lg">
                        <div className="modal-header flex justify-between">
                            <h5 className="text-xl pb-6 modal-title">{selectedEquipment ? 'Edit Equipment Details' : 'Add New Equipment Details'}</h5>
                            <button
                                onClick={closeModal}
                                className="btn-close text-white"
                                aria-label="Close"
                            />
                        </div>
                        <div className="overflow-y-auto max-h-80 modal-body">
                            <form id="vehicleForm" >
                                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                                    {/* Equipment name */}
                                    <div>
                                        <label htmlFor="licencePlateNumber" className="pb-4 form-label">
                                            Equipment Name
                                        </label>
                                        <input
                                            onChange={(e) =>{
                                                set_equipment_name(e.target.value)
                                            }}
                                            value={equipment_name}
                                            type="text"
                                            className="text-black mt-2 mb-2 form-control p-2 rounded-md w-full"
                                            placeholder="Enter Equipment Name"
                                            required
                                        />
                                    </div>
                                    {/* Equipment Type */}
                                    <div>
                                        <label htmlFor="vehicleCategory" className="form-label">
                                            Equipment Type
                                        </label>
                                        <select
                                            onChange={(e)=>{
                                                set_equipment_type(e.target.value)
                                            }}
                                            value={equipment_type}
                                            className="text-gray-500 mt-2 mb-2 form-control p-2 rounded-md w-full"
                                            id="vehicleFuelType"
                                            required>
                                            {equipmentTypes.map((e:string) =>(
                                                <option key={e} value={e}>{e}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                                    {/*Equipment Count*/}
                                    <div>
                                        <label htmlFor="vehicleFuelType" className="form-label">
                                        Equipment Count
                                        </label>
                                        <input
                                            onChange={(e)=>{
                                                set_equipment_count(e.target.value)
                                            }}
                                            value={equipment_count}
                                            type="text"
                                            className="text-black mt-2 mb-2 form-control p-2 rounded-md w-full"
                                            placeholder="Enter Equipment Count"
                                            required
                                        />
                                    </div>
                                    <div>
                                        {/*Equipment status*/}
                                        <label htmlFor="vehicleStatus" className="form-label">
                                            Equipment Status
                                        </label>
                                        <select
                                            onChange={(e)=>{
                                                set_equipment_status(e.target.value)
                                            }}
                                            value={equipment_status}
                                            className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                            id="equipmentStatus"
                                            required>
                                            {equipmentStatus.map((e) =>(
                                                <option key={e} value={e}>{e}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                    {/* Staff List */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="form-label">
                                                Staff
                                            </label>
                                            <button
                                                onClick={addStaffDropdown}
                                                type="button"
                                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                            >
                                                Add Staff
                                            </button>
                                        </div>
                                        <select
                                            name="staffEquipment"
                                            className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                        >
                                            <option>Select Staff Id</option>
                                        </select>
                                        {additionalStaff.map((_, index) => (
                                            <>
                                                <div key={index} className={'flex'}>
                                                    <div className={'w-[200px]'}>
                                                        <select
                                                            value={selectedEquipment?.staff_list[index]}
                                                            onChange={(e) => {
                                                                setSelectedStaffId(index, e)
                                                            }}
                                                            key={index}
                                                            className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                                        >
                                                            {staffIds.map((e) => (
                                                                <option key={e} value={e}>{e}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <button
                                                            key={index}
                                                            onClick={(e) => {
                                                                removeStaffIdSelector(index,e)
                                                            }}
                                                            className={'mt-2 ml-4 h-[40px] w-[70px] bg-green-500 text-white rounded-md hover:bg-red-500'}>Remove
                                                        </button>
                                                    </div>


                                                </div>
                                            </>
                                        ))}
                                    </div>
                                    {/*Field List*/}
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
                                            name="fieldEquipment"
                                            className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                        >
                                            <option>Select Field Id</option>
                                        </select>
                                        {additionalFields.map((_, index) => (
                                            <>
                                                <div key={index} className={'flex'}>
                                                    <div className={'w-[200px]'}>
                                                        <select
                                                            value={selectedEquipment?.field_list[index]}
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

                                </div>
                            </form>
                        </div>
                        <ModalButton closeModal={closeModal} submitClick={submitBtnClick} buttonText={buttonText}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EquipmentModal;