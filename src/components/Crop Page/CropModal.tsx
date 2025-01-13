import ModalButton from "../ModalButton.tsx";
import React from "react";

function CropModal({closeModal}: {closeModal: () => void}) {
    function onSubmitClick(){
        closeModal()
    }
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    return(
        <>
            <div
                onClick={handleOutsideClick}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-4xl">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <h5 className="text-lg font-semibold">Add New Crop Details</h5>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        <form className="space-y-4">
                            {/* Row 1: Common Name and Scientific Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Crop Common Name</label>
                                    <input
                                        type="text"
                                        placeholder="Crop Common Name"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Crop Scientific Name</label>
                                    <input
                                        type="text"
                                        placeholder="Crop Scientific Name"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 2: Category and Season */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Crop Category</label>
                                    <input
                                        type="text"
                                        placeholder="Crop Category"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Crop Season</label>
                                    <input
                                        type="text"
                                        placeholder="Crop Season"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 3: Field List */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium">Field</label>
                                    <button
                                        type="button"
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Add Field
                                    </button>
                                </div>
                                <select
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 mt-2">
                                    <option value="">Select Field</option>
                                </select>
                                <div className="mt-2">
                                    {/* Dynamic additional dropdowns will go here */}
                                </div>
                            </div>

                            {/* Row 4: Crop Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Crop Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <img
                                    src="#"
                                    alt="Image Preview"
                                    className="hidden mt-2 rounded-md max-h-40"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Modal Footer */}

                    <div className="flex items-center justify-end p-4 border-t border-gray-700">
                        <ModalButton closeModal={closeModal} submitClick={onSubmitClick} buttonText={'Save Crop'}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CropModal