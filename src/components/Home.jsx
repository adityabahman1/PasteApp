import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updatePaste } from '../redux/pasteSlice.js';



const Home = () => {
    const [title, settitle] = useState("");

    const [searchparams, setsearchparams] = useSearchParams();
    const [value, setvalue] = useState("");
    const dispatch = useDispatch();
    const pasteId = searchparams.get("pasteId");
    const allpastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allpastes.find((p) =>
            p._id === pasteId );
            settitle(paste.title);
            setvalue(paste.value);
        }
    },[pasteId])

    const createPaste = () => {
        const paste = {
            title: title,
            value: value,
            _id: pasteId ||
                Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) {
            dispatch(updatePaste(paste));
        }
        else {
            dispatch(addToPaste(paste));
        }

        settitle('');
        setvalue('');
        setsearchparams({});
    }
    return (
        <div className="flex items-center justify-center h-screen bg-secondary">
            <div className="bg-white shadow-md rounded-lg p-6 w-96">
                <h2 className="text-xl font-semibold text-primary text-center mb-4">
                    {pasteId ? "Update Your Paste" : "Create a New Paste"}
                </h2>

                <input 
                    type="text"
                    placeholder="Enter your title"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    className="w-full p-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <textarea 
                    name="textfield"
                    onChange={(e) => setvalue(e.target.value)}
                    placeholder="Enter the text"
                    value={value}
                    className="w-full p-2 mt-3 border border-primary rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <button 
                    onClick={createPaste}
                    className="w-full mt-4 bg-primary text-white font-semibold py-2 rounded-md hover:bg-opacity-90 transition duration-300"
                >
                    {pasteId ? "Update Paste" : "Create Paste"}
                </button>
            </div>
        </div>
    );
}

export default Home