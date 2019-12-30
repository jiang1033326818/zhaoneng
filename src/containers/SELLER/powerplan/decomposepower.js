import React from 'react';
import {Layout, Breadcrumb, Row, Steps, Divider, Select,Table,LocaleProvider, Progress,Pagination,Button,Input,Modal,InputNumber} from 'antd';
import './powerplan.less';
import './buypower.less';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import zhCN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import api from "../../../api/tools";
import batteryIcon from '../../../components/icon/battery-circle.png';
import {message} from "antd/lib/index";


const {Content} = Layout;
const Option = Select.Option;
const Step = Steps.Step;


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

export default class decomposepower extends React.Component {
    constructor() {
        super();
        this.state = {
            location: '完善资料',
            activeKey: "1",
            status: '待审核',
            current: 0,
            value: 1,
            visible:false,
            visible2:false,
            data: [],
            stateyear: "2018",
            light: 9,
            lighttrue:10,
            everymonth: [
                {
                    name: '1月',
                    month: "01",
                },
                {
                    name: '2月',
                    month: "02",
                },
                {
                    name: '3月',
                    month: "03",
                }, {
                    name: '4月',
                    month: "04",
                },
                {
                    name: '5月',
                    month: "05",
                },
                {
                    name: '6月',
                    month: "06",
                },
                {
                    name: '7月',
                    month: "07",
                },
                {
                    name: '8月',
                    month: "08",
                },
                {
                    name: '9月',
                    month: "09",
                },
                {
                    name: '10月',
                    month: "10",
                },
                {
                    name: '11月',
                    month: "11",
                },
                {
                    name: '12月',
                    month: "12",
                },
            ],
            morendianliang:'',
            cusname:'',
            cusid:'',
            all:{
                power: null,
                spread: null,
                trade: 0,
            },
            all2:null,
            lianxirenlist: [
                {
                    name: "",
                    mobile: 0,
                }
            ],
            customerName:null,
            splitValue:null,
        }
    }

