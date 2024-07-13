import React, { useState } from "react";
import "../style/modal.css";

import Dropdown from "../components/Admin/dropdown";

const ProductModal = ({ show, handleClose }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const [productname, setProductname] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [count, setCount] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [url1, setUrl1] = useState('');


    const data = [
        'Category 1', 'Category 2'
    ];

    const handleSelectChange = (selected) => {
        setCategory(selected);
    }

    const send = async (e) => {

        e.preventDefault();
        console.log(image1)

    }


    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex' }}>

                <div className="modal-main">

                    <div className="modalhead">
                        ADD PRODUCT
                    </div>

                    <div className="modalbody">

                        <div>
                            <label>Product Name</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='product' type="text"
                                    onChange={(e) => setProductname(e.target.value)} value={productname} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Description</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='description' type="text"
                                    onChange={(e) => setDescription(e.target.value)} value={description} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Price</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='rs.price' type="text"
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
                                <input className="modalinput" placeholder='available count' type="number"
                                    onChange={(e) => setCount(e.target.value)} value={count} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Add Images (03)</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" accept="image/*" className="modalinput"
                                    onChange={(e) => setImage1(e.target.files[0])} />
                                <input type="file" className="modalinput" />
                                <input type="file" className="modalinput" />
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

export default ProductModal;