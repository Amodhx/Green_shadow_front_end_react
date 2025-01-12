
function ModalButton({closeModal,submitClick,buttonText}:{closeModal : ()=>void, submitClick :()=>void,buttonText:string}){
    return(
        <>
            <div className="mt-8 modal-footer flex justify-end">
                <button
                    type="button"
                    className="mx-8 btn btn-secondary text-gray-300 hover:text-white"
                    onClick={closeModal}
                >
                    Close
                </button>
                <button
                    onClick={submitClick}
                    type="submit"
                    className="p-2 rounded btn btn-success bg-green-500 hover:bg-green-600 text-white"
                >
                    {buttonText}
                </button>
            </div>
        </>


    )
}

export default ModalButton