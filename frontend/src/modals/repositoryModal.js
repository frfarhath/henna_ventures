import React, { useState, useCallback } from "react";
import axios from 'axios';
import "../style/modal.css";

const RepositoryModal = ({ show, handleClose }) => {
    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";

    const [name, setName] = useState('');
    const [category, setCategory] = useState('Indian');
    const [image, setImage] = useState(null);

    const data = [
        'Indian', 'Pakistani', 'Arabic', 'Indo-Arabic', 'African', 'Moroccan', 'Western', 'Indo-Western'
    ];

    const handleSelectChange = useCallback((selected) => {
        console.log('Selected category:', selected);
        setCategory(selected);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('File selected:', file);

        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (jpeg, png, gif)');
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('File size exceeds 5MB. Please upload a smaller file.');
            return;
        }

        setImage(file);
    };

    const send = async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("repoImage", image);

        try {
            const res = await axios.post('http://localhost:8000/api/v1/admin/repoupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            console.log('Response:', res.data);
            alert('Successfully! Repository Added');

            setName('');
            setCategory('');
            setImage(null);
            handleClose();
        } catch (error) {
            console.log('Error:', error);
            alert('Failed! Repository Not Added');
        }
    };

    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>
                <div className="Admin-modal-main">
                    <div className="Admin-modalhead">ADD REPOSITORY</div>

                    <div className="Admin-modalbody">
                        <div>
                            <label>Name</label>
                            <div style={{ width: '90%' }}>
                                <input
                                    className="Admin-modalinput"
                                    placeholder='name'
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Category</label>
                            <div style={{ width: '95%' }}>

                                <select onChange={(e) => setCategory(e.target.value)} value={category}>
                                    {data.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Add Images</label>
                            <div style={{ width: '90%' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="Admin-modalinput"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="Admin-modalhead">
                        <button className="Admin-modalsavebtn" onClick={send}>ADD</button>
                        <button className="Admin-modalcancelbtn" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepositoryModal;
