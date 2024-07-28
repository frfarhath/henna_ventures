import React, { Component } from 'react';
import "../../style/dashboard.css";
import "../../style/messages.css";

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';

class DisplayMessages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [
                { id: 1, fullName: "John Doe", email: "john@example.com", message: "Hello, I need assistance with my order.", status: 'Pending' },
                { id: 2, fullName: "Jane Smith", email: "jane@example.com", message: "I would like to book an appointment.", status: 'Pending' }
                // You can add more initial messages here
            ]
        };
    }

    handleStatusChange = (id, status) => {
        this.setState(prevState => ({
            messages: prevState.messages.map(message =>
                message.id === id ? { ...message, status } : message
            )
        }));
    }

    render() {
        return (
            <div className='body'>
                <SideBar />
                <div className='content'>
                    <Head />
                    <div className='conbody'>

                        <div className='producthead'>
                            <h3 className='productheadtxt'>MESSAGES</h3>
                        </div>
                        
                        <div className='messagelist'>

                            {this.state.messages.map(message => (
                                <div key={message.id} className='messageitem'>
                                    <h4>{message.fullName}</h4>
                                    <p><strong>Email:</strong> {message.email}</p>
                                    <p><strong>Message:</strong> {message.message}</p>

                                    <div className='statusdropdown'>
                                        <button className='dropbtn'>{message.status}</button>
                                        {/* <div className='dropdown-content'>
                                            <a onClick={() => this.handleStatusChange(message.id, 'Replied')}>Replied</a>
                                            <a onClick={() => this.handleStatusChange(message.id, 'Pending')}>Pending</a>
                                            <a onClick={() => this.handleStatusChange(message.id, 'Denied')}>Denied</a>
                                        </div> */}
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayMessages;
