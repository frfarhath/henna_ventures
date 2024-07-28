import React, { Component } from 'react';
import "../../style/dashboard.css";
import "../../style/product.css";

import { FaCheck, FaTimes } from "react-icons/fa"; // Importing the correct icons

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';

import AcceptArtist from '../../modals/acceptArtist';

class Artist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            artists: [
                { id: 1, name: "Dhana", phone: "011-7426984", email: "dhana@gmail.com", location: "Colombo", status: null }
                // You can add more initial artists here
            ]
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
                                    {this.state.artists.map(artist => (
                                        <tr key={artist.id}>
                                            <td>{artist.name}</td>
                                            <td>{artist.phone}</td>
                                            <td>{artist.email}</td>
                                            <td>{artist.location}</td>
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
                                                    onClick={() => this.showModal()}
                                                />
                                                <FaTimes
                                                    size={22}
                                                    style={{ color: 'red', cursor: 'pointer' }}
                                                    className='FaTimes'
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <AcceptArtist
                    show={this.state.show}
                    handleClose={this.hideModal}
                />


            </div>
        )
    }
}

export default Artist;
