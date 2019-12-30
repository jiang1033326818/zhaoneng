import React from 'react';
import {Layout, Breadcrumb, Row, Tabs, Steps, Button, Select,DatePicker,Radio,message,Checkbox,Col} from 'antd';
// import xlsx from 'xlsx';
import './powerplan.less';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import okimage from '../../../components/icon/success.png';
import api from '../../../api/tools.js'
import userdata from '../../../components/icon/userdata.png'
import chartdata from '../../../components/icon/chartdata.png'
// import buydata from '../../../components/icon/buydata.png'
import zhCN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import moment from 'moment';
//const CheckboxGroup = Checkbox.Group;
const {Content} = Layout;
const Step = Steps.Step;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const monthFormat = 'YYYY-MM';
const dateFormat = 'YYYY-MM-DD';
const { MonthPicker } = DatePicker;


function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

export default class completeInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            location: '完善资料',
            activeKey: "1",
            status: '待审核',
            current: 0,
            value: 1,
            data: [],
            data2: [],
            data3: [],
            data4: [],
            messageone: "none",
            messagetwo: "none",
            messagethree: "none",
            messagefour: "none",
            stcolumns: [],
            thismonth:"2018-09",
            needmonth:"2018-10",
            needyear:"2018",
            mockData: [],
            targetKeys: [],
            cs:"none",
            nextid:'bidding',
            customerIds:null,
            isall:true,
        }
    }

    getuserlist(){
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            // keyword: "",
            page: 1,
            size: 100,
            type:"CUSTOMER",
        };
        let url = '/api/customer/list'
        api.post(url, headers, params,
            (res) => {
                console.log(res)
                this.setState({
                    data:res.content.content,
                    count:res.content.total,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
        this.setState({
            company: sessionStorage.company
        })
    }

    componentDidMount() {
        this.getuserlist()

    }

// 点击事件
    handleTab = (activeKey) => {
        this.setState({activeKey: activeKey, current: activeKey - 1});
    }
// 下一步
    handleNext =(e) =>{
        const newKey = Number(this.state.activeKey) + 1;
        this.setState({
            activeKey: String(newKey), current: String(newKey) - 1,
            nextid:"bidding"
        });
    }
    handleNext2 =(e) =>{
        const newKey = Number(this.state.activeKey) + 1;
        this.setState({
            activeKey: String(newKey), current: String(newKey) - 1,
            nextid:"bilateral"
        });
    }

    handleNext3 = (e) => {
        console.log(e.target.id)
        if(this.state.nextid==="bidding"){
            let headers = {
                'Authorization': sessionStorage.obj,
            }
            let params = {
                closingTime: this.state.needtime,
                customerIds: this.state.customerIds,
                isAll: this.state.isall,
                period: this.state.needmonth,
                remark: "string"
            };
            let url = '/api/gather/bidding/create'
            api.post(url, headers, params,
                (res) => {
                    console.log(res)
                    const newKey = Number(this.state.activeKey) + 1;
                    this.setState({activeKey: String(newKey), current: String(newKey) - 1});
                },
                (err) => {
                    console.log("failed" + err)
                    message.error("该时段已申报过电量")
                }
            );
        } else{
            let headers = {
                'Authorization': sessionStorage.obj,
            }
            let params = {
                closingTime: this.state.needtime,
                customerIds: this.state.customerIds,
                isAll: this.state.isall,
                period: this.state.needyear,
                remark: "string"
            };
            let url = '/api/gather/bilateral/create'
            api.post(url, headers, params,
                (res) => {
                    console.log(res)
                    const newKey = Number(this.state.activeKey) + 1;
                    this.setState({activeKey: String(newKey), current: String(newKey) - 1});
                },
                (err) => {
                    console.log("failed" + err)
                    message.error("该时段已申报过电量")
                }
            );
        }
    }
// 上一步
    handlePre = () => {
        const newKey = this.state.activeKey - 1;
        this.setState({activeKey: String(newKey), current: String(newKey) - 1});
    }
// 组件一调用方法
    handleActiveKeyOne = (activeKey, regionName, natureName, type, industryName) => {
        this.setState({
            activeKey: activeKey,
            current: Number(activeKey) - 1,
            regionName: regionName,
            natureName: natureName,
            type: type,
            industryName: industryName
        })
    }
// 组件二调用方法。
    handleActiveKeyTwo = (activeKey, cid, name, totalCapacity) => {
        this.setState({
            activeKey: activeKey,
            current: Number(activeKey) - 1,
            cid: cid,
            name: name,
            totalCapacity: totalCapacity
        })
    }
    handleChange =(e,value)=>{
        this.setState({
            needmonth:value,
            needtime:value+"-15T23:59:59.696Z",
        })
    }
    handleChangeyear =(e)=>{
        console.log(e)
        this.setState({
            needyear:e,
            needtime:e+"-10-15T23:59:59.696Z",
        })
    }

    onChangedate = (e,dateString)=>{
        console.log(e)
        console.log(dateString)
        let i = dateString.slice(0,7)
        this.setState({
            needtime:dateString+"T23:59:59.696Z",
            needmonth:i
        })
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        if(e.target.value===2){
            this.setState({
                cs: "block",
                isall:false,
            });
        }else{
            this.setState({
                cs: "none",
                isall:true,
                customerIds:null,
            });
        }
        this.setState({
            value: e.target.value,
        });
    }



    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }

    toindex= ()=>{
        console.log(this.state)
        if(this.state.nextid==="bilateral"){
            this.props.history.push(`/seller/statistics`);
        }else {
            this.props.history.push(`/seller/monthstatistics`);
        }
    }
    onChangecheck=(e)=>{
        console.log(e)
        this.setState({
            customerIds:e
        })
    }

    render() {
        const {activeKey, current,} = this.state;
        return (
            <Layout className="completeInfoLayout" locale={zhCN}>
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/powerplan"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span><Breadcrumb.Item className="location">{"用户数据导入"}</Breadcrumb.Item>
                    </div>
                    {/* 内容 */}
                    <div style={{background: '#fff', padding: 24, minHeight: 762}} className="completeInfoContent">
                        <Row className="formArea">
                            <Row className="stepArea">
                                <div>
                                    <Steps current={current}>
                                        <Step title="创建任务" description=""/>
                                        <Step title="填写详细信息" description=""/>
                                        <Step title="完成" description=""/>
                                    </Steps>
                                </div>
                            </Row>
                            <Tabs className="tabsGroup" activeKey={activeKey} onChange={this.handleTab}>
                                <TabPane tab="上传数据" key="1">
                                    <div className={`download`}>
                                        <b>月竞用电需求采集申报</b>
                                        <p>根据交易中心通知,向售电公司所代理的用电企业采集并申报月度用电量,注意申报用电量为次月用电总量,不是月竞电量,若电量小于等于年度交易分月电量则默认无月竞需求 &nbsp; &nbsp;
                                            {/*<a href={``}>数据模板下载</a>*/}
                                        </p>
                                    </div>

                                    <div className={`download`}>
                                        <b>年度双边用电需求采集申报</b>
                                        <p>根据交易中心通知,向售电公司所代理的用电企业采集年度用电量及分月电量 &nbsp; &nbsp;
                                        </p>
                                    </div>

                                    <div className={`two`}>
                                        <div className={`shenbao    bidding`} id={"bidding"} onClick={this.handleNext}>
                                            <img src={userdata} alt=""/>
                                            <p className={`import`}>月竞申报</p>
                                        </div>


                                        <div className={`shenbao   shuangbian`} id={'bilateral'} onClick={this.handleNext2}>
                                            <img src={chartdata} alt=""/>
                                            <p className={`import`}>双边申报</p>
                                        </div>
                                    </div>
                                    {/*<div className={`uploadbutton`}>*/}
                                        {/*<Button type="primary" onClick={this.handleNext}>上传</Button>*/}
                                        {/*<input onChange={this.chooseFile} accept="xls" type="file" className={"file_input"}/>*/}
                                    {/*</div>*/}
                                </TabPane>
                                <TabPane tab="确认上传信息" key="2">

                                    <div className={`table_form`}>

                                        <p>用电时段</p>

                                        <div style={{display:this.state.nextid==="bidding"?"block":"none"}}>
                                            <MonthPicker defaultValue={moment(this.state.needmonth, monthFormat)}  className={`formwidth`}
                                                         disabledDate={disabledDate}
                                                         format={monthFormat} onChange={this.handleChange} />
                                            <p>截止时间</p>
                                            <DatePicker onChange={this.onChangedate} disabled  value={moment(this.state.needmonth+'-15', dateFormat)}  placeholder={"请选择截止日期"}  className={`formwidth`}/>
                                        </div>

                                        <div  style={{display:this.state.nextid==="bidding"?"none":"block"}}>
                                            <Select defaultValue={this.state.needyear}  className={`formwidth`} onChange={this.handleChangeyear}>

                                                <Option value="2018">2018年</Option>
                                                <Option value="2019">2019年</Option>
                                                <Option value="2020">2020年</Option>
                                                <Option value="2021">2021年</Option>
                                                <Option value="2022">2022年</Option>
                                                <Option value="2023">2023年</Option>
                                                <Option value="2024">2024年</Option>
                                                <Option value="2025">2025年</Option>
                                                <Option value="2026">2026年</Option>
                                                <Option value="2027">2027年</Option>
                                                <Option value="2028">2028年</Option>
                                                <Option value="2029">2029年</Option>
                                                <Option value="2030">2030年</Option>
                                                <Option value="2031">2031年</Option>
                                            </Select>
                                            <p>截止时间</p>
                                            <DatePicker onChange={this.onChangedate} disabled   value={moment(this.state.needyear+'-10-15', dateFormat)}  placeholder={"请选择截止日期"}  className={`formwidth`}/>

                                        </div>


                                        <p>采集客户范围</p>
                                        <RadioGroup onChange={this.onChange} value={this.state.value}  className={`formwidth`}>
                                            <Radio value={1}>全部</Radio>
                                            <Radio value={2}>手动选择</Radio>
                                        </RadioGroup>
                                        <div style={{display:this.state.cs}}>
                                        {/*<div>*/}
                                            <div className={`selectsellers`}>
                                                <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangecheck}>
                                                    <Row>
                                                        {
                                                            this.state.data.map((value,key)=>{
                                                                return(
                                                                    <Col span={24} key={key}><Checkbox value={value.id}>{value.name}</Checkbox></Col>
                                                                )
                                                            })
                                                        }
                                                    </Row>
                                                </Checkbox.Group>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="backbutton" onClick={this.handlePre}>返回</Button>
                                    <Button type="primary" htmlType="submit" className={`okbutton`} id={"comming"}
                                            onClick={this.handleNext3}>下一步</Button>
                                </TabPane>
                                <TabPane tab="完成" key="3" className="tabsItem3">
                                    <div className={`okdom`}>
                                        <img src={okimage} alt=""/>
                                        <br/>
                                        <b>提交成功</b>
                                        <br/>
                                        {/*<p>共导入客户信息{"1000"}条</p>*/}
                                        {/*<p>合计电量{"1000"}千瓦时</p>*/}
                                        <Button type="primary" htmlType="submit" className={`overall`}
                                                onClick={this.toindex}>完成</Button>
                                    </div>

                                </TabPane>

                            </Tabs>
                        </Row>
                    </div>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )
    }
}