import React, {useState} from "react";
import "../../style/modal.css";

import Dropdown from "../../components/Admin/dropdown";


const EditRepo = ({ show, handleClose }) => {

    const showHideClassName = show ? "Admin-modal display-block" : "Admin-modal display-none";

    const data = [
        'Category 1', 'Category 2'
    ]

    const [name, setName] = useState('Repo1');

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
                            <div style={{ width: '95%' }}>
                                <Dropdown data={data} />
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <label>Add Images</label>
                            <div style={{ width: '90%' }}>
                                <input type="file" className="Admin-modalinput" />
                            </div>
                        </div>


                    </div>

                    <div className="Admin-modalhead">
                        <button className="Admin-modalsavebtn" onClick={handleClose}>ADD</button>
                        <button className="Admin-modalcancelbtn" onClick={handleClose}>Cancel</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default EditRepo;