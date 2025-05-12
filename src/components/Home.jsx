import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updatePaste } from '../redux/pasteSlice';
import { FaSave, FaTimes, FaLightbulb } from 'react-icons/fa';

const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const pasteId = searchParams.get("pasteId");
    const allPastes = useSelector((state) => state.paste.pastes);
    const [showTips, setShowTips] = useState(false);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.value);
            }
        }
    }, [pasteId, allPastes]);

    const createPaste = () => {
        if (!title.trim()) {
            alert("Please enter a title for your paste");
            return;
        }

        const paste = {
            title: title,
            value: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updatePaste(paste));
            alert("Paste updated successfully!");
        } else {
            dispatch(addToPaste(paste));
            alert("Paste created successfully!");
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    };

    const cancelEdit = () => {
        setTitle('');
        setValue('');
        setSearchParams({});
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white">
                                {pasteId ? "Update Your Paste" : "Create a New Paste"}
                            </h2>
                            <button 
                                onClick={() => setShowTips(!showTips)}
                                className="text-white hover:text-yellow-200 transition-colors"
                                title="Show tips"
                            >
                                <FaLightbulb size={20} />
                            </button>
                        </div>
                    </div>

                    {showTips && (
                        <div className="bg-yellow-50 p-4 border-b border-yellow-100">
                            <h3 className="font-semibold text-yellow-800 mb-2">Tips:</h3>
                            <ul className="text-sm text-yellow-700 list-disc pl-5 space-y-1">
                                <li>Give your paste a descriptive title</li>
                                <li>You can use the editor for code, notes, or any text</li>
                                <li>All pastes are saved locally in your browser</li>
                                <li>Use the Paste section to view all your saved content</li>
                            </ul>
                        </div>
                    )}

                    <div className="p-6">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input 
                                id="title"
                                type="text"
                                placeholder="Enter a descriptive title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea 
                                id="content"
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter your text or code here..."
                                value={value}
                                className="w-full p-3 border border-gray-300 rounded-lg h-64 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button 
                                onClick={createPaste}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                            >
                                <FaSave className="mr-2" />
                                {pasteId ? "Update Paste" : "Save Paste"}
                            </button>
                            
                            {pasteId && (
                                <button 
                                    onClick={cancelEdit}
                                    className="flex-1 bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
                                >
                                    <FaTimes className="mr-2" />
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;