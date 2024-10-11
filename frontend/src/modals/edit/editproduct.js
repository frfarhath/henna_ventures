import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../style/modal.css";

const EditProduct = ({ show, handleClose, passing }) => {

    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";

    const [id, setId] = useState('');
    const [pname, setPname] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [available, setAvailable] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);

    const data = [
        'Henna Products', 'Wedding', 'Engagement', 'Haldi', ' Birthday', 'Anniversary', ' Graduation', 'Other'
    ];


    useEffect(() => {

        if (passing) {
            setId(passing._id);
            setPname(passing.name);
            setDescription(passing.description);
            setPrice(passing.price);
            setAvailable(passing.count);
        }

    }, [passing])

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const send = async (e) => {
        e.preventDefault();

        if (image1 == null || image2 == null || image3 == null) {

            alert('3 images required!')

        } else {

            try {

                const postdata = {
                    "name": pname,
                    "description": description,
                    "price": price,
                    "category": category,
                    "count": available,
                    "image1": image1,
                    "image2": image2,
                    "image3": image3,
                };

                const res = await axios.put('http://localhost:8000/api/v1/admin/editProduct/' + id, postdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                const resdata = await res.data;
                console.log(resdata);
                alert('Successfully ! Product Updated')
                window.location.reload();

            } catch (error) {
                console.log('Main Error', error);
                alert('Failed ! Product Updated')
                window.location.reload();
            }

        }

    }

    const cancel = async (e) => {
        e.preventDefault();

        setImage1(null);
        setImage2(null);
        setImage3(null);
        document.getElementById('imageInput1').value = null;
        document.getElementById('imageInput2').value = null;
        document.getElementById('imageInput3').value = null;

        setCategory('');

        handleClose();
    }


    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex' }}>

                <div className="Admin-modal-main">

                    <div className="Admin-modalhead">
                        EDIT PRODUCT
                    </div>

                    <div className="Admin-modalbody">

                        <div>
                            <label>PRODUCT</label>
                            <div style={{ width: '90%' }}>
                                <input type="text" className="Admin-modalinput" placeholder='product' onChange={(e) => setPname(e.target.value)} value={pname} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Description</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='description' onChange={(e) => setDescription(e.target.value)} value={description} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Price</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='rs.price' onChange={(e) => setPrice(e.target.value)} value={price} />
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
                            <label>Available Count</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='available count' onChange={(e) => setAvailable(e.target.value)} value={available} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Add Images (03)</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" accept="image/*" className="Admin-modalinput" id="imageInput1"
                                    onChange={(e) => setImage1(e.target.files[0])} />
                                <input type="file" accept="image/*" className="Admin-modalinput" id="imageInput2"
                                    onChange={(e) => setImage2(e.target.files[0])} />
                                <input type="file" accept="image/*" className="Admin-modalinput" id="imageInput3"
                                    onChange={(e) => setImage3(e.target.files[0])} />
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

export default EditProduct;