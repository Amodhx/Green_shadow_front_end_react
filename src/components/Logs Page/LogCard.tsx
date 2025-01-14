import LogModel from "../../model/LogModel.ts";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import {deleteLog} from "../../slices/LogSlice.ts";
import CardButtons from "../CardButtons.tsx";
import LogModal from "./LogModal.tsx";

function LogCard({log} : {log:LogModel}) {

    const [selectedLog, setSelectedLog] = useState<LogModel | null>(null)
    const dispatch = useDispatch()
    function onUpdateClick(){
        setSelectedLog(log);
    }
    function onDeleteClick(){
        if (log){
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
                    dispatch(deleteLog(log))
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
        setSelectedLog(null)
    }
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <div className="bg-gray-800 text-white border border-gray-400 w-[310px] rounded-md overflow-hidden">
                    <img
                        src={log.observe_image || undefined}
                        alt="Crop Image"
                        className="w-full h-[175px] object-cover"
                    />
                    <div className="p-4">
                        <h5 className="text-lg font-bold mb-2">{log.log_type}</h5>
                        <p className="text-sm mb-2">
                            <strong>Log Details :</strong> {log.log_description}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Log Date:</strong> {log.log_date}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Fields :</strong> {log.fields_list}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Crops :</strong> {log.crop_list}
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Staffs :</strong> {log.staff_list}
                        </p>
                        <CardButtons onUpdateCropClick={onUpdateClick} onDeleteCropClick={onDeleteClick}/>
                    </div>
                </div>
            </div>

            {selectedLog && (
                <LogModal closeModal={closeModal} selectedLog={log}/>
            )}

        </>
    )
}

export default LogCard