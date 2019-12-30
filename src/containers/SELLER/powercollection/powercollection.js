import React from 'react';
import {Layout, Breadcrumb, Row, Col, Select, Input, Divider, Tabs} from 'antd';
import ReactEcharts from 'echarts-for-react';

import './index.less';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import Achart from './charts/bar.js'
import Bchart from '../index/chart/line.js'
import Cchart from '../index/chart/topline1.js'
import Dchart from '../index/chart/bar3.js'
import Echart from '../index/chart/bar4.js'
import Fchart from '../index/chart/bar5.js'
import Gchart from '../index/chart/bar6.js'
import api from "../../../api/tools";
import batteryIcon from '../../../components/icon/battery-circle.png';
import shandian from '../../../components/icon/shandian.png';
import rmb from '../../../components/icon/rmb2.png';
import gonglv from '../../../components/icon/gonglv.png';
// import yuanquan2 from "../../../components/icon/yuanquan2.png"
const {Content} = Layout;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const Search = Input.Search;


function Card(props) {
    const {icon, name, num, unit} = props;
    return (
        <div className="total-info-item">
            <div className="total-info-item-detail">
                <img className="total-info-item-icon" src={icon} alt=""/>
                <div className="total-info-item-desc">
                    <div>
                        <span>{name}</span>
                        <span className="total-info-item-unit">{unit}</span>
                    </div>
                    <span className="total-info-item-desc-number">{num}</span>
                </div>
            </div>
        </div>
    );
}

const data=[
    {
        name:"AABB001",
        color:"#33cc00"
    },
    {
        name:"AABB002",
        color:"#33cc00"
    },
    {
        name:"AABB003",
        color:"#33cc00"
    },
    {
        name:"AABB004",
        color:"#ff3399"
    },
    {
        name:"AABB005",
        color:"#ffff00"
    },
    {
        name:"AABB006",
        color:"#33cc00"
    },
    {
        name:"AABB007",
        color:"#ffff00"
    },
]

const data2=[
    {
        name:"设备名称:AABB001",
        type:"设备类型:电表",
        gonglv:"2000kw",
        dianya:"电压:1000KV",
        dianliu:"2A",
    },
    {
        name:"设备名称:AABB001",
        type:"设备类型:电表",
        gonglv:"2000kw",
        dianya:"电压:1000KV",
        dianliu:"2A",
    },
    {
        name:"设备名称:AABB001",
        type:"设备类型:电表",
        gonglv:"2000kw",
        dianya:"电压:1000KV",
        dianliu:"2A",
    },
    {
        name:"设备名称:AABB001",
        type:"设备类型:电表",
        gonglv:"2000kw",
        dianya:"电压:1000KV",
        dianliu:"2A",
    },
    {
        name:"设备名称:AABB001",
        type:"设备类型:电表",
        gonglv:"2000kw",
        dianya:"电压:1000KV",
        dianliu:"2A",
    },
    {
        name:"设备名称:AABB001",
        type:"设备类型:电表",
        gonglv:"2000kw",
        dianya:"电压:1000KV",
        dianliu:"2A",
    },
]

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'first',
            userName: '',
            location: '采集监控',
            company: '',
            message1: '广东省广州市***集团，2019年度购电1000MW',
            message2: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！',
            notice: [],
            policy: [],
            cancelNum: 0,
            unconfirmedNum: 0,
            pendingNum: 0,
            confirmedNum: 0,
            top: [],
            dianbiao:"AABB001",
            report: {},
            customer: null,
            monthpower: [],
            plus: null,
            adata:[],
            bdata:[],
            monthdata:[],
            powerall:[20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7],
        }
    }





    componentDidMount() {

    }
    get cards(){
        return [{
            icon: batteryIcon,
            name: '实用电量',
            num: 1100990,
            unit: '万千瓦时'
        }, {
            icon: gonglv,
            name: '实用功率',
            num: 96528,
            unit: '千瓦'
        }, {
            icon: rmb,
            name: '实用电压',
            num: 98547,
            unit: '千伏'
        }, {
            icon: shandian,
            name: '实用电流',
            num: 12,
            unit: '安培'
        }]
    }
    qhdianbiao=(e)=>{
        console.log(e.target.id)
        this.setState({
            dianbiao:e.target.id,
        })
    }
    // qhdianbiao2=(e)=>{
    //     console.log(e.target.innerText)
    //     this.setState({
    //         dianbiao:e.target.innerHTML,
    //     })
    // }

    render() {
        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/powercollection"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <Row>
                        <Col span={16}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>您当前的位置: </Breadcrumb.Item><Breadcrumb.Item
                                className="location">{this.state.location}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    {/* 内容 */}
                    <div style={{background: '#f0f2f5', padding: 24, minHeight: 988}} className="contentindex">
                        <Select defaultValue={"GBR"} style={{ width: "30%" }}  className={'select_de'} onChange={this.handleChange}>
                            <Option value="GBR">河北第一冶金公司</Option>
                            <Option value="BAYES_RIDGE">江南钢铁厂</Option>
                            <Option value="LINEAR_REGRESSION">湖北东方红制药</Option>
                            <Option value="CUSTOMIZE">
                                河南徐工重工
                            </Option>
                        </Select>
                        <Divider/>
                        <div className={`jkleft`}>
                            <div>
                                <Search
                                    placeholder="搜索设备"
                                    onSearch={value => console.log(value)}
                                    style={{ width: "100%",marginBottom:"20px" }}
                                />
                            </div>
                            <div>
                                {
                                    data.map((value,key)=>{
                                        return(
                                            <div className={'leftlist_1'} key={key} id={value.name} onClick={this.qhdianbiao}  >
                                                <div style={{background:value.color}}  className={`circle`}></div>
                                                <span className={value.name}  >{value.name}</span>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={`jkright`}>
                            <div className={"content_card"}>
                                <div className="total-info-box">
                                    {
                                        this.cards.map((item, index) => {
                                            return (
                                                <Card key={index} {...item} />
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div>
                                <div className={'indexzzz'}>
                                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                                        <TabPane tab="电量" key="1">
                                            <div className={`index_z0`}>
                                                <div>
                                                    <Achart dianbiao={this.state.dianbiao} />
                                                </div>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="功率" key="2">
                                            <div className={`index_z0`}>
                                                <div>
                                                    <Bchart/>
                                                </div>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="电压"  disabled key="3">
                                            <div className={`index_z0`}>
                                                <div>
                                                    <Cchart/>
                                                </div>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="电流" disabled key="4">
                                            <div className={`index_z0`}>
                                                <div>
                                                    <Dchart/>
                                                </div>

                                            </div>
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </div>


                            <div className={`rightbottom_1`}>
                                <div className={`rightbottom_3`}>
                                    {
                                        data2.map((value,key)=>{
                                            return(
                                                <div className={`rightbottom_2`}>
                                                    <p>{value.name}</p>
                                                    <p>{value.type}</p>
                                                    <p>{value.gonglv}</p>
                                                    <p>{value.dianya}</p>
                                                    <p>{value.dianliu}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )
    }
}