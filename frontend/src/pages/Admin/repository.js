import React, { Component } from 'react';
import axios from 'axios';

import "../../style/dashboard.css";
import "../../style/product.css";
import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import RepositoryModal from '../../modals/repositoryModal';
import EditRepo from '../../modals/edit/editrepo';


class Repository extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            showrepo: false,
            fetchArray: []
        }

    }

    showModal = () => {
        this.setState({
            show: true
        });
    }

    showRepo = () => {
        this.setState({
            showrepo: true
        });
    }


    hideModal = () => {
        this.setState({
            show: false
        });
    }

    hideRepo = () => {
        this.setState({
            showrepo: false
        });
    }

    componentDidMount() {

        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/admin/getrepo');
                const resdata = await res.data;

                this.setState({
                    fetchArray: resdata
                })

            } catch (error) {
                console.log('Main Error', error);
            }
        };
        fetchData();
    }


    render() {

        return (
            <div className='body'>

                <SideBar />

                <div className='content'>

                    <Head />

                    <div className='conbody'>

                        <div className='producthead'>
                            <h3 className='productheadtxt'>REPOSITORIES</h3>
                        </div>

                        <div className='productadd'>
                            <div className='add'>
                                <IoIosAddCircleOutline size={22} style={{ color: 'white' }} />
                                <button className='addbtn' onClick={this.showModal}>ADD REPOSITORY</button>
                            </div>
                        </div>

                        <div className='producttable'>

                            <table>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>IMAGE</th>
                                        <th>NAME</th>
                                        <th>CATEGORY</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.fetchArray.map((item, index) => {

                                        const base64String = btoa(
                                            String.fromCharCode(...new Uint8Array(item.image.data.data))
                                        );

                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td style={{ justifyContent: 'center', display: 'flex' }}>
                                                    <div className='repoimgcard'>
                                                        <img src={`data:image/png;base64,${base64String}`} alt='' className='productimg' />
                                                    </div>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.category}</td>
                                                <td>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }} className='action'>
                                                        <FaEdit size={22} style={{ marginRight: 5 }} className='FaEdit' onClick={this.showRepo} />
                                                        <MdDelete size={22} className='MdDelete' />
                                                    </div>
                                                </td>
                                            </tr>
                                        )

                                    })}
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>

                {/* Modal */}
                <RepositoryModal show={this.state.show} handleClose={this.hideModal} />
                <EditRepo show={this.state.showrepo} handleClose={this.hideRepo} />

            </div >
        )

    }

};

export default Repository;