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
import Loading from '../../components/Admin/loading';

class Repository extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            showrepo: false,
            fetchArray: [],
            loading: true,
            error: null,
            retryCount: 0,
            passingArray: {
                id: null,
                name: null,
                category: null
            }
        }
    }
    
    componentDidMount() {
        this.fetchDataWithRetry();
    }

    fetchDataWithRetry = async (retryCount = 0) => {
        try {
            console.log(`Fetching data... (Attempt ${retryCount + 1})`);
            const res = await axios.get('http://localhost:8000/api/v1/admin/getrepo', {
                timeout: 10000 // 10 second timeout
            });
            console.log('Fetched data:', res.data);
            
            if (Array.isArray(res.data) && res.data.length > 0) {
                this.setState({
                    fetchArray: res.data,
                    loading: false,
                    error: null,
                    retryCount: 0
                });
            } else {
                throw new Error('No data received or empty array');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            if (retryCount < 3) {
                console.log(`Retrying... (Attempt ${retryCount + 2})`);
                this.setState({ 
                    loading: true, 
                    error: `Fetching data... (Attempt ${retryCount + 2})`,
                    retryCount: retryCount + 1
                });
                setTimeout(() => this.fetchDataWithRetry(retryCount + 1), 5000); // Wait 5 seconds before retrying
            } else {
                this.setState({ 
                    loading: false, 
                    error: `Failed to fetch data after multiple attempts. Please check your network connection and try again.`,
                    retryCount: 0
                });
            }
        }
    }

    renderImage = (item) => {
        if (!item.image) {
            console.log('No image data for item:', item.name);
            return null;
        }

        let imageUrl = '';

        if (typeof item.image === 'string') {
            imageUrl = item.image;
        } else if (item.image.data) {
            try {
                const binary = atob(item.image.data);
                const array = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) {
                    array[i] = binary.charCodeAt(i);
                }
                const blob = new Blob([array], {type: item.image.contentType || 'image/png'});
                imageUrl = URL.createObjectURL(blob);
            } catch (error) {
                console.error('Error processing image data:', error);
                return null;
            }
        }

        if (!imageUrl) {
            console.log('Failed to generate image URL for item:', item.name);
            return null;
        }

        return (
            <img 
                src={imageUrl} 
                alt={item.name} 
                className='productimg' 
                onError={(e) => {
                    console.error('Image failed to load:', imageUrl);
                    e.target.style.display = 'none';
                }}
            />
        );
    }

    showEdit = (item) => {
        this.setState({
            showrepo: true,
            passingArray: {
                id: item._id,
                name: item.name,
                category: item.category
            }
        });
    }

    handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this repository?')) {
            try {
                await axios.delete(`http://localhost:8000/api/v1/admin/deleterepo/${id}`);
                this.fetchDataWithRetry(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting repository:', error);
                alert('Failed to delete repository. Please try again.');
            }
        }
    }

    hideRepo = () => {
        this.setState({ showrepo: false });
    }
    // ... (other methods remain the same)
    showModal = () => {
        this.setState({ show: true });
    }
    
    render() {
        const { fetchArray, loading, error, show, showrepo, passingArray } = this.state;

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
                            {loading ? (
                                <div>
                                    <Loading />
                                    {error && <p>{error}</p>}
                                </div>
                            ) : error ? (
                                <div>
                                    <h3>Error: {error}</h3>
                                    <button onClick={() => this.fetchDataWithRetry()}>Retry</button>
                                </div>
                            ) : fetchArray.length > 0 ? (
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
                                        {fetchArray.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td style={{ justifyContent: 'center', display: 'flex' }}>
                                                    <div className='repoimgcard'>
                                                        {this.renderImage(item)}
                                                    </div>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.category}</td>
                                                <td>
                            <div style={{ display: 'flex', justifyContent: 'center' }} className='action'>
                                <FaEdit size={22} style={{ marginRight: 5 }} className='FaEdit' onClick={() => this.showEdit(item)} />
                                <MdDelete size={22} className='MdDelete' onClick={() => this.handleDelete(item._id)} />
                            </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No repositories found.</p>
                            )}
                        </div>
                    </div>
                </div>
                <RepositoryModal show={show} handleClose={this.hideModal} />
                <EditRepo show={showrepo} handleClose={this.hideRepo} passing={passingArray} />
            </div>
        )
    }
}

export default Repository;