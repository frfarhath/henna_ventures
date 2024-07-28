import React, { Component } from 'react';
import "../../style/dashboard.css";
import { PieChart } from 'react-minimal-pie-chart';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { RiAlignTop } from 'react-icons/ri';
import { PiHourglassLowFill } from "react-icons/pi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';

class Dashboard extends Component {

    render() {

        const data = [
            { title: 'Product 1', value: 10, color: '#ff7c43' },
            { title: 'Product 2', value: 15, color: '#2f4b7c' },
            { title: 'Product 3', value: 20, color: '#665191' },
            { title: 'Product 4', value: 5, color: '#a05195' },
            { title: 'Product 5', value: 8, color: '#d45087' },
            { title: 'Product 6', value: 13, color: '#198754' },
        ];

        const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

        const percentage = 66;

        return (
            <div className='body' >

                <SideBar />

                <div className='content'>

                    <Head />

                    <div className='conbody'>

                        <div className='row1'>

                            <div className='card'>
                                <div className='item1'>
                                    <h4 className='item1txt'>OUT STOCK</h4>
                                    <RiAlignTop size={25} className="icon" />
                                </div>
                                <div className='item'>
                                    <RiAlignTop size={40} className="icon2" color='#4B49AC' />
                                    <h1 className='itemtxt2'>08</h1>
                                </div>
                            </div>

                            <div className='card'>
                                <div className='item2'>
                                    <h4 className='item1txt'>LOW STOCK</h4>
                                    <PiHourglassLowFill size={25} className="icon" />
                                </div>
                                <div className='item'>
                                    <PiHourglassLowFill size={40} className="icon2" color='#AF1763' />
                                    <h1 className='itemtxt3'>03</h1>
                                </div>
                            </div>

                            <div className='card'>
                                <div className='item3'>
                                    <h4 className='item1txt'>SUFFICIENT STOCK</h4>
                                    <MdOutlineProductionQuantityLimits size={25} className="icon" />
                                </div>
                                <div className='item'>
                                    <MdOutlineProductionQuantityLimits size={40} className="icon2" color='#17A2B8' />
                                    <h1 className='itemtxt4'>05</h1>
                                </div>
                            </div>

                        </div>

                        <div className='row2'>

                            <div className='card2'>

                                <div>
                                    <h4 className='pieheadtxt'>PRODUCT CATEGORIES</h4>
                                </div>

                                <div style={{ marginTop: 15, display: 'flex', justifyContent: 'space-between' }}>

                                    <div style={{ width: '270px', height: '240px', display: 'flex' }}>

                                        <PieChart
                                            data={data}
                                            label={({ dataEntry }) => `${Math.round((dataEntry.value / totalValue) * 100)}%`}
                                            labelStyle={{
                                                fontSize: '5px',
                                                fontFamily: 'sans-serif',
                                                fill: 'white',
                                            }}
                                            labelPosition={80}
                                        />
                                        <div className='centercircle'>
                                            <div>
                                                <h4 className='totaltxt'>TOTAL</h4>
                                                <h2 className='totaltxt2'>{totalValue}</h2>
                                            </div>
                                        </div>

                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}>
                                        {data.map((entry, index) => (
                                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <div
                                                    style={{
                                                        width: '15px',
                                                        height: '15px',
                                                        backgroundColor: entry.color,
                                                        marginRight: '10px',
                                                        borderRadius: '15px'
                                                    }}
                                                />
                                                <span style={{ fontSize: '13px' }}>{entry.title} - {entry.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>

                            <div className='card2'>

                                <div>
                                    <h4 className='pieheadtxt'>STOCK PERCENTAGE</h4>
                                </div>

                                <div style={{ marginTop: 15, display: 'flex', justifyContent: 'center' }}>

                                    <div style={{ width: '270px', height: '240px', display: 'flex' }}>
                                        <CircularProgressbar
                                            value={percentage}
                                            text={`${percentage}%`}
                                            styles={buildStyles({

                                                textSize: '14px',
                                                pathColor: `rgba(113,192,43, ${percentage / 100})`,
                                                textColor: '#003f5c',
                                                trailColor: '#d6d6d6',
                                            })}
                                        />
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )

    }

};

export default Dashboard;
