import React, { Component } from 'react';
import "../../style/dashboard.css";
import "../../style/rating.css";
import { BarChart } from '@mui/x-charts/BarChart';

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';

import StarRating from '../../components/Admin/starrating';
import FetchStar from '../../components/Admin/fetchstar';
import { MdDelete } from 'react-icons/md';
import Loading from '../components/loading';


class Review extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetchArray: [],
            loading: true,
            StarsTotalArray: [],
            highStarLabel: 0
        }
    }

    componentDidMount() {

        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/admin/getReview');
                const resdata = await res.data;

                const subArray = [];
                resdata.map((item) => {
                    subArray.push({
                        ...item,
                        'rating': parseInt(item.rate, 10)
                    })
                });

                const star1Array = [];
                const star2Array = [];
                const star3Array = [];
                const star4Array = [];
                const star5Array = [];

                subArray.map((item) => {
                    if (item.rate === '5') {
                        star5Array.push(item)
                    }
                    if (item.rate === '4') {
                        star4Array.push(item)
                    }
                    if (item.rate === '3') {
                        star3Array.push(item)
                    }
                    if (item.rate === '2') {
                        star2Array.push(item)
                    }
                    if (item.rate === '1') {
                        star1Array.push(item)
                    }
                })

                const totArray = [
                    {
                        value: star5Array.length,
                        label: '5',
                    },
                    {
                        value: star4Array.length,
                        label: '4',
                    },
                    {
                        value: star3Array.length,
                        label: '3',
                    },
                    {
                        value: star2Array.length,
                        label: '2',
                    },
                    {
                        value: star1Array.length,
                        label: '1',
                    },
                ]

                this.setState({
                    StarsTotalArray: totArray
                });

                const highestStar = totArray.reduce((prev, current) =>
                    prev.value > current.value ? prev : current
                );

                const highstar = parseInt(highestStar.label, 10)

                this.setState({
                    fetchArray: subArray,
                    loading: false,
                    highStarLabel: highstar
                });

            } catch (error) {
                console.log('Main Error', error);
            }
        };
        fetchData();

    }

    handleDlete = async (id) => {

        try {

            const res = await axios.delete(`http://localhost:8000/api/v1/admin/deleteReview/${id}`);

            const resdata = await res.data;
            console.log(resdata);
            alert('Successfully ! Review Deleting')
            window.location.reload();

        } catch (error) {
            console.log('Main Error', error);
            alert('Failed ! Review Deleting')
            window.location.reload();
        }

    };


    render() {

        const chartSetting = {
            width: 350,
            height: 125,
        };


        return (
            <div className='body'>

                <SideBar />

                <div className='content'>

                    <Head />

                    <div className='conbody'>

                        {!this.state.loading && (
                            <div>
                                <div className='producthead'>
                                    <h3 className='productheadtxt'>RATE & REVIEWS</h3>
                                </div>

                                <div className='row1'>

                                    <div className='cardrating'>

                                        <div className='rateitem1'>
                                            <h1 className='ratetxt1'>{this.state.highStarLabel}</h1>
                                            <div className="flex items-center">
                                                {[...Array(this.state.highStarLabel)].map((index) => (
                                                    <FaStar
                                                        key={index}
                                                        style={{ color: 'rgb(215, 184, 4)' }}
                                                        size={30}
                                                    />
                                                ))}
                                                {[...Array(5 - this.state.highStarLabel)].map((index) => (
                                                    <FaStar
                                                        key={index}
                                                        style={{ color: 'rgb(158, 157, 157)' }}
                                                        size={30}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className='rateitem2'>
                                            <BarChart
                                                dataset={this.state.StarsTotalArray}
                                                yAxis={[{ scaleType: 'band', dataKey: 'label' }]}
                                                series={[{
                                                    dataKey: 'value',
                                                    color: ['#ff7c43']
                                                }]}
                                                layout="horizontal"
                                                grid={{ vertical: true }}
                                                {...chartSetting}
                                                margin={{ top: 5, bottom: 30, left: 15, right: 20 }}
                                            />
                                        </div>

                                    </div>

                                    <div className='card'>
                                        <div className='ratecount'>
                                            <h4 className='ratecounttxt'>Total Reviews and Rate</h4>
                                        </div>
                                        <div className='ratecount2'>
                                            <h1 className='ratecounttxt'>{this.state.fetchArray.length}</h1>
                                        </div>
                                    </div>

                                </div>

                                <div className='rownew' style={{ marginTop: '2rem' }}>
                                    <div className='reviewcard'>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>DATE</th>
                                                    <th>REVIEW</th>
                                                    <th>ARTIST</th>
                                                    <th>RATING</th>
                                                    <th>REMOVE</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {this.state.fetchArray.map((item, index) => (

                                                    <tr key={index}>
                                                        <td>{item.date}</td>
                                                        <td>{item.review}</td>
                                                        <td>{item.artist}</td>

                                                        <td>
                                                            <div className="flex items-center">
                                                                {[...Array(item.rating)].map((star, index) => (
                                                                    <FaStar
                                                                        key={index}
                                                                        style={{ color: 'rgb(215, 184, 4)' }}
                                                                        size={23}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div style={{ display: 'flex', justifyContent: 'center' }} className='action'>
                                                                <MdDelete size={22} className='MdDelete' onClick={() => this.handleDlete(item._id)} />
                                                            </div>
                                                        </td>
                                                    </tr>

                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
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
        )

    }


};

export default Review;
