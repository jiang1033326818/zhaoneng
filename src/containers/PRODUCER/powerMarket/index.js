import React from 'react';
import {Layout, Breadcrumb, Input, Radio, Button, Modal, Pagination, Row, Col, DatePicker, Icon} from 'antd';
import './../index/index.less'
import '../negotiatePrice/price.less';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import data from '../../PRODUCER/negotiatePrice/price.json'
import Shield from '../../../components/icon/Shield.png';
import Battery from '../../../components/icon/Battery.png';
import iconseller from '../../../components/icon/selling.png';
import iconbuyer from '../../../components/icon/buying.png';
import Pcharts from '../negotiatePrice/priceCharts.js';
import api from '../../../api/tools.js'
import moment from 'moment';
//import  ajax from "./jhpajax";
let dynamic = data.data4;
const RadioGroup = Radio.Group;
const {TextArea} = Input;
const {Content} = Layout;
// const { MonthPicker, RangePicker } = DatePicker;
// const dateFormat = 'YYYY/MM/DD';
export default class powerMarket extends React.Component {

    selectpriceDate = () => {
//console.log(sessionStorage)
        let headers = {
            'Authorization': sessionStorage.obj,
            "Domain-Name":sessionStorage.userName,
        }
        let params = {
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize,
            type: this.state.pagetype

        }
        let url = '/api/notice/list'
        api.post(url, headers, params,
            (res) => {
                let rows = res.content.infos
                //console.log(res)
                this.setState({
                    carddata: rows,
                    total: res.content.total,
                })
                //console.log(this.state)
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    componentDidMount() {
        this.selectpriceDate()
        this.setState({
            company: sessionStorage.company
        })
        let headers={
            'Authorization': sessionStorage.obj,
        }
        let params = {

        };
        //console.log(params)
        let url = '/api/notice/summary'
        api.get(url, headers, params,
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

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    // selectModal = (e) => {
    //     this.setState({
    //         visible2: true,
    //         selectkey:parseInt(e.target.className.substr(e.target.className.length-2,2).replace("o",""),10),
    //         selectValue:this.state.carddata[parseInt(e.target.className.substr(e.target.className.length-2,2).replace("o",""),10)]
    //     });
    // }

    handleOk = (e) => {
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            //comment: this.state.tranRemark,
            //description: this.state.tranRemark,
            expiryDate: this.state.tranDay,
            id: 0,
            name: sessionStorage.company,
            remarks: this.state.tranRemark,
            power: this.state.tranElectricity,
            powerPrice: this.state.tranPrice,
            type: this.state.yongdiantype,
        };
        //console.log(params)
        let url = '/api/notice/issue'
        api.post(url, headers, params,
            (res) => {
                //console.log(res)
                this.selectpriceDate()
            },
            (err) => {
                console.log("failed" + err)
            }
        );

        setTimeout(() => {
            this.setState({loading: false, visible: false, visible2: false});
        }, 0);
    }
    Paging = (e) => {
        this.setState({
            pageNo: e,
        });

        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: e,
            pageSize: this.state.pageSize,
            type: this.state.pagetype

        }
        let url = '/api/notice/list'
        api.post(url, headers, params,
            (res) => {
                let rows = res.content.infos
                //console.log(res)
                this.setState({
                    carddata: rows,
                    total: res.content.total,
                })
                //console.log(this.state)
            },
            (err) => {
                console.log("failed" + err)
            }
        );


    }
    handleCancel = () => {
        this.setState({visible: false, visible2: false});
    }
    yongdianType = (e) => {
        this.setState({
                yongdiantype: e.target.value
            }
        );
    }
    tranElectricity = (e) => {
        this.setState({
                tranElectricity: e.target.value
            }
        );
    }
    tranPrice = (e) => {
        this.setState({
                tranPrice: e.target.value
            }
        );
    }

    tranRemark = (e) => {
        this.setState({
                tranRemark: e.target.value
            }
        );
    }
    tranDay = (value, key) => {
        this.setState({
                tranDay: key
            }
        );
    }
    returnSon = (e) => {
        localStorage.setItem("createTimenow", this.state.carddata[e.target.id].createTime)
        localStorage.setItem("deadlinenow", this.state.carddata[e.target.id].deadline)
        localStorage.setItem("issuerIdnow", this.state.carddata[e.target.id].issuerId)
        localStorage.setItem("issuerNamenow", this.state.carddata[e.target.id].issuerName)
        localStorage.setItem("namenow", this.state.carddata[e.target.id].name)
        localStorage.setItem("powernow", this.state.carddata[e.target.id].power)
        localStorage.setItem("powerPricenow", this.state.carddata[e.target.id].powerPrice)
        localStorage.setItem("remarksnow", this.state.carddata[e.target.id].remarks)
        localStorage.setItem("typenow", this.state.carddata[e.target.id].type)
        localStorage.setItem("idnow", this.state.carddata[e.target.id].id)
        localStorage.setItem("statusnow", this.state.carddata[e.target.id].status)
        this.props.history.push(`/producer/details`)

    }
    handleSizeChange = (e) => {

        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: 1,
            pageSize: this.state.pageSize,
            type: e.target.value === "a" ? "" : e.target.value,

        }
        let url = '/api/notice/list'
        api.post(url, headers, params,
            (res) => {
                let rows = res.content.infos
                //console.log(res)
                this.setState({
                    carddata: rows,
                    total: res.content.total,
                })
                //console.log(this.state)
            },
            (err) => {
                console.log("failed" + err)
            }
        );

    }
    state = {
        carddata: [],
        pageNo: 1,
        pageSize: 12,
        pagetype: '',
        size: '',
        visible: false,
        visible2: false,
        current: 'first',
        userName: 'buyer',
        location: '首页',
        company: 'buyer',
        message: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！',
        yongdiantype: "SALER",
        tranElectricity: '',
        tranPrice: '',
        tranRemark: '',
        tranDay: '',
        selectValue: {
            createTime: '',
            issuerId: '',
            issuerName: "",
            power: "",
            powerPrice: "",
            spread: '',
        },
        buyerIssueNum: '',
        buyerMatchedNum: '',
        companyIssueNum: '',
        salerIssueNum: '',
        salerMatchedNum: '',
        totalNum: ''

    }
    handleClick = (e) => {
        this.setState({
            current: e.key,
        })
    }

    render() {
        const {visible, visible2, loading} = this.state;
        function disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf('day')-86400000;
        }
        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/producer/powermarket"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span> <Breadcrumb.Item className="location"><span
                        style={{color: "#999"}}>{"电力交易/"}</span>{"集中竞价交易"}</Breadcrumb.Item>
                    </div>


                    <Row className={`priceBox`} style={{height:"1000px"}} >
                        <Row className={`bilateral`} style={{height:"120px",width:"100%"}}>
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
                        <Row>
                            <Col span={18}>
                                <div className={`mapMessage`}>
                                    <div style={{width: "99%", background: "#fff", height: "100px"}}>


                                        <h4 className={"bold"}>交易信息</h4>
                                        <Button type="primary" className={`clickOne`}
                                                onClick={this.showModal}>{"发布交易"}</Button>
                                        <Modal
                                            visible={visible}
                                            title="发布电力交易信息"
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                            destroyOnClose={true}
                                            wrapClassName={'antdweb'}
                                            footer={[
                                                <Button key="back" onClick={this.handleCancel}>{"取消"}</Button>,
                                                <Button key="submit"  type="primary" onClick={this.handleOk} >
                                                    {"确定"}
                                                </Button>
                                            ]}
                                        >
                                            <div className={`priceone`}>
                                                <div className={`radiuinput`}>
                                                    <span>{"交易类型: "}</span>
                                                    <RadioGroup name="radiogroup" defaultValue={"SALER"}
                                                                style={{margin: "0  20px"}}
                                                                onChange={this.yongdianType}>
                                                        <Radio value={"SALER"}>售电需求</Radio>
                                                        <Radio value={"BUYER"}>用电需求</Radio>
                                                    </RadioGroup>
                                                </div>
                                                <br/>
                                                <div className={`radiuinput`}>
                                                    <span>{"交易电量: "}</span>
                                                    <Input placeholder="请输入" style={{width:"60%",margin:"0 4.5%"}}
                                                           className={`newinputleft`}
                                                           onChange={this.tranElectricity}/>
                                                    <span style={{color: "#666"}}>万千瓦时</span>
                                                </div>
                                                <br/>
                                                <div className={`radiuinput`}>
                                                    <span>{"交易电价: "}</span>
                                                    <Input placeholder="请输入" style={{width:"60%",margin:"0 4.5%"}}
                                                           onChange={this.tranPrice}/>
                                                    <span style={{color: "#666"}}>元</span>
                                                </div>
                                                <br/>
                                                <div className={`radiuinput`}>
                                                    <span>{"交易备注: "}</span>
                                                    <TextArea placeholder="请输入备注" autosize={{minRows: 2, maxRows: 6}}
                                                              style={{width: "77%", margin: "0  20px"}}
                                                              onChange={this.tranRemark}/>
                                                </div>
                                                <br/>
                                                <div className={`radiuinput`}>
                                                    <span>{"有效期至: "}</span>
                                                    {/* <InputNumber min={1} max={50} defaultValue={30} onChange={this.tranDay} style={{margin: "0  33px"}} /> */}
                                                    {/* <DatePicker
                                                    format="YYYY-MM-DD"
                                                    disabledDate={disabledDate}
                                                    disabledTime={disabledDateTime}
                                                    onChange={onChange}
                                                    style={{margin: "0  21px"}}
                                                    //showTime={{ defaultValue: moment('00:00:00',"") }}
                                                /> */}
                                                    <DatePicker onChange={this.tranDay}
                                                                disabledDate={disabledDate}
                                                                style={{margin: "0  21px",width:"77%"}}
                                                    />

                                                </div>
                                            </div>
                                        </Modal>
                                        <div className={`clear`}></div>
                                        <Radio.Group onChange={this.handleSizeChange} defaultValue={"a"}
                                                     className={`clickTwo`}>
                                            <Radio.Button value="a">{"全部"}</Radio.Button>
                                            <Radio.Button value="SALER">{"只看售电"}</Radio.Button>
                                            <Radio.Button value="BUYER">{"只看用电"}</Radio.Button>
                                        </Radio.Group>

                                    </div>

                                    <Row className={'pricedata'}>
                                        {
                                            this.state.carddata.map((value, key) => {
                                                if(value.status==="OVERDUE"){
                                                    return (
                                                        <Col className={`priceCard`} key={key}>

                                                            <div className={`leftTop`}
                                                                 style={{
                                                                     background: "#1890ff",
                                                                     color: "#ffffff"
                                                                 }}>{"已结束"}</div>
                                                            <div style={{fontSize: "25px"}}
                                                                 className={`tubiao`} >

                                                                <Icon type="edit" name={key} className={"soso" + key} id={key}

                                                                      onClick={this.returnSon}
                                                                />
                                                            </div>
                                                            <img src={value.type==="SALER"?iconseller:iconbuyer} alt="买卖"
                                                                 style={{display: "bolck", width: "20px", height: '20px'}}/>
                                                            <h4>{value.power}</h4>
                                                            <h5>{value.powerPrice}</h5>
                                                            <div className={`borderTop`}></div>
                                                            <p>{value.remarks}</p>
                                                            <a href="">{value.name}</a>
                                                            <span>{value.createTime}</span>
                                                        </Col>
                                                    )

                                                }
                                                if(value.status==="INPROGRESS"){
                                                    return (
                                                        <Col className={`priceCard`} key={key}>

                                                            <div className={`leftTop`}
                                                                 style={{
                                                                     background: "red",
                                                                     color: "#ffffff"
                                                                 }}>{"进行中"}</div>
                                                            <div style={{fontSize: "25px"}}
                                                                 className={`tubiao`} >

                                                                <Icon type="edit" name={key} className={"soso" + key} id={key}

                                                                      onClick={this.returnSon}
                                                                />
                                                            </div>
                                                            <img src={value.type==="SALER"?iconseller:iconbuyer} alt="买卖"
                                                                 style={{display: "bolck", width: "20px", height: '20px'}}/>
                                                            <h4>{value.power}</h4>
                                                            <h5>{value.powerPrice}</h5>
                                                            <div className={`borderTop`}></div>
                                                            <p>{value.remarks}</p>
                                                            <a href="">{value.name}</a>
                                                            <span>{value.createTime}</span>
                                                        </Col>
                                                    )
                                                }
                                                if(value.status==="MATCHED"){
                                                    return (
                                                        <Col className={`priceCard`} key={key}>

                                                            <div className={`leftTop`}
                                                                 style={{
                                                                     background: "#73D23D",
                                                                     color: "#ffffff"
                                                                 }}>{"已匹配"}</div>
                                                            <div style={{fontSize: "25px"}}
                                                                 className={`tubiao`} >

                                                                <Icon type="edit" name={key} className={"soso" + key} id={key}

                                                                      onClick={this.returnSon}
                                                                />
                                                            </div>
                                                            <img src={value.type==="SALER"?iconseller:iconbuyer} alt="买卖"
                                                                 style={{display: "bolck", width: "20px", height: '20px'}}/>
                                                            <h4>{value.power}</h4>
                                                            <h5>{value.powerPrice}</h5>
                                                            <div className={`borderTop`}></div>
                                                            <p>{value.remarks}</p>
                                                            <a href="">{value.name}</a>
                                                            <span>{value.createTime}</span>
                                                        </Col>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Col className={`priceCard`} key={key}>

                                                            <div className={`leftTop`}
                                                                 style={{
                                                                     background: "#666666",
                                                                     color: "#ffffff"
                                                                 }}>{"已取消"}</div>
                                                            <div style={{fontSize: "25px"}}
                                                                 className={`tubiao`} >

                                                                <Icon type="edit" name={key} className={"soso" + key} id={key}

                                                                      onClick={this.returnSon}
                                                                />
                                                            </div>
                                                            <img src={value.type==="SELER"?iconseller:iconbuyer} alt="买卖"
                                                                 style={{display: "bolck", width: "20px", height: '20px'}}/>
                                                            <h4>{value.power}</h4>
                                                            <h5>{value.powerPrice}</h5>
                                                            <div className={`borderTop`}></div>
                                                            <p>{value.remarks}</p>
                                                            <a href="">{value.name}</a>
                                                            <span>{value.createTime}</span>
                                                        </Col>
                                                    )
                                                }

                                            })
                                        }

                                    </Row>
                                    <Modal
                                        visible={visible2}
                                        title="修改电力交易信息"
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}


                                        footer={[
                                            <Button key="back" onClick={this.handleCancel}>{"取消"}</Button>,
                                            <Button key="submit" type="primary" loading={loading}
                                                    onClick={this.handleOk}>
                                                {"确定"}
                                            </Button>,
                                        ]}
                                    >
                                        <div className={`priceone`}>
                                            <div className={`radiuinput`}>
                                                <span>{"交易类型: "}</span>
                                                <RadioGroup name="radiogroup" defaultValue={1}
                                                            style={{margin: "0  20px"}} onChange={this.yongdianType}>
                                                    <Radio value={"SALER"}>售电需求</Radio>
                                                    <Radio value={"BUYER"}>用电需求</Radio>
                                                </RadioGroup>
                                            </div>
                                            <br/>
                                            <div className={`radiuinput`}>
                                                <span>{"交易电量: "}</span>
                                                <Input placeholder="请输入" style={{width: "30%", margin: "0  20px"}}
                                                       onChange={this.tranElectricity}
                                                       value={this.state.selectValue.power}/>
                                                <span>{"交易电价: "}</span>
                                                <Input placeholder="请输入" style={{width: "30%"}}
                                                       onChange={this.tranPrice}
                                                       value={this.state.selectValue.powerPrice}/>
                                                <br/>
                                                <span style={{color: "#666", margin: "5px  32%"}}>单位:千瓦时</span>
                                                <span style={{color: "#666", margin: "5px  5%"}}>单位:元</span>

                                            </div>
                                            <br/>
                                            <div className={`radiuinput`}>
                                                <span>{"交易备注: "}</span>
                                                <TextArea placeholder="请输入备注" autosize={{minRows: 2, maxRows: 6}}
                                                          style={{width: "77%", margin: "0  20px"}}
                                                          onChange={this.tranRemark}
                                                          value={this.state.selectValue.issuerName}/>
                                            </div>
                                            <br/>
                                            <div className={`radiuinput`}>
                                                <span>{"有效期至: "}</span>
                                                {/* <InputNumber min={1} max={50} defaultValue={30} onChange={this.tranDay} style={{margin: "0  33px"}} /> */}
                                                {/* <DatePicker
                                                    format="YYYY-MM-DD"
                                                    disabledDate={disabledDate}
                                                    disabledTime={disabledDateTime}
                                                    onChange={onChange}
                                                    style={{margin: "0  21px"}}
                                                    //showTime={{ defaultValue: moment('00:00:00',"") }}
                                                /> */}
                                                <DatePicker onChange={this.tranDay}
                                                            style={{margin: "0  21px"}}
                                                />

                                            </div>
                                        </div>
                                    </Modal>

                                    <div className={`pagevalue`}>
                                        <Pagination total={this.state.total}  defaultCurrent={1}
                                                    onChange={this.Paging}/>
                                    </div>

                                </div>
                            </Col>
                            <Col span={6}>
                                <div className={`priceplan`}>
                                    <div className={`planTop`}>
                                        <div className={`topli`}>
                                            <h3 className={"bold"}>{"五月售电计划"}</h3>
                                            <div>{"单位:万千瓦时"}</div>
                                        </div>
                                        <div className={`clear`}></div>
                                        <div className={`chartdate`}>
                                            <div className={`chartLeft`}>
                                                <p>{"计划双边电量"}</p>
                                                <a>{"200,000"}</a>
                                                <p>{"尚未购电"}</p>
                                                <a>{"40,000"}</a>
                                                <p>{"近三个月成交价"}</p>
                                                <a>{"0.4元"}</a>
                                            </div>
                                            <div className={`chartRight`}>
                                                <Pcharts style={{width: "100%", height: 'auto'}}></Pcharts>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`clear`}></div>
                                    <div className={"planBottom"}>
                                        <h3>{"动态"}</h3>
                                        <Row>
                                            {
                                                dynamic.map((value, key) => {
                                                    return (
                                                        <Col className={`planCard`} key={key}>
                                                            <img src={iconbuyer} alt="电池"/>
                                                            <Col>{value.name} <span
                                                                style={{color: value.color0}}>{value.state}</span>
                                                                <span
                                                                    style={{color: "blue"}}>{value.name}</span>{"合同编号00" + key}
                                                            </Col>
                                                            <br/>
                                                            <div>{value.time}</div>
                                                            <a>{"合同详情"}</a>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Row>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )
    }
}