import React from 'react';
import {Layout, Breadcrumb, Row, Form, Table, Modal, Select,List} from 'antd';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import "./settlement.less"
import Acharts from "./settlechart"
import Bcharts from "./settlechart2"

const {Content} = Layout;
const Option = Select.Option;
// const data = [
//     '总用电量:0',
//     '预期电价:0',
//     '时间:',
// ];

const data2 = [
    <span>总用电量 :   <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10000万千瓦时</span></span>,
    <span>总电费 :   <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;500万元</span></span>,
    <span>长期用电协议包含用电量 :   <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;500万千万时</span></span>,
    <span>长期用电协议总电费 :   <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;500万千万时</span></span>,
    <span>竞价用电协议总电费 :   <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10000万千瓦时</span></span>,
];
const data = [
//     {
//     key: '1',
//     name: '一月',
//     age: 3200,
//     address: '1600',
//     address2: '1600',
//     price: '250',
//     price2: '250',
//     user: '500'
// }, {
//     key: '2',
//     name: '二月',
//     age: 3200,
//     address: '1600',
//     address2: '1600',
//     price: '250',
//     price2: '250',
//     user: '500'
// },
//     {
//         key: '3',
//         name: '三月',
//         age: 3200,
//         address: '1600',
//         address2: '1600',
//         price: '250',
//         price2: '250',
//         user: '500'
//     },
];
const data3 = [{
    key: '1',
    name: '江南皮革厂',
    age: 3200,
    address: '1600',
    address2: '1600',
    price: '250',
    price2: '250',
    user: '500'
}, {
    key: '2',
    name: '广州皮革厂',
    age: 3200,
    address: '1600',
    address2: '1600',
    price: '250',
    price2: '250',
    user: '500'
},
    {
        key: '3',
        name: '北京皮革厂',
        age: 3200,
        address: '1600',
        address2: '1600',
        price: '250',
        price2: '250',
        user: '500'
    },
];


class selleruseplan extends React.Component {

    state = {
        size: '',
        loading: false,
        visible: false,
        visible2: false,
        visible5: false,
        current: 'first',
        userName: 'buyer',
        location: '首页',
        company: '',
        message: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！',
        confirmDirty: false,
        autoCompleteResult: [],
    }



    get tableColumns(){
        return [{
            title: '月份',
            dataIndex: 'name',
            key: 'name',
        },  {
            title: '总用电量(万千瓦时)',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '总电费(万元)',
            dataIndex: 'user',
            key: 'user',
        },{
            title: '长协用电量',
            dataIndex: 'address',
            key: 'address',
        },
            {
                title: '长协交易电费',
                dataIndex: 'price',
                key: 'price',
            }, {
                title: '竞价用电量',
                dataIndex: 'address2',
                key: 'address2',
            },
            {
                title: '竞价交易电费',
                dataIndex: 'price2',
                key: 'price2',
            },{
                title: '操作',
                key: 'action',
                render: (text,record,index) => (
                    <span>
                        <span  onClick={() =>this.showModal2(text,record,index)} style={{color: "#1890FF", cursor: "pointer"}}>{"详情"}</span>
                    </span>
                ),


            }];
    }
    get tableColumns2(){
        return [{
            title: '合作企业',
            dataIndex: 'name',
            key: 'name',
        },  {
            title: '总用电量(万千瓦时)',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '总电费(万元)',
            dataIndex: 'user',
            key: 'user',
        },{
            title: '长协用电量',
            dataIndex: 'address',
            key: 'address',
        },
            {
                title: '长协交易电费',
                dataIndex: 'price',
                key: 'price',
            }, {
                title: '竞价用电量',
                dataIndex: 'address2',
                key: 'address2',
            },

            {
                title: '竞价交易电费',
                dataIndex: 'price2',
                key: 'price2',
            },
            {
                title: '详情',
                key: 'price3',
                render: (text,record,index) => (
                    <span>
                        <span  onClick={() =>this.showModal3(text,record,index)} style={{color: "#1890FF", cursor: "pointer"}}>{"详情"}</span>
                    </span>
                ),
            },
        ];
    }
    showModal2 = (text,record) => {

        this.setState({
            visible2: true,
        });
    }
    showModal3 = (text,record) => {
        this.setState({
            visible2: false,
            visible5: true,
        });
    }


    handleOk2 = (e) => {
        console.log(e);
        this.setState({
            visible2: false,
        });
    }

    handleCancel2 = (e) => {
        console.log(e);
        this.setState({
            visible2: false,
        });
    }








    handleOk5 = (e) => {
        console.log(e);
        this.setState({
            visible5: false,
        });
        this.props.history.push("/seller/settleview")
    }

    handleCancel5 = (e) => {
        console.log(e);
        this.setState({
            visible5: false,
            visible2: true,
        });
    }

    render() {

        function handleChange(value) {
            console.log(`selected ${value}`);
        }

        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/settle"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span><Breadcrumb.Item className="location">{"结算单"}</Breadcrumb.Item>
                    </div>


                    <Row className={`priceBox`} style={{height: "auto",minHeight:1000}}>

                        <div className={`conBox`}>
                            <h2>结算单</h2>
                            <div className={`contop`}>
                                <Select defaultValue="2017" style={{width: 120,float:"right"}} onChange={handleChange} className={`marginsel`}>
                                    <Option value="2017">2017</Option>
                                    <Option value="2018">2018</Option>
                                    <Option value="2019">2019</Option>
                                    <Option value="2020">2020</Option>
                                </Select>
                            </div>

                            <div>
                                <div style={{float:"left",width:"50%"}}>
                                    <Acharts name1={"长协用电量"} name2={"竞价用电量"}></Acharts>
                                </div>

                                <div style={{float:"right",width:"50%"}}>
                                    <Bcharts name1={"长协结算电费"} name2={"竞价结算电费"}></Bcharts>
                                </div>
                                <div className={`clear`}></div>
                            </div>
                            <br/><br/>
                            <Table columns={this.tableColumns} dataSource={data}/>
                        </div>


                        <Modal
                            title="一月结算信息"
                            visible={this.state.visible2}
                            onOk={this.handleOk2}
                            onCancel={this.handleCancel2}
                            destroyOnClose={true}
                            cancelText={"取消"}
                            okText={"确定"}
                            width={"80%"}
                        >
                            <List
                                header={<div>结算状态: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 已结清</div>}
                                footer={<div>
                                    <Table columns={this.tableColumns2} dataSource={data3}/>
                                </div>}
                                bordered
                                dataSource={data2}
                                renderItem={item => (<List.Item>{item}</List.Item>)}
                            />


                        </Modal>




                        <Modal
                            title="结算详情"
                            visible={this.state.visible5}
                            onOk={this.handleOk5}
                            onCancel={this.handleCancel5}
                            destroyOnClose={true}
                            cancelText={"取消"}
                            okText={"打印"}
                            //width={"80%"}
                        >
                            <List
                                header={<div>结算状态: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 已结清</div>}

                                bordered
                                dataSource={data2}
                                renderItem={item => (<List.Item>{item}</List.Item>)}
                            />


                        </Modal>

                    </Row>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )


    }
}

export default Form.create()(selleruseplan)