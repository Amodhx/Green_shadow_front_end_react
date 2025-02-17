import FieldModel from "../model/FieldModel.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import AddNewButton from "../components/AddNewButton.tsx";
import FieldCard from "../components/Field Page/FieldCard.tsx";
import FieldModal from "../components/Field Page/FieldModal.tsx";
import {getFields} from "../slices/FieldSlice.ts";
import {AppDispatch} from "../store/Store.ts";

function Fields(){
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (fields.length === 0){
            dispatch(getFields())
        }
    }, []);
    const fields : FieldModel[] = useSelector((state : any)=>state.fields);
    const [isModalShow, setIsModalShow] = useState(false)
    const openModal = () => setIsModalShow(true);
    const closeModal = () => setIsModalShow(false);
    return(
        <>
            <div className="flex items-center justify-between w-full h-[6rem] bg-gray-50 p-4 mt-4">
                <div>
                    <h1 className="block text-xl font-semibold text-gray-700">Fields Details</h1>
                </div>
                <AddNewButton openModal={openModal} text={'Add New Field'}/>
            </div>
            <div className="grid grid-cols-4 gap-5 p-5">
                {fields.map((field) => (
                    <FieldCard key={field.field_code} field={field}/>
                ))}
            </div>
            {isModalShow && (
                <FieldModal closeModal={closeModal} selectedField={null}/>
            )}
        </>
    )
}

export default Fields