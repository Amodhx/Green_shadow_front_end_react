import cropImg from '../../assets/images.jpg'
import CardButtons from "../CardButtons.tsx";
import {useState} from "react";
import CropModel from "../../model/CropModel.ts";
import CropModal from "./CropModal.tsx";
function CropCard({crop}: {crop: CropModel}) {
    const [selectedCrop, setSelectedCrop] = useState<CropModel | null>(null)
    function onUpdateClick(){
        setSelectedCrop(crop);
    }
    function onDeleteClick(){

    }
    function closeModal(){
        setSelectedCrop(null)
    }
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <div className="bg-gray-800 text-white border border-gray-400 w-[310px] rounded-md overflow-hidden">
                    <img
                        src={cropImg}
                        alt="Crop Image"
                        className="w-full h-[175px] object-cover"
                    />
                    <div className="p-4">
                        <h5 className="text-lg font-bold mb-2">Dummy Crop Name</h5>
                        <p className="text-sm mb-2">
                            <strong>Scientific Name:</strong> Dummy Scientific Name
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Category:</strong> Dummy Category
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Crop Season:</strong> Dummy Season
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Field ID:</strong> DummyField123
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