import React from 'react';
import {Layout, Breadcrumb, Row, Form, Table,Pagination,Button,Select,Input,LocaleProvider,Divider,Steps,Progress,Modal,InputNumber,Spin,message } from 'antd';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import "./useplanless.less"
import api from "../../../api/tools"
import zhCN from "antd/lib/locale-provider/zh_CN";

const {Content} = Layout;
const Option = Select.Option;
const Step = Steps.Step;

let newpowerup=[0,0,0,0,0,0,0,0,0,0,0,0];

class selleruseplan extends React.Component {
    state = {
        page:1,
        size: 10,
        loading: false,
        visible: false,
        data:[],
        monthdata:[],
        compdata:[],
        count:0,
        current:1,
        stateyear:2018,
        statemonth:"all",
        datamonth:'',
        detidata:'',
        company2: '',
        light:8,
        customerName:"",
        customerName2:"",
        morenpower:0,
        newpower:0,
        lianxirenlist:[
            {
                name:"",
                mobile:0,
            }
        ],
        datanotice:"",
        isDone:null,
        notice:{},
        morenlist:[
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
            {
                bilateralPower:0
            },
        ],
        all:{
            powerDtos:[
                {
                    planpower:0
                },
                {
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },{
                    planpower:0
                },


            ],
        }

    }

