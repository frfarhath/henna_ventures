import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../style/modal.css";

const EditRepo = ({ show, handleClose, passing }) => {

    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const data = [
        'Category 1', 'Category 2'
    ];


    useEffect(() => {

        if (passing) {
            setName(passing.name);
            setId(passing.id)
        }

    }, [passing])


    const handleChange = (event) => {
        setCategory(event.target.value);
    };


    const send = async (e) => {
        e.preventDefault();

        if (image == null) {
            alert('image required!')

        } else {

            try {

                const postdata = {
                    "name": name,
                    "category": category,
                    "repoImage": image
                };

                const res = await axios.put('http://localhost:8000/api/v1/admin/editrepo/' + id, postdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                const resdata = await res.data;
                console.log(resdata);
                alert('Successfully ! Repository Updated')
                window.location.reload();

            } catch (error) {
                console.log('Main Error', error);
                alert('Failed ! Repository Updated')
                window.location.reload();
            }

        }
    }

    const cancel = async (e) => {
        e.preventDefault();

        setImage(null);
        document.getElementById('imageInput').value = null;

        setCategory('');

        handleClose();
    }


    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>

                <div className="Admin-modal-main">

                    <div className="Admin-modalhead">
                        EDIT REPOSITORY
                    </div>

                    <div className="Admin-modalbody">

                        <div>
                            <label>Name</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='name' onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Category</label>
                            <div style={{ width: '93%' }}>
                                <select value={category} onChange={handleChange} className="Admin-modalinput">
                                    <option value="" disabled>Select </option>
                                    {data.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Add Images</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" accept="image/*" className="Admin-modalinput" id="imageInput"
                                    onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                        </div>

                    </div>

                    <div className="Admin-modalhead">
                        <button className="Admin-modalsavebtn" onClick={send}>Update</button>
                        <button className="Admin-modalcancelbtn" onClick={cancel}>Cancel</button>
                    </div>

                </div>

            </div>
        </div>
    );

};

export default EditRepo;