import React, {useEffect, useState} from "react";
import EquipmentModel from "../../model/EquipmentModel.ts";

function EquipmentModal({
                            closeModal,
                            selectedEquipment,
                        }: {
    closeModal: () => void;
    selectedEquipment?: EquipmentModel | null;
}){

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
        }
    }, [selectedEquipment]);
    function submitBtnClick(){

    }

    const [additionalStaff, setAdditionalStaff] = useState<string[]>([]);
    const [additionalFields, setAdditionalFields] = useState<string[]>([]);

    const addStaffDropdown = () => {
        setAdditionalStaff([...additionalStaff, '']);
    };
    const addFieldDropdown = ()=>{
        setAdditionalFields([...additionalFields,'']);
    }
    function setSelectedStaffId(index:number , e:any){
        additionalStaff[index] = e.target.value;
        console.log(additionalStaff);
    }
    function setSelectedFieldId(index:number , e:any){
        additionalFields[index] = e.target.value;
    }
    function removeStaffIdSelector(index:number){
        additionalStaff.splice(index,1);
        setAdditionalStaff([...additionalStaff])
    }
    function removeFieldIdSelector(index:number){
        additionalFields.splice(index,1);
        setAdditionalFields([...additionalStaff])
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
                                            className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                            id="vehicleStatus"
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
                                                            onClick={() => {
                                                                removeStaffIdSelector(index)
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
                                                Staff
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

                                </div>
                            </form>
                        </div>
                        <div className="mt-8 modal-footer flex justify-end">
                            <button
                                id="btnCloseVehicleDetails"
                                type="button"
                                className="mx-8 btn btn-secondary text-gray-300 hover:text-white"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <button
                                onClick={submitBtnClick}
                                id="btnSaveVehicleDetails"
                                type="submit"
                                className="p-2 rounded btn btn-success bg-green-500 hover:bg-green-600 text-white"
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EquipmentModal;