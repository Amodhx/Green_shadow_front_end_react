import React, {useEffect, useState} from "react";
import VehicleModel from "../../model/VehicleModel.ts";
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import ModalButton from "../ModalButton.tsx";
import {saveVehicle, updateVehicle} from "../../slices/VehicleSlice.ts";
import {AppDispatch} from "../../store/Store.ts";
import StaffModel from "../../model/StaffModel.ts";

function Vehicle({
                     closeModal,
                     selectedVehicle,
                 }: {
    closeModal: () => void;
    selectedVehicle?: VehicleModel | null;
}) {
    const [fuelTypes] = useState(['Select Vehicle Fuel Type','PETROL', 'DIESEL']);
    const [vehicleStatuses] = useState(['Select Vehicle Status','AVAILABLE', 'OUT_OF_SERVICE']);
    const [staffIdToSelectOwner,setStaffIdToSelectOwner] = useState<string[]>(['Select Staff Id'])

    const [licence_plate_number,set_licence_plate_number] = useState('')
    const [vehicle_category,set_vehicle_category] = useState('')
    const [vehicle_fuel_type,set_vehicle_fuel_type] = useState('')
    const [vehicle_status,set_vehicle_status] = useState('')
    const [staff_id,set_staff_id] = useState('')
    const [remarks,set_remarks] = useState('')
    const [buttonText,setButtonText] = useState('Save Vehicle')

    const dispatch = useDispatch<AppDispatch>();
    const staffs :StaffModel[] = useSelector((state : any) => state.staffs);
    useEffect(() => {
        let staffIdsLise = staffs.map((staff)=>staff.staff_id);
        setStaffIdToSelectOwner([...staffIdToSelectOwner,...staffIdsLise])
        if (selectedVehicle) {
            setButtonText('Update Vehicle')
            set_licence_plate_number(selectedVehicle.licence_plate_number || '');
            set_vehicle_category(selectedVehicle.vehicle_category || '');
            set_vehicle_fuel_type(selectedVehicle.fuel_type || '');
            set_vehicle_status(selectedVehicle.status || '');
            set_staff_id(selectedVehicle.staff_id || '');
            set_remarks(selectedVehicle.remarks || '');
        }
    }, [selectedVehicle]);

    function submitBtnClick(){
        const vehicle_modal = new VehicleModel('1', licence_plate_number, vehicle_category, vehicle_fuel_type, vehicle_status, staff_id, remarks)
        if (selectedVehicle){
            vehicle_modal.setVehicleId(selectedVehicle.vehicle_code);
            Swal.fire({
                title: "Do you want to Update the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateVehicle(vehicle_modal))
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }else {
            dispatch(saveVehicle(vehicle_modal))
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


    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={handleOutsideClick}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content bg-gray-800 text-white p-5 rounded-lg shadow-lg">
                        <div className="modal-header flex justify-between">
                            <h5 className="text-xl pb-6 modal-title">{selectedVehicle ? 'Edit Vehicle Details' : 'Add New Vehicle Details'}</h5>
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
                                            onChange={(e) =>{
                                                set_licence_plate_number(e.target.value);
                                            }}
                                            type="text"
                                            value={licence_plate_number}
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
                                            onChange={(e) =>{
                                                set_vehicle_category(e.target.value)
                                            }}
                                            type="text"
                                            value={vehicle_category}
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
                                            value={vehicle_fuel_type}
                                            onChange={(e) =>{
                                                set_vehicle_fuel_type(e.target.value)
                                            }}
                                            className="text-gray-500 mt-2 mb-2 form-control p-2 rounded-md w-full" id="vehicleFuelType"
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
                                        <select
                                            value={vehicle_status}
                                            onChange={(e) =>{
                                                set_vehicle_status(e.target.value)
                                            }}
                                            className="mt-2 mb-2 form-control p-2 rounded-md w-full text-gray-500" id="vehicleStatus"
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
                                        <select
                                            value={staff_id}
                                            onChange={(e) =>{
                                                set_staff_id(e.target.value)
                                            }}
                                            className="text-gray-500 mt-2 mb-2 form-control p-2 rounded-md w-full" id="staffIdToVehicle"
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
                                            value={remarks}
                                            onChange={(e)=>{
                                                set_remarks(e.target.value)
                                            }}
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
                        <ModalButton closeModal={closeModal} submitClick={submitBtnClick} buttonText={buttonText}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Vehicle;
