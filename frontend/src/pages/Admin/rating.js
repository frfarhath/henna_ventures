import React, { Component } from 'react';
import "../../style/dashboard.css";
import "../../style/rating.css";
import { BarChart } from '@mui/x-charts/BarChart';

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';

import StarRating from '../../components/Admin/starrating';
import FetchStar from '../../components/Admin/fetchstar';
import { MdDelete } from 'react-icons/md';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            reviews: [
                {
                    date: '03/04/2023',
                    review: 'AWESOME...',
                    rating: 5,
                    artist: 'John Doe'
                },
                {
                    date: '04/04/2023',
                    review: 'Amazing experience!',
                    rating: 4,
                    artist: 'Jane Smith'
                },
                {
                    date: '05/04/2023',
                    review: 'Could be better.',
                    rating: 3,
                    artist: 'John Doe'
                }
            ]
        };
    }

    handleSearch = (event) => {
        this.setState({ searchQuery: event.target.value });
    }

    handleRemove = (index) => {
        this.setState(prevState => {
            const reviews = [...prevState.reviews];
            reviews.splice(index, 1);
            return { reviews };
        });
    }

    render() {
        const { searchQuery, reviews } = this.state;

        const filteredReviews = reviews.filter(review =>
            review.artist.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const chartSetting = {
            width: 350,
            height: 150,
        };

        const dataset = [
            {
                seoul: 99,
                month: '5',
            },
            {
                seoul: 144,
                month: '4',
            },
            {
                seoul: 319,
                month: '3',
            },
            {
                seoul: 249,
                month: '2',
            },
            {
                seoul: 131,
                month: '1',
            },
        ];

        return (
            <div className='body'>

                <SideBar />

                <div className='content'>

                    <Head />

                    <div className='conbody'>

                        <div className='producthead'>
                            <h3 className='productheadtxt'>RATE & REVIEWS</h3>
                        </div>

                        <div className='row1'>

                            <div className='cardrating'>

                                <div className='rateitem1'>
                                    <h1 className='ratetxt1'>4.6</h1>
                                    <StarRating totalStars={5} />
                                </div>

                                <div className='rateitem2'>
                                    <BarChart
                                        dataset={dataset}
                                        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                                        series={[{
                                            dataKey: 'seoul',
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
                                    <h1 className='ratecounttxt'>125</h1>
                                </div>
                            </div>

                        </div>

                        <div className='review-search-bar'>
                            <input
                                type='text'
                                placeholder='Search by artist name...'
                                value={searchQuery}
                                onChange={this.handleSearch}
                                className='review-search-input'
                            />
                        </div>

                        <div className='rownew'>

                            <div className='reviewcard'>

                                <table className='review-table'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '10%' }}>DATE</th>
                                            <th style={{ width: '30%' }}>REVIEW</th>
                                            <th style={{ width: '30%' }}>ARTIST</th>
                                            <th style={{ width: '20%' }}>RATING</th>
                                            <th style={{ width: '10%' }}>REMOVE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredReviews.map((review, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '10%' }}>{review.date}</td>
                                                <td style={{ width: '30%' }}>{review.review}</td>
                                                <td style={{ width: '30%' }}>{review.artist}</td>
                                                <td style={{ width: '20%' }}>
                                                    <FetchStar totalStars={review.rating} />
                                                </td>
                                                <td style={{ width: '10%' }}>
                                                    <MdDelete
                                                        size={22}
                                                        className='MdDelete'
                                                        onClick={() => this.handleRemove(index)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
};

export default Review;
