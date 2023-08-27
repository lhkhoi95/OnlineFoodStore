
export const RemoveModal = ({ onConfirm, onCancel }: { onConfirm: any, onCancel: any }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-4 rounded shadow-lg m-auto mt-32 max-w-md">
                <h3>Are you sure you want to remove this item?</h3>
                <div className="flex justify-end mt-4">
                    <button
                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded mr-2"
                        onClick={onConfirm}>
                        Confirm
                    </button>
                    <button
                        className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded"
                        onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}