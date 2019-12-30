import React from 'react';
import moment from 'moment';
import { Layout, Breadcrumb,  Input ,Radio,Row,Col,Modal,Button,DatePicker } from 'antd';
import '../../CONSUMER/negotiatePrice/price.less';
import './../index/index.less'
import '../negotiatePrice/transaction.less';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
//import data from'../../PRODUCER/negotiatePrice/price.json'
import Shield from '../../../components/icon/Shield.png';
import Battery from '../../../components/icon/Battery.png';
import 'antd/dist/antd.css';
import api from "../../../api/tools";
let newcarddata={}
//let dynamic = data.data5;
const RadioGroup = Radio.Group;
const { Content } = Layout;
const RadioButton = Radio.Button;
const dateFormat = 'YYYY/MM/DD';
// const columns = [{
//     title: '企业名称',
//     dataIndex: 'issuerName',
//     key: 'name',
//
// }, {
//     title: '交易类型',
//     dataIndex: 'type',
//     key: 'age',
// }, {
//     title: '电量',
//     dataIndex: 'power',
//     key: 'power',
// },
//     {
//         title: '电价',
//         dataIndex: 'powerPrice',
//         key: 'powerPrice',
//     },
//     {
//         title: '匹配度',
//         dataIndex: 'score',
//         key: 'score',
//     },
//     {
//         title: '操作',
//         dataIndex: '',
//         key: 'score',
//         render: text =><span><a href="javascript:;" onClick={this.returnXQ}>{"详情"}</a>{" "}<a href="javascript:;"  onClick={this.returnHt}>{"合同"}</a></span>
//
//     },
// ];
export  default class details extends React.Component {
    constructor(props) {
        super(props)
        // this.setState({
        //     carddata:{
        //         createTime:localStorage.getItem("createTimenow"),
        //         deadline:localStorage.getItem("deadlinenow"),
        //         issuerId:localStorage.getItem("issuerIdnow"),
        //         issuerName:localStorage.getItem("issuerNamenow"),
        //         name:localStorage.getItem("namenow"),
        //         power:localStorage.getItem("powernow"),
        //         powerPrice:localStorage.getItem("powerPricenow"),
        //         remarks:localStorage.getItem("remarksnow"),
        //         type:localStorage.getItem("typenow")
        //     }
        // });

        newcarddata={
            createTime:localStorage.getItem("createTimenow"),
            deadline:localStorage.getItem("deadlinenow"),
            issuerId:localStorage.getItem("issuerIdnow"),
            issuerName:localStorage.getItem("issuerNamenow"),
            name:localStorage.getItem("namenow"),
            power:localStorage.getItem("powernow"),
            powerPrice:localStorage.getItem("powerPricenow"),
            remarks:localStorage.getItem("remarksnow"),
            type:localStorage.getItem("typenow"),
            status:localStorage.getItem("statusnow"),
            id:localStorage.getItem("idnow"),

        }
        console.log(newcarddata)



    }
    state = {

        size: '',
        loading: false,
        visible: false,
        visible2: false,
        current: 'first',
        userName: 'buyer',
        location: '首页',
        company: '',
        message: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！',
        dynamic:[
            {
                remarks:'',
                type:'',
                status:'',
                powerPrice:'',
                power:'',
                name:'',
                id:'',
                deadline:'',
            },
            {
                remarks:'',
                type:'',
                status:'',
                powerPrice:'',
                power:'',
                name:'',
                id:'',
                deadline:'',
            },
            {
                remarks:'',
                type:'',
                status:'',
                powerPrice:'',
                power:'',
                name:'',
                id:'',
                deadline:'',
            },
        ],
        key:0,
        buyerIssueNum: '',
        buyerMatchedNum: '',
        companyIssueNum: '',
        salerIssueNum: '',
        salerMatchedNum: '',
        totalNum: '',
        tranElectricity:'',
        tranDay:'',

    }

    componentDidMount() {
        this.setState({
            company: sessionStorage.company
        })
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            id:localStorage.getItem("idnow")
        }
        let url = '/api/notice/match/'+localStorage.getItem("idnow")
        api.get(url, headers, params,
            (res) => {
                if(res.content.length>5){
                    res.content.slice(0,6)
                    console.log(res)
                    this.setState({
                        dynamic:res.content,

                    })
                }else{
                    this.setState({
                        dynamic:res.content,
                    })
                }

                console.log(res)
            },
            (err) => {
                console.log("failed" + err)
            }
        );


