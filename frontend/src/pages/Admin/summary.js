import React, { Component } from 'react';
import "../../style/dashboard.css";
import { PieChart } from 'react-minimal-pie-chart';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

import SideBar from '../../components/Admin/sidebar';
import Head from '../../components/Admin/head';
import Loading from '../components/loading';


class Summary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            chartArray1: [],
            loading: true,
            totalOrders: 0,
            totalPendings: 0,
            totalDeliveries: 0,
            totalAppoinments: 0,
            productGraphArray: []
        }

    }

    componentDidMount() {

        const colors = ['#ff7c43', '#2f4b7c', '#665191', '#a05195', '#d45087', '#198754']

        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/admin/getOrder');
                const resdata = await res.data;

                const subArray = [];
                resdata.map((item) => {
                    if (item.status === '1') {
                        subArray.push({
                            'title': item.product,
                            'value': parseInt(item.quantity, 10)
                        })
                    }
                });

                this.setState({
                    totalOrders: resdata.length,
                    totalPendings: resdata.length - subArray.length,
                    totalDeliveries: subArray.length,
                });

                const summarizeProducts = (subArray) => {
                    const summary = subArray.reduce((acc, product) => {
                        const { title, value } = product;
                        if (!acc[title]) {
                            acc[title] = { title, value: 0 };
                        }
                        acc[title].value += value;
                        return acc;
                    }, {});

                    return Object.values(summary);
                }

                const finalSummary = summarizeProducts(subArray);

                const withColors = (finalSummary, colors) => {
                    return finalSummary.map((item, index) => ({
                        ...item,
                        color: colors[index % colors.length]
                    }));
                };
                const piechartArray = withColors(finalSummary, colors);

                this.setState({
                    chartArray1: piechartArray,
                    loading: false
                });

            } catch (error) {
                console.log('Main Error', error);
            }
        };
        fetchData();

        const fetchData2 = async () => {
            try {
                const res1 = await axios.get('http://localhost:8000/api/admin/getConfirmAppoinmentPackage');
                const res2 = await axios.get('http://localhost:8000/api/admin/getConfirmAppoinmentIndividual');
                const res3 = await axios.get('http://localhost:8000/api/admin/getProduct');

                const resdata1 = await res1.data;
                const resdata2 = await res2.data;
                const resdata3 = await res3.data;

                const subArray = [];
                resdata3.map((item) => {
                    subArray.push({
                        'title': item.name,
                        'value': parseInt(item.count, 10)
                    })
                });

                this.setState({
                    totalAppoinments: resdata1.length + resdata2.length,
                    productGraphArray: subArray
                });

            } catch (error) {
                console.log('Main Error', error);
            }
        };
        fetchData2();

    }


    render() {

        const chartSetting = {
            width: 600,
            height: 250,
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
                                    <h3 className='productheadtxt'>SUMMARY</h3>
                                </div>

                                <div style={{ display: 'flex' }}>

                                    <div style={{ width: '40%', marginLeft: '1rem' }}>
                                        <h2 style={{ color: '#804f0e', textAlign: 'center' }}>TOP SELLING ITEMS</h2>

                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}>
                                                {this.state.chartArray1.map((entry, index) => (
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
                                                    data={this.state.chartArray1}
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
                                            dataset={this.state.productGraphArray}
                                            yAxis={[{ scaleType: 'band', dataKey: 'title' }]}
                                            series={[{
                                                dataKey: 'value',
                                            }]}
                                            layout="horizontal"
                                            {...chartSetting}
                                            margin={{ top: 5, left: 80}}
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
                                            <h1 className='itemtxtsum'>{this.state.totalOrders}</h1>
                                        </div>
                                    </div>

                                    <div className='card'>
                                        <div className='itemsum'>
                                            <h4 className='item1txt'>PENDING</h4>
                                        </div>
                                        <div className='item'>
                                            <h1 className='itemtxtsum'>{this.state.totalPendings}</h1>
                                        </div>
                                    </div>

                                    <div className='card'>
                                        <div className='itemsum'>
                                            <h4 className='item1txt'>DELIVERED</h4>
                                        </div>
                                        <div className='item'>
                                            <h1 className='itemtxtsum'>{this.state.totalDeliveries}</h1>
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
                                            <h1 className='itemtxtsum'>{this.state.totalAppoinments}</h1>
                                        </div>
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

export default Summary;
