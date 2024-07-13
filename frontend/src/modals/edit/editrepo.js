import React, {useState} from "react";
import "../../style/modal.css";

import Dropdown from "../../components/Admin/dropdown";


const EditRepo = ({ show, handleClose }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const data = [
        'Category 1', 'Category 2'
    ]

    const [name, setName] = useState('Repo1');

    return (
        <div className={showHideClassName}>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '3%' }}>

                <div className="modal-main">

                    <div className="modalhead">
                        EDIT REPOSITORY
                    </div>

                    <div className="modalbody">

                        <div>
                            <label>Name</label>
                            <div style={{ width: '90%' }}>
                                <input className="modalinput" placeholder='name' onChange={(e) => setName(e.target.value)} value={name} />
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

export default EditRepo;