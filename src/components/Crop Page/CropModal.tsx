import ModalButton from "../ModalButton.tsx";
import React, {useEffect, useState} from "react";
import CropModel from "../../model/CropModel.ts";
import {useDispatch} from "react-redux";
import {addCrop, updateCrop} from "../../slices/CropSlice.ts";
import Swal from "sweetalert2";

function CropModal({closeModal,selectedCrop}: {closeModal: () => void,selectedCrop:CropModel | null}) {
    const [fieldIds,setFieldIds] = useState<string[]>(['Select Field Id'])
    const [additionalFields,setAdditionalFields] = useState<string[]>([])
    const dispatch = useDispatch();
    const [buttonText,setButtonText] = useState('Save Crop')

    const [crop_common_name ,set_crop_common_name ] = useState('')
    const [crop_scientific_name ,set_crop_scientific_name] = useState('')
    const [crop_image,set_crop_image] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [category,set_category] = useState('')
    const [season,set_season] = useState('')


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                set_crop_image(base64String);
                setPreviewImage(base64String)
            };

            reader.readAsDataURL(file);
        }
    };
    function settingPreviewImage(img:string | null){
        setPreviewImage(img)
    }

    const addFieldDropdown = ()=>{
        setAdditionalFields([...additionalFields,'']);
    }

    function removeFieldIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedFields = [...additionalFields]
        updatedFields.splice(index,1)
        setAdditionalFields(updatedFields);
    }

    function setSelectedFieldId(index:number , e:any){
        const updatedField = [...additionalFields];
        updatedField[index] = e.target.value;
        setAdditionalFields(updatedField)
    }
    useEffect(() => {
        setFieldIds([...fieldIds,'F001','F002'])
        if (selectedCrop){
            setButtonText('Update Crop')
            set_crop_common_name(selectedCrop.crop_common_name)
            set_crop_scientific_name(selectedCrop.crop_scientific_name)
            set_crop_image(selectedCrop.crop_image)
            set_category(selectedCrop.category)
            set_season(selectedCrop.season)
            setAdditionalFields(selectedCrop.field_list)
            settingPreviewImage(selectedCrop.crop_image)
        }
    }, []);
    function onSubmitClick(){
        const crop = new CropModel('1',crop_common_name,crop_scientific_name,crop_image,category,season,additionalFields,[])

        if (selectedCrop){
            crop.setCropId(selectedCrop.crop_id)
            Swal.fire({
                title: "Do you want to Update the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateCrop(crop.toPlainObject()))
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }else {
            dispatch(addCrop(crop.toPlainObject()));
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
                        <h5 className="text-lg font-semibold">{selectedCrop ? 'Edit Crop Details' : 'Add New Crop Details'}</h5>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        <form className="space-y-4 max-h-[520px] overflow-y-auto">
                            {/* Row 1: Common Name and Scientific Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Crop Common Name</label>
                                    <input
                                        onChange={(e)=>{
                                            set_crop_common_name(e.target.value);
                                        }}
                                        value={crop_common_name}
                                        type="text"
                                        placeholder="Crop Common Name"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Crop Scientific Name</label>
                                    <input
                                        onChange={(e) =>{
                                            set_crop_scientific_name(e.target.value);
                                        }}
                                        value={crop_scientific_name}
                                        type="text"
                                        placeholder="Crop Scientific Name"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 2: Category and Season */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Crop Category</label>
                                    <input
                                        onChange={(e)=>{
                                            set_category(e.target.value);
                                        }}
                                        value={category}
                                        type="text"
                                        placeholder="Crop Category"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Crop Season</label>
                                    <input
                                        onChange={(e)=>{
                                            set_season(e.target.value)
                                        }}
                                        value={season}
                                        type="text"
                                        placeholder="Crop Season"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Row 4: Crop Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Crop Image</label>
                                <input
                                    onChange={(e)=>{
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
                                                        value={additionalFields[index]}
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
                                                            removeFieldIdSelector(index, e)
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

                    {/* Modal Footer */}
                    <div className="flex items-center justify-end p-4 border-t border-gray-700">
                        <ModalButton closeModal={closeModal} submitClick={onSubmitClick} buttonText={buttonText}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CropModal