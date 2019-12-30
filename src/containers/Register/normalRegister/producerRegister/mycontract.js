import React from 'react';
import {Layout, Breadcrumb, Row, Form, Card, Icon, Avatar,Pagination,Divider,message } from 'antd';
import Lheader from '../../../PRODUCER/common/Iheader.js';
import Lfooter from '../../../../components/layout/Ifooter.js';
import "./contract.less"
import api from "../../../../api/tools";
import chaincon from "../../../../components/icon/chaincon.jpg"
import iconhetong from "../../../../components/icon/contracticon.png"
import point0 from "../../../../components/icon/point0.png"
import point1 from "../../../../components/icon/point1.png"
import point2 from "../../../../components/icon/point2.png"
// import point3 from "../../../../components/icon/point3.png"
import point4 from "../../../../components/icon/point4.png"

const {Content} = Layout;
const { Meta } = Card;

class addUser extends React.Component {
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
        confirmDirty: false,
        autoCompleteResult: [],
        data:[],
        typeicon:"sync",
        count:10
    }
    componentDidMount(){
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: '1',
            pageSize: '8',
            queryStr: '',
            status:'',
            type:''
        }
        let url = "/api/contract/list";
        api.post(url, headers, params,
            (res) => {
                this.setState({
                    data:res.content.contracts,
                })
                console.log(this.state)
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }
    changeicon =()=>{
        this.setState({
            typeicon:"loading",
        })
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: '1',
            pageSize: '12',
            queryStr: '',
            status:'',
            type:''
        }
        let url = "/api/contract/list";
        api.post(url, headers, params,
            (res) => {
                this.setState({
                    data:res.content.contracts,
                })
                setTimeout(
                    () => {
                        message.success("查询完成")
                        this.setState({
                            typeicon:"sync"
                        })
                    }, 2000);
            },
            (err) => {
                console.log("failed" + err)
            }
        );

    }

    returnmore=(e)=>{
        //console.log(e.target)
        sessionStorage.targetContractId = e.target.id;
        this.props.history.push(`/producer/contractdetail`);
    }



    render() {


        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span><Breadcrumb.Item className="location"><span
                        style={{color: "#999"}}>{"用户信息/"}</span>{"合同中心"}</Breadcrumb.Item>
                    </div>


                    <Row className={`contractBox`}>
                        <h2>合同中心</h2>
                        <div className={`condata`}>
                            {
                                this.state.data.map((value,key)=>{
                                    if(value.status==="UNCONFIRMED"){
                                        return(
                                            <Card
                                                key={key}
                                                style={{ width: 250.25}}
                                                className={"valuecard"}
                                                cover={<img alt="example"  src={chaincon} />}
                                                actions={[ <a style={{cursor:"auto"}}><img src={point0} alt={''} style={{width:"23%"}}/>{"待确认"}</a>  ,
                                                    <Icon type={this.state.typeicon}  onClick={this.changeicon} />,
                                                    <Icon type="ellipsis" id={value.id} onClick={this.returnmore} />]}
                                            >
                                                <Meta
                                                    avatar={<Avatar src={iconhetong} />}
                                                    title={value.name}
                                                    style={{height:"80px"}}
                                                    description={ <p> {"电量:"+value.power+"万千瓦时"}<br/> {" 电价:"+value.powerPrice+"元"}</p>}
                                                />
                                            </Card>
                                        )
                                    }else if(value.status==="PENDING"){
                                        return(
                                            <Card
                                                key={key}
                                                style={{ width: 250.25}}
                                                className={"valuecard"}
                                                cover={<img alt="example"  src={chaincon} />}
                                                actions={[ <a style={{cursor:"auto"}}><img src={point2} alt={''} style={{width:"23%"}}/>{"待审批"}</a>  ,
                                                    <Icon type={this.state.typeicon}  onClick={this.changeicon} />,
                                                    <Icon type="ellipsis" id={value.id} onClick={this.returnmore} />]}
                                            >
                                                <Meta
                                                    avatar={<Avatar src={iconhetong} />}
                                                    title={value.name}
                                                    style={{height:"80px"}}
                                                    description={ <p> {"电量:"+value.power+"万千瓦时"}<br/> {" 电价:"+value.powerPrice+"元"}</p>}
                                                />
                                            </Card>
                                        )
                                    }else if(value.status==="CONFIRMED"){
                                        return(
                                            <Card
                                                key={key}
                                                style={{ width: 250.25}}
                                                className={"valuecard"}
                                                cover={<img alt="example"  src={chaincon} />}
                                                actions={[ <a style={{cursor:"auto"}}><img src={point1}  alt={''} style={{width:"23%"}}/>{"已完成"}</a>  ,
                                                    <Icon type={this.state.typeicon}  onClick={this.changeicon} />,
                                                    <Icon type="ellipsis" id={value.id} onClick={this.returnmore} />]}
                                            >
                                                <Meta
                                                    avatar={<Avatar src={iconhetong} />}
                                                    title={value.name}
                                                    style={{height:"80px"}}
                                                    description={ <p> {"电量:"+value.power+"万千瓦时"}<br/> {" 电价:"+value.powerPrice+"元"}</p>}
                                                />
                                            </Card>
                                        )
                                    }else{
                                        return(
                                            <Card
                                                key={key}
                                                style={{ width: 250.25}}
                                                className={"valuecard"}
                                                cover={<img alt="example"  src={chaincon} />}
                                                actions={[ <a style={{cursor:"auto"}}><img src={point4} alt={''} style={{width:"23%"}}/>{"已取消"}</a>  ,
                                                    <Icon type={this.state.typeicon}  onClick={this.changeicon} />,
                                                    <Icon type="ellipsis" id={value.id} onClick={this.returnmore} />]}
                                            >
                                                <Meta
                                                    avatar={<Avatar src={iconhetong} />}
                                                    title={value.name}
                                                    style={{height:"80px"}}
                                                    description={ <p> {"电量:"+value.power+"万千瓦时"}<br/> {" 电价:"+value.powerPrice+"元"}</p>}
                                                />
                                            </Card>
                                        )
                                    }
                                })
                            }

                        </div>
                        <Divider />
                        <div style={{textAlign:"center",margin:"0  auto"}}>
                            <Pagination total={this.state.count}  defaultCurrent={1} onChange={this.Paging} />
                        </div>
                    </Row>

                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )


    }
}

export default Form.create()(addUser)