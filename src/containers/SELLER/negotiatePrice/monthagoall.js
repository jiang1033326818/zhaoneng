import React from 'react';
import {
    Layout,
    Breadcrumb,
    Row,
    Form,
    Table,
    Pagination,
    Button,
    Select,
    Input,
    LocaleProvider,
    Divider,
    Steps,
    Progress,
    Modal,
    InputNumber,
    Spin,
    message
} from 'antd';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import "./useplanless.less"
import api from "../../../api/tools"
import zhCN from "antd/lib/locale-provider/zh_CN";

const {Content} = Layout;
const Option = Select.Option;
const Step = Steps.Step;


class selleruseplan extends React.Component {
    state = {
        page: 1,
        size: 10,
        loading: false,
        visible: false,
        data: [],
        current: 1,
        monthdata: [],
        compdata: [],
        count: 0,
        stateyear: "2018",
        statemonth: "all",
        datamonth: '',
        detidata: '',
        company2: '',
        everymonth: [
            {
                name: '1月',
                month: "-01",
            },
            {
                name: '2月',
                month: "-02",
            },
            {
                name: '3月',
                month: "-03",
            }, {
                name: '4月',
                month: "-04",
            },
            {
                name: '5月',
                month: "-05",
            },
            {
                name: '6月',
                month: "-06",
            },
            {
                name: '7月',
                month: "-07",
            },
            {
                name: '8月',
                month: "-08",
            },
            {
                name: '9月',
                month: "-09",
            },
            {
                name: '10月',
                month: "-10",
            },
            {
                name: '11月',
                month: "-11",
            },
            {
                name: '12月',
                month: "-12",
            },
        ],
        light: 9,
        customerName: "",
        customerName2: "",
        morenpower: 0,
        newpower: 0,
        datamessage: {
            bilateralPower: null,
            done: 0,
            planPower: null,
            settlementPower: null,
            splitPower: null,
            total: 0,
        },
        lianxirenlist: [
            {
                name: "",
                mobile: 0,
            }
        ],
        datanotice: "",
        isDone: null,
    }

