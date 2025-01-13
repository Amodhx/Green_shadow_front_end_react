import {useState} from "react";
import AddNewButton from "../components/AddNewButton.tsx";
import CropCard from "../components/Crop Page/CropCard.tsx";
import CropModal from "../components/Crop Page/CropModal.tsx";
import {useSelector} from "react-redux";
import CropModel from "../model/CropModel.ts";

function Crops(){

    const crops : CropModel[] = useSelector((state : any) => state.crops);
    const [isModalShow, setIsModalShow] = useState(false)
    const openModal = () => setIsModalShow(true);
    const closeModal = () => setIsModalShow(false);
    return(
        <>
            <div className="flex items-center justify-between w-full h-[6rem] bg-gray-50 p-4 mt-4">
                <div>
                    <h1 className="block text-xl font-semibold text-gray-700">Crops Details</h1>
                </div>
                <AddNewButton openModal={openModal} text={'Add New Crop'}/>
            </div>
            <div className="grid grid-cols-4 gap-5 p-5">
                {crops.map((crop) =>(
                    <CropCard crop={crop}/>
                ))}
            </div>

            {isModalShow && (
                <CropModal closeModal={closeModal} selectedCrop={null}/>
            )}

        </>
    )
}

export default Crops