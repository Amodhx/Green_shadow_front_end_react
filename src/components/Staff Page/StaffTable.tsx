import '../../css/Table.css'
import StaffModel from "../../model/StaffModel.ts";
import {useSelector} from "react-redux";
import {useState} from "react";
import StaffModal from "./StaffModal.tsx";
function StaffTable(){
    const staffs : StaffModel[] = useSelector((state : any) => state.staffs);
    const [selectedStaff, setSelectedStaff] = useState<StaffModel | null>(null)

    function onEditBtnClick(staffId:string){
        const staff = staffs.find((staff:StaffModel) => staff.staff_id === staffId);
        if (staff){
            setSelectedStaff(staff)
        }
    }
    function closeModal(){
        setSelectedStaff(null)
    }
    return(
        <>
            <div className="table-container container mx-auto p-4 rounded-lg overflow-hidden">
                <table className="min-w-full border-collapse overflow-auto">
                    <thead>
                    <tr className="bg-green-500 text-white text-left rounded-t-lg">
                        <th className="p-2 rounded-l-lg">Staff ID</th>
                        <th className="p-2">First Name</th>
                        <th className="p-2">Last Name</th>
                        <th className="p-2">Designation</th>
                        <th className="p-2">Gender</th>
                        <th className="p-2">Joined Date</th>
                        <th className="p-2">DOB</th>
                        <th className="p-2">Address</th>
                        <th className="p-2">Contact Number</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Fields</th>
                        <th className="p-2">Equipments</th>
                        <th className="p-2">Vehicles</th>
                        <th className="p-2">Edit</th>
                        <th className="p-2 rounded-r-lg">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {staffs.map((staff) => (
                        <tr key={staff.staff_id} className="hover:bg-green-100">
                            <td className="p-2">{staff.staff_id}</td>
                            <td className="p-2">{staff.first_name}</td>
                            <td className="p-2">{staff.last_name}</td>
                            <td className="p-2">{staff.designation}</td>
                            <td className="p-2">{staff.gender}</td>
                            <td className="p-2">{staff.joined_date}</td>
                            <td className="p-2">{staff.dob}</td>
                            <td className="p-2">{staff.address_line_04}</td>
                            <td className="p-2">{staff.contact_number}</td>
                            <td className="p-2">{staff.email}</td>
                            <td className="p-2">{staff.role}</td>
                            <td className="p-2">{staff.field_list}</td>
                            <td className="p-2">{staff.equipment_list}</td>
                            <td className="p-2">{staff.vehicle_list}</td>
                            <td className="p-2">
                                <button
                                    onClick={() =>{
                                        onEditBtnClick(staff.staff_id);
                                    }}
                                    className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 rounded">Edit
                                </button>
                            </td>
                            <td className="p-2">
                                <button className="bg-red-500 text-white px-2 py-1 hover:bg-red-600 rounded">Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
            {selectedStaff && (
                <StaffModal
                    closeModal={closeModal}
                    selectedStaff={selectedStaff}
                />
            )}
        </>
    )
}

export default StaffTable