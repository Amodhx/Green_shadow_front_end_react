import FieldModel from "../../model/FieldModel.ts";
import {useState} from "react";
import Swal from "sweetalert2";
import CardButtons from "../CardButtons.tsx";
import FieldModal from "./FieldModal.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/Store.ts";
import {deleteField} from "../../slices/FieldSlice.ts";

function FieldCard({field} : {field: FieldModel}){

    const [selectedField, setSelectedField] = useState<FieldModel | null>(null)
    const dispatch = useDispatch<AppDispatch>();
    function onUpdateClick(){
        console.log(field.field_location)
        setSelectedField(field);
    }
    function onDeleteClick(){
        if (field){
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteField(field))
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        }
    }
    function closeModal(){
        setSelectedField(null)
    }

    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <div className="bg-gray-800 text-white border border-gray-400 w-[310px] rounded-md overflow-hidden">
                    <img
                        src={field.field_image ? `data:image/png;base64,${field.field_image}` : undefined}
                        alt="field Image"
                        className="w-full h-[175px] object-cover"
                    />
                    <div className="p-4">
                        <h5 className="text-lg font-bold mb-2">{field.field_name}</h5>
                        <p className="text-sm mb-2">
                            <strong>Field Location:</strong> {field.field_location}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Extent Size:</strong> {field.extent_size}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Staffs :</strong> {field.staff_list}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Crops :</strong> {field.crops_list}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Equipments :</strong> {field.equipment_list}
                        </p>
                        <CardButtons onUpdateCropClick={onUpdateClick} onDeleteCropClick={onDeleteClick}/>
                    </div>
                </div>
            </div>
            {selectedField && (
                <FieldModal closeModal={closeModal} selectedField={field}/>
            )}
        </>


    )
}

export default FieldCard;