import React, {useState} from "react";
import "../../style/appoinmentModal.css";

const Dropdown = ({ data, onSelectChange}) => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        onSelectChange(event.target.value)
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleChange} className="modalinput">
                <option value="" disabled>Select </option>
                {data.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    )
};

export default Dropdown;