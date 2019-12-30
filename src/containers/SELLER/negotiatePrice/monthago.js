import React from 'react';
import {Layout, Breadcrumb, Row,Col, Form, Table,Modal,Pagination,Divider,LocaleProvider} from 'antd';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import "./useplanless.less"
import Zcharts from './../foreCasting/chart/biddingForecast';
import Mcharts from'./../foreCasting/chart/biddingHistory';
import api from "../../../api/tools"
import zhCN from "antd/lib/locale-provider/zh_CN";

const {Content} = Layout;
 // const Option = Select.Option;



class selleruseplan extends React.Component {
    state = {
        page:1,
        size: 10,
        loading: false,
        visible: false,
        visible2: false,
        visible3: false,
        visible5: false,
        current: 'first',
        userName: 'buyer',
        location: '首页',
        company: '',
        message: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！',
        confirmDirty: false,
        autoCompleteResult: [],
        data:[],
        monthdata:[],
        compdata:[],
        count:0,
        count2:0,
        stateyear:"2018",
        one:'gbr',
        two:'gbr',
        three:'gbr',
        four:'gbr',
        twoYear: '2018',
        fourYear:'2018'
    }



    componentDidMount() {
        let headers={
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: 1,
            pageSize: 10,
        };
        //console.log(params)
        let url ='/api/bidding/yearly'
        api.post(url, headers, params,
            (res) => {
                console.log(res,"用电计划")
                this.setState({
                    data:res.content.content,
                    count:res.content.total
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );

    }
    Paging = (e) => {
        let headers={
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: e,
            pageSize: this.state.size,
        };
        //console.log(params)
        let url ='/api/bidding/yearly'
        api.post(url, headers, params,
            (res) => {
                console.log(res,"用电计划")
                this.setState({
                    data:res.content.content,
                    count:res.content.total,
                    page:e
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }
    onShowSizeChange = (current,pageSize)=>{
        this.setState({ size: pageSize});
        let headers={
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: this.state.page,
            pageSize: pageSize,
        };
        //console.log(params)
        let url ='/api/bidding/yearly'
        api.post(url, headers, params,
            (res) => {
                console.log(res,"用电计划")
                this.setState({
                    data:res.content.content,
                    count:res.content.total
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    get tableColumns() {
        return [{
            title: '月度',
            dataIndex: 'yearStr',
            key: 'yearStr',
        },
            {
                title: '竞价计划用电量(万千瓦时)',
                dataIndex: 'power',
                key: 'power',
            },
            {
                title: '操作',
                key: 'action',
                render: ( record) => (
                    <span>
                        <span  onClick={() =>this.showModal5(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"合作企业"}</span>
                        <Divider type="vertical"/>
                        <span onClick={() => this.showModal3(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"月度详情"}</span>
                    </span>
                ),
            }];
    }

    get tableColumns2() {
        return [{
            title: '月度',
            dataIndex: 'monthStr',
            key: 'monthStr',
        },
            {
                title: '竞价计划用电量(万千瓦时)',
                dataIndex: 'power',
                key: 'power',
            },
            {
                title: '操作',
                key: 'action',
                render: ( record) => (
                    <span>
                        <span onClick={() => this.showModal2(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"详情"}</span>
                    </span>
                ),
            }];
    }

    get tableColumns5() {
        return [{
            title: '合作企业',
            dataIndex: 'companyName',
            key: 'companyName',
        },
            {
                title: '竞价计划用电量(万千瓦时)',
                dataIndex: 'power',
                key: 'power',
            },
            // {
            //     title: '操作',
            //     key: 'action',
            //     render: ( record) => (
            //         <span >
            //             <span onClick={() => this.showModal20(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"详情"}</span>
            //         </span>
            //     ),
            // }
        ];
    }
    showModal2 = (record) => {
        localStorage.setItem("needmonth",record.monthStr)
        //this.props.history.push("/seller/useplan")
        window.open(api.basepath+"/seller/month")
    }
    // showModal20 = (record) => {
    //     localStorage.setItem("useplancom",record.companyId)
    //     console.log(record)
    //     this.props.history.push("/seller/month")
    // }

    showModal3 = (record) => {
        let headers={
            'Authorization': sessionStorage.obj,
        }
        let params = {
            //beginYearOrMonth: record.yearStr+"-1",
            //endYearOrMonth: record.yearStr+"-12",
            //isGenerate: false,
            pageNo: 1,
            pageSize: 10
        };
        let url ='/api/bidding/monthly/'+record.yearStr
        api.post(url, headers, params,
            (res) => {
                console.log(res,"用电计划")
                this.setState({
                    monthdata:res.content,
                    count2:res.content.total,
                    stateyear:record.yearStr
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
        this.setState({
            visible3: true,
        });
    }
    handleOk3 = (e) => {
        this.setState({
            visible3: false,
        });

    }

    handleCancel3 = (e) => {
        this.setState({
            visible3: false,
        });
    }

    showModal5 = (record) => {
        let headers={
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: 1,
            pageSize: 10
        };
        let url ='/api/bidding/company/'+record.yearStr
        api.post(url, headers, params,
            (res) => {
                console.log(res,"用电计划")
                this.setState({
                    compdata:res.content.content,
                    count2:res.content.total,
                    stateyear:record.yearStr
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
        this.setState({
            visible5: true,
        });
    }
    Paging2 = (e) => {
        let headers={
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: e,
            pageSize: 10
        };
        let url ='/api/bidding/company/'+this.state.stateyear
        api.post(url, headers, params,
            (res) => {
                console.log(res,"用电计划")
                this.setState({
                    compdata:res.content.content,
                    count2:res.content.total,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }
    handleOk5 = (e) => {
        this.setState({
            visible5: false,
        });

    }

    handleCancel5 = (e) => {
        this.setState({
            visible5: false,
        });
    }

    render() {
        // const { one, two,  twoYear } = this.state;

        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/monthyear"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span><Breadcrumb.Item className="location">月度统计</Breadcrumb.Item>
                    </div>


                    <Row className={`priceBox`} style={{height: "auto",minHeight:1000}}>

                        <div className={`conBox`}>
                            <h2>月度统计</h2>
                            <div>
                                <Row className="topArea">
                                    <Row>
                                        <Col span="12">
                                            {/*<Row>*/}
                                                {/*<Col span={8} offset={16} style={{ textAlign: 'center' }}>*/}
                                                    {/*<Select defaultValue="gbr" onChange={this.handleOneChange}>*/}
                                                        {/*<Option value="bayes_ridge">贝叶斯岭回归</Option>*/}
                                                        {/*<Option value="linear_regression">普通线性回归</Option>*/}
                                                        {/*<Option value="elastic_net">弹性网络回归</Option>*/}
                                                        {/*<Option value="svr">支持向量机回归</Option>*/}
                                                        {/*<Option value="gbr">梯度增强回归</Option>*/}
                                                    {/*</Select>*/}
                                                {/*</Col>*/}
                                            {/*</Row>*/}
                                            <Row>
                                                <Zcharts style={{width:"100%",height:'auto'}} className="pieChart" name1={'竞价预测'}></Zcharts>
                                            </Row>
                                        </Col>
                                        <Col span="12">
                                            {/*<Row>*/}
                                                {/*<Col span={24}>*/}
                                                    {/*<Select defaultValue="2018" onChange={this.handleTwoYearChange} className="monthSel">*/}
                                                        {/*<Option value="2018">2018</Option>*/}
                                                        {/*<Option value="2017">2017</Option>*/}
                                                        {/*<Option value="2016">2016</Option>*/}
                                                        {/*<Option value="2015">2015</Option>*/}
                                                        {/*<Option value="2014">2014</Option>*/}
                                                    {/*</Select>*/}
                                                    {/*<Select defaultValue="gbr" onChange={this.handleTwoChange} className="classSel">*/}
                                                        {/*<Option value="bayes_ridge">贝叶斯岭回归</Option>*/}
                                                        {/*<Option value="linear_regression">普通线性回归</Option>*/}
                                                        {/*<Option value="elastic_net">弹性网络回归</Option>*/}
                                                        {/*<Option value="svr">支持向量机回归</Option>*/}
                                                        {/*<Option value="gbr">梯度增强回归</Option>*/}
                                                    {/*</Select>*/}
                                                {/*</Col>*/}
                                            {/*</Row>*/}
                                            <Row>
                                                <Mcharts style={{width:"100%",height:'auto'}} className="pieChart" name1={'竞价预测历史'} name2={'竞价预测'}></Mcharts>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Row>
                                <div className={`clear`}></div>
                            </div>
                            <div className={"typebutton"}>
                                <div className={`clear`}></div>
                                {/*<Button type={"primary"} onClick={this.showModal}    >{"发布用电计划"}</Button>*/}
                                {/*<Button type="primary" style={{margin:"0 5%"}} onClick={this.showModal2} >{"发布竞价用电计划"}</Button>*/}
                            </div>
                            {/*<span className={`plantable`}>计划列表:</span>*/}
                            {/*<Select defaultValue="2015" style={{width: 120}} onChange={this.handleChange}>*/}
                            {/*<Option value="2015">2015年</Option>*/}
                            {/*<Option value="2016">2016年</Option>*/}
                            {/*<Option value="2017">2017年</Option>*/}
                            {/*<Option value="2018">2018年</Option>*/}
                            {/*</Select>*/}

                            <Modal
                                title={this.state.stateyear+"年各月用电计划"}
                                visible={this.state.visible3}
                                onOk={this.handleOk3}
                                onCancel={this.handleCancel3}
                                destroyOnClose={true}
                                cancelText={"取消"}
                                okText={"确定"}
                                width={"80%"}
                            >
                                <Table columns={this.tableColumns2} dataSource={this.state.monthdata} pagination={false} />

                            </Modal>

                            <Modal
                                title={this.state.stateyear+"年合作企业列表"}
                                visible={this.state.visible5}
                                onOk={this.handleOk5}
                                onCancel={this.handleCancel5}
                                destroyOnClose={true}
                                cancelText={"取消"}
                                okText={"确定"}
                                width={"80%"}
                            >
                                <Table columns={this.tableColumns5} dataSource={this.state.compdata} pagination={false} />
                                <div style={{margin:"20px  0", float:"right"}}>
                                    <Pagination total={this.state.count2}  defaultCurrent={1} onChange={this.Paging2} />
                                </div>
                                <br/><br/><br/>

                            </Modal>



                            <Table columns={this.tableColumns} dataSource={this.state.data} pagination={false}/>
                            <div style={{margin:"20px  0", float:"right"}}>
                                {/*<Pagination total={this.state.count}  defaultCurrent={1} onChange={this.Paging} />*/}
                                <LocaleProvider locale={zhCN}>
                                    <Pagination
                                        total={this.state.count}
                                        showTotal={total => `总共 ${total===null?0:total} 项`}
                                        defaultCurrent={1}
                                        showSizeChanger
                                        pageSizeOptions={['10','20','50']}
                                        onShowSizeChange={this.onShowSizeChange}
                                        showQuickJumper
                                        onChange={this.Paging}
                                        className="pageNations"
                                    />
                                </LocaleProvider>
                            </div>
                        </div>

                    </Row>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )


    }
}

export default Form.create()(selleruseplan)