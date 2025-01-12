import EquipmentModel from "../../model/EquipmentModel.ts";
import {useSelector} from "react-redux";
import {useState} from "react";
import EquipmentModal from "./EquipmentModal.tsx";

function EquipmentTable(){
    const equipments : EquipmentModel[] = useSelector((state : any) => state.equipments);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentModel | null>(null);

    function updateEquipmentDetail(equipmentId:string){
        const equipment = equipments.find((v:EquipmentModel) => v.equipment_id === equipmentId);
        if (equipment){
            setSelectedEquipment(equipment);
        }

    }
    function closeModal(){
        setSelectedEquipment(null);
    }
    return(
        <>
            <div className="table-container container mx-auto p-4 rounded-lg overflow-hidden">
                <table className="min-w-full border-collapse overflow-auto">
                    <thead>
                    <tr className="bg-green-500 text-white text-left rounded-t-lg">
                            <th className="p-2 rounded-l-lg">Equipment ID</th>
                            <th className="p-2">Equipment Name</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Count</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Staff List</th>
                            <th className="p-2">Field List</th>
                            <th className="p-2">Edit</th>
                            <th className="p-2 rounded-r-lg">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {equipments.map((equipment) => (
                        <tr key={equipment.equipment_id} className="hover:bg-green-100">
                            <td className="p-2">{equipment.equipment_id}</td>
                            <td className="p-2">{equipment.equipment_name}</td>
                            <td className="p-2">{equipment.type}</td>
                            <td className="p-2">{equipment.count}</td>
                            <td className="p-2">{equipment.status}</td>
                            <td className="p-2">{equipment.staff_list}</td>
                            <td className="p-2">{equipment.field_list}</td>
                            <td className="p-2">
                                <button
                                    onClick={() =>{
                                        updateEquipmentDetail(equipment.equipment_id);
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
            {selectedEquipment && (
                <EquipmentModal
                    closeModal={closeModal}
                    selectedEquipment={selectedEquipment}
                />
            )}
        </>
    )
}

export default EquipmentTable