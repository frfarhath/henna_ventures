import React, { Component } from 'react';
import axios from 'axios';
import "../../style/dashboard.css";
import "../../style/product.css";
import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';
import StandardProductModal from '../../modals/StandardProductModal';
import CustomizedGiftBoxModal from '../../modals/CustomizedGiftBoxModal';
import { FaEye } from 'react-icons/fa';
import Loading from '../../components/Admin/loading';

class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showStandardModal: false,
            showCustomizedModal: false,
            fetchArray: [],
            loading: true,
            passingArray: {},
        };
    }

    // Show Standard Product Modal
    showStandardModal = (item) => {
        this.setState({
            showStandardModal: true,
            passingArray: { ...item },
        });
    };

    // Show Customized Gift Box Modal
    showCustomizedModal = (item) => {
        this.setState({
            showCustomizedModal: true,
            passingArray: { ...item },
        });
    };

    // Hide both Modals
    hideModals = () => {
        this.setState({
            showStandardModal: false,
            showCustomizedModal: false,
        });
    };

    // Fetch order data from API on component mount
    componentDidMount() {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/admin/getOrder');
                const resdata = await res.data;

                this.setState({
                    fetchArray: resdata,
                    loading: false,
                });
            } catch (error) {
                console.log('Main Error', error);
            }
        };
        fetchData();
    }

    // Handle order status change
// Handle order status change
handleChange = async (orderId, event) => {
    const updatedStatus = event.target.value;

    try {
        // Use backticks to wrap the URL for template literals
        await axios.put(`http://localhost:8000/api/v1/admin/updateOrderStatus/${orderId}`, { status: updatedStatus });
        this.setState((prevState) => ({
            fetchArray: prevState.fetchArray.map(order =>
                order._id === orderId ? { ...order, status: updatedStatus } : order
            ),
        }));
    } catch (error) {
        console.log('Error updating status:', error);
    }
};

    render() {
        const statusOptions = [
            { status: 0, label: 'Pending' },
            { status: 1, label: 'Delivered' },
        ];

        return (
            <div className='body'>
                <SideBar />
                <div className='content'>
                    <Head />
                    <div className='conbody'>
                        <div className='producthead'>
                            <h3 className='productheadtxt'>ORDERS</h3>
                        </div>
                        <div className='producttable'>
                            {!this.state.loading ? (
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
                                        {this.state.fetchArray.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.orderid}</td>
                                                <td>{item.date}</td>
                                                <td>{item.name}</td>
                                                <td>{item.address}</td>
                                                <td>{item.contact}</td>
                                                <td>
                                                    {item.status === '0' ? (
                                                        <select
                                                            value={item.status}
                                                            onChange={(e) => this.handleChange(item._id, e)}
                                                            className="Admin-modalinput"
                                                            style={{ backgroundColor: 'rgb(168, 150, 19)', color: 'white' }}>
                                                            {statusOptions.map((option, index) => (
                                                                <option key={index} value={option.status}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <div style={{ backgroundColor: 'green', color: 'white', borderRadius: '0.5rem', textAlign: 'center', padding: '0.2rem' }}>
                                                            Delivered
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <FaEye onClick={() => {
                                                        // Check the type and show the appropriate modal
                                                        item.productType === 'normal'
                                                            ? this.showStandardModal(item)
                                                            : this.showCustomizedModal(item);
                                                    }} style={{ cursor: 'pointer' }} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ marginTop: '2rem' }}>
                                    <Loading />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal for Standard Products */}
                <StandardProductModal
                    show={this.state.showStandardModal}
                    handleClose={this.hideModals}
                    productDetails={this.state.passingArray}
                />

                {/* Modal for Customized Gift Box */}
                <CustomizedGiftBoxModal
                    show={this.state.showCustomizedModal}
                    handleClose={this.hideModals}
                    productDetails={this.state.passingArray}
                />
            </div>
        );
    }
}

export default Order;
