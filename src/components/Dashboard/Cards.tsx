import 'boxicons'

function Cards(){
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4 mt-12">
                <div
                    className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg border border-gray-200 mt-4">
                    <div>
                        <div className="text-gray-600 font-medium">Total Fields</div>
                        <div id="totalField" className="text-2xl font-bold text-gray-800">40</div>
                    </div>
                    <i className='bx bxs-florist text-green-600 text-4xl'></i>
                </div>
                <div
                    className="mt-4 flex items-center justify-between bg-white p-4 shadow-md rounded-lg border border-gray-200">
                    <div>
                        <div className="text-gray-600 font-medium">Total Vehicle</div>
                        <div className="text-2xl font-bold text-gray-800">40</div>
                    </div>
                    <i className='bx bx-taxi text-green-600 text-4xl'></i>
                </div>
                <div
                    className="mt-4 flex items-center justify-between bg-white p-4 shadow-md rounded-lg border border-gray-200">
                    <div>
                        <div className="text-gray-600 font-medium">Total Staff</div>
                        <div className="text-2xl font-bold text-gray-800">38</div>
                    </div>
                    <i className='bx bx-male-female text-green-600 text-4xl'></i>
                </div>
                <div
                    className="mt-4 flex items-center justify-between bg-white p-4 shadow-md rounded-lg border border-gray-200">
                    <div>
                        <div className="text-gray-600 font-medium">Total Crops</div>
                        <div className="text-2xl font-bold text-gray-800">$12</div>
                    </div>
                    <i className='bx bx-leaf text-green-600 text-4xl'></i>
                </div>
                <div
                    className="mt-4 flex items-center justify-between bg-white p-4 shadow-md rounded-lg border border-gray-200">
                    <div>
                        <div className="text-gray-600 font-medium">Total Equipments</div>
                        <div className="text-2xl font-bold text-gray-800">$12</div>
                    </div>
                    <i className='bx bx-fork text-green-600 text-4xl'></i>
                </div>
            </div>
        </>
    )
}

export default Cards;