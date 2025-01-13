function CardButtons(){
    return(
        <>
            <div className="flex justify-between mt-4">
                <button
                    className="btnCropUpdate bg-green-500 text-white py-2 px-4 rounded-md flex-grow mr-2"
                    data-index="0"
                >
                    Update
                </button>
                <button
                    className="btnCropDelete bg-red-500 text-white py-2 px-4 rounded-md flex-grow"
                    data-index="0"
                >
                    Delete
                </button>
            </div>
        </>
    )
}

export default CardButtons;