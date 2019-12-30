import React from 'react';
import {Layout, Breadcrumb, Row, Col, Table, Button} from 'antd';
// import ReactEcharts from 'echarts-for-react';

import './order.less';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';

const {Content} = Layout;
const columns = [{
    title: '套餐名称',
    dataIndex: 'name',
}, {
    title: '套餐介绍',
    dataIndex: 'address',
},{
    title: '价格',
    dataIndex: 'age',
},  {
    title: '操作',
    dataIndex: 'isDone',
    key: 'isDone',
    render: () => (
        <span>
                        <span>详情</span>
                    </span>
    ),
},
];

const data = [
    {
        name:"套餐一",
        age:"50000",
        address:"负荷预测+售电业务+结算+用电管理+客户导入"
    },
    {
        name:"套餐二",
        age:"35000",
        address:"负荷预测+售电业务+结算"
    },
    {
        name:"套餐三",
        age:"30000",
        address:"负荷预测+结算"
    },
    {
        name:"负荷预测",
        age:"25000",
        address:"偏差考核电量统计"
    },
    {
        name:"用电管理",
        age:"25000",
        address:"偏差考核电量统计"
    },
    {
        name:"售电业务",
        age:"25000",
        address:"偏差考核电量统计"
    },
    {
        name:"客户导入",
        age:"25000",
        address:"偏差考核电量统计"
    },
    {
        name:"结算管理",
        age:"25000",
        address:"偏差考核电量统计"
    },

];



export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'first',
            userName: '',
            location: '我的订单',
            company: '',
            message1: '广东省广州市***集团，2019年度购电1000MW',
            message2: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！',
            powerall: [20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7],
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            money:[],
        }
    }

    componentDidMount() {

    }

    start = () => {
        this.setState({loading: true});
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    onSelectChange = (selectedRowKeys,value) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        let data=0
        for(let i in value){
            data=data +parseInt(value[i].age)
        }
        this.setState({
            selectedRowKeys,
            money:data
        });
        console.log(value)
    }
    topay =()=>{
        this.props.history.push(`/prepay`);
    }


    render() {
        const {loading, selectedRowKeys,money} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/product"}></Lheader>
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
                    <div style={{background: '#ffffff', padding: 24, minHeight: 750}} className="contentindex">
                        <div>

                            <Table  columns={columns} dataSource={data}/>
                        </div>
                    </div>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )
    }
}