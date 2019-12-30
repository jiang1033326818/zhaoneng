import React from 'react';
import {Layout, Breadcrumb, Row, Form, Table,LocaleProvider,Pagination,Modal,List} from 'antd';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import "./useplanless.less"
import api from "../../../api/tools";
import zhCN from "antd/lib/locale-provider/zh_CN";
const {Content} = Layout;

class selleruseplan extends React.Component {

    state = {
        page:1,
        size: 10,
        loading: false,
        visible: false,
        visible2: false,
        current: 'first',
        userName: 'buyer',
        location: '首页',
        company: '',
        message: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！',
        confirmDirty: false,
        autoCompleteResult: [],
        data:[],
        count:0,
        detidata:{},
        company2: '',
    }

    componentDidMount() {
        let needmonth=localStorage.getItem("needmonth")
        let headers={
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo:1,
            sizeSize:13,
            yearOrMonth:needmonth
        };
        let url ='/api/bidding/list'
        api.post(url, headers, params,
            (res) => {
                console.log(res,"当前年用电计划")
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
    onShowSizeChange = (current,pageSize)=>{
        let needmonth=localStorage.getItem("needmonth")
        this.setState({ size: pageSize});
        let headers={
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo:this.state.page,
            sizeSize:pageSize,
            yearOrMonth:needmonth
        };
        let url ='/api/bidding/list'
        api.post(url, headers, params,
            (res) => {
                console.log(res,"当前年用电计划")
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
    Paging =(e)=>{
        let needmonth=localStorage.getItem("needmonth")
        let headers={
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo:e,
            sizeSize:this.state.size,
            yearOrMonth:needmonth
        };
        let url ='/api/bidding/list'
        api.post(url, headers, params,
            (res) => {
                console.log(res,"当前年用电计划")
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

    get tableColumns(){
        return [
        //     {
        //     title: '计划名称',
        //     dataIndex: 'name',
        //     key: 'name',
        // },
            {
            title: '用电方',
            dataIndex: 'companyName',
            key: 'companyName',
        },
            {
                title: '竞价月度',
                dataIndex: 'monthStr',
                key: 'monthStr',
            },
            {
            title: '总用电量(万千瓦时)',
            dataIndex: 'power',
            key: 'power',
        }, {
                title: '价差(元)',
                dataIndex: 'spread',
                key: 'spread',
            },

            {
                title: '操作',
                key: 'action',
                render: ( record) => (
                    <span >
                          {/*<span  onClick={() =>this.showModal2(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"详情"}</span>*/}
                        {/*<Divider type="vertical"/>*/}
                        {
                            record.isGenerate===true?<span>{"创建合同"}</span>:
                                record.isDeal===true?<span>{"创建合同"}</span>:
                                    <span onClick={() => this.showModal20(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"创建合同"}</span>
                        }

                    </span>
                ),
            }
        ];
    }
    get tableColumns2(){
        return [ {
            title: '月份',
            dataIndex: 'monthStr',
            key: 'monthStr',
        },
            {
                title: '总用电量(万千瓦时)',
                dataIndex: 'total',
                key: 'total',
            },
            {
                title: '竞价用电量',
                dataIndex: 'bidding',
                key: 'bidding',
            },

        ];
    }



    get data2(){
        return[
            <span>{"合作企业:"} <span>{this.state.company2}</span></span>,
            <span>{"竞价总用电量:"} <span>{this.state.detidata===null?"":this.state.detidata.power}</span>{"万千瓦时"}</span>,
            <span>{"竞价价差:"} <span>{this.state.detidata===null?"":this.state.detidata.spread}</span>{"元"}</span>,
        ]
    }

    // showModal2 = (text) => {
    //     console.log(text)
    //     let headers={
    //         'Authorization': sessionStorage.obj,
    //     }
    //     let params = {
    //
    //     };
    //     //console.log(params)
    //     let url ='/api/bidding/'+text.planId+'/details/'
    //     api.get(url, headers, params,
    //         (res) => {
    //             console.log(res)
    //             this.setState({
    //                 detidata:res.content,
    //                 company2:text.companyName,
    //             })
    //         },
    //         (err) => {
    //             console.log("failed" + err)
    //         }
    //     );
    //
    //
    //     let headers2={
    //         'Authorization': sessionStorage.obj,
    //     }
    //     let params2 = {
    //
    //     };
    //     //console.log(params)
    //     let url2 ='/api/plan/monthly/'+text.yearStr
    //     api.post(url2, headers2, params2,
    //         (res) => {
    //             console.log(res,"详情")
    //             this.setState({
    //                 datamonth:res.content,
    //             })
    //         },
    //         (err) => {
    //             console.log("failed" + err)
    //         }
    //     );
    //
    //
    //     this.setState({
    //         visible2: true,
    //     });
    // }
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


    showModal20 = (record) => {
        console.log(record)
        localStorage.setItem("monthcompid",record.id)
        localStorage.setItem("monthStr",record.monthStr)
        this.props.history.push("/seller/biddingadd")
    }


    render() {



        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/monthyear"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span><Breadcrumb.Item className="location">用电计划</Breadcrumb.Item>
                    </div>

                    <Row className={`priceBox`} style={{height: "auto",minHeight:1000}}>

                        <div className={`conBox`}>
                            <h2>竞价用电计划</h2>

                            <div className={"typebutton"}>
                                <div className={`clear`}></div>
                                {/*<Button type={"primary"} onClick={this.showModal}    >{"发布用电计划"}</Button>*/}
                                {/*<Button type="primary" style={{margin:"0 5%"}} onClick={this.showModal2} >{"发布竞价用电计划"}</Button>*/}
                            </div>
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
                        <Modal
                            title="用电计划"
                            visible={this.state.visible2}
                            onOk={this.handleOk2}
                            onCancel={this.handleCancel2}
                            destroyOnClose={true}
                            cancelText={"取消"}
                            okText={"确定"}
                            width={"80%"}
                        >
                            <List
                                // header={<div>当前计划</div>}
                                footer={<div>
                                    <Table columns={this.tableColumns2} dataSource={this.state.datamonth} pagination={false}/>
                                </div>}
                                bordered
                                dataSource={this.data2}
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