import React, { useState } from "react";
import axios from 'axios';
import "../style/modal.css";

import Dropdown from "../components/Admin/dropdown";

const RepositoryModal = ({ show, handleClose }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const data = [
        'Category 1', 'Category 2'
    ]

    const handleSelectChange = (selected) => {
        setCategory(selected);
    }

    const send = async (e) => {

        e.preventDefault();

        try {

            const postdata = {
                "name": name,
                "category": category,
                "repoImage": image
            };

            const res = await axios.post('http://localhost:8000/api/admin/repoupload', postdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            const resdata = await res.data;
            console.log(resdata);
            alert('Successfully ! Repository Added')
            window.location.reload();

        } catch (error) {
            console.log('Main Error', error);
            alert('Failed ! Repository Added')
            window.location.reload();
        }

    }

    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>

                <div className="modal-main">

                    <div className="modalhead">
                        ADD REPOSITORY
                    </div>

                    <div className="modalbody">

                        <div>
                            <label>Name</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='name' type="text"
                                    onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Category</label>
                            <div style={{ width: '95%' }}>
                                <Dropdown data={data} onSelectChange={handleSelectChange} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Add Images</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" accept="image/*" className="modalinput"
                                    onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                        </div>


                    </div>

                    <div className="modalhead">
                        <button className="modalsavebtn" onClick={send}>ADD</button>
                        <button className="modalcancelbtn" onClick={handleClose}>Cancel</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default RepositoryModal;