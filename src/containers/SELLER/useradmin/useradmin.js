import React from 'react';
import {Layout, Breadcrumb, Row, Tabs, Steps, Button, Table, message} from 'antd';
import xlsx from 'xlsx';
import './useradmin.less';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import okimage from '../../../components/icon/success.png';
import api from '../../../api/tools.js'
import userdata from '../../../components/icon/userdata.png'
import chartdata from '../../../components/icon/chartdata.png'
import buydata from '../../../components/icon/buydata.png';
import down1 from '../../../components/iconfont/selleruser.xlsx'
import down2 from '../../../components/iconfont/sellerpower.xlsx'
import down3 from '../../../components/iconfont/produceruser.xlsx'
import down4 from '../../../components/iconfont/producerpower.xlsx'

const {Content} = Layout;
const Step = Steps.Step;
const TabPane = Tabs.TabPane;
const columns = [
    {
        title: '客户名称',
        dataIndex: 'A1',
        key: 'A1',
    },

    {
        title: '公司注册地址',
        dataIndex: 'B1',
        key: 'B1',
    },
    {
        title: '企业法人名称',
        dataIndex: 'C1',
        key: 'C1',
    },
    {
        title: '联系人名称',
        dataIndex: 'D1',
        key: 'D1',
    },
    {
        title: '联系人手机',
        dataIndex: 'E1',
        key: 'E1',
    },
    {
        title: '联系人电话',
        dataIndex: 'F1',
        key: 'F1',
    },
    {
        title: '联系人邮箱',
        dataIndex: 'G1',
        key: 'G1',
    },
    {
        title: '联系人备注',
        dataIndex: 'H1',
        key: 'H1',
    },
];
const columns2 = [{
    title: '公司名称',
    dataIndex: 'A1',
    key: 'A1',
}, {
    title: '年份',
    dataIndex: 'B1',
    key: 'B1',
},
    {
        title: '数据类型',
        dataIndex: 'C1',
        key: 'C1',
    },
    {
        title: '总电量',
        dataIndex: 'D1',
        key: 'D1',
    },
    {
        title: '价差',
        dataIndex: 'E1',
        key: 'E1',
    },
    {
        title: '一月',
        dataIndex: 'F1',
        key: 'F1',
    },
    {
        title: '二月',
        dataIndex: 'G1',
        key: 'G1',
    },
    {
        title: '三月',
        dataIndex: 'H1',
        key: 'H1',
    },
    {
        title: '四月',
        dataIndex: 'I1',
        key: 'I1',
    },
    {
        title: '五月',
        dataIndex: 'J1',
        key: 'J1',
    },
    {
        title: '六月',
        dataIndex: 'K1',
        key: 'K1',
    },
    {
        title: '七月',
        dataIndex: 'L1',
        key: 'L1',
    },
    {
        title: '八月',
        dataIndex: 'M1',
        key: 'M1',
    },
    {
        title: '九月',
        dataIndex: 'N1',
        key: 'N1',
    },
    {
        title: '十月',
        dataIndex: 'O1',
        key: 'O1',
    },
    {
        title: '十一月',
        dataIndex: 'P1',
        key: 'P1',
    },
    {
        title: '十二月',
        dataIndex: 'Q1',
        key: 'Q1',
    },
    {
        title: '备注',
        dataIndex: 'R1',
        key: 'R1',
    },
];
const columns3 = [
    {
    title: '客户名称',
    dataIndex: 'A1',
    key: 'A1',
},

    {
        title: '公司注册地址',
        dataIndex: 'B1',
        key: 'B1',
    },
    {
        title: '企业法人名称',
        dataIndex: 'C1',
        key: 'C1',
    },
    {
        title: '联系人名称',
        dataIndex: 'D1',
        key: 'D1',
    },
    {
        title: '联系人手机',
        dataIndex: 'E1',
        key: 'E1',
    },
    {
        title: '联系人电话',
        dataIndex: 'F1',
        key: 'F1',
    },
    {
        title: '联系人邮箱',
        dataIndex: 'G1',
        key: 'G1',
    },
    {
        title: '联系人备注',
        dataIndex: 'H1',
        key: 'H1',
    },
];
const columns4 = [{
    title: '公司名称',
    dataIndex: 'A1',
    key: 'A1',
}, {
    title: '年份',
    dataIndex: 'B1',
    key: 'B1',
},
    {
        title: '数据类型',
        dataIndex: 'C1',
        key: 'C1',
    },
    {
        title: '总电量',
        dataIndex: 'D1',
        key: 'D1',
    },
    {
        title: '价差',
        dataIndex: 'E1',
        key: 'E1',
    },
    {
        title: '一月',
        dataIndex: 'F1',
        key: 'F1',
    },
    {
        title: '二月',
        dataIndex: 'G1',
        key: 'G1',
    },
    {
        title: '三月',
        dataIndex: 'H1',
        key: 'H1',
    },
    {
        title: '四月',
        dataIndex: 'I1',
        key: 'I1',
    },
    {
        title: '五月',
        dataIndex: 'J1',
        key: 'J1',
    },
    {
        title: '六月',
        dataIndex: 'K1',
        key: 'K1',
    },
    {
        title: '七月',
        dataIndex: 'L1',
        key: 'L1',
    },
    {
        title: '八月',
        dataIndex: 'M1',
        key: 'M1',
    },
    {
        title: '九月',
        dataIndex: 'N1',
        key: 'N1',
    },
    {
        title: '十月',
        dataIndex: 'O1',
        key: 'O1',
    },
    {
        title: '十一月',
        dataIndex: 'P1',
        key: 'P1',
    },
    {
        title: '十二月',
        dataIndex: 'Q1',
        key: 'Q1',
    },
];

