import React, { Component } from 'react';
import axios from 'axios';

import "../../style/dashboard.css";
import "../../style/product.css";

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';

import { IoIosAddCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

import ProductModal from '../../modals/productModal';
import EditProduct from '../../modals/edit/editproduct';
import UpdateStock from '../../modals/edit/updatestock';
import Loading from '../../components/Admin/loading';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showedit: false,
            showupdate: false,
            fetchArray: [],
            loading: true,
            passingArray: {},
            searchTerm: '',
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/admin/getProduct');
            console.log('API response:', res.data); // Log the API response
            this.setState({
                fetchArray: res.data,
                loading: false
            });
        } catch (error) {
            console.log('Main Error', error);
            this.setState({ loading: false });
        }
    };

    showModal = () => this.setState({ show: true });
    hideModal = () => this.setState({ show: false });

    showEdit = (item) => this.setState({ showedit: true, passingArray: { ...item } });
    hideEdit = () => this.setState({ showedit: false });

    showUpdate = (item) => this.setState({ showupdate: true, passingArray: { ...item } });
    hideUpdate = () => this.setState({ showupdate: false });

    handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/admin/deleteProduct/${id}`);
            alert('Successfully deleted product');
            this.fetchData();
        } catch (error) {
            console.log('Delete Error', error);
            alert('Failed to delete product');
        }
    };

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    render() {
        const { loading, fetchArray, show, showedit, showupdate, passingArray, searchTerm } = this.state;

        const filteredProducts = fetchArray.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className='body' style={{ backgroundColor: '#ffffff' }}>
                <SideBar />
                <div className='content'>
                    <Head />
                    <div className='conbody'>
                        <div className='producthead'>
                            <h3 className='productheadtxt'>PRODUCTS</h3>
                        </div>

                        <div className='productadd'>
                            <div className='add'>
                                <IoIosAddCircleOutline size={22} style={{ color: 'white' }} />
                                <button className='addbtn' onClick={this.showModal}>ADD PRODUCT</button>
                            </div>
                            <div className='search'>
                                <IoSearchOutline size={22} style={{ color: 'black' }} />
                                <input 
                                    className='searchinpu' 
                                    placeholder='search by product name' 
                                    value={searchTerm}
                                    onChange={this.handleSearch}
                                />
                            </div>
                        </div>

                        <div className='producttable'>
                            {loading ? (
                                <div style={{ marginTop: '2rem' }}>
                                    <Loading />
                                </div>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>NO</th>
                                            <th>IMAGE</th>
                                            <th>PRODUCT NAME</th>
                                            <th>DESCRIPTION</th>
                                            <th>PRICE</th>
                                            <th>CATEGORY</th>
                                            <th>AVAILABLE</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProducts.map((item, index) => {
                                            const imageUrl = item.image1 || ''; // Use a default image URL if needed

                                            return (
                                                <tr key={item._id}>
                                                    <td>{index + 1}</td>
                                                    <td style={{ justifyContent: 'center', display: 'flex' }}>
                                                        <div className='productimgcard'>
                                                            {imageUrl && <img src={imageUrl} alt="" className='productimg' />}
                                                        </div>
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.category}</td>
                                                    <td>{item.count}</td>
                                                    <td>
                                                        <div style={{ display: 'flex' }} className='action'>
                                                            <FaEdit size={22} style={{ marginRight: 5 }} className='FaEdit' onClick={() => this.showEdit(item)} />
                                                            <FaCartPlus size={22} color='green' style={{ marginRight: 5 }} className='FaEdit' onClick={() => this.showUpdate(item)} />
                                                            <MdDelete size={22} className='MdDelete' onClick={() => this.handleDelete(item._id)} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

                <ProductModal show={show} handleClose={this.hideModal} />
                <EditProduct show={showedit} handleClose={this.hideEdit} passing={passingArray} />
                <UpdateStock show={showupdate} handleClose={this.hideUpdate} passing={passingArray} />
            </div>
        );
    }
}

export default Product;