function EquipmentTable(){
    return(
        <>
            <div className="table-container container mx-auto p-4 rounded-lg overflow-hidden">
                <table className="min-w-full border-collapse overflow-auto">
                    <thead>
                    <tr className="bg-green-500 text-white text-left rounded-t-lg">
                            <th className="p-2 rounded-l-lg">Equipment ID</th>
                            <th className="p-2">Equipment Name</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Count</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Staff List</th>
                            <th className="p-2">Field List</th>
                            <th className="p-2">Edit</th>
                            <th className="p-2 rounded-r-lg">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="hover:bg-green-100">
                        <td className="p-2">1</td>
                        <td className="p-2">John</td>
                        <td className="p-2">Doe</td>
                        <td className="p-2">Manager</td>
                        <td className="p-2">Male</td>
                        <td className="p-2">2022-01-10</td>
                        <td className="p-2">1990-06-15</td>
                        <td className="p-2">
                            <button className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 rounded">Edit</button>
                        </td>
                        <td className="p-2">
                            <button className="bg-red-500 text-white px-2 py-1 hover:bg-red-600 rounded">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EquipmentTable