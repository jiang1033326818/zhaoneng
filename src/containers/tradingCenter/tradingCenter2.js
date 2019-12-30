import React from 'react';
import { Layout, Row, Col,  Divider ,Steps, Form, Input,Button ,Modal,message} from 'antd';
import './tradingCenter.less';
import api from "../../api/tools";
const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;
const Step = Steps.Step;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
class tradingIndex extends React.Component {
    constructor() {
        super();
        this.state={
            partyName: 'XX省电力市场交易系统',
            userName: '金发科技股份有限公司',
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            visible: false,
            data:{
                name: "",
                powerPrice: "",
                power: "",
            },
            heimingdan1:"正在查询",
            heimingdan2:"正在查询",
        }
    }
    sureright=()=>{
        let pricekey=localStorage.getItem("pricekey")
        let pricetype=localStorage.getItem("pricetype")
        let pricekey2=localStorage.getItem("pricekey2")
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            //id: this.state.data.id,
            returnMsg: "cg"
        }
        let url = pricetype==="bilateral"?"/api/center/"+pricetype+"/approved/"+pricekey:"/api/center/"+pricetype+"/approved/"+pricekey2;
        api.post(url, headers, params,
            (res) => {
                if(res.message==="成功"){
                    message.success("审核成功")
                    this.props.history.push("/notice")
                }
                else{
                    message.error("合同状态错误或合同公司处于黑名单中")
                }
            },
            (err) => {
                message.error("合同状态错误或合同公司处于黑名单中")
            }
        );
    }
    componentDidMount(){
        let pricekey=localStorage.getItem("pricekey")
        let pricekey2=localStorage.getItem("pricekey2")
        let pricetype=localStorage.getItem("pricetype")

        console.log(pricekey)
        let headers2 = {
            'Authorization': sessionStorage.obj,
        }
        let params2 = {
            //id: pricekey,

        }
        let url2 = pricetype==="bilateral"?"/api/center/"+pricetype+"/audit/"+pricekey:"/api/center/"+pricetype+"/audit/"+pricekey2;
        api.get(url2, headers2, params2,
            (res2) => {
                this.setState({
                    data:res2.content,
                })
                if(res2.content.partyAIsInBlackList===false){
                    this.setState({
                        heimingdan1:"否",
                    })
                } else{
                    this.setState({
                        heimingdan1:"是",
                    })
                }
                if(res2.content.partyBIsInBlackList===false){
                    this.setState({
                        heimingdan2:"否",
                    })
                }else{
                    this.setState({
                        heimingdan2:"是",
                    })
                }


                console.log(this.state)
            },
            (err) => {
                console.log("failed" + err)
            }
        );
        // }, 1500);

    }

    returnone=(e)=>{
        this.props.history.push("/tradingcontract")
    }
    handleOk = (e) => {
        let pricekey=localStorage.getItem("pricekey")
        let pricetype=localStorage.getItem("pricetype")
        let pricekey2=localStorage.getItem("pricekey2")

        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            "returnMsg":this.state.yuanyin
        }
        let url = pricetype==="bilateral"?"/api/center/"+pricetype+"/unapproved/"+pricekey:"/api/center/"+pricetype+"/unapproved/"+pricekey2;
        api.post(url, headers, params,
            (res) => {
                message.success("合同已退回")
                this.props.history.push("/tradingcontract")
            },
            (err) => {
                console.log("failed" + err)
            }
        );

        this.setState({
            loading: true,
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    yuanyin =(e)=>{
        this.setState({
            yuanyin: e.target.value,
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { partyName } = this.state;
        return (
            <Layout className="layout">
                <Header className="headerArea">
                    <Row className="headerLogo">
                        <h1>{partyName}</h1>
                    </Row>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 815 }} className="content">
                        {/*<Row className='menuArea'>*/}
                        {/*<Menu*/}
                        {/*mode="horizontal"*/}
                        {/*style={{ lineHeight: '64px' }}*/}
                        {/*className="menuIte"*/}
                        {/*defaultSelectedKeys={['/tradingcenter']}*/}
                        {/*onClick={this.returnright}*/}
                        {/*>*/}
                        {/*<Menu.Item key="/seller/index">首页</Menu.Item>*/}
                        {/*<Menu.Item key="/tradingcontract">合同审核</Menu.Item>*/}
                        {/*<Menu.Item key="/tradingcenter">双边审核</Menu.Item>*/}
                        {/*<Menu.Item key="/notice">发布公告</Menu.Item>*/}
                        {/*/!*<Menu.Item key="5">电力新闻</Menu.Item>*!/*/}
                        {/*/!*<Menu.Item key="6">市场行情</Menu.Item>*!/*/}
                        {/*/!*<Menu.Item key="7">统计分析</Menu.Item>*!/*/}
                        {/*</Menu>*/}
                        {/*</Row>*/}
                        <Steps current={1} style={{margin:"50px 10%",width:"80%"}}>
                            <Step title="合同确认" />
                            <Step title="双边审核"  />
                            <Step title="发布公告"  />
                        </Steps>
                        <Divider />



                        <Row className="formTitle">
                            <h3>合同信息</h3>
                        </Row>
                        <Col span={12}>
                            <Form>
                                <FormItem label="合同名称" {...formItemLayout}>
                                    {getFieldDecorator('name', {
                                    })(<div className="inputLength2" >{this.state.data.name}</div>)}

                                </FormItem>

                                <FormItem label="合同发起时间" {...formItemLayout}>
                                    {getFieldDecorator('name', {

                                    })(<div className="inputLength2" >{
                                        new Date(this.state.data.effectiveTime).getFullYear()+'-' +
                                        (new Date(this.state.data.effectiveTime).getMonth() + 1) + '-' +
                                        new Date(this.state.data.effectiveTime).getDate()

                                    }</div>)}
                                </FormItem>
                                <FormItem label="合同有效期至" {...formItemLayout}>
                                    {getFieldDecorator('name', {

                                    })(<div className="inputLength2" >{
                                        new Date(this.state.data.expiryTime).getFullYear()+'-' +
                                        (new Date(this.state.data.expiryTime).getMonth() + 1) + '-' +
                                        new Date(this.state.data.expiryTime).getDate()
                                    }</div>)
                                    }
                                </FormItem>

                            </Form>
                        </Col>


                        <Col span={12}>
                            <Form>

                                <FormItem label="电量" {...formItemLayout}>
                                    {getFieldDecorator('name', {

                                    })(<div className="inputLength2" >{this.state.data.power+"万千瓦时"}</div>)}
                                </FormItem>
                                <FormItem label="价差" {...formItemLayout}>
                                    {getFieldDecorator('name', {

                                    })(<div className="inputLength2" >{this.state.data.spread+"元"}</div>)}
                                </FormItem>

                            </Form>
                        </Col>
                        <Divider/>







                        <Row className="formTitle">
                            <h3>企业信息</h3>
                        </Row>
                        <Row className={`bordert`}>
                            <Col span={12} className={`borderr`}>
                                <Form>
                                    <FormItem label="企业名称" {...formItemLayout}>
                                        {getFieldDecorator('name', {
                                        })(<div className="inputLength2" >{this.state.data.partyAName}</div>)}

                                    </FormItem>

                                    <FormItem label="合同方" {...formItemLayout}>
                                        {getFieldDecorator('name', {

                                        })(<div className="inputLength2" >{"发起方"}</div>)}
                                    </FormItem>
                                    <FormItem label="确认时间" {...formItemLayout}>
                                        {getFieldDecorator('name', {

                                        })(<div className="inputLength2" >{
                                            new Date(this.state.data.partyAConfirmedTime).getFullYear()+'-' +
                                            (new Date(this.state.data.partyAConfirmedTime).getMonth() + 1) + '-' +
                                            new Date(this.state.data.partyAConfirmedTime).getDate()
                                        }</div>)}
                                    </FormItem>

                                    <FormItem label="是否黑名单" {...formItemLayout}>
                                        {getFieldDecorator('name', {

                                        })(<div className="inputLength2"  style={{color:this.state.heimingdan1==="否"?"blue":"red"}}>{this.state.heimingdan1}</div>)}
                                    </FormItem>
                                </Form>
                            </Col>


                            <Col span={12}>
                                <Form>
                                    <FormItem label="企业名称" {...formItemLayout}>
                                        {getFieldDecorator('name', {
                                        })(<div className="inputLength" >{this.state.data.partyBName}</div>)}

                                    </FormItem>
                                    <FormItem label="合同方" {...formItemLayout}>
                                        {getFieldDecorator('name', {

                                        })(<div className="inputLength" >{"合作方"}</div>)}
                                    </FormItem>
                                    <FormItem label="确认时间" {...formItemLayout}>
                                        {getFieldDecorator('name', {

                                        })(<div className="inputLength2" >{
                                            new Date(this.state.data.partyBConfirmedTime).getFullYear()+'-' +
                                            (new Date(this.state.data.partyBConfirmedTime).getMonth() + 1) + '-' +
                                            new Date(this.state.data.partyBConfirmedTime).getDate()
                                        }</div>)}
                                    </FormItem>
                                    <FormItem label="是否黑名单" {...formItemLayout}>
                                        {getFieldDecorator('name', {

                                        })(<div className="inputLength2"  style={{color:this.state.heimingdan2==="否"?"blue":"red"}}>{this.state.heimingdan2}</div>)}
                                    </FormItem>
                                </Form>
                            </Col>
                            <Divider/>
                            <Button  type="primary" style={{float:"right"}} className={`sbbutton`} onClick={this.returnone}>{"返回"}</Button>
                            <Button  type="primary" style={{float:"right"}} className={`nbbutton`} onClick={this.sureright}>{"同意"}</Button>
                            <div>
                                <Button type="danger"
                                        onClick={this.showModal} className={`nbbutton`} style={{float:"right"}}>{"退回"}</Button>
                                <Modal
                                    title="输入退回原因"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    okText={"退回"}
                                    cancelText={"取消"}
                                    onCancel={this.handleCancel}
                                >
                                    <Input onChange={this.yuanyin}/>
                                </Modal>
                            </div>
                        </Row>
                        <Divider />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    版权所有  ©2018 XX电力交易中心 粤ICP备06044847号
                </Footer>
            </Layout>
        )
    }
}
export default Form.create()(tradingIndex)