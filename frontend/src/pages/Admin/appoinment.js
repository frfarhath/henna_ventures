import React, { Component } from 'react';
import axios from 'axios';

import "../../style/dashboard.css";
import "../../style/product.css";
import { FaCheckCircle } from "react-icons/fa";

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';
import DetailModal from '../../modals/detailsModal';
import Loading from '../../components/Admin/loading';


class Appoinment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            fetchArray: [],
            loading: true,
            artistArray: [],
            fetchArray2: [],

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
                const res = await axios.get('http://localhost:8000/api/v1/admin/getAppoinmentPackage');
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

        const fetchData2 = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/admin/getConfirmArtist');
                const resdata = await res.data;

                this.setState({
                    artistArray: resdata
                });

            } catch (error) {
                console.log('Main Error', error);
            }
        };
        fetchData2();

        const fetchData3 = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/admin/getAppoinmentIndividual');
                const resdata = await res.data;

                this.setState({
                    fetchArray2: resdata
                });

            } catch (error) {
                console.log('Main Error', error);
            }
        };
        fetchData3();
    }


    handleChange = (e, id) => {

        this.setState((prev) => ({
            fetchArray: prev.fetchArray.map((row) =>
                row._id === id ? { ...row, artist: e.target.value } : row
            )
        }))

    };

    handleChange2 = (e, id) => {

        this.setState((prev) => ({
            fetchArray2: prev.fetchArray2.map((row) =>
                row._id === id ? { ...row, artist: e.target.value } : row
            )
        }))

    };

    send = async (item) => {

        if (item.artist) {

            try {

                const postdata = {
                    "firstname": item.firstname,
                    "lastname": item.lastname,
                    "email": item.email,
                    "phone": item.phone,
                    "address": item.address,
                    "city": item.city,
                    "district": item.district,
                    "time": item.time,
                    "wedding": item.wedding,
                    "design": item.design,
                    "package_type": item.package_type,
                    "artist": item.artist,
                };

                const res = await axios.post('http://localhost:8000/api/v1/admin/addConfirmAppoinmentPackage', postdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                const resdata = await res.data;
                console.log(resdata);

                try {

                    const res = await axios.delete(`http://localhost:8000/api/v1/admin/deleteAppoinmentPackage/${item._id}`);

                    const resdata = await res.data;
                    console.log(resdata);
                    alert('Successfully ! Artist Added')
                    window.location.reload();

                } catch (error) {
                    console.log('Main Error', error);
                }


            } catch (error) {
                console.log('Main Error', error);
                alert('Failed ! Try Again')
            }

        } else {
            alert('Failed ! Please Assign Artist')
        }

    }

    send2 = async (item) => {

        if (item.artist) {

            try {

                const postdata = {
                    "firstname": item.firstname,
                    "lastname": item.lastname,
                    "email": item.email,
                    "phone": item.phone,
                    "address1": item.address1,
                    "address2": item.address2,
                    "city": item.city,
                    "district": item.district,
                    "time": item.time,
                    "wedding": item.wedding,
                    "type_mehendi": item.type_mehendi,
                    "design": item.design,
                    "mehendi_on": item.mehendi_on,
                    "mehendi_for": item.mehendi_for,
                    "artist": item.artist,
                };

                const res = await axios.post('http://localhost:8000/api/v1/admin/addConfirmAppoinmentIndividual', postdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });

                const resdata = await res.data;
                console.log(resdata);

                try {

                    const res = await axios.delete(`http://localhost:8000/api/v1/admin/deleteAppoinmentIndividual/${item._id}`);

                    const resdata = await res.data;
                    console.log(resdata);
                    alert('Successfully ! Artist Added')
                    window.location.reload();

                } catch (error) {
                    console.log('Main Error', error);
                }


            } catch (error) {
                console.log('Main Error', error);
                alert('Failed ! Try Again')
            }

        } else {
            alert('Failed ! Please Assign Artist')
        }

    }


    render() {

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

                            {!this.state.loading && (
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

                                        {this.state.fetchArray.map((item, index) => (
                                            <tr key={index}>
                                                <td>#PA0{index + 1}</td>
                                                <td>{item.firstname}</td>
                                                <td>{item.email}</td>
                                                <td>{item.district}</td>
                                                <td>{item.wedding}</td>
                                                <td style={{ fontSize: 30, textAlign: 'center', color: 'blue', padding: 0, cursor: 'pointer' }}
                                                    onClick={() => this.showModal(item)}>
                                                    ...
                                                </td>
                                                <td>
                                                    <div style={{ width: '100%' }}>
                                                        <select value={item.artist} onChange={(e) => this.handleChange(e, item._id)} className="Admin-modalinput">
                                                            <option value="">Select</option>
                                                            {this.state.artistArray.map((item, index) => (
                                                                <option key={index} value={item._id}>
                                                                    {item.fullname}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <FaCheckCircle size={22}
                                                        style={{ color: 'green', cursor: 'pointer' }}
                                                        onClick={() => this.send(item)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}

                                        {this.state.fetchArray2.map((item, index) => (
                                            <tr key={index}>
                                                <td>#IN0{index + 1}</td>
                                                <td>{item.firstname}</td>
                                                <td>{item.email}</td>
                                                <td>{item.district}</td>
                                                <td>{item.wedding}</td>
                                                <td style={{ fontSize: 30, textAlign: 'center', color: 'blue', padding: 0, cursor: 'pointer' }}
                                                    onClick={() => this.showModal(item)}>
                                                    ...
                                                </td>
                                                <td>
                                                    <div style={{ width: '100%' }}>
                                                        <select value={item.artist} onChange={(e) => this.handleChange2(e, item._id)} className="Admin-modalinput">
                                                            <option value="">Select</option>
                                                            {this.state.artistArray.map((item, index) => (
                                                                <option key={index} value={item._id}>
                                                                    {item.fullname}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <FaCheckCircle size={22}
                                                        style={{ color: 'green', cursor: 'pointer' }}
                                                        onClick={() => this.send2(item)}
                                                    />
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

                <DetailModal show={this.state.show} handleClose={this.hideModal} passing={this.state.passingArray} />

            </div>
        )

    }

};

export default Appoinment;
