import React, { Component } from 'react';
import "../../style/dashboard.css";
import { PieChart } from 'react-minimal-pie-chart';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';


class Summary extends Component {


    render() {

        const chartSetting = {
            width: 600,
            height: 250,
        };

        const dataset = [
            {
                seoul: 80,
                month: 'Pro 6',
            },
            {
                seoul: 131,
                month: 'Pro 5',
            },
            {
                seoul: 55,
                month: 'Pro 4',
            },
            {
                seoul: 48,
                month: 'Pro 3',
            },
            {
                seoul: 25,
                month: 'Pro 2',
            },
            {
                seoul: 60,
                month: 'Pro 1',
            },

        ];

        const data = [
            { title: 'Product 1', value: 10, color: '#ff7c43' },
            { title: 'Product 2', value: 15, color: '#2f4b7c' },
            { title: 'Product 3', value: 20, color: '#665191' },
            { title: 'Product 4', value: 5, color: '#a05195' },
            { title: 'Product 5', value: 8, color: '#d45087' },
            { title: 'Product 6', value: 13, color: '#198754' },
        ];

        // const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);



        return (
            <div className='body'>
                <SideBar />
                <div className='content'>
                    <Head />

                    <div className='conbody'>

                        <div className='producthead'>
                            <h3 className='productheadtxt'>SUMMARY</h3>
                        </div>

                        <div style={{ display: 'flex' }}>

                            <div style={{ width: '40%', marginLeft: '1rem' }}>
                                <h2 style={{ color: '#804f0e', textAlign: 'center' }}>TOP SELLING ITEMS</h2>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

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

                                    <div style={{ width: '270px', height: '240px' }}>
                                        <PieChart
                                            data={data}
                                            label={({ dataEntry }) => `${Math.round(dataEntry.value)}`}
                                            labelStyle={{
                                                fontSize: '5px',
                                                fontFamily: 'sans-serif',
                                                fill: 'white',
                                            }}
                                            labelPosition={80}
                                        />
                                    </div>

                                </div>

                            </div>

                            <div style={{ width: '50%', marginLeft: '3rem' }}>
                                <h2 style={{ color: '#804f0e', textAlign: 'center' }}>INVENTORY</h2>

                                <BarChart
                                    dataset={dataset}
                                    yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                                    series={[{
                                        dataKey: 'seoul',
                                    }]}
                                    layout="horizontal"
                                    {...chartSetting}
                                    margin={{ top: 5 }}
                                />

                            </div>

                        </div>


                        <h2 style={{ color: '#804f0e', textAlign: 'center', marginBottom: 0 }}>SALES ORDER</h2>
                        <div className='row1' style={{ marginBottom: '2rem' }}>

                            <div className='card'>
                                <div className='itemsum'>
                                    <h4 className='item1txt'>ORDERS</h4>
                                </div>
                                <div className='item'>
                                    <h1 className='itemtxtsum'>28</h1>
                                </div>
                            </div>

                            <div className='card'>
                                <div className='itemsum'>
                                    <h4 className='item1txt'>PENDING</h4>
                                </div>
                                <div className='item'>
                                    <h1 className='itemtxtsum'>23</h1>
                                </div>
                            </div>

                            <div className='card'>
                                <div className='itemsum'>
                                    <h4 className='item1txt'>DELIVERED</h4>
                                </div>
                                <div className='item'>
                                    <h1 className='itemtxtsum'>05</h1>
                                </div>
                            </div>

                        </div>

                        <h2 style={{ color: '#804f0e', textAlign: 'center', marginBottom: 0 }}>WEEKLY APPOINMENT REPORT</h2>
                        <div className='row1' style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>

                            <div className='card'>
                                <div className='itemsum' style={{ backgroundColor: 'green' }}>
                                    <h4 className='item1txt'>APPOINMENTS</h4>
                                </div>
                                <div className='item'>
                                    <h1 className='itemtxtsum'>20</h1>
                                </div>
                            </div>

                        </div>

                        <div style={{marginRight: '1rem'}}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>LOCATION</th>
                                        <th>DATE</th>
                                        <th>TIME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Malini</td>
                                        <td>malini@Colombo.com</td>
                                        <td>01/01/2024</td>
                                        <td>1.00 pm</td>
                                    </tr>
                                    <tr>
                                        <td>John</td>
                                        <td>malini@Colombo.com</td>
                                        <td>02/02/2024</td>
                                        <td>3.00 pm</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        )
    }

};

export default Summary;