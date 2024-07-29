import React, { Component } from 'react';
import axios from 'axios';

import "../style/dashboard.css";
import "../style/product.css";

import SideBar from '../components/sidebar';
import Head from '../components/head';

import { IoIosAddCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

import ProductModal from '../modals/productModal';
import EditProduct from '../modals/edit/editproduct';
import UpdateStock from '../modals/edit/updatestock';
import Loading from '../components/loading';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showedit: false,
            showupdate: false,
            fetchArray: [],
            loading: true,

            passingArray: {}
        };
    }

    showModal = () => {
        this.setState({ show: true });
    }

    showEdit = (item) => {
        this.setState({
            showedit: true,
            passingArray: { ...item }
        });
    }

    showUpdate = (item) => {
        this.setState({
            showupdate: true,
            passingArray: { ...item }
        });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    hideEdit = () => {
        this.setState({ showedit: false });
    }

    hideUpdate = () => {
        this.setState({ showupdate: false });
    }


    componentDidMount() {

        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/admin/getProduct');
                const resdata = await res.data;

                this.setState({
                    fetchArray: resdata,
                    loading: false
                });

            } catch (error) {
                console.log('Main Error', error);
            }
        };
        fetchData();
    }

    handleDlete = async (id) => {

        try {

            const res = await axios.delete(`http://localhost:8000/api/admin/deleteProduct/${id}`);

            const resdata = await res.data;
            console.log(resdata);
            alert('Successfully ! Product Deleting')
            window.location.reload();

        } catch (error) {
            console.log('Main Error', error);
            alert('Failed ! Product Deleting')
            window.location.reload();
        }

    };


    render() {
        return (
            <div className='body'>
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
                                <input className='searchinpu' placeholder='search by product name' />
                            </div>
                        </div>


                        <div className='producttable'>

                            {!this.state.loading && (
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
                                        {this.state.fetchArray.map((item, index) => {

                                            const base64String = btoa(
                                                String.fromCharCode(...new Uint8Array(item.image1.data.data))
                                            );

                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td style={{ justifyContent: 'center', display: 'flex' }}>
                                                        <div className='productimgcard'>
                                                            <img src={`data:image/png;base64,${base64String}`} alt="" className='productimg' />
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
                                                            <MdDelete size={22} className='MdDelete' onClick={() => this.handleDlete(item._id)} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )

                                        })}
                                    </tbody>
                                </table>
                            )}

                            {this.state.loading && (
                                <div style={{ marginTop: '2rem' }}>
                                    <Loading />
                                </div>
                            )}

                        </div>

                    </div>
                </div>

                <ProductModal show={this.state.show} handleClose={this.hideModal} />
                <EditProduct show={this.state.showedit} handleClose={this.hideEdit} passing={this.state.passingArray} />
                <UpdateStock show={this.state.showupdate} handleClose={this.hideUpdate} passing={this.state.passingArray} />

            </div>
        );
    }
}

export default Product;
