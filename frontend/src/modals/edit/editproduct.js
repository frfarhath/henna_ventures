import React, {useState, useEffect} from "react";
import "../../style/modal.css";

import Dropdown from "../../components/Admin/dropdown";

const EditProduct = ({ show, handleClose, passing }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const data = [
        'Category 1', 'Category 2'
    ];

    const [pname, setPname] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [available, setAvailable] = useState('');

    useEffect(() => {
        
        if(passing){
            setPname(passing.name);
            setDescription(passing.description);
            setPrice(passing.price);
            setAvailable(passing.available);

        }

    }, [passing])

    

    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex'}}>

                <div className="modal-main">

                    <div className="modalhead">
                        EDIT PRODUCT
                    </div>

                    <div className="modalbody">

                        <div>
                            <label>PRODUCT</label>
                            <div style={{ width: '90%' }}>
                                <input type="text" className="modalinput" placeholder='product' onChange={(e) => setPname(e.target.value)} value={pname}/>
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Description</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='description' onChange={(e) => setDescription(e.target.value)} value={description} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Price</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='rs.price' onChange={(e) => setPrice(e.target.value)} value={price} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Category</label>
                            <div style={{ width: '95%' }}>
                                <Dropdown data={data} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Available Count</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='available count' onChange={(e) => setAvailable(e.target.value)} value={available} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Add Images (03)</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" className="modalinput" />
                                <input type="file" className="modalinput" />
                                <input type="file" className="modalinput" />
                            </div>
                        </div>


                    </div>

                    <div className="modalhead">
                        <button className="modalsavebtn" onClick={handleClose}>ADD</button>
                        <button className="modalcancelbtn" onClick={handleClose}>Cancel</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default EditProduct;