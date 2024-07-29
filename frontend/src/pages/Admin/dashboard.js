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
import Loading from '../components/loading';
import DashboardStock from '../modals/dashboarStockModal';
import DashStockModal2 from '../modals/dashStockModal2';


class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            chartArray1: [],
            loading: true,
            outStockCount: 0,
            lowStockCount: 0,
            suffStockCount: 0,
            totalStockCount: 0,

            show: false,
            passingArray: [],
            outStockArray: [],
            lowStockArray: [],
            suffStockArray: [],
        }

    }

    showModal1 = () => {
        this.setState({
            show: true,
            passingArray: this.state.outStockArray
        });
    }

    showModal2 = () => {
        this.setState({
            show: true,
            passingArray: this.state.lowStockArray
        });
    }

    showModal3 = () => {
        this.setState({
            show: true,
            passingArray: this.state.suffStockArray
        });
    }

    hideModal = () => {
        this.setState({
            show: false
        });
    }

    componentDidMount() {

        const colors = ['#ff7c43', '#2f4b7c', '#665191', '#a05195', '#d45087', '#198754']

        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/admin/getProduct');
                const resdata = await res.data;

                const subArray = [];
                resdata.map((item) => {
                    subArray.push({
                        'title': item.category,
                        'value': parseInt(item.count, 10)
                    })
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


                //
                const outStock = [];
                const lowStock = [];
                const suffStock = [];
                resdata.map((item) => {
                    if (item.count == 0) {
                        outStock.push({
                            'title': item.name
                        })
                    }
                    if (item.count > 0 && item.count < 5) {
                        lowStock.push({
                            'title': item.name,
                            'count': parseInt(item.count, 10)
                        })
                    }
                    if (item.count >= 5) {
                        suffStock.push({
                            'title': item.name,
                            'count': parseInt(item.count, 10)
                        })
                    }
                });

                this.setState({
                    outStockCount: outStock.length,
                    lowStockCount: lowStock.length,
                    suffStockCount: resdata.length - outStock.length - lowStock.length,
                    totalStockCount: resdata.length,

                    outStockArray: outStock,
                    lowStockArray: lowStock,
                    suffStockArray: suffStock,
                });
                //


            } catch (error) {
                console.log('Main Error', error);
            }
        };
        fetchData();
    }


    render() {

        const totalValue = this.state.chartArray1.reduce((acc, cur) => acc + cur.value, 0);

        const percentage = (this.state.outStockCount / this.state.totalStockCount) * 100
        const outPercentage = percentage.toFixed(2);


        return (
            <div className='body'>

                <SideBar />

                <div className='content'>
                    <Head />

                    <div className='conbody'>

                        {!this.state.loading && (
                            <div>
                                <div className='row1'>

                                    <div className='card'>
                                        <div className='item1'>
                                            <h4 className='item1txt'>OUT STOCK</h4>
                                            <RiAlignItemTopFill size={25} className="icon" />
                                        </div>
                                        <div className='item' onClick={() => this.showModal1()} style={{cursor:'pointer'}}>
                                            <RiAlignItemTopFill size={40} className="icon2" color='#4B49AC' />
                                            <h1 className='itemtxt2'>{this.state.outStockCount}</h1>
                                        </div>
                                    </div>

                                    <div className='card'>
                                        <div className='item2'>
                                            <h4 className='item1txt'>LOW STOCK</h4>
                                            <PiHourglassLowFill size={25} className="icon" />
                                        </div>
                                        <div className='item' onClick={() => this.showModal2()} style={{cursor:'pointer'}}>
                                            <PiHourglassLowFill size={40} className="icon2" color='#AF1763' />
                                            <h1 className='itemtxt3'>{this.state.lowStockCount}</h1>
                                        </div>
                                    </div>

                                    <div className='card'>
                                        <div className='item3'>
                                            <h4 className='item1txt'>SUFFICIENT STOCK</h4>
                                            <MdOutlineProductionQuantityLimits size={25} className="icon" />
                                        </div>
                                        <div className='item' onClick={() => this.showModal3()} style={{cursor:'pointer'}}>
                                            <MdOutlineProductionQuantityLimits size={40} className="icon2" color='#17A2B8' />
                                            <h1 className='itemtxt4'>{this.state.suffStockCount}</h1>
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
                                                    data={this.state.chartArray1}
                                                    label={({ dataEntry }) => `${Math.round((dataEntry.value / totalValue) * 100)}%`}
                                                    labelStyle={{
                                                        fontSize: '5px',
                                                        fontFamily: 'sans-serif',
                                                        fill: 'white',
                                                    }}
                                                    labelPosition={80}
                                                />

                                            </div>

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

                                        </div>

                                    </div>

                                    <div className='card2'>

                                        <div>
                                            <h4 className='pieheadtxt'>OUT STOCK PERCENTAGE</h4>
                                        </div>

                                        <div style={{ marginTop: 15, display: 'flex', justifyContent: 'center' }}>

                                            <div style={{ width: '270px', height: '240px', display: 'flex' }}>
                                                <CircularProgressbar
                                                    value={outPercentage}
                                                    text={`${outPercentage}%`}
                                                    styles={buildStyles({
                                                        textSize: '14px',
                                                        pathColor: `rgba(113,192,43, ${outPercentage / 100})`,
                                                        textColor: '#003f5c',
                                                        trailColor: '#d6d6d6',
                                                    })}
                                                />
                                            </div>

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

                <DashboardStock show={this.state.show} handleClose={this.hideModal} passing={this.state.passingArray} />
                <DashStockModal2 show={this.state.show} handleClose={this.hideModal} passing={this.state.passingArray} />

            </div>
        )

    }

};

export default Dashboard;
