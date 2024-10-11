import React, { useState } from "react";
import axios from 'axios';
import Dropdown from "../components/Admin/dropdown";
import "../style/orderModal.css";

const ProductModal = ({ show, handleClose }) => {
    const showHideClassName = show ? "fixed inset-0 z-50 overflow-auto bg-smoke-light flex" : "hidden";

    const [productname, setProductname] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [count, setCount] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);

    const data = [
        'Henna Products', 'Wedding', 'Engagement', 'Haldi', ' Birthday', 'Anniversary', ' Graduation', 'Other'
        
    ];

    const handleSelectChange = (selected) => {
        setCategory(selected);
    }

    const send = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", productname);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("count", count);
            formData.append("image1", image1);
            formData.append("image2", image2);
            formData.append("image3", image3);

            const res = await axios.post('http://localhost:8000/api/v1/admin/addProduct', formData, {
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full m-auto">
                <div className="bg-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 bg-gray-100 text-center p-2">ADD PRODUCT</h3>
                            <form onSubmit={send}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="product" value={productname} onChange={(e) => setProductname(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="rs.price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <div style={{ width: '95%' }}>
                                <Dropdown data={data} onSelectChange={handleSelectChange} />

                            </div>
                                </div>   
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Available Count</label>
                                    <input type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="available count" value={count} onChange={(e) => setCount(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Add Images (03)</label>
                                    <input type="file" accept="image/*" className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500" onChange={(e) => setImage1(e.target.files[0])} />
                                    <input type="file" accept="image/*" className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500" onChange={(e) => setImage2(e.target.files[0])} />
                                    <input type="file" accept="image/*" className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500" onChange={(e) => setImage3(e.target.files[0])} />
                                </div>
                                <div className="Admin-modalhead">
                                    <button className="Admin-modalsavebtn" onClick={send}>ADD</button>
                                    <button className="Admin-modalcancelbtn" onClick={(e) => { e.preventDefault(); handleClose(); }}>Cancel</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal