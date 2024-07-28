import React, { Component } from 'react';
import "../../style/dashboard.css";
import "../../style/product.css";

import { FaCheckCircle } from "react-icons/fa";

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';

import Dropdown from '../../components/Admin/dropdown';
import DetailModal from '../../modals/detailsModal';

// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import icons

class Appoinment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            // status: 'accepted', // Initially accepted, can be 'assigned', 'declined'
        }

    }

    showModal = () => {
        this.setState({
            show: true
        });
    }

    hideModal = () => {
        this.setState({
            show: false
        });
    }

    handleAssign = () => {
        // Logic to handle assign action
        this.setState({ status: 'assigned' });
    }

    handleDecline = () => {
        // Logic to handle decline action
        this.setState({ status: 'declined' });
    }

    render() {

        const data = [
            'Sama', 'Kumari', 'Kavitha'
        ]

        // const { status } = this.state;

        return (
            <div className='body'>

                <SideBar />

                <div className='content'>

                    <Head />

                    <div className='conbody'>

                        <div className='producthead'>
                            <h3 className='productheadtxt'>APPOINTMENTS</h3>
                        </div>

                        <div className='producttable'>

                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>DISTRICT</th>
                                        <th>APPOINTMENT DATE</th>
                                        <th>DETAILS</th>
                                        <th>ARTIST</th>
                                        <th>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>#01</td>
                                        <td>Malini</td>
                                        <td>malini@gmail.com</td>
                                        <td>Colombo</td>
                                        <td>01/01/2024</td>
                                        <td style={{ fontSize: 30, textAlign: 'center', color: 'blue', padding: 0, cursor: 'pointer' }} onClick={this.showModal}>
                                            ...
                                        </td>
                                        <td>
                                            <div style={{ width: '100%' }}>
                                                <Dropdown data={data} />
                                            </div>
                                        </td>
                                        <td>
                                            <FaCheckCircle size={22}
                                                style={{ color: 'green', cursor: 'pointer' }}
                                            />
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>

                <DetailModal show={this.state.show} handleClose={this.hideModal} />

            </div>
        )

    }

};

export default Appoinment;
