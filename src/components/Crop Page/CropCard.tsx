import CardButtons from "../CardButtons.tsx";
import {useState} from "react";
import CropModel from "../../model/CropModel.ts";
import CropModal from "./CropModal.tsx";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import {AppDispatch} from "../../store/Store.ts";
import {deleteCrop} from "../../slices/CropSlice.ts";
function CropCard({crop}: {crop: CropModel}) {
    const [selectedCrop, setSelectedCrop] = useState<CropModel | null>(null)
    const dispatch = useDispatch<AppDispatch>();
    async function onUpdateClick(){
        const cropDataToUpdate =new CropModel(crop.crop_code,crop.crop_common_name,crop.crop_scientific_name,
            crop.crop_image,
            crop.category,
            crop.season,
            crop.crop_field_details,
            []);
        setSelectedCrop(cropDataToUpdate);
    }


    function onDeleteClick(){
        if (crop){
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
                    dispatch(deleteCrop(crop))
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
        setSelectedCrop(null)
    }
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <div className="bg-gray-800 text-white border border-gray-400 w-[310px] rounded-md overflow-hidden">
                    <img
                        src={crop.crop_image ? `data:image/png;base64,${crop.crop_image}` : undefined}
                        alt="Crop Image"
                        className="w-full h-[175px] object-cover"
                    />
                    <div className="p-4">
                        <h5 className="text-lg font-bold mb-2">{crop.crop_common_name}</h5>
                        <p className="text-sm mb-2">
                            <strong>Scientific Name:</strong> {crop.crop_scientific_name}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Category:</strong> {crop.category}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Crop Season:</strong> {crop.season}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Field ID:</strong> {crop.crop_field_details}
                        </p>
                        <CardButtons onUpdateCropClick={onUpdateClick} onDeleteCropClick={onDeleteClick}/>
                    </div>
                </div>
            </div>

            {selectedCrop && (
                <CropModal closeModal={closeModal} selectedCrop={crop}/>
            )}

        </>
    )
}

export default CropCard;