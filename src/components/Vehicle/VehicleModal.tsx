import React, {useState} from "react";

function Vehicle({ closeModal }: { closeModal: () => void }) {
    const [fuelTypes] = useState(['Select Vehicle Fuel Type','PETROL', 'DIESEL']);
    const [vehicleStatuses] = useState(['Select Vehicle Status','AVAILABLE', 'OUT_OF_SERVICE']);
    const [staffIdToSelectOwner] = useState(['Select Staff Id'])

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={handleOutsideClick}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content bg-gray-800 text-white p-5 rounded-lg shadow-lg">
                        <div className="modal-header flex justify-between">
                            <h5 className="text-xl pb-6 modal-title">Add New Vehicle Details</h5>
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
                                            id="licencePlateNumber"
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
                                        <select className="text-gray-500 mt-2 mb-2 form-control p-2 rounded-md w-full" id="vehicleFuelType"
                                                required>
                                            {fuelTypes.map((fuelType) => (
                                                <option key={fuelType} value={fuelType}>
                                                    {fuelType}
                                                </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="vehicleStatus" className="form-label">
                                            Vehicle Status
                                        </label>
                                        <select className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500" id="vehicleStatus"
                                                required>
                                            {vehicleStatuses.map((vehicleStatus) => (
                                                <option key={vehicleStatus} value={vehicleStatus}>
                                                    {vehicleStatus}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                                    {/* Staff Id */}
                                    <div>
                                        <label htmlFor="staffIdToVehicle" className="form-label">
                                            Owner Of the vehicle
                                        </label>
                                        <select className="text-gray-500 mt-2 mb-2 form-control p-2 rounded-md w-full" id="staffIdToVehicle"
                                                required>
                                            {staffIdToSelectOwner.map((staffId) => (
                                                <option key={staffId} value={staffId}>
                                                    {staffId}
                                                </option>
                                            ))}
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
                                onClick={closeModal}
                                id="btnSaveVehicleDetails"
                                type="submit"
                                className="p-2 rounded btn btn-success bg-green-500 hover:bg-green-600 text-white"
                            >
                                Save Vehicle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Vehicle;
