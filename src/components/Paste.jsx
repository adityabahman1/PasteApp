import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removefromPaste } from '../redux/pasteSlice';
import { NavLink } from 'react-router-dom';
import { FaEye, FaCopy, FaEdit, FaTrashAlt, FaShareAlt } from 'react-icons/fa';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchterm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filterData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchterm.toLowerCase())
    );

    function handleDelete(pasteId) {
        const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this paste?");
        if (confirmDelete) {
            dispatch(removefromPaste(pasteId));
            alert("🗑️ Paste deleted successfully!");
        }
    }

    function handleCopy(pasteValue) {
        navigator.clipboard.writeText(pasteValue)
            .then(() => alert("📋 Text copied to clipboard!"))
            .catch(err => console.error("Error copying text: ", err));
    }

    function handleShare(pasteId) {
        const shareableLink = `${window.location.origin}/paste/${pasteId}`;
        navigator.clipboard.writeText(shareableLink)
            .then(() => alert("🔗 Share link copied to clipboard!"))
            .catch(err => console.error("Error copying link: ", err));
    }

    // Function to format the date
    function formatDate(dateString) {
        if (!dateString) return "Unknown Date";
    
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid Date";
    
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <div className="p-6">
            {/* Search Input */}
            <input
                type="text"
                value={searchterm}
                placeholder="🔍 Search pastes..."
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* List of Pastes */}
            <div className="flex flex-col gap-5 mt-5">
                {filterData.length > 0 ? (
                    filterData.map((paste) => (
                        <div key={paste?._id} className="border p-4 rounded-lg shadow-md bg-white relative">
                            {/* Paste Title & Content */}
                            <h2 className="text-lg font-semibold text-gray-800">{paste.title}</h2>
                            <p className="text-gray-600">{paste.value}</p>

                            {/* Buttons aligned to the top-right */}
                            <div className="absolute top-2 right-2 flex gap-3">
                                <NavLink
                                    to={`/paste/${paste?._id}`}
                                    className="p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
                                    title="View Paste"
                                >
                                    <FaEye />
                                </NavLink>
                                <button
                                    onClick={() => handleCopy(paste?.value)}
                                    className="p-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700"
                                    title="Copy Paste Content"
                                >
                                    <FaCopy />
                                </button>
                                <NavLink
                                    to={`/?pasteId=${paste?._id}`}
                                    className="p-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600"
                                    title="Edit Paste"
                                >
                                    <FaEdit />
                                </NavLink>
                                <button
                                    onClick={() => handleDelete(paste?._id)}
                                    className="p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                                    title="Delete Paste"
                                >
                                    <FaTrashAlt />
                                </button>
                                <button
                                    onClick={() => handleShare(paste?._id)}
                                    className="p-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
                                    title="Share Paste Link"
                                >
                                    <FaShareAlt />
                                </button>
                            </div>

                            {/* Formatted Date below buttons */}
                            <p className="text-sm text-gray-500 absolute bottom-2 right-2">{formatDate(paste.createdAt)}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No pastes found!</p>
                )}
            </div>
        </div>
    );
};

export default Paste;
