import React, { Component } from 'react';
import "../../style/dashboard.css";
import "../../style/product.css";

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';

import OrderModal from '../../modals/orderModal';
import { FaEye } from 'react-icons/fa';

import OrderDropdown from '../../components/Admin/orderDropdown';
import Loading from '../components/loading';

class Order extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            fetchArray: [],
            loading: true,

            passingArray: {}
        }

    }

    showModal = (item) => {
        this.setState({
            show: true,
            passingArray: { ...item }
        });
    }

    hideModal = () => {
        this.setState({
            show: false
        });
    }

    componentDidMount() {

        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/admin/getOrder');
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

    handleChange = async (id) => {


        try {

            const postdata = {
                "status": '1'
            };

            const res = await axios.put('http://localhost:8000/api/v1/admin/deliveryUpdate/' + id, postdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            const resdata = await res.data;
            console.log(resdata);
            alert('Successfully ! Status Update')
            window.location.reload();

        } catch (error) {
            console.log('Main Error', error);
            alert('Failed ! Status Update')
            window.location.reload();
        }

    };



    render() {

        const data = [
            { status: 0, label: 'Pending' },
            { status: 1, label: 'Delivered' }
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

                        <div className='producttable'>

                            {!this.state.loading && (
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
                                                    {item.status === '0' && (
                                                        <div style={{ width: '100%' }}>
                                                            <select value={item.status} onChange={() => this.handleChange(item._id)} className="modalinput" style={{backgroundColor:'rgb(168, 150, 19)', color:'white'}}>
                                                                {data.map((item, index) => (
                                                                    <option key={index} value={item.status}>
                                                                        {item.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}

                                                    {item.status === '1' && (
                                                        <div style={{width: '100%', justifyContent:'center', alignItems:'center', display:'flex'}}>
                                                            <div style={{ width: '70%', backgroundColor: 'green', padding: '0.2rem', color: 'white', borderRadius:'0.5rem', textAlign:'center'}}>
                                                                Delivered
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>

                                                <td>
                                                    <FaEye onClick={() => this.showModal(item)} style={{ cursor: 'pointer' }} />
                                                </td>
                                            </tr>
                                        ))}
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


                <OrderModal show={this.state.show} handleClose={this.hideModal} passing={this.state.passingArray} />

            </div>
        )
    }
};

export default Order;
