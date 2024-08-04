import React, { Component } from 'react';
import axios from 'axios';
import "../../style/dashboard.css";
import "../../style/messages.css";

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';
import Loading from '../../components/Admin/loading';

class DisplayMessages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchArray: [],
            loading: true,
        };
    }

    componentDidMount() {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/admin/getMessage');
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

    handleChange = async (e, id) => {
        const newStatus = e.target.value;

        try {
            const postdata = { "status": newStatus };

            const res = await axios.put(`http://localhost:8000/api/v1/admin/messageStatusUpdate/${id}`, postdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            const resdata = await res.data;
            console.log(resdata);
            alert('Successfully! Status Update');
            window.location.reload();
        } catch (error) {
            console.log('Main Error', error);
            alert('Failed! Status Update');
            window.location.reload();
        }
    };

    handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/admin/deleteMessage/${id}`);

            const resdata = await res.data;
            console.log(resdata);
            alert('Successfully! Message Deleting');
            window.location.reload();
        } catch (error) {
            console.log('Main Error', error);
            alert('Failed! Message Deleting');
        }
    };

    render() {
        const data = [
            { status: 0, label: 'Pending' },
            { status: 1, label: 'Replied' },
            { status: 2, label: 'Denied' },
        ];

        return (
            <div className='body'>
                <SideBar />
                <div className='content'>
                    <Head />
                    <div className='conbody'>
                        <div className='producthead'>
                            <h3 className='productheadtxt'>MESSAGES</h3>
                        </div>

                        {!this.state.loading && (
                            <div className='messagelist'>
                                {this.state.fetchArray.map((item, index) => (
                                    <div key={index}>
                                        {item.status !== 2 && (
                                            <div className='messageitem'>
                                                <h4>{item.fullName}</h4>
                                                <p><strong>Email:</strong> {item.email}</p>
                                                <p><strong>Message:</strong> {item.message}</p>

                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ width: '10%' }}>
                                                        {item.status === 0 && (
                                                            <div style={{ width: '100%' }}>
                                                                <select value={item.status} onChange={(e) => this.handleChange(e, item._id)} className="Admin-modalinput" style={{ backgroundColor: 'rgb(168, 150, 19)', color: 'white' }}>
                                                                    {data.map((statusItem, index) => (
                                                                        <option key={index} value={statusItem.status}>
                                                                            {statusItem.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}
                                                        {item.status === 1 && (
                                                            <div style={{
                                                                width: '100%', backgroundColor: 'green', padding: '0.2rem',
                                                                color: 'white', borderRadius: '0.5rem', textAlign: 'center', marginTop: '0.5rem'
                                                            }}>
                                                                Replied
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div style={{
                                                        width: '10%', backgroundColor: 'red',
                                                        color: 'white', borderRadius: '0.5rem', display: 'flex',
                                                        marginLeft: '1rem', marginTop: '0.5rem', alignItems: 'center', justifyContent: 'center',
                                                        cursor: 'pointer'
                                                    }}
                                                        onClick={() => this.handleDelete(item._id)}>
                                                        <p style={{ margin: 0 }}>Delete</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {this.state.loading && (
                            <div style={{ marginTop: '2rem' }}>
                                <Loading />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayMessages;