export default class completeInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            location: '完善资料',
            activeKey: "1",
            status: '待审核',
            current: 0,
            value: {},
            data: [],
            data2: [],
            data3: [],
            data4: [],
            messageone: "none",
            messagetwo: "none",
            messagethree: "none",
            messagefour: "none",
            stcolumns: [],
            columntype:''
        }
    }

    componentDidMount() {
        this.setState({
            company: sessionStorage.company
        })
    }

// 点击事件
    handleTab = (activeKey) => {
        this.setState({activeKey: activeKey, current: activeKey - 1});
    }
// 下一步
    handleNext = () => {
        const newKey = Number(this.state.activeKey) + 1;
        this.setState({activeKey: String(newKey), current: String(newKey) - 1});
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
    // 点击上传

    chooseFile = (e) => {
        const _ = this;
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        const firste = eval(e.target.id);
        _.setState({
            file: file,
            columntype:e.target.id
        })
        //console.log(eval(firste.target.id))

        //console.log(this.state.current)
        if (file) {
            fileReader.readAsArrayBuffer(file);
            fileReader.onloadend = function (e) {
                const data = e.target.result;
                const workbook = xlsx.read(data, {type: 'array'});
                let r;
                for (const p in workbook.Sheets) {
                    r = workbook.Sheets[p];
                    break;
                }
                const rcs = r["!ref"].split(':');
                const fl = rcs[0][0]; // 起始行号
                //const fn = Number(rcs[0].slice(1)); // 起始列标
                const ll = rcs[1][0]; // 终点行号
                const ln = Number(rcs[1].slice(1)); // 终点列标
                const tableData = [];
                for (let j = 2; j <= ln; j++) {
                    const obj = {};
                    for (let i = fl; i <= ll;) {
                        obj[i + 1] = r[i + j] ? r[i + j].v : '';
                        i = String.fromCharCode(i.charCodeAt() + 1);
                    }
                    tableData.push(obj);
                }
                if(_.state.columntype==='columns2'){
                    let a=0;
                    for(let i in tableData){
                        if(tableData[i].D1===tableData[i].F1+tableData[i].G1+tableData[i].H1+tableData[i].I1+tableData[i].J1+tableData[i].K1+tableData[i].L1+tableData[i].M1+tableData[i].N1+ tableData[i].O1+tableData[i].P1+tableData[i].Q1){

                        }else {
                            a++
                        }
                    }
                    if(a===0){
                        const newKey = Number(_.state.activeKey) + 1;
                        console.log(tableData)
                        console.log(firste)
                        _.setState({
                            activeKey: String(newKey), current: String(newKey) - 1,
                            data: tableData,
                            stcolumns: firste
                        });
                    }else{
                        message.error("请检查总电量与每月电量之和是否相等")
                    }
                }else{
                    const newKey = Number(_.state.activeKey) + 1;
                    console.log(tableData)
                    console.log(firste)
                    _.setState({
                        activeKey: String(newKey), current: String(newKey) - 1,
                        data: tableData,
                        stcolumns: firste
                    });
                }





            }
        }
    }


    //确认上传
    handleNextque = (e) => {
        if(this.state.columntype==="columns"){
            let file = this.state.file;
            let headers = {
                'Authorization': sessionStorage.obj,
            }
            const fd = new FormData();
            fd.append('file', file);
            let params = fd;
            let url = '/api/customer/customer/upload';

            api.post(url, headers, params,
                (res) => {
                    console.log(res)
                    message.success("上传成功")
                    const newKey = Number(this.state.activeKey) + 1;
                    this.setState({activeKey: String(newKey), current: String(newKey) - 1});
                },
                (err) => {
                    console.log("failed" + err)
                }
            );
        }else if(this.state.columntype==="columns2"){
            let file = this.state.file;
            let headers = {
                'Authorization': sessionStorage.obj,
            }
            const fd = new FormData();
            fd.append('file', file);
            let params = fd;
            let url = '/api/customer/usage/upload';

            api.post(url, headers, params,
                (res) => {
                    console.log(res)
                    message.success("上传成功")
                    const newKey = Number(this.state.activeKey) + 1;
                    this.setState({activeKey: String(newKey), current: String(newKey) - 1});
                },
                (err) => {
                    console.log("failed" + err)
                }
            );
        }else if(this.state.columntype==="columns3"){
            let file = this.state.file;
            let headers = {
                'Authorization': sessionStorage.obj,
            }
            const fd = new FormData();
            fd.append('file', file);
            let params = fd;
            let url = '/api/customer/producer/upload';

            api.post(url, headers, params,
                (res) => {
                    console.log(res)
                    message.success("上传成功")
                    const newKey = Number(this.state.activeKey) + 1;
                    this.setState({activeKey: String(newKey), current: String(newKey) - 1});
                },
                (err) => {
                    console.log("failed" + err)
                }
            );
        }else{
            let file = this.state.file;
            let headers = {
                'Authorization': sessionStorage.obj,
            }
            const fd = new FormData();
            fd.append('file', file);
            let params = fd;
            let url = '/api/customer/usage/upload';

            api.post(url, headers, params,
                (res) => {
                    console.log(res)
                    message.success("上传成功")
                    const newKey = Number(this.state.activeKey) + 1;
                    this.setState({activeKey: String(newKey), current: String(newKey) - 1});
                },
                (err) => {
                    console.log("failed" + err)
                }
            );

            console.log(columns)
            console.log(columns2)
            console.log(columns3)
            console.log(columns4)
        }

    }

    toindex = (e) => {
        this.props.history.push(`/seller/index`);
    }

    down1 = (e) =>{
        window.open(down1)
    }
    down2 = (e) =>{
        window.open(down2)
    }
    down3 = (e) =>{
        window.open(down3)
    }
    down4 = (e) =>{
        window.open(down4)
    }


    render() {
        const {activeKey, current,} = this.state;
        return (
            <Layout className="completeInfoLayout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/useradmin"}></Lheader>
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
                                        <Step title="上传数据" description=""/>
                                        <Step title="确认上传信息" description=""/>
                                        <Step title="完成" description=""/>
                                    </Steps>
                                </div>
                            </Row>
                            <Tabs className="tabsGroup" activeKey={activeKey} onChange={this.handleTab}>
                                <TabPane tab="上传数据" key="1">
                                    <div className={`download`}>
                                        <b>数据模板下载</b>
                                        <p>导入数据必须使用系统提供的模板,且不允许修改模板的格式,否则会导致数据导入失败 &nbsp; &nbsp;
                                            {/*<a href={``}>数据模板下载</a>*/}
                                        </p>
                                    </div>
                                    <div className={`download`}>
                                        <b>上传数据</b>
                                        <p>请把需要上传的数据,按照系统提供的模板,逐项填入XLS文件,然后单击'上传'按钮选择已经填好的模板文件,完成数据上传的操作,系统会自动校验上传数据 &nbsp; &nbsp;
                                        </p>
                                    </div>


                                    <div className={`three`}>
                                        <div className={`color   color1`}>
                                            <img src={userdata} alt=""/>
                                            <input onChange={this.chooseFile} accept="xls" type="file"
                                                   className={"file_input"} id={"columns"}/>
                                            <p className={`import`}>导入公司及联系人</p>
                                        </div>


                                        <div className={`color   color2`}>
                                            <img src={chartdata} alt=""/>
                                            <input onChange={this.chooseFile} accept="xls" type="file"
                                                   className={"file_input"} id={"columns2"}/>
                                            <p className={`import`}>导入用电数据</p>
                                        </div>
                                    </div>

                                    <div className={`mobanthree`}>
                                        <p className={`moban`} onClick={this.down1}>数据模板下载</p>
                                        <p className={`moban`} style={{marginLeft: "20%"}} onClick={this.down2}>数据模板下载</p>
                                        {/*<p className={`moban`} style={{marginLeft:"20%"}}>数据模板下载</p>*/}
                                    </div>

                                    <div className={`three`}>
                                        <div className={`color   color3`}>
                                            <img src={buydata} alt=""/>
                                            <input onChange={this.chooseFile} accept="xls" type="file"
                                                   className={"file_input"} id={"columns3"}/>
                                            <p className={`import`}>导入发电企业及联系人</p>
                                        </div>

                                        <div className={`color   color4`}>
                                            <img src={chartdata} alt=""/>
                                            <input onChange={this.chooseFile} accept="xls" type="file"
                                                   className={"file_input"} id={"columns4"}/>
                                            <p className={`import`}>导入购电数据</p>
                                        </div>
                                    </div>

                                    <div className={`mobanthree`}>
                                        <p className={`moban`} onClick={this.down3}>数据模板下载</p>
                                        <p className={`moban`} style={{marginLeft: "20%"}} onClick={this.down4}>数据模板下载</p>
                                        {/*<p className={`moban`} style={{marginLeft:"20%"}}>数据模板下载</p>*/}
                                    </div>
                                    {/*<div className={`uploadbutton`}>*/}
                                    {/*<Button type="primary" onClick={this.handleNext}>上传</Button>*/}
                                    {/*<input onChange={this.chooseFile} accept="xls" type="file" className={"file_input"}/>*/}
                                    {/*</div>*/}
                                </TabPane>
                                <TabPane tab="确认上传信息" key="2">


                                    <div className={`download download2`} style={{display: "block"}}>
                                        <b>确认信息</b>
                                        <p>请确认上传的信息是否正确,一旦导入后数据将不能修改
                                        </p>
                                        <Table columns={this.state.stcolumns} dataSource={this.state.data}
                                               style={{width: "1920px"}} pagination={false}/>
                                    </div>

                                    <Button className="backbutton" onClick={this.handlePre}>返回</Button>
                                    <Button type="primary" htmlType="submit" className={`okbutton`}
                                            onClick={this.handleNextque}>确认</Button>
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