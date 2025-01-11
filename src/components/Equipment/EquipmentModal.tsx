import React, {useEffect, useState} from "react";
import EquipmentModel from "../../model/EquipmentModel.ts";

function EquipmentModal({
                            closeModal,
                            selectedEquipment,
                        }: {
    closeModal: () => void;
    selectedEquipment?: EquipmentModel | null;
}){

    const [buttonText,setButtonText] = useState('Save Equipment')

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
    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={handleOutsideClick}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content bg-gray-800 text-white p-5 rounded-lg shadow-lg">
                        <div className="modal-header flex justify-between">
                            <h5 className="text-xl pb-6 modal-title">{selectedEquipment ? 'Edit Equipment Details' : 'Add New Equipment Details'}</h5>
                            <button
                                onClick={closeModal}
                                className="btn-close text-white"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <form id="vehicleForm">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                                    {/* Vehicle licence plate number */}
                                    <div>
                                        <label htmlFor="licencePlateNumber" className="pb-4 form-label">
                                            Vehicle licence plate number
                                        </label>
                                        <input
                                            type="text"
                                            className="text-black mt-2 mb-2 form-control p-2 rounded-md w-full"
                                            placeholder="Vehicle licence plate number"
                                            required
                                        />
                                    </div>
                                    {/* Vehicle Category */}
                                    <div>
                                        <label htmlFor="vehicleCategory" className="form-label">
                                            Vehicle Category
                                        </label>
                                        <input
                                            type="text"
                                            className="text-black mt-2 mb-2 form-control p-2 rounded-md w-full"
                                            placeholder="Vehicle Category"
                                            id="vehicleCategory"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <label htmlFor="vehicleFuelType" className="form-label">
                                            Vehicle Fuel Type
                                        </label>
                                        <select
                                            className="text-gray-500 mt-2 mb-2 form-control p-2 rounded-md w-full"
                                            id="vehicleFuelType"
                                            required>
                                            <option>Hello</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="vehicleStatus" className="form-label">
                                            Vehicle Status
                                        </label>
                                        <select
                                            className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500"
                                            id="vehicleStatus"
                                            required>
                                            <option>Hello</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                                    {/* Staff Id */}
                                    <div>
                                        <label htmlFor="staffIdToVehicle" className="form-label">
                                            Owner Of the vehicle
                                        </label>
                                        <select
                                            className="text-gray-500 mt-2 mb-2 form-control p-2 rounded-md w-full"
                                            id="staffIdToVehicle"
                                            required>
                                            <option>Hello</option>
                                        </select>
                                    </div>
                                    {/* Remarks */}
                                    <div>
                                        <label htmlFor="specialRemark" className="form-label">
                                            Any Special Remark
                                        </label>
                                        <input
                                            type="text"
                                            className="text-black mt-2 mb-2 form-control p-2 rounded-md w-full"
                                            placeholder="Any Special Remark"
                                            id="specialRemark"
                                            required
                                        />
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