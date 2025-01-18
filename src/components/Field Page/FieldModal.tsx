import FieldModel from "../../model/FieldModel.ts";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import ModalButton from "../ModalButton.tsx";
import {addField, updateField} from "../../slices/FieldSlice.ts";

function FieldModal({closeModal,selectedField} : {closeModal: ()=>void,selectedField : FieldModel | null}) {
    const [cropIds,setCropIds] = useState<string[]>(['Select Crop Id']);
    const [additionalCrops,setAdditionalCrops] = useState<string[]>([]);

    const [staffIds,setStaffIds] = useState<string[]>(['Select Staff Id']);
    const [additionalStaffs,setAdditionalStaffs] = useState<string[]>([]);

    const [equipmentIds,setEquipmentIds] = useState<string[]>(['Select Equipment Id']);
    const [additionalEquipments,setAdditionalEquipments] = useState<string[]>([]);

    const dispatch = useDispatch();
    const [buttonText,setButtonText] = useState('Save Field')

    const [field_name,setField_name] = useState<string>('')
    const [field_location,setField_location] = useState<string>('')
    const [extent_size,setExtent_size] = useState<string>('')
    const [field_image,set_field_image] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                set_field_image(base64String);
                setPreviewImage(base64String)
            };

            reader.readAsDataURL(file);
        }
    };
    function settingPreviewImage(img:string | null){
        setPreviewImage(img)
    }
    const addCropsDropdown = ()=>{
        setAdditionalCrops([...additionalCrops,'']);
    }
    const addStaffDropdown = ()=>{
        setAdditionalStaffs([...additionalStaffs,'']);
    }
    const addEquipmentsDropdown = ()=>{
        setAdditionalEquipments([...additionalEquipments,'']);
    }
    function removeCropIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedCrop = [...additionalCrops]
        updatedCrop.splice(index,1)
        setAdditionalCrops(updatedCrop);
    }
    function removeStaffIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedStaff = [...additionalStaffs]
        updatedStaff.splice(index,1)
        setAdditionalStaffs(updatedStaff);
    }
    function removeEquipmentIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedCrop = [...additionalCrops]
        updatedCrop.splice(index,1)
        setAdditionalCrops(updatedCrop);
    }
    function setSelectedCropId(index:number , e:any){
        const updatedCrop = [...additionalCrops];
        updatedCrop[index] = e.target.value;
        setAdditionalCrops(updatedCrop)
    }
    function setSelectedStaffId(index:number , e:any){
        const updatedStaff = [...additionalStaffs];
        updatedStaff[index] = e.target.value;
        setAdditionalStaffs(updatedStaff)
    }
    function setSelectedEquipmentId(index:number , e:any){
        const updatedEquipment = [...additionalEquipments];
        updatedEquipment[index] = e.target.value;
        setAdditionalEquipments(updatedEquipment)
    }

    useEffect(() => {
        setCropIds([...cropIds,'C001','C002'])
        setStaffIds([...staffIds,'S001','S002'])
        setEquipmentIds([...equipmentIds,'E001','E002'])
        if (selectedField){
            setButtonText('Update Field')
            setField_name(selectedField.field_name)
            setField_location(selectedField.filed_location)
            setExtent_size(selectedField.extent_size)

            setAdditionalEquipments(selectedField.equipment_list)
            setAdditionalCrops(selectedField.crops_list)
            setAdditionalStaffs(selectedField.staff_list)
            settingPreviewImage(selectedField.field_image)
        }
    }, []);

    function onSubmitClick(){
        const field = new FieldModel('1',field_name,field_location,extent_size,additionalStaffs,additionalCrops,field_image,[],additionalEquipments);
        if (selectedField){
            field.setFieldId(selectedField.field_id);
            Swal.fire({
                title: "Do you want to Update the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateField(field.toPlainObject()))
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }else {
            dispatch(addField(field.toPlainObject()))
            Swal.fire({
                title: "Saved!",
                icon: "success",
                draggable: true
            });
        }
        closeModal()
    }
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    return(
        <>
            <div
                onClick={handleOutsideClick}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-4xl">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <h5 className="text-lg font-semibold">{selectedField ? 'Edit Field Details' : 'Add New Field Details'}</h5>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        <form className="space-y-4 max-h-[520px] overflow-y-auto">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Field Name</label>
                                    <input
                                        onChange={(e) => {
                                            setField_name(e.target.value);
                                        }}
                                        value={field_name}
                                        type="text"
                                        placeholder="Crop Common Name"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Field Location</label>
                                    <input
                                        onChange={(e) => {
                                            setField_location(e.target.value);
                                        }}
                                        value={field_location}
                                        type="text"
                                        placeholder="Crop Scientific Name"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Extent Size</label>
                                    <input
                                        onChange={(e) => {
                                            setExtent_size(e.target.value);
                                        }}
                                        value={extent_size}
                                        type="text"
                                        placeholder="Crop Category"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="form-label">
                                            Crop
                                        </label>
                                        <button
                                            onClick={addCropsDropdown}
                                            type="button"
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            Add Crop
                                        </button>
                                    </div>
                                    <select
                                        name="staffEquipment"
                                        className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                    >
                                        <option>Select Crop Id</option>
                                    </select>
                                    {additionalCrops.map((_, index) => (
                                        <>
                                            <div key={index} className={'flex'}>
                                                <div className={'w-[200px]'}>
                                                    <select
                                                        value={additionalCrops[index]}
                                                        onChange={(e) => {
                                                            setSelectedCropId(index, e)
                                                        }}
                                                        key={index}
                                                        className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                                    >
                                                        {cropIds.map((e) => (
                                                            <option key={e}
                                                                    value={e}>{e}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <button
                                                        key={index}
                                                        onClick={(e) => {
                                                            removeCropIdSelector(index, e)
                                                        }}
                                                        className={'mt-2 ml-4 h-[40px] w-[70px] bg-green-500 text-white rounded-md hover:bg-red-500'}>Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>

                            </div>
                            {/* Row 4: Crop Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Crop Image</label>
                                <input
                                    onChange={(e) => {
                                        handleFileChange(e)
                                    }}
                                    type="file"
                                    accept="image/*"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Image Preview"
                                        className="mt-2 rounded-md max-h-40"
                                    />
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
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
                                    {additionalStaffs.map((_, index) => (
                                        <>
                                            <div key={index} className={'flex'}>
                                                <div className={'w-[200px]'}>
                                                    <select
                                                        value={additionalStaffs[index]}
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
                                                            removeStaffIdSelector(index, e)
                                                        }}
                                                        className={'mt-2 ml-4 h-[40px] w-[70px] bg-green-500 text-white rounded-md hover:bg-red-500'}>Remove
                                                    </button>
                                                </div>


                                            </div>
                                        </>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="form-label">
                                            Equipment
                                        </label>
                                        <button
                                            onClick={addEquipmentsDropdown}
                                            type="button"
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            Add Equipment
                                        </button>
                                    </div>
                                    <select
                                        name="staffEquipment"
                                        className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                    >
                                        <option>Select Equipment Id</option>
                                    </select>
                                    {additionalEquipments.map((_, index) => (
                                        <>
                                            <div key={index} className={'flex'}>
                                                <div className={'w-[200px]'}>
                                                    <select
                                                        value={additionalEquipments[index]}
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
                                                            removeEquipmentIdSelector(index, e)
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

                    {/* Modal Footer */}
                    <div className="flex items-center justify-end p-4 border-t border-gray-700">
                        <ModalButton closeModal={closeModal} submitClick={onSubmitClick} buttonText={buttonText}/>
                    </div>
                </div>
            </div>
        </>


    )
}

export default FieldModal;