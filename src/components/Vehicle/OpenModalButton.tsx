function OpenModalButton({ openModal }: { openModal: () => void }){
    return(
        <>
            <button
                onClick={openModal}
                className="mt-8 h-10 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Add New Vehicle
            </button>
        </>
    )
}

export default OpenModalButton