    getyearlist=()=>{
        let headers3={
            'Authorization': sessionStorage.obj,
        }
        let params3 = {
            customerName: this.state.customerName,
            //isBidding: true,
            isDone: this.state.isDone,
            pageNo: this.state.page,
            pageSize: this.state.size,
            settlementValue: true,
            splitValue: true
        };
        //console.log(params)
        let url3 ="/api/gather/list/"+this.state.stateyear
        api.post(url3, headers3, params3,
            (res) => {

                this.setState({
                    data:res.content.content,
                    count:res.content.total,
                    loading:false,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }
    gettitlenum=()=>{
        let headers3={
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        // let params3 ={
        //     year:this.state.stateyear
        // }
        let params3={

        }
        //console.log(params)
        let url3 ="/api/gather/"+this.state.stateyear+"/statistics"
        api.get(url3, headers3, params3,
            (res) => {

                this.setState({
                    all:res.content,
                    loading:false,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }
    getnotice=()=>{
        let headers3={
            'Authorization': sessionStorage.obj,
        }
        let params3 = {

        };
        //console.log(params)
        let url3 ="/api/gather/"+this.state.stateyear+"/bilateral/notice"
        api.get(url3, headers3, params3,
            (res) => {
                function getLocalTime(timestamp) {
                    let date = new Date(timestamp-28800000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    let D = date.getDate() + ' ';
                    let h = date.getHours() + ':';
                    let m = date.getMinutes() + ':';
                    let s = date.getSeconds();
                    return Y+M+D+h+m+s;
                }
                res.content.createTime=getLocalTime(res.content.createTime)
                res.content.updateTime=getLocalTime(res.content.updateTime)
                this.setState({
                    datanotice:res.content,
                    loading:false,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }
    componentDidMount() {
        let date =new Date;
        let year = date.getFullYear();
       // let month = date.getMonth();
        this.setState({
            stateyear:year,
            //light:month,
        })

        console.log(this.state)

       this.getyearlist()
        this.gettitlenum()
        this.getnotice()
    }

    handleChangeyear =(e)=>{
        this.setState({
            stateyear:e,
            loading:true,
        })
        setTimeout(() => {
            this.getyearlist()
            this.gettitlenum()
        }, 500);

    }

    get tableColumns() {
        return [ {
            title: '公司名称',
            dataIndex: 'customerName',
            key: 'customerName',
            width: 150,
            fixed: 'left',
        }, {
            title: '申报电量',
            dataIndex: 'planPower',
            key: 'planPower',
            width: 100,
            fixed: 'left',
        },
            {
                title: '结算电量',
                dataIndex: 'settlementPower',
                key: 'settlementPower',
                width: 100,
                fixed: 'left',
            },
            {
                title: '分解电量',
                dataIndex: 'splitPower',
                key: 'splitPower',
                width: 100,
                fixed: 'left',
            },{
                title: '长协电量',
                dataIndex: 'bilateralPower',
                key: 'bilateralPower',
                width: 100,
                fixed: 'left',
            },
            {
                title: '申报状态',
                dataIndex: 'status',
                key: 'status',
                width: 100,
                fixed: 'left',
                render: (index) => (
                    <span >
                        <span >{index===true?"已完成":"未完成"}</span>
                    </span>
                ),
            },
            {
                title: '一月',
                dataIndex: 'powerDtos[0].bilateralPower',
                key: 'powerDtos[0].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '二月',
                dataIndex: 'powerDtos[1].bilateralPower',
                key: 'powerDtos[1].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '三月',
                dataIndex: 'powerDtos[2].bilateralPower',
                key: 'powerDtos[2].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '四月',
                dataIndex: 'powerDtos[3].bilateralPower',
                key: 'powerDtos[3].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '五月',
                dataIndex: 'powerDtos[4].bilateralPower',
                key: 'powerDtos[4].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '六月',
                dataIndex: 'powerDtos[5].bilateralPower',
                key: 'powerDtos[5].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '七月',
                dataIndex: 'powerDtos[6].bilateralPower',
                key: 'powerDtos[6].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '八月',
                dataIndex: 'powerDtos[7].bilateralPower',
                key: 'powerDtos[7].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '九月',
                dataIndex: 'powerDtos[8].bilateralPower',
                key: 'powerDtos[8].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '十月',
                dataIndex: 'powerDtos[9].bilateralPower',
                key: 'powerDtos[9].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '十一月',
                dataIndex: 'powerDtos[10].bilateralPower',
                key: 'powerDtos[10].bilateralPower',
                width: 150,
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '十二月',
                dataIndex: 'powerDtos[11].bilateralPower',
                key: 'powerDtos[11].bilateralPower',
                render: (index) => (
                    <span >
                        <span >{index===null?"0":index}</span>
                    </span>
                ),
            },
            {
                title: '操作' ,
                //dataIndex: 'companyName',
                key: 'other',
                fixed: 'right',
                width: 200,
                render: (record) => (
                    <span >
                        <span  onClick={() =>this.showModal(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"修改电量"}</span>
                            <Divider type="vertical"/>
                            {/*<span  onClick={() =>this.showModal2(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"修改状态"}</span>*/}
                         {/*<Divider type="vertical"/>*/}
                        <span  onClick={() =>this.showModal2(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"查看联系人"}</span>
                    </span>
                ),
            },
        ];
    }

    showModal = (record) => {
        console.log(record)
        this.setState({
            visible: true,
            customerName2:record.customerName,
            morenpower:record.planPower,
            newpower:record.planPower,
            morenid:record.id,
            morenlist:record.powerDtos,

        });
        newpowerup=[0,0,0,0,0,0,0,0,0,0,0,0];

    }

    handleOk = (e) => {

        let headers3={
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params3 = newpowerup
        //console.log(params)
        let url3 ="/api/gather/"+this.state.morenid+"/bilateral/update"
        api.post(url3, headers3, params3,
            (res) => {
                message.success('修改成功')
                console.log(res)
                this.getyearlist()
                this.gettitlenum()
                this.getnotice()
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
        console.log(record,3333)
        let _=this
        _.setState({
            visible2: true,
        });

        let headers3={
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params3 = {

        }

        //console.log(params)
        let url3 ="/api/customer/"+record.customerId+"/contact"
        api.get(url3, headers3, params3,
            (res) => {
                console.log(res)
                this.setState({
                    lianxirenlist:res.content
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
    xiugaipower =(e)=>{
        console.log(e)
        newpowerup[0]=e
    }
    xiugaipower2 =(e)=>{
        console.log(e)
        newpowerup[1]=e
    }
    xiugaipower3 =(e)=>{
        console.log(e)
        newpowerup[2]=e
    }
    xiugaipower4 =(e)=>{
        console.log(e)
        newpowerup[3]=e
    }
    xiugaipower5 =(e)=>{
        console.log(e)
        newpowerup[4]=e
    }
    xiugaipower6 =(e)=>{
        console.log(e)
        newpowerup[5]=e
    }
    xiugaipower7 =(e)=>{
        console.log(e)
        newpowerup[6]=e
    }
    xiugaipower8 =(e)=>{
        console.log(e)
        newpowerup[7]=e
    }
    xiugaipower9 =(e)=>{
        console.log(e)
        newpowerup[8]=e
    }
    xiugaipower10 =(e)=>{
        console.log(e)
        newpowerup[9]=e
    }
    xiugaipower11 =(e)=>{
        console.log(e)
        newpowerup[10]=e
    }
    xiugaipower12 =(e)=>{
        console.log(e)
        newpowerup[11]=e
    }

    handleChange = (e) =>{
        this.setState({
            isDone:e==="2"?true:e==='3'?false:null
        })
    }

    componyname= (e) =>{
        this.setState({
            customerName:e.target.value
        })
    }
    selectmonth= (e) =>{
        this.setState({
            loading:true,
        })
        this.getyearlist()
        this.gettitlenum()
        this.getnotice()
    }
    Paging = (e)=>{
        this.setState({
            page:e
        })
        setTimeout(() => {
            this.getyearlist()
            this.gettitlenum()
            this.getnotice()
        }, 500);
    }
    onShowSizeChange = (current,pageSize)=>{
        this.setState({
            size:pageSize
        })
        setTimeout(() => {
            this.getyearlist()
            this.gettitlenum()
            this.getnotice()
        }, 500);
    }


    render() {
        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/statistics"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <Spin spinning={this.state.loading} size="large" >
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span><Breadcrumb.Item className="location">用电申报 / 年度用电申报</Breadcrumb.Item>
                    </div>
                    <div style={{margin:"20px 0"}}>
                        <span>年份:</span>
                        <Select defaultValue="2018" style={{width: 120,marginLeft:"2%"}} onChange={this.handleChangeyear} className={`marginsel`}>
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
                    <Row className={`priceBox`} style={{height: "auto",minHeight:1000}}>

                        <div className={`allBox`}>
                            <h2 style={{marginTop:"10px",textAlign:"center"}}>{this.state.stateyear+"年度用电需求申报"}</h2>
                            <Divider/>

                            <div className={`secendcss`}>
                                <h4>申报进度</h4>
                            </div>
                            <div className={`currcss`}>
                                <Steps current={this.state.current}>
                                    <Step title="发布年度申报任务" description={
                                        <div>
                                            <p>电力交易员:{this.state.datanotice.tenantName}</p>
                                            <p>{
                                                this.state.datanotice.createTime
                                            }</p>
                                        </div>
                                    }/>
                                    <Step title="用电企业填报电量" description={
                                        <div>
                                            <p>进行中.....完成度({this.state.all===null?"0%":this.state.all.done===null?"0":this.state.all.done/this.state.all.total*100+"%"})</p>
                                            <Progress percent={this.state.all.done===null?0:this.state.all.done/this.state.all.total*100} status="active" />
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
                                <div className={`manytitle0`}>
                                    <h4>任务总数</h4>
                                    <p>{this.state.all.total===null?"0%":this.state.all.total}家</p>
                                </div>
                                {/*<Divider type="vertical" style={{height:"50px"}}/>*/}
                                <div className={`manytitle0`}>
                                    <h4>完成度</h4>
                                    <p>{this.state.all.done===null?"0%":this.state.all===null?"0":this.state.all.done/this.state.all.total*100+"%"}</p>
                                </div>
                                {/*<Divider type="vertical" style={{height:"50px"}}/>*/}
                                <div className={`manytitle0`}>
                                    <h4>申报总电量</h4>
                                    <p>{this.state.all.planPower}</p>
                                </div>
                                {/*<Divider type="vertical" style={{height:"50px"}}/>*/}
                                <div style={{width:"100%"}}>
                                    <div className={'month6'}>
                                        <div className={`manytitle2`}>
                                            <h4>一月</h4>
                                            <p>{this.state.all.powerDtos[0].planPower===null?"0":this.state.all.powerDtos[0].planPower}</p>
                                        </div>
                                        <div className={`manytitle2`}>
                                            <h4>二月</h4>
                                            <p>{this.state.all.powerDtos[1].planPower===null?"0":this.state.all.powerDtos[1].planPower}</p>
                                        </div>
                                        <div className={`manytitle2`}>
                                            <h4>三月</h4>
                                            <p>{this.state.all.powerDtos[2].planPower===null?"0":this.state.all.powerDtos[2].planPower}</p>
                                        </div>
                                        <div className={`manytitle2`}>
                                            <h4>四月</h4>
                                            <p>{this.state.all.powerDtos[3].planPower===null?"0":this.state.all.powerDtos[3].planPower}</p>
                                        </div>
                                        <div className={`manytitle2`}>
                                            <h4>五月</h4>
                                            <p>{this.state.all.powerDtos[4].planPower===null?"0":this.state.all.powerDtos[4].planPower}</p>
                                        </div>
                                        <div className={`manytitle2`}>
                                            <h4>六月</h4>
                                            <p>{this.state.all.powerDtos[5].planPower===null?"0":this.state.all.powerDtos[5].planPower}</p>
                                        </div>
                                    </div>
                                    <div style={{clear:"both"}}></div>
                                    <div className={'month6'}>
                                        <div className={`manytitle2`}>
                                            <h4>七月</h4>
                                            <p>{this.state.all.powerDtos[6].planPower===null?"0":this.state.all.powerDtos[6].planPower}</p>
                                        </div>
                                        <div className={`manytitle2`}>
                                            <h4>八月</h4>
                                            <p>{this.state.all.powerDtos[7].planPower===null?"0":this.state.all.powerDtos[7].planPower}</p>
                                        </div>
                                        <div className={`manytitle2`}>
                                            <h4>九月</h4>
                                            <p>{this.state.all.powerDtos[8].planPower===null?"0":this.state.all.powerDtos[8].planPower}</p>
                                        </div>
                                        <div className={`manytitle2`}>
                                            <h4>十月</h4>
                                            <p>{this.state.all.powerDtos[9].planPower===null?"0":this.state.all.powerDtos[9].planPower}</p>
                                        </div>
                                        <div className={`manytitle2`}>
                                            <h4>十一月</h4>
                                            <p>{this.state.all.powerDtos[10].planPower===null?"0":this.state.all.powerDtos[10].planPower}</p>
                                        </div>
                                        <div className={`manytitle2`}>
                                            <h4>十二月</h4>
                                            <p>{this.state.all.powerDtos[11].planPower===null?"0":this.state.all.powerDtos[11].planPower}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <Divider/>
                            <div className={`secendcss3`}>
                                <h4>用电企业申报明细</h4>
                            </div>

                            <b>申报状态:</b>
                            <Select defaultValue="1" style={{width: 120}} onChange={this.handleChange} className={`marginsel`}>
                                <Option value="1">全部</Option>
                                <Option value="2">已完成</Option>
                                <Option value="3">未完成</Option>
                            </Select>
                            <span>公司名:</span>
                            <Input onChange={this.componyname} style={{width: 240}} placeholder={"输入要查询的公司名称"}/>
                            <Button type={"primary"} onClick={this.selectmonth}>{"查询"}</Button>
                        </div>
                        <div style={{margin:"20px 2%"}}>
                            <Table columns={this.tableColumns} dataSource={this.state.data}  scroll={{ x: 2770 }} pagination={false}/>
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
                            title="修改申报电量"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            destroyOnClose
                            onCancel={this.handleCancel}
                        >
                            <p className={`userstatus`}>修改 <span>{this.state.customerName2}</span>的电量</p>
                            <div className={`userstatus2`}>
                                <span>一月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[0].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>二月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[1].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower2} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>三月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[2].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower3} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>四月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[3].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower4} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>五月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[4].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower5} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>六月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[5].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower6} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>七月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[6].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower7} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>八月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[7].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower8} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>九月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[8].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower9} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>十月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[9].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower10} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>十一月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[10].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower11} />
                                <span>万千万时</span>
                            </div>
                            <br/>
                            <div className={`userstatus2`}>
                                <span>十二月:</span><InputNumber min={0} max={100000000000} defaultValue={this.state.morenlist[11].bilateralPower}
                                                             style={{width: 200}}
                                                             onChange={this.xiugaipower12} />
                                <span>万千万时</span>
                            </div>
                            <br/>

                        </Modal>


                        <Modal
                            title="查看联系人"
                            visible={this.state.visible2}
                            onOk={this.handleOk2}
                            destroyOnClose
                            onCancel={this.handleCancel2}
                        >
                            <div>
                                <div style={{display:"flex"}}>
                                    <div style={{fontWeight:"bold",width:"10%"}}>{"姓名"}</div>
                                    <div style={{marginLeft:"10%",fontWeight:"bold",width:"20%"}}>电话</div>
                                    <div style={{marginLeft:"10%",fontWeight:"bold",width:"45%"}}>邮箱</div>
                                </div>
                            </div>
                            <div>
                                {
                                    this.state.lianxirenlist.map((value,key)=>{
                                        return(
                                            <div style={{display:"flex"}} key={key}>
                                                <div style={{width:"10%"}}>{value.name}</div>
                                                <div style={{marginLeft:"10%",width:"20%"}}>{value.mobile}</div>
                                                <div style={{marginLeft:"10%",width:"45%"}}>{value.email}</div>
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