    getsplitlist(year,month){
        let headers3 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params3 = {
            customerName: this.state.customerName,
            splitValue: this.state.splitValue
        }

        //console.log(params)
        let url3 = "/api/split/list/"+year+"-"+month
        api.post(url3, headers3, params3,
            (res) => {
                console.log(res)
                this.setState({
                    data: res.content
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    getsplitnum(year,month){
        let headers3 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params3 = {

        }

        //console.log(params)
        let url3 = "/api/split/sum/"+year+"-"+month
        api.post(url3, headers3, params3,
            (res) => {
                console.log(res)
                this.setState({
                    all2: res.content
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    getsplitall(year,month){
        let headers3 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params3 = {

        }

        //console.log(params)
        let url3 = "/api/purchase/cost/"+year+"-"+month
        api.get(url3, headers3, params3,
            (res) => {
                console.log(res)
                this.setState({
                    all: res.content
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
            light2: month,
            light: month,
        })
        this.getsplitlist(year,month+1)
        this.getsplitall(year,month+1)
        this.getsplitnum(year,month+1)
    }
    changemonth = (e) => {
        console.log(e.target.id)
        this.setState({
            light: parseInt(e.target.id),
            loading: true,
        })
        setTimeout(() => {
            this.getsplitlist(this.state.stateyear,this.state.everymonth[this.state.light].month)
            this.getsplitall(this.state.stateyear,this.state.everymonth[this.state.light].month)
            this.getsplitnum(this.state.stateyear,this.state.everymonth[this.state.light].month)
        }, 500);
    }

    get cards(){
        return [{
            icon: batteryIcon,
            name: '已购电总量',
            num: this.state.all.power===null?0:this.state.all.power,
            unit: '万千瓦时'
        }, {
            icon: batteryIcon,
            name: '已分解电量',
            num: this.state.all2===null?0:this.state.all2.splitPower,
            unit: '万千瓦时'
        }, {
            icon: batteryIcon,
            name: '可分解电量',
            num: this.state.all.power===null?0:this.state.all2===null?0:this.state.all.power-this.state.all2.splitPower,
            unit: '万千瓦时'
        }, {
            icon: batteryIcon,
            name: '平均价差',
            num: this.state.all.spread===null?0:this.state.all.spread,
            unit: '厘/千瓦时'
        }]
    }
    get tableColumns() {
        return [ {
            title: '公司名称',
            dataIndex: 'customerName',
            key: 'customerName',
        }, {
            title: '申报电量',
            dataIndex: 'reportPower',
            key: 'reportPower',

        },
            {
                title: '结算电量',
                dataIndex: 'settlementPower',
                key: 'settlementPower',

            },
            {
                title: '负荷预测',
                dataIndex: 'bayesRidgePredict',
                key: 'bayesRidgePredict',

            },{
                title: '分解电量',
                dataIndex: 'splitPower',
                key: 'splitPower',

            },
            {
                title: '价差',
                dataIndex: 'spread',
                key: 'spread',


            },
            {
                title: '分解状态',
                dataIndex: 'splitPower',
                key: 'status',
                render: (record) => (
                    <span >
                        <span>{record===null?"未分解":"已分解"}</span>
                    </span>
                ),
            },

            {
                title: '操作' ,
                //dataIndex: 'companyName',
                key: 'other',

                render: (record) => (
                    <span >
                        <span  onClick={() =>this.showModal(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"分解电量"}</span>
                            <Divider type="vertical"/>
                        <span  onClick={() =>this.showModal3(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"修改价差"}</span>
                        <Divider type="vertical"/>
                        <span  onClick={() =>this.showModal2(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"查看联系人"}</span>
                    </span>
                ),
            },
        ];
    }


    handleChangetype=(e)=>{
        this.setState({
            splitValue: e==="1"?null:e==="2"?true:false,
        })
    }
    componyname=(e)=>{
        //console.log(e.target.value)
        this.setState({
            customerName: e.target.value,
        })
    }
    selectmonth=()=>{
        this.getsplitlist(this.state.stateyear,this.state.everymonth[this.state.light].month)
        this.getsplitall(this.state.stateyear,this.state.everymonth[this.state.light].month)
    }


    showModal=(record)=>{
        console.log(record)
        this.setState({
            visible:true,
            cusid:record.id,
            cusname:record.customerName,
            morendianliang:record.splitPower,
            newpower:record.splitPower,
        })
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    xiugaipower =(e)=>{
        this.setState({
            newpower:e
        })
    }
    handleOk = (e) => {

        let headers3 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params3 = this.state.newpower
        //console.log(params)
        let url3 = "/api/split/"+this.state.cusid+"/split"
        api.post(url3, headers3, params3,
            (res) => {
                message.success("修改成功")
                this.getsplitlist(this.state.stateyear,this.state.everymonth[this.state.light].month)
                this.getsplitall(this.state.stateyear,this.state.everymonth[this.state.light].month)
                this.getsplitnum(this.state.stateyear,this.state.everymonth[this.state.light].month)
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


    showModal3=(record)=>{
        console.log(record)
        this.setState({
            visible3:true,
            cusid:record.id,
            cusname:record.customerName,
            morenjiacha:record.spread,
            newpower:record.splitPower,
        })
    }
    handleCancel3 = (e) => {
        console.log(e);
        this.setState({
            visible3: false,
        });
    }
    xiugaijiacha =(e)=>{
        this.setState({
            newpower:e
        })
    }
    handleOk3 = (e) => {

        let headers3 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params3 = this.state.newpower
        //console.log(params)
        let url3 = "/api/split/"+this.state.cusid+"/spread"
        api.post(url3, headers3, params3,
            (res) => {
                message.success("修改成功")
                this.getsplitlist(this.state.stateyear,this.state.everymonth[this.state.light].month)
                this.getsplitall(this.state.stateyear,this.state.everymonth[this.state.light].month)
                this.getsplitnum(this.state.stateyear,this.state.everymonth[this.state.light].month)
            },
            (err) => {
                console.log("failed" + err)
            }
        );

        console.log(e);
        this.setState({
            visible3: false,
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


    render() {
        return (
            <Layout className="completeInfoLayout" locale={zhCN}>
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/decompose"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span><Breadcrumb.Item className="location">{"电量分解"}</Breadcrumb.Item>
                    </div>
                    {/*<div style={{margin: "20px 0"}}>*/}
                        {/*<span>年份:</span>*/}
                        {/*<Select defaultValue="2018" style={{width: 120, marginLeft: "2%"}}*/}
                                {/*onChange={this.handleChangeyear} className={`marginsel`}>*/}
                            {/*<Option value="2016">2016</Option>*/}
                            {/*<Option value="2017">2017</Option>*/}
                            {/*<Option value="2018">2018</Option>*/}
                            {/*<Option value="2019">2019</Option>*/}
                            {/*<Option value="2020">2020</Option>*/}
                            {/*<Option value="2021">2021</Option>*/}
                            {/*<Option value="2022">2022</Option>*/}
                            {/*<Option value="2023">2023</Option>*/}
                        {/*</Select>*/}
                    {/*</div>*/}
                    <Row className={`everymonth`}>
                        <div className={`everymonth1`}>
                            {
                                this.state.everymonth.map((value, key) => {
                                    return (
                                        <div className={key + " " + "everymonth2"} style={{
                                            background: key === this.state.light2 ?
                                                  "#00cc00" : "#d6d6d7"
                                        }}
                                        >
                                            <b className={key}>{value.name} <span
                                                className={key}>{key === this.state.light2 ?
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


                    {/* 内容 */}
                    <div style={{background: '#fff', padding: 24, minHeight: 762}} className="completeInfoContent">
                        <div className={`allBox`}>
                            <h2 style={{
                                marginTop: "10px",
                                textAlign: "center"
                            }}>{this.state.stateyear + this.state.everymonth[this.state.light].month + "月   电量分解"}</h2>
                            <Divider/>

                            <div className={`secendcss`}>
                                <h4>申报进度</h4>
                            </div>
                            <div className={`currcss`}>
                                <Steps current={this.state.current}>
                                    <Step title="企业申报用电计划" description={
                                        <div>
                                            <p>电力交易员:{"张三"}</p>
                                            <p>{
                                                " 2018-10-17"
                                            }</p>
                                        </div>
                                    }/>
                                    <Step title="分解电量" description={
                                        <div>
                                            <p>进行中.....完成度({"50%"})</p>
                                            <Progress percent={50} status="active"/>
                                        </div>
                                    }/>
                                    <Step title="分解完成" description={
                                        <div>
                                            {/*<p>电力交易员:{"张三"}</p>*/}
                                            {/*<p>{*/}
                                                {/*" 2018-10-17"*/}
                                            {/*}</p>*/}
                                        </div>
                                    }/>
                                </Steps>
                            </div>
                            <Divider/>
                            <div className={`secendcss3`}>
                                <h4>用电企业申报明细</h4>
                            </div>

                            <b>申报状态:</b>
                            <Select defaultValue="1" style={{width: 120}} onChange={this.handleChangetype}
                                    className={`marginsel`}>
                                <Option value="1">全部</Option>
                                <Option value="2">已完成</Option>
                                <Option value="3">未完成</Option>
                            </Select>


                            <span>公司名:</span>
                            <Input onChange={this.componyname} style={{width: 240}} placeholder={"输入要查询的公司名称"}/>
                            <Button type={"primary"} onClick={this.selectmonth}>{"查询"}</Button>
                        </div>
                        <div style={{margin:"20px 2%"}}>
                            <Table columns={this.tableColumns} dataSource={this.state.data}  scroll={{ x: 1520 }} pagination={false}/>
                            <div style={{margin:"20px  0", float:"right"}}>
                                {/*<Pagination total={this.state.count}  defaultCurrent={1} onChange={this.Paging} />*/}
                                <LocaleProvider locale={zhCN}>
                                    <Pagination
                                        total={this.state.data.length}
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
                            title="分解电量"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            destroyOnClose
                            onCancel={this.handleCancel}
                        >
                            <p className={`userstatus`}>分解 <span>{this.state.cusname}</span>的电量</p>
                            <InputNumber min={0} max={100000000000} defaultValue={this.state.morendianliang}
                                         style={{width: 200}}
                                         className={`userstatus`} onChange={this.xiugaipower}/>
                            <span>万千万时</span>
                        </Modal>


                        <Modal
                            title="修改价差"
                            visible={this.state.visible3}
                            onOk={this.handleOk3}
                            destroyOnClose
                            onCancel={this.handleCancel3}
                        >
                            <p className={`userstatus`}>修改 <span>{this.state.cusname}</span>的价差</p>
                            <InputNumber min={-10} max={10}  step={0.001} defaultValue={this.state.morenjiacha}
                                         style={{width: 200}}
                                         className={`userstatus`} onChange={this.xiugaijiacha}/>
                            <span>元</span>
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

                    </div>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )
    }
}