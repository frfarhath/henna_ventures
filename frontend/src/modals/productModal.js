import React, { useState } from "react";
import axios from 'axios';
// import "../style/modal.css";

import Dropdown from "../components/Admin/dropdown";

const ProductModal = ({ show, handleClose }) => {

    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";

    const [productname, setProductname] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [count, setCount] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);


    const data = [
        'Category 1', 'Category 2'
    ];

    const handleSelectChange = (selected) => {
        setCategory(selected);
    }

    const send = async (e) => {
        e.preventDefault();

        try {

            const postdata = {
                "name": productname,
                "description": description,
                "price": price,
                "category": category,
                "count": count,
                "image1": image1,
                "image2": image2,
                "image3": image3,
            };

            const res = await axios.post('http://localhost:8000/api/admin/addProduct', postdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            const resdata = await res.data;
            console.log(resdata);
            alert('Successfully ! Product Added')
            window.location.reload();

        } catch (error) {
            console.log('Main Error', error);
            alert('Failed ! Product Added')
            window.location.reload();
        }

    }


    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex' }}>

                <div className="Admin-modal-main">

                    <div className="Admin-modalhead">
                        ADD PRODUCT
                    </div>

                    <div className="Admin-modalbody">

                        <div>
                            <label>Product Name</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='product' type="text"
                                    onChange={(e) => setProductname(e.target.value)} value={productname} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Description</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='description' type="text"
                                    onChange={(e) => setDescription(e.target.value)} value={description} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Price</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='rs.price' type="text"
                                    onChange={(e) => setPrice(e.target.value)} value={price} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Category</label>
                            <div style={{ width: '95%' }}>
                                <Dropdown data={data} onSelectChange={handleSelectChange} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Available Count</label>
                            <div style={{ width: '90%' }}>
                                <input className="Admin-modalinput" placeholder='available count' type="number"
                                    onChange={(e) => setCount(e.target.value)} value={count} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Add Images (03)</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" accept="image/*" className="Admin-modalinput"
                                    onChange={(e) => setImage1(e.target.files[0])} />
                                <input type="file" accept="image/*" className="Admin-modalinput"
                                    onChange={(e) => setImage2(e.target.files[0])} />
                                <input type="file" accept="image/*" className="Admin-modalinput"
                                    onChange={(e) => setImage3(e.target.files[0])} />
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
export default ProductModal;  
