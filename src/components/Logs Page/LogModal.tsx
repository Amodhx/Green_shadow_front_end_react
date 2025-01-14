import LogModel from "../../model/LogModel.ts";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ModalButton from "../ModalButton.tsx";
import Swal from "sweetalert2";
import {addLog, updateLog} from "../../slices/LogSlice.ts";

function LogModal({closeModal,selectedLog} : {closeModal : ()=>void, selectedLog : LogModel | null}) {
    const dispatch = useDispatch();

    const [fieldIds,setFieldIds] = useState<string[]>(['Select Field Id'])
    const [staffIds,setStaffIds] = useState<string[]>(['Select Staff Id'])
    const [cropIds,setCropIds] = useState<string[]>(['Select Crop Id'])

    const [additionalFields,setAdditionalFields] = useState<string[]>([])
    const [additionalStaffs,setAdditionalStaffs] = useState<string[]>([])
    const [additionalCrops,setAdditionalCrops] = useState<string[]>([])

    const [buttonText,setButtonText] = useState<string>('Save Log')

    const [logType,setLogType] = useState<string>('')
    const [logDescription,setLogDescription] = useState<string>('')
    const [log_image,set_log_image] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                set_log_image(base64String);
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
    const addCropDropDown = () =>{
        setAdditionalCrops([...additionalCrops,'']);
    }
    const addStaffDropDown = () =>{
        setAdditionalStaffs([...additionalStaffs,''])
    }

    function removeFieldIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedFields = [...additionalFields]
        updatedFields.splice(index,1)
        setAdditionalFields(updatedFields);
    }
    function removeCropIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedCrops = [...additionalCrops]
        updatedCrops.splice(index,1)
        setAdditionalCrops(updatedCrops)
    }
    function removeStaffIdSelector(index:number,event:any){
        event.preventDefault()
        const updatedStaffs = [...additionalStaffs]
        updatedStaffs.splice(index,1)
        setAdditionalStaffs(updatedStaffs)
    }
    function setSelectedFieldId(index:number , e:any){
        const updatedField = [...additionalFields];
        updatedField[index] = e.target.value;
        setAdditionalFields(updatedField)
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

    const [logTypes] = useState(['Select Log Type' , 'DANGER','NORMAL'])

    useEffect(() => {
        setFieldIds([...fieldIds,'F001','F002'])
        setStaffIds([...staffIds,'S001','S002'])
        setCropIds([...cropIds,'C001','C002'])
        if (selectedLog){
            setButtonText('Update Log')
            set_log_image(selectedLog.observe_image)
            setLogType(selectedLog.log_type)
            setLogDescription(selectedLog.log_description)
            setAdditionalStaffs(selectedLog.staff_list)
            setAdditionalCrops(selectedLog.crop_list)
            setAdditionalFields(selectedLog.fields_list)
            settingPreviewImage(selectedLog.observe_image)
        }
    }, []);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    function onSubmitClick(){
        let date :string = String(Date.now());
        const log = new LogModel('1',date,logDescription,logType,log_image,additionalFields,additionalCrops,additionalStaffs);

        if (selectedLog){
            log.setLogId(selectedLog.log_id)
            Swal.fire({
                title: "Do you want to Update the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateLog(log.toPlainObject()))
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }else {
            dispatch(addLog(log.toPlainObject()));
            Swal.fire({
                title: "Saved!",
                icon: "success",
                draggable: true
            });
        }
        closeModal()
    }

    return (
        <>
            <div
                onClick={handleOutsideClick}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-4xl">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <h5 className="text-lg font-semibold">{selectedLog ? 'Edit Log Details' : 'Add New Log Details'}</h5>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        <form className="space-y-4 max-h-[520px] overflow-y-auto">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Log Type</label>
                                    <select
                                        onChange={(e) => {
                                            setLogType(e.target.value);
                                        }}
                                        name="logType"
                                        value={logType}
                                        className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                    >
                                        {logTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Log Description</label>
                                    <input
                                        onChange={(e) => {
                                            setLogDescription(e.target.value);
                                        }}
                                        value={logDescription}
                                        type="text"
                                        placeholder="Enter Log Description"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Log Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Observed Image</label>
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

                                {/* Crops List */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="form-label">
                                            Crop
                                        </label>
                                        <button
                                            onClick={addCropDropDown}
                                            type="button"
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            Add Crop
                                        </button>
                                    </div>
                                    <select
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
                                                            <option key={e} value={e}>{e}</option>
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                {/* Staff List */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="form-label">
                                            Staff
                                        </label>
                                        <button
                                            onClick={addStaffDropDown}
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
export default LogModal