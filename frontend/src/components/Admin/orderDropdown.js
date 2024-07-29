import React, {useState} from "react";
import "../style/appoinmentModal.css";

const OrderDropdown = ({ data }) => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleChange} className="modalinput" style={{backgroundColor:'green', color:'white'}}>
                {data.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    )
};

export default OrderDropdown;