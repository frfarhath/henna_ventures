import React, { Component } from 'react';
import "../../style/dashboard.css";
import "../../style/product.css";

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';

import OrderModal from '../../modals/orderModal';
import { FaEye } from 'react-icons/fa';

import OrderDropdown from '../../components/Admin/orderDropdown';

class Order extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            selectedOrder: null
        }

    }

    showModal = (order) => {
        this.setState({
            show: true,
            selectedOrder: order
        });
    }

    hideModal = () => {
        this.setState({
            show: false,
            selectedOrder: null
        });
    }

    render() {
        const orders = [
            {
                id: '#55523',
                date: '26/05/2024',
                name: 'Stella',
                address: '123 Main St, Colombo-04',
                contact: '011-78293647',
                product: 'Shirt',
                items: 14,
                price: 'Rs.1400',
                customized: 'None',
                status: 'Delivered'
            },
            // Add more orders as needed
        ];

        const data = [
            'Delivered', 'Pending'
        ]

        return (
            <div className='body'>

                <SideBar />

                <div className='content'>

                    <Head />

                    <div className='conbody'>

                        <div className='producthead'>
                            <h3 className='productheadtxt'>ORDERS</h3>
                        </div>

                        <div className='ordertable'>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Customer Name</th>
                                        <th>Address</th>
                                        <th>Contact</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={index} className='orderRow'>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.name}</td>
                                            <td>{order.address}</td>
                                            <td>{order.contact}</td>
                                            <td>
                                                <div style={{ width: '100%'}}>
                                                    <OrderDropdown data={data} />
                                                </div>
                                            </td>
                                            <td>
                                                <FaEye onClick={() => this.showModal(order)} style={{ cursor: 'pointer' }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>

                {/* Modal */}
                {this.state.selectedOrder && (
                    <OrderModal
                        show={this.state.show}
                        handleClose={this.hideModal}
                        order={this.state.selectedOrder}
                    />
                )}
            </div>
        )
    }
};

export default Order;