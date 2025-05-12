import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { FaCopy, FaEdit, FaArrowLeft } from 'react-icons/fa';

const ViewPaste = () => {
    const { id } = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);

    // State for paste data
    const [paste, setPaste] = useState({
        title: '',
        value: '',
        createdAt: ''
    });
    const [copySuccess, setCopySuccess] = useState(false);

    // Find the paste with the given id
    useEffect(() => {
        const foundPaste = allPastes.find((p) => p._id === id);
        if (foundPaste) {
            setPaste(foundPaste);
        }
    }, [id, allPastes]);

    // Function to format the date
    function formatDate(dateString) {
        if (!dateString) return "Unknown Date";
    
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid Date";
    
        const options = { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }

    // Handle copying paste content
    const handleCopy = () => {
        navigator.clipboard.writeText(paste.value)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch(err => console.error("Error copying text: ", err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header section with navigation and actions */}
            <div className="flex justify-between items-center mb-6">
                <NavLink 
                    to="/Paste" 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                >
                    <FaArrowLeft className="mr-2" /> Back to Pastes
                </NavLink>
                
                <div className="flex space-x-3">
                    <button
                        onClick={handleCopy}
                        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 transition-colors"
                    >
                        <FaCopy className="mr-2" /> {copySuccess ? "Copied!" : "Copy"}
                    </button>
                    
                    <NavLink
                        to={`/?pasteId=${id}`}
                        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition-colors"
                    >
                        <FaEdit className="mr-2" /> Edit
                    </NavLink>
                </div>
            </div>

            {/* Paste content card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Title bar */}
                <div className="bg-blue-600 p-4 text-white">
                    <h1 className="text-xl font-semibold">{paste.title || "Untitled Paste"}</h1>
                    <p className="text-sm opacity-80">Created: {formatDate(paste.createdAt)}</p>
                </div>
                
                {/* Content area */}
                <div className="p-6">
                    <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md border border-gray-200 min-h-[300px] font-mono text-gray-800">
                        {paste.value || "No content available"}
                    </pre>
                </div>
            </div>

            {/* Metadata section */}
            <div className="mt-6 text-gray-600 text-sm">
                <p>Paste ID: {id}</p>
            </div>
        </div>
    );
};

export default ViewPaste;