        let headers2={
            'Authorization': sessionStorage.obj,
        }
        let params2 = {

        };
        console.log(params)
        let url2 = '/api/notice/summary'
        api.get(url2, headers2, params2,
            (res) => {
                console.log(res)
                this.setState({
                    totalNum:res.content.totalNum,
                    salerIssueNum:res.content.salerIssueNum,
                    salerMatchedNum:res.content.salerMatchedNum,
                    buyerIssueNum:res.content.buyerIssueNum,
                    buyerMatchedNum:res.content.buyerMatchedNum,
                    companyIssueNum:res.content.companyIssueNum,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );





    }

    tranElectricity = (e) =>{
        this.setState({
                tranElectricity: e.target.value
            }
        );
    }
    returnHt = (e) =>{
        localStorage.setItem("matchingid",e.target.id)
        //console.log(e.target.id)
        this.props.history.push(`/producer/addnewcontract`)
    }
    returnXQ = (e) =>{
        this.setState({
                key:e.target.id,
                visible2: true,
            }
        );


    }
    trancompony = (e) =>{
        this.setState({
                trancompony: e.target.value
            }
        );
    }
    tranPrice = (e) =>{
        this.setState({
                tranPrice: e.target.value
            }
        );
    }

    yongdianType = (e) =>{
        this.setState({
                yongdiantype: e.target.value
            }
        );
    }
    jiaoyiType = (e) =>{
        this.setState({
                jiaoyiType: e.target.value
            }
        );
    }

    tranDay = (value,key) =>{
        this.setState({
                tranDay: key
            }
        );
    }

    suremessage = (e) =>{
        this.setState({
            visible: true,
        });

        let headers2={
            'Authorization': sessionStorage.obj,
        }
        let params2 = {
            expiryDate: this.state.tranDay===''?newcarddata.createTime:this.state.tranDay,
            id: localStorage.getItem("idnow"),
            name: newcarddata.name,
            power: this.state.tranElectricity===''?newcarddata.power:this.state.tranElectricity,
            powerPrice: this.state.tranPrice===''?newcarddata.powerPrice:this.state.tranPrice,
            remarks: newcarddata.remarks,
            type: this.state.yongdiantype,
        };
        console.log(params2)
        let url2 = '/api/notice/'+localStorage.getItem("idnow")
        api.get(url2, headers2, params2,
            (res) => {
                console.log(res)
                newcarddata.type=res.content.type;
                newcarddata.power=res.content.power;
                newcarddata.powerPrice=res.content.powerPrice;
                newcarddata.createTime=this.state.tranDay===""?localStorage.getItem("createTimenow"):this.state.createTime;
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        newcarddata.status="MATCHED"
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleOk2 = (e) => {
        this.setState({
            visible2: false,
        });
        // newcarddata.status="MATCHED"
    }
    handleCancel2= (e) => {
        this.setState({
            visible2: false,
        });
    }


    render() {

        function disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf('day')-86400000;
        }
        function onChange(e) {
            console.log(`radio checked:${e.target.value}`);
        }
        if(newcarddata.status==="INPROGRESS"){
            return (
                <Layout className="layout">
                    {/* 头部header */}
                    <Lheader history={this.props.history} menubox={"/producer/powermarket"}></Lheader>
                    <Content style={{ padding: '0 50px' }}>
                        {/* 面包屑 */}
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <span>您当前的位置:   </span><Breadcrumb.Item className="location"><span style={{color:"#999"}}>{"供电信息/"}</span>{"详情"}</Breadcrumb.Item>
                        </Breadcrumb>

                        <Modal
                            visible={this.state.visible2}
                            title="匹配信息详情"
                            onOk={this.handleOk2}
                            onCancel={this.handleCancel2}
                            wrapClassName={'antdweb'}

                            footer={[

                                <Button type="primary" onClick={this.handleOk2}>
                                    {"确定"}
                                </Button>
                            ]}
                        >
                            {
                                this.state===[]?"":

                                    <div className={`priceone`}>
                                        <div className={`radiuinput`}>
                                            <p>{"匹配对象: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].name}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"匹配程度: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {parseFloat(this.state.dynamic[this.state.key].score)*100+"%"}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"交易类型: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].type==="SALER"?"售电":"用电"}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"交易电量: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].power}{"万千瓦时"}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"交易电价: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].powerPrice}{"元"}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"交易备注: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].remarks}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"有效期至: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].deadline}</p>
                                        </div>


                                    </div>


                            }

                        </Modal>

                        <Row className={`priceBox`}>
                            <Row className={`bilateral`} style={{height:"120px",width:"100%",border:"none"}}>
                                <div className={`left`}>
                                    <Col style={{width: "20%"}}>
                                        <p>{"我发布的"}</p>
                                        <a>{this.state.companyIssueNum}</a>
                                    </Col>
                                    <Col style={{width: "30%"}}>
                                        <p>{"售电需求(已成交/总数)"}</p>
                                        <a>{this.state.salerMatchedNum} <span>{"/ "}{this.state.salerIssueNum}</span></a>
                                    </Col>
                                    <Col style={{width: "30%"}}>
                                        <p>{"用电需求(已成交/总数)"}</p>
                                        <a>{this.state.buyerMatchedNum} <span>{"/ "}{this.state.buyerIssueNum}</span></a>
                                    </Col>
                                    <Col style={{width: "20%"}}>
                                        <p>{"信息总数"}</p>
                                        <a>{this.state.totalNum} <span>{""}</span></a>
                                    </Col>

                                </div>
                                <div className={`right`}>
                                    <p style={{color:"#666"}}>{this.state.company}</p>
                                    <div className={`clear`}></div>
                                    <img src={Battery} alt="盾牌" style={{display: "bolck",width:"25px",height:"25px"}}/>
                                    <img src={Shield} alt="电池" style={{display: "bolck",width:"25px",height:"25px",margin:"0"}}/>
                                </div>
                            </Row>

                            <Row className="detailsbox">
                                {/*<h3>{newcarddata.type==="SALER"?"售电需求":"用电需求"}</h3>*/}
                                <div className={`conBox`}>
                                    <div className={`conBoxDiv`}>
                                        <h4>{"有效期至:"}</h4>
                                        <DatePicker defaultValue={moment(newcarddata.createTime, dateFormat)}  disabledDate={disabledDate}  onChange={this.tranDay} style={{margin:"0 5%",width:"78%"}}/>
                                    </div>
                                    <div className={'clear'}>

                                    </div>
                                    <div className={`conBoxDiv`}>
                                        <h4>{"需求类型:"}</h4>
                                        <RadioGroup name="radiogroup" defaultValue={newcarddata.type} style={{margin: "0  5%"}} onChange={this.yongdianType}>
                                            <Radio value={"SALER"}>售电需求</Radio>
                                            <Radio value={"BUYER"}>用电需求</Radio>
                                        </RadioGroup>
                                    </div>
                                    <div className={`conBoxDiv`}>
                                        <h4>{"交易类型:"}</h4>
                                        <RadioGroup name="radiogroup" defaultValue={"BILATERAL"} style={{margin: "0  5%"}} onChange={this.jiaoyiType}>
                                            <Radio value={"BILATERAL"}>双边交易</Radio>
                                            <Radio value={"BIDDING"}>集中竞价</Radio>
                                        </RadioGroup>
                                    </div>

                                    <div className={`conBoxDiv`}>
                                        <h4 className={`powertop`}>{"交易电量:"}</h4>
                                        <Input placeholder="请输入电量" style={{width: "29%"}} className={`powerleft`} onChange={this.tranElectricity} defaultValue={newcarddata.power}/>
                                        <h4 className={`powertop`}>{"万千瓦时"}</h4>
                                        <h4 style={{width:"5%"}}>{""}</h4>
                                        <h4 className={`powertop`}>{"交易电价:"}</h4>
                                        <Input placeholder="请输入电价" style={{width: "29%"}} onChange={this.tranPrice} defaultValue={newcarddata.powerPrice}/>
                                        <h4  className={`powertop`}>{"元"}</h4>
                                    </div>
                                    <div className={`clear`}></div>
                                    <div className={`conBoxDiv`}>
                                        <h4>{"企业名称:"}</h4>
                                        <Input placeholder="请输入企业名称" style={{width: "78%",margin: "0  5%"}} onChange={this.trancompony} defaultValue={newcarddata.issuerName}/>
                                    </div>
                                    <div className={`clear`}></div>
                                    <div className={`conBoxDiv`}>
                                        <h4>{"状态:"}</h4>
                                        <RadioGroup onChange={onChange} defaultValue={newcarddata.status} style={{margin: "0  8%",float:"left",width:"78%"}} disabled>
                                            <RadioButton value="INPROGRESS" style={{width:"25%"}} className={"center"}>进行中</RadioButton>
                                            <RadioButton value="MATCHED" style={{width:"25%"}} className={"center"}>已匹配</RadioButton>
                                            <RadioButton value="CALCEL" style={{width:"25%"}} className={"center"}>已取消</RadioButton>
                                            <RadioButton value="OVERDUE" style={{width:"25%"}} className={"center"}>已过期</RadioButton>
                                        </RadioGroup>
                                        <br/>
                                        <div className={`conBoxDiv`}>
                                            <Button type="primary" onClick={this.suremessage}  style={{margin:"30px 15%",width:"10%",float:"right"}}>{"保存"}</Button>

                                            <Modal
                                                title="提示!"
                                                visible={this.state.visible}
                                                onOk={this.handleOk}
                                                onCancel={this.handleCancel}
                                            >
                                                <p>确认保存吗,保存后无法更改</p>

                                            </Modal>
                                        </div>
                                    </div>
                                    <div className={`clear`}></div>

                                    <div className={`border_last`}></div>



                                    <div className={`conbottom`}>
                                        <span>{"撮合建议:"}</span>
                                    </div>

                                    <div className={`condata`}>
                                        {/*<Table columns={columns} dataSource={this.state.dynamic} />*/}
                                        <div className={`condatacard`} style={{background:"#ddd"}}>
                                            <div style={{width:"26%"}}>
                                                <p>{"企业名称"}</p>
                                            </div>
                                            <div style={{width:"13%"}}>
                                                <p>{"交易类型"}</p>
                                            </div>
                                            <div style={{width:"20%"}}>
                                                <p>{"电量(万千瓦时)"}</p>
                                            </div>
                                            <div style={{width:"10%"}}>
                                                <p>{"电价(元)"}</p>
                                            </div>
                                            <div style={{width:"14%"}}>
                                                <p>{"匹配度"}</p>
                                            </div>
                                            <div style={{width:"13%"}}>
                                                <p style={{color:"#1890ff"}}>{"操作"}</p>
                                            </div>
                                        </div>


                                        {
                                            this.state.dynamic.map((value, key)=> {
                                                return (
                                                    <Col  className={`condatacard2`} key={key}>
                                                        <div style={{width:"26%"}}>
                                                            <p>{value.name}</p>
                                                        </div>
                                                        <div style={{width:"13%"}}>

                                                            <p>{value.type==="SALER"?"售电":"用电"}</p>
                                                        </div>
                                                        <div style={{width:"20%"}}>

                                                            <p>{value.power}</p>
                                                        </div>
                                                        <div style={{width:"10%"}}>

                                                            <p style={{color:"#73D23D"}}>{value.powerPrice}</p>
                                                        </div>
                                                        <div style={{width:"14%"}}>

                                                            <p>{parseFloat(value.score)*100+"%"}</p>
                                                        </div>
                                                        <div style={{width:"13%"}}>
                                                            <a style={{color:"#1890ff"}} onClick={this.returnXQ} id={key}>{"详情"}</a>
                                                            <span>&nbsp;   </span>
                                                            <a style={{color:"#1890ff"}} onClick={this.returnHt} id={value.id}>{"合同"}</a>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </div>


                                </div>
                            </Row>


                        </Row>
                    </Content>
                    <Lfooter></Lfooter>
                </Layout>

            )
        }else{
            return (
                <Layout className="layout">
                    {/* 头部header */}
                    <Lheader history={this.props.history}></Lheader>
                    <Content style={{ padding: '0 50px' }}>
                        {/* 面包屑 */}
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <span>您当前的位置:   </span><Breadcrumb.Item className="location"><span style={{color:"#999"}}>{"供电信息/"}</span>{"详情"}</Breadcrumb.Item>
                        </Breadcrumb>

                        <Modal
                            visible={this.state.visible2}
                            title="匹配信息详情"
                            onOk={this.handleOk2}
                            onCancel={this.handleCancel2}
                            wrapClassName={'antdweb'}

                            footer={[

                                <Button type="primary" onClick={this.handleOk2}>
                                    {"确定"}
                                </Button>
                            ]}
                        >
                            {
                                this.state === [] ? "" :
                                    <div className={`priceone`}>
                                        <div className={`radiuinput`}>
                                            <p>{"匹配对象: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].name}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"匹配程度: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {parseFloat(this.state.dynamic[this.state.key].score) * 100 + "%"}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"交易类型: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].type === "SALER" ? "售电" : "用电"}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"交易电量: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].power}{"万千瓦时"}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"交易电价: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].powerPrice}{"元"}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"交易备注: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].remarks}</p>
                                        </div>
                                        <div className={`radiuinput`}>
                                            <p>{"有效期至: "} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  {this.state.dynamic[this.state.key].deadline}</p>
                                        </div>


                                    </div>
                            }
                        </Modal>

                        <Row className={`priceBox`}>
                            <Row className={`bilateral`} style={{height:"120px",width:"100%",border:"none"}}>
                                <div className={`left`}>
                                    <Col style={{width: "20%"}}>
                                        <p>{"我发布的"}</p>
                                        <a>{this.state.companyIssueNum}</a>
                                    </Col>
                                    <Col style={{width: "30%"}}>
                                        <p>{"售电需求(已成交/总数)"}</p>
                                        <a>{this.state.salerMatchedNum} <span>{"/ "}{this.state.salerIssueNum}</span></a>
                                    </Col>
                                    <Col style={{width: "30%"}}>
                                        <p>{"用电需求(已成交/总数)"}</p>
                                        <a>{this.state.buyerMatchedNum} <span>{"/ "}{this.state.buyerIssueNum}</span></a>
                                    </Col>
                                    <Col style={{width: "20%"}}>
                                        <p>{"信息总数"}</p>
                                        <a>{this.state.totalNum} <span>{""}</span></a>
                                    </Col>

                                </div>
                                <div className={`right`}>
                                    <p style={{color:"#666"}}>{this.state.company}</p>
                                    <div className={`clear`}></div>
                                    <img src={Battery} alt="盾牌" style={{display: "bolck",width:"25px",height:"25px"}}/>
                                    <img src={Shield} alt="电池" style={{display: "bolck",width:"25px",height:"25px",margin:"0"}}/>
                                </div>
                            </Row>

                            <Row className="detailsbox">
                                {/*<h3>{newcarddata.type==="SALER"?"售电需求":"用电需求"}</h3>*/}
                                <div className={`conBox`}>
                                    <div className={`conBoxDiv`}>
                                        <h4>{"发布时间:"}</h4>
                                        <DatePicker defaultValue={moment(newcarddata.createTime, dateFormat)}  onChange={this.tranDay} style={{margin:"0 5%",width:"78%"}} disabled={"true"}/>
                                    </div>
                                    <div className={'clear'}>

                                    </div>
                                    <div className={`conBoxDiv`}>
                                        <h4>{"需求类型:"}</h4>
                                        <RadioGroup name="radiogroup" defaultValue={newcarddata.type} style={{margin: "0  5%"}} onChange={this.yongdianType}>
                                            <Radio value={"SALER"} disabled={"true"}>售电需求</Radio>
                                            <Radio value={"BUYER"} disabled={"true"}>用电需求</Radio>
                                        </RadioGroup>
                                    </div>
                                    <div className={`conBoxDiv`}>
                                        <h4>{"交易类型:"}</h4>
                                        <RadioGroup name="radiogroup" defaultValue={"BILATERAL"} style={{margin: "0  5%"}} onChange={this.jiaoyiType}>
                                            <Radio value={"BILATERAL"} disabled={"true"}>双边交易</Radio>
                                            <Radio value={"BIDDING"} disabled={"true"}>集中竞价</Radio>
                                        </RadioGroup>
                                    </div>

                                    <div className={`conBoxDiv`}>
                                        <h4 className={`powertop`}>{"交易电量:"}</h4>
                                        <Input placeholder="请输入电量" style={{width: "29%"}} disabled={"true"} className={`powerleft`} onChange={this.tranElectricity} defaultValue={newcarddata.power}/>
                                        <h4 className={`powertop`}>{"万千瓦时"}</h4>
                                        <h4 style={{width:"5%"}}>{""}</h4>
                                        <h4 className={`powertop`}>{"交易电价:"}</h4>
                                        <Input placeholder="请输入电价" style={{width: "29%"}} disabled={"true"} onChange={this.tranPrice} defaultValue={newcarddata.powerPrice}/>
                                        <h4  className={`powertop`}>{"元"}</h4>
                                    </div>
                                    <div className={`clear`}></div>
                                    <div className={`conBoxDiv`}>
                                        <h4>{"企业名称:"}</h4>
                                        <Input placeholder="请输入企业名称" style={{width: "78%",margin: "0  5%"}} disabled={"true"} onChange={this.trancompony} defaultValue={newcarddata.issuerName}/>
                                    </div>
                                    <div className={`clear`}></div>
                                    <div className={`conBoxDiv`}>
                                        <h4>{"状态:"}</h4>
                                        <RadioGroup onChange={onChange} defaultValue={newcarddata.status} style={{margin: "0  8%",float:"left",width:"78%"}} disabled>
                                            <RadioButton value="INPROGRESS" style={{width:"25%"}} className={"center"}>进行中</RadioButton>
                                            <RadioButton value="MATCHED" style={{width:"25%"}} className={"center"}>已匹配</RadioButton>
                                            <RadioButton value="CALCEL" style={{width:"25%"}} className={"center"}>已取消</RadioButton>
                                            <RadioButton value="OVERDUE" style={{width:"25%"}} className={"center"}>已过期</RadioButton>
                                        </RadioGroup>

                                    </div>
                                    <div className={`clear`}></div>

                                    <div className={`border_last`}></div>



                                    <div className={`conbottom`}>
                                        <span>{"撮合建议:"}</span>
                                    </div>

                                    <div className={`condata`}>
                                        {/*<Table columns={columns} dataSource={this.state.dynamic} />*/}
                                        <div className={`condatacard`} style={{background:"#ddd"}}>
                                            <div style={{width:"26%"}}>
                                                <p>{"企业名称"}</p>
                                            </div>
                                            <div style={{width:"13%"}}>
                                                <p>{"交易类型"}</p>
                                            </div>
                                            <div style={{width:"20%"}}>
                                                <p>{"电量(万千瓦时)"}</p>
                                            </div>
                                            <div style={{width:"10%"}}>
                                                <p>{"电价(元)"}</p>
                                            </div>
                                            <div style={{width:"14%"}}>
                                                <p>{"匹配度"}</p>
                                            </div>
                                            <div style={{width:"13%"}}>
                                                <p style={{color:"#1890ff"}}>{"操作"}</p>
                                            </div>
                                        </div>


                                        {
                                            this.state.dynamic.map((value, key)=> {
                                                return (
                                                    <Col  className={`condatacard2`} key={key}>
                                                        <div style={{width:"26%"}}>
                                                            <p>{value.name}</p>
                                                        </div>
                                                        <div style={{width:"13%"}}>

                                                            <p>{value.type==="SALER"?"售电":"用电"}</p>
                                                        </div>
                                                        <div style={{width:"20%"}}>

                                                            <p>{value.power}</p>
                                                        </div>
                                                        <div style={{width:"10%"}}>

                                                            <p style={{color:"#73D23D"}}>{value.powerPrice}</p>
                                                        </div>
                                                        <div style={{width:"14%"}}>

                                                            <p>{parseFloat(value.score)*100+"%"}</p>
                                                        </div>
                                                        <div style={{width:"13%"}}>
                                                            <a style={{color:"#1890ff"}} onClick={this.returnXQ} id={key}>{"详情"}</a>
                                                            <span>&nbsp;   </span>
                                                            <a style={{color:"#666666",cursor:'auto'}}  id={value.id}>{"合同"}</a>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </div>


                                </div>
                            </Row>


                        </Row>
                    </Content>
                    <Lfooter></Lfooter>
                </Layout>
            )
        }

    }
}