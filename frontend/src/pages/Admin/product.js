import React, { Component } from 'react';
import "../../style/dashboard.css";
import "../../style/product.css";

import p1 from "../../images/p1.jpg";

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

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showedit: false,
            showupdate: false,
            productArray: [
                {
                    number: 1,
                    image: p1,
                    name: 'Nail cone',
                    description: 'It is a natural Mehndi product for your beautiful nail',
                    price: 'Rs.250',
                    category: 'Mehndi product',
                    available: '10',
                },
                // ... (other products)
            ],
            passingArray: {
                number: null,
                name: null,
                description: null,
                price: null,
                available: null,
            }
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

    handleStockUpdate = (productNumber, newStock) => {
        const updatedProducts = this.state.productArray.map(product =>
            product.number === productNumber
                ? { ...product, available: newStock }
                : product
        );
        this.setState({ productArray: updatedProducts });
    }

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
                                    {this.state.productArray.map((item, index) => (
                                        <tr key={index} style={{ height: '70px' }}>
                                            <td>{item.number}</td>
                                            <td style={{ justifyContent: 'center', display: 'flex' }}>
                                                <div className='productimgcard'>
                                                    <img src={item.image} alt="" className='productimg' />
                                                </div>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td>{item.category}</td>
                                            <td>{item.available}</td>
                                            <td>
                                                <div className='action'>
                                                    <FaEdit size={22} style={{ marginRight: 5 }} className='FaEdit' onClick={() => this.showEdit(item)} />
                                                    <FaCartPlus size={22} color='green' style={{ marginRight: 5 }} className='FaEdit' onClick={() => this.showUpdate(item)} />
                                                    <MdDelete size={22} className='MdDelete' />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <ProductModal show={this.state.show} handleClose={this.hideModal} />
                <EditProduct show={this.state.showedit} handleClose={this.hideEdit} passing={this.state.passingArray} />
                <UpdateStock show={this.state.showupdate} handleClose={this.hideUpdate} passing={this.state.passingArray} onStockUpdate={this.handleStockUpdate} />
            </div>
        );
    }
}

export default Product;
