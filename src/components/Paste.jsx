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

    const handleDelete = (pasteId) => {
        if (window.confirm("⚠️ Are you sure you want to delete this paste?")) {
            dispatch(removefromPaste(pasteId));
            alert("🗑️ Paste deleted successfully!");
        }
    };

    const handleCopy = (pasteValue) => {
        navigator.clipboard.writeText(pasteValue)
            .then(() => alert("📋 Text copied to clipboard!"))
            .catch(err => console.error("Error copying text:", err));
    };

    const handleShare = (pasteId) => {
        const shareableLink = `${window.location.origin}/paste/${pasteId}`;
        navigator.clipboard.writeText(shareableLink)
            .then(() => alert("🔗 Share link copied to clipboard!"))
            .catch(err => console.error("Error copying link:", err));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown Date";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid Date";
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <input
                type="text"
                value={searchterm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="🔍 Search pastes..."
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {filterData.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filterData.map((paste) => (
                        <div
                            key={paste._id}
                            className="relative bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <div className="mb-3">
                                <h2 className="text-lg font-semibold text-gray-800 truncate">{paste.title}</h2>
                                <p className="text-gray-600 mt-2 line-clamp-3">{paste.value}</p>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm text-gray-400">{formatDate(paste.createdAt)}</span>

                                <div className="flex gap-2">
                                    <NavLink
                                        to={`/paste/${paste._id}`}
                                        className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                                        title="View Paste"
                                    >
                                        <FaEye />
                                    </NavLink>
                                    <button
                                        onClick={() => handleCopy(paste.value)}
                                        className="p-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
                                        title="Copy Content"
                                    >
                                        <FaCopy />
                                    </button>
                                    <NavLink
                                        to={`/?pasteId=${paste._id}`}
                                        className="p-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
                                        title="Edit Paste"
                                    >
                                        <FaEdit />
                                    </NavLink>
                                    <button
                                        onClick={() => handleDelete(paste._id)}
                                        className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                                        title="Delete Paste"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                    <button
                                        onClick={() => handleShare(paste._id)}
                                        className="p-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
                                        title="Share Paste Link"
                                    >
                                        <FaShareAlt />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center mt-10 text-lg">No pastes found!</p>
            )}
        </div>
    );
};

export default Paste;
