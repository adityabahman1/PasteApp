import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
    const { id } = useParams();
    const allpastes = useSelector((state) => state.paste.pastes);

    // State for title and value
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');

    // Find the paste with the given id
    useEffect(() => {
        const paste = allpastes.find((p) => p._id === id);
        if (paste) {
            setTitle(paste.title);
            setValue(paste.value);
        }
    }, [id, allpastes]);

    return (
        <div className="p-6 flex flex-col gap-4">
            <input
                type="text"
                placeholder="Enter your title"
                value={title}
                className="p-2 border rounded-md w-full"
                readOnly
            />

            <textarea
                name="textfield"
                placeholder="Enter the text"
                value={value}
                className="p-2 border rounded-md w-full h-40"
                readOnly
            />
        </div>
    );
};

export default ViewPaste;
