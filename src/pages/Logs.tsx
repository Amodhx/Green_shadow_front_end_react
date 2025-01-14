import {useSelector} from "react-redux";
import {useState} from "react";
import AddNewButton from "../components/AddNewButton.tsx";
import LogCard from "../components/Logs Page/LogCard.tsx";
import LogModel from "../model/LogModel.ts";
import LogModal from "../components/Logs Page/LogModal.tsx";

function Logs(){
    const logs = useSelector((state : any) => state.logs)
    const [isModalShow, setIsModalShow] = useState(false)
    const openModal = () => setIsModalShow(true);
    const closeModal = () => setIsModalShow(false);
    return(
        <>
            <div className="flex items-center justify-between w-full h-[6rem] bg-gray-50 p-4 mt-4">
                <div>
                    <h1 className="block text-xl font-semibold text-gray-700">Logs Details</h1>
                </div>
                <AddNewButton openModal={openModal} text={'Add New Log'}/>
            </div>
            <div className="grid grid-cols-4 gap-5 p-5">
                {logs.map((log : LogModel) =>(
                    <LogCard log={log}/>
                ))}
            </div>

            {isModalShow && (
                <LogModal closeModal={closeModal} selectedLog={null}/>
            )}
        </>
    )
}

export default Logs;