    getyeardata() {
        let headers = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params = null
        //console.log(params)
        let url = '/api/gather/' + this.state.stateyear + '/bidding'
        api.get(url, headers, params,
            (res) => {
                console.log(res, '十二个月')
                this.setState({
                    everymonth: [
                        {
                            name: '1月',
                            month: "-01",
                            status: res.content.situationEnums[0],
                        },
                        {
                            name: '2月',
                            month: "-02",
                            status: res.content.situationEnums[1],
                        },
                        {
                            name: '3月',
                            month: "-03",
                            status: res.content.situationEnums[2],
                        }, {
                            name: '4月',
                            month: "-04",
                            status: res.content.situationEnums[3],
                        },
                        {
                            name: '5月',
                            month: "-05",
                            status: res.content.situationEnums[4],
                        },
                        {
                            name: '6月',
                            month: "-06",
                            status: res.content.situationEnums[5],
                        },
                        {
                            name: '7月',
                            month: "-07",
                            status: res.content.situationEnums[6],
                        },
                        {
                            name: '8月',
                            month: "-08",
                            status: res.content.situationEnums[7],
                        },
                        {
                            name: '9月',
                            month: "-09",
                            status: res.content.situationEnums[8],
                        },
                        {
                            name: '10月',
                            month: "-10",
                            status: res.content.situationEnums[9],
                        },
                        {
                            name: '11月',
                            month: "-11",
                            status: res.content.situationEnums[10],
                        },
                        {
                            name: '12月',
                            month: "-12",
                            status: res.content.situationEnums[11],
                        },
                    ],
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    getmonth1() {
        let headers2 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params2 = null
        //console.log(params)
        let url2 = '/api/gather/' + this.state.stateyear + this.state.everymonth[this.state.light].month + '/statistics'
        api.get(url2, headers2, params2,
            (res) => {
                console.log(res)
                this.setState({
                    datamessage: res.content,
                    loading: false,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    getmonth2() {
        let headers3 = {
            'Authorization': sessionStorage.obj,
        }
        let params3 = {
            customerName: this.state.customerName,
            //isBidding: true,
            isDone: this.state.isDone,
            pageNo: this.state.page,
            pageSize: this.state.size,
        };
        //console.log(params)
        let url3 = "/api/gather/list/" + this.state.stateyear + this.state.everymonth[this.state.light].month
        api.post(url3, headers3, params3,
            (res) => {
                this.setState({
                    data: res.content.content,
                    count: res.content.total,
                    loading: false,

                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    getmonth3() {
        let headers4 = {
            'Authorization': sessionStorage.obj,
        }
        let params4 = {
            // month:this.state.stateyear+this.state.everymonth[this.state.light].month
        };
        //console.log(params)
        let url4 = "/api/gather/" + this.state.stateyear + this.state.everymonth[this.state.light].month + "/notice"
        api.get(url4, headers4, params4,
            (res) => {
                function getLocalTime(timestamp) {
                    let date = new Date(timestamp - 28800000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    let D = date.getDate() + ' ';
                    let h = date.getHours() + ':';
                    let m = date.getMinutes() + ':';
                    let s = date.getSeconds();
                    return Y + M + D + h + m + s;
                }

                res.content.createTime = getLocalTime(res.content.createTime)
                res.content.updateTime = getLocalTime(res.content.closingTime)
                this.setState({
                    datanotice: res.content,
                    loading: false,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    componentDidMount() {
        let date = new Date;
        let year = date.getFullYear();
        let month = date.getMonth();
        this.setState({
            stateyear: year,
            light: month,
        })
        this.getyeardata()
        this.getmonth1()
        this.getmonth2()
        this.getmonth3()
    }

    get tableColumns() {
        return [{
            title: '公司名称',
            dataIndex: 'customerName',
            key: 'customerName',
        }, {
            title: '申报电量',
            dataIndex: 'reportPower',
            key: 'reportPower',
            render: (index) => (
                <span>
                        <span>{index === null ? "0" : index}</span>
                    </span>
            ),
        },
            {
                title: '结算电量',
                dataIndex: 'settlementPower',
                key: 'settlementPower',
                render: (index) => (
                    <span>
                        <span>{index === null ? "0" : index}</span>
                    </span>
                ),
            },
            {
                title: '分解电量',
                dataIndex: 'splitPower',
                key: 'splitPower',
                render: (index) => (
                    <span>
                        <span>{index === null ? "0" : index}</span>
                    </span>
                ),
            }, {
                title: '长协电量',
                dataIndex: 'bilateralPower',
                key: 'bilateralPower',
                render: (index) => (
                    <span>
                        <span>{index === null ? "0" : index}</span>
                    </span>
                ),
            },
            // {
            //     title: '填报人',
            //     dataIndex: 'companyName',
            //     key: 'companyName',
            // },{
            //     title: '填报电话',
            //     dataIndex: 'companyName',
            //     key: 'companyName',
            // },{
            //     title: '销售',
            //     dataIndex: 'companyName',
            //     key: 'companyName',
            // },
            // {
            //     title: '销售电话',
            //     dataIndex: 'companyName',
            //     key: 'companyName',
            // },
            {
                title: '申报状态',
                dataIndex: 'isDone',
                key: 'isDone',
                render: (index) => (
                    <span>
                        <span>{index === true ? "已完成" : "未完成"}</span>
                    </span>
                ),
            },
            {
                title: '操作',
                //dataIndex: 'customerId',
                key: 'action',
                render: (record) => (
                    <span>
                        <span onClick={() => this.showModal(record)}
                              style={{color: "#1890FF", cursor: "pointer"}}>{"修改电量"}</span>
                         <Divider type="vertical"/>
                        <span onClick={() => this.showModal2(record)}
                              style={{color: "#1890FF", cursor: "pointer"}}>{"查看联系人"}</span>
                    </span>
                ),
            },


        ];
    }

    showModal = (record) => {
        console.log(record)
        this.setState({
            visible: true,
            customerName2: record.customerName,
            morenpower: record.planPower,
            newpower: record.planPower,
            morenid: record.id,
        });

    }

    handleOk = (e) => {

        let headers3 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params3 = this.state.newpower
        //console.log(params)
        let url3 = "/api/gather/" + this.state.morenid + "/bidding/update"
        api.post(url3, headers3, params3,
            (res) => {
                message.success("修改成功")
                console.log(res)
                this.getmonth1()
                this.getmonth2()
                this.getmonth3()
            },
            (err) => {
                console.log("failed" + err)
            }
        );

        console.log(e);
        this.setState({
            visible: false,
        });

    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    showModal2 = (record) => {
        console.log(record, 3333)
        let _ = this
        _.setState({
            visible2: true,
        });

        let headers3 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params3 = {}

        //console.log(params)
        let url3 = "/api/customer/" + record.customerId + "/contact"
        api.get(url3, headers3, params3,
            (res) => {
                console.log(res)
                this.setState({
                    lianxirenlist: res.content
                })
                this.getmonth2()
            },
            (err) => {
                console.log("failed" + err)
            }
        );


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
    xiugaipower = (e) => {
        console.log(e)
        this.setState({
            newpower: e,
        })
    }


    handleChange = (e) => {
        this.setState({
            isDone: e === "2" ? true : e === '3' ? false : null
        })
    }
    handleChange2 = (e) => {
        this.setState({
            statemonth: e
        })
    }
    componyname = (e) => {
        this.setState({
            customerName: e.target.value
        })
    }
    selectmonth = (e) => {
        this.setState({
            loading: true,
        })
        this.getmonth1()
        this.getmonth2()
        this.getmonth3()
    }
    Paging = (e) => {
        this.setState({
            page:e
        })
        setTimeout(() => {
            this.getmonth1()
            this.getmonth2()
            this.getmonth3()
        },500)

    }
    onShowSizeChange = (current, pageSize) => {
        console.log(current)
        this.setState({
            size:pageSize
        })
        setTimeout(() => {
            this.getmonth1()
            this.getmonth2()
            this.getmonth3()
        },500)
    }

    changemonth = (e) => {
        console.log(e.target.id)
        this.setState({
            light: parseInt(e.target.id),
            loading: true,
        })
        setTimeout(() => {
            this.getmonth1()
            this.getmonth2()
            this.getmonth3()
        }, 500);
    }
    handleChangeyear = (e) => {
        this.setState({
            stateyear: e,
            loading: true
        })
        setTimeout(() => {
            this.getyeardata()
            this.getmonth1()
            this.getmonth2()
            this.getmonth3()
        }, 500);
    }
    toCenter = () => {
        window.open("https://pm.gd.csg.cn/views/index.html");
    }

    render() {
        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/monthstatistics"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    <Spin spinning={this.state.loading} size="large">
                        {/* 面包屑 */}
                        <div style={{margin: '16px 0'}}>
                            <span>您当前的位置:   </span><Breadcrumb.Item className="location">用电申报 / 月度用电申报</Breadcrumb.Item>
                        </div>
                        <div style={{margin: "20px 0"}}>
                            <span>年份:</span>
                            <Select defaultValue="2018" style={{width: 120, marginLeft: "2%"}}
                                    onChange={this.handleChangeyear} className={`marginsel`}>
                                <Option value="2016">2016</Option>
                                <Option value="2017">2017</Option>
                                <Option value="2018">2018</Option>
                                <Option value="2019">2019</Option>
                                <Option value="2020">2020</Option>
                                <Option value="2021">2021</Option>
                                <Option value="2022">2022</Option>
                                <Option value="2023">2023</Option>
                            </Select>
                        </div>
                        <Row className={`everymonth`}>
                            <div className={`everymonth1`}>
                                {
                                    this.state.everymonth.map((value, key) => {
                                        return (
                                            <div className={key + " " + "everymonth2"} style={{
                                                background: value.status === "NOT_STARTED" ?
                                                    "#d6d6d7" : value.status === "COMPLETED" ? "#44b5fc" : value.status === "UNDERWAY" ? "#00cc00" : "#d6d6d7"
                                            }}

                                            >
                                                <b className={key}>{value.name} <span
                                                    className={key}>{value.status === "NOT_STARTED" ? "未开始" : value.status === "COMPLETED" ? "已完成" : value.status === "UNDERWAY" ?
                                                    "进行中" : "无数据"}</span></b>
                                                <div className={'everymonth3'} onClick={this.changemonth} id={key}
                                                     style={{border: this.state.light === key ? "3px solid #44b5fc" : "none"}}
                                                >

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Row>


                        <Row className={`priceBox`} style={{height: "auto", minHeight: 1000}}>

                            <div className={`allBox`}>
                                <h2 style={{
                                    marginTop: "10px",
                                    textAlign: "center"
                                }}>{this.state.stateyear + this.state.everymonth[this.state.light].month + "月   月度用电需求申报"}</h2>
                                <Divider/>

                                <div className={`secendcss`}>
                                    <h4>申报进度</h4>
                                </div>
                                <div className={`currcss`}>
                                    <Steps current={this.state.current}>
                                        <Step title="发布月竞申报任务" description={
                                            <div>
                                                <p>电力交易员:{this.state.datanotice.tenantName}</p>
                                                <p>{
                                                    this.state.datanotice.createTime
                                                }</p>
                                            </div>
                                        }/>
                                        <Step title="填写详细信息" description={
                                            <div>
                                                <p>进行中.....完成度({this.state.datamessage.done === null ? "0%" : this.state.datamessage.done / this.state.datamessage.total * 100 + "%"})</p>
                                                <Progress
                                                    percent={this.state.datamessage.done === null ? 0 : this.state.datamessage.done / this.state.datamessage.total * 100}
                                                    status="active"/>
                                            </div>
                                        }/>
                                        <Step title="申报结束" description={
                                            <div>
                                                <p>电力交易员:{this.state.datanotice.tenantName}</p>
                                                <p>{
                                                    this.state.datanotice.updateTime
                                                }</p>
                                            </div>
                                        }/>
                                    </Steps>
                                </div>


                                <Divider/>
                                <div className={`secendcss2`}>
                                    <h4>用电企业申报汇总</h4>
                                </div>

                                <div className={`manytitle`}>
                                    <div className={`manytitle0`} style={{width: "10%"}}>
                                        <h4>任务总数</h4>
                                        <p>{this.state.datamessage.total}家</p>
                                    </div>
                                    {/*<Divider type="vertical" style={{height:"50px"}}/>*/}
                                    <div className={`manytitle0`} style={{width: "10%"}}>
                                        <h4>完成度</h4>
                                        <p>{this.state.datamessage.done === null ? "0%" : this.state.datamessage.done / this.state.datamessage.total * 100 + "%"}</p>
                                    </div>
                                    {/*<Divider type="vertical" style={{height:"50px"}}/>*/}
                                    <div className={`manytitle0`}>
                                        <h4>申报总电量</h4>
                                        <p>{this.state.datamessage.planPower === null ? "0" : this.state.datamessage.planPower}万千瓦时</p>
                                    </div>
                                    {/*<Divider type="vertical" style={{height:"50px"}}/>*/}
                                    <div className={`manytitle0`}>
                                        <h4>长协分解总电量</h4>
                                        <p>{this.state.datamessage.bilateralPower === null ? "0" : this.state.datamessage.bilateralPower}万千瓦时</p>
                                    </div>
                                    {/*<Divider type="vertical" style={{height:"50px"}}/>*/}
                                    <div className={`manytitle0`}>
                                        <h4>已分解电量</h4>
                                        <p>{this.state.datamessage.splitPower === null ? "0" : this.state.datamessage.splitPower}万千瓦时</p>
                                    </div>
                                    {/*<Divider type="vertical" style={{height:"50px"}}/>*/}
                                    <div className={`manytitle0`}>
                                        <h4>可参与月竞电量</h4>
                                        <p>{this.state.datamessage.settlementPower === null ? "0" : this.state.datamessage.settlementPower}万千瓦时</p>
                                    </div>
                                    <div className={`manytitle1`}>
                                        <h4>系统建议</h4>
                                        <div>
                                            <p style={{color: this.state.datamessage.settlementPower > 0 ? "#000000" : this.state.datamessage.settlementPower < 0 ? "#FF6E0E" : "#00CC00"}}>{this.state.datamessage.settlementPower > 0 ? "参与月度集中竞价" : this.state.datamessage.settlementPower < 0 ? "转让购电合同" : "供需平衡"}</p>
                                            <Button type={"primary"} onClick={this.toCenter}
                                                    className={"tocenter"}>{"去交易中心"}</Button>
                                        </div>
                                    </div>


                                </div>

                                <Divider/>
                                <div className={`secendcss3`}>
                                    <h4>用电企业申报明细</h4>
                                </div>

                                <b>申报状态:</b>
                                <Select defaultValue="1" style={{width: 120}} onChange={this.handleChange}
                                        className={`marginsel`}>
                                    <Option value="1">全部</Option>
                                    <Option value="2">已完成</Option>
                                    <Option value="3">未完成</Option>
                                </Select>
                                {/*<span>参与竞价:</span>*/}
                                {/*<Select defaultValue="all" style={{width: 120}} onChange={this.handleChange2} className={`marginsel`}>*/}
                                {/*<Option value="all">全部</Option>*/}
                                {/*<Option value="01">是</Option>*/}
                                {/*<Option value="02">否</Option>*/}
                                {/*</Select>*/}
                                <span>公司名:</span>
                                <Input onChange={this.componyname} style={{width: 240}} placeholder={"输入要查询的公司名称"}/>
                                <Button type={"primary"} onClick={this.selectmonth}>{"查询"}</Button>
                            </div>
                            <div style={{margin: "20px 2%"}}>
                                <Table columns={this.tableColumns} dataSource={this.state.data} pagination={false}/>
                                <div style={{margin: "20px  0", float: "right"}}>
                                    {/*<Pagination total={this.state.count}  defaultCurrent={1} onChange={this.Paging} />*/}
                                    <LocaleProvider locale={zhCN}>
                                        <Pagination
                                            total={this.state.count}
                                            showTotal={total => `总共 ${total === null ? 0 : total} 项`}
                                            defaultCurrent={1}
                                            showSizeChanger
                                            pageSizeOptions={['10', '20', '50']}
                                            onShowSizeChange={this.onShowSizeChange}
                                            showQuickJumper
                                            onChange={this.Paging}
                                            className="pageNations"
                                        />
                                    </LocaleProvider>
                                </div>
                            </div>


                            <Modal
                                title="修改申报电量"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                destroyOnClose
                                onCancel={this.handleCancel}
                            >
                                <p className={`userstatus`}>修改 <span>{this.state.customerName2}</span>的电量</p>
                                <InputNumber min={0} max={100000000000} defaultValue={this.state.morenpower}
                                             style={{width: 200}}
                                             className={`userstatus`} onChange={this.xiugaipower}/>
                                <span>万千万时</span>
                            </Modal>


                            <Modal
                                title="查看联系人"
                                visible={this.state.visible2}
                                onOk={this.handleOk2}
                                destroyOnClose
                                onCancel={this.handleCancel2}
                            >
                                <div>
                                    <div style={{display: "flex"}}>
                                        <div style={{fontWeight: "bold", width: "10%"}}>{"姓名"}</div>
                                        <div style={{marginLeft: "10%", fontWeight: "bold", width: "20%"}}>电话</div>
                                        <div style={{marginLeft: "10%", fontWeight: "bold", width: "45%"}}>邮箱</div>
                                    </div>
                                </div>
                                <div>
                                    {
                                        this.state.lianxirenlist.map((value, key) => {
                                            return (
                                                <div style={{display: "flex"}} key={key}>
                                                    <div style={{width: "10%"}}>{value.name}</div>
                                                    <div style={{marginLeft: "10%", width: "20%"}}>{value.mobile}</div>
                                                    <div style={{marginLeft: "10%", width: "45%"}}>{value.email}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </Modal>

                        </Row>
                    </Spin>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )


    }
}

export default Form.create()(selleruseplan)