import React, { Component } from 'react';
import axios from 'axios';
import "../../style/dashboard.css";
import "../../style/product.css";
import { FaCheck, FaTimes } from "react-icons/fa";

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';
import AcceptArtist from '../../modals/acceptArtist';
import Loading from '../../components/Admin/loading';

class Artist extends Component {

    constructor(props) {
        super(props);

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
                const res = await axios.get('http://localhost:8000/api/v1/admin/getArtist');
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

            const res = await axios.delete(`http://localhost:8000/api/v1/admin/deleteArtist/${id}`);

            const resdata = await res.data;
            console.log(resdata);
            alert('Successfully !')
            window.location.reload();

        } catch (error) {
            console.log('Main Error', error);
            alert('Failed !')
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
                            <h3 className='productheadtxt'>ARTISTS</h3>
                        </div>
                        <div className='producttable'>

                            {!this.state.loading && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>FULLNAME</th>
                                            <th>PHONE</th>
                                            <th>EMAIL</th>
                                            <th>LOCATION</th>
                                            <th>PREVIOUS WORK</th>
                                            <th>E-CERTIFICATE</th>
                                            <th>ACTIONS</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {this.state.fetchArray.map((item, index) => (

                                            <tr key={index}>
                                                <td>{item.full_name}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                                <td>{item.location}</td>
                                                <td style={{ textAlign: 'center', color: 'blue', padding: 0 }}>
                                                    Download
                                                </td>
                                                <td style={{ textAlign: 'center', color: 'blue', padding: 0 }}>
                                                    Download
                                                </td>
                                                <td style={{ justifyContent: 'center', display: 'flex' }}>
                                                    <FaCheck
                                                        size={22}
                                                        style={{ marginRight: 5, color: 'green', cursor: 'pointer' }}
                                                        className='FaCheck'
                                                        onClick={() => this.showModal(item)}
                                                    />
                                                    <FaTimes
                                                        size={22}
                                                        style={{ color: 'red', cursor: 'pointer' }}
                                                        className='FaTimes'
                                                        onClick={() => this.handleDlete(item._id)}
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

                <AcceptArtist show={this.state.show} handleClose={this.hideModal} passing={this.state.passingArray} />

            </div>
        )

    }
}

export default Artist;
