import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Card, Icon, Avatar, Tooltip,Input ,Radio,Button, Modal,InputNumber} from 'antd';
import './../index/index.less'
import '../negotiatePrice/transaction.less';
import '../negotiatePrice/price.less';
import data from'../../PRODUCER/negotiatePrice/price.json'
import Shield from '../../../components/icon/Shield.png';
import Battery from '../../../components/icon/Battery.png';
import Pcharts from '../negotiatePrice/priceCharts.js';
let carddata = data.data;
let dynamic = data.data4;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

const gridStyle = {
    width: '50%',
    textAlign: 'center',
};
export  default class Index extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 3000);
    }
    handleCancel = () => {
        this.setState({visible: false});
    }


    handleSizeChange = (e) => {
        this.setState({size: e.target.value});
    }
    alldata = (e) => {

        if (e.state.size == "default") {
            carddata = data.data2
        }
        if (e.state.size == "large") {
            carddata = data.data
        }
        if (e.state.size == "small") {
            carddata = data.data3
        }
        console.log(carddata);
    }

    state = {
        size: 'large',
        loading: false,
        visible: false,
        current: 'first',
        userName: 'buyer',
        location: '首页',
        company: 'buyer',
        message: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！'
    }
    handleClick = (e) => {
        console.log('click', e);
        this.setState({
            current: e.key,
        })
    }
    render() {
        function onChange(value) {
            console.log('changed', value);
        }
        const size = this.state.size;
        let {alldata, gongdian, shoudian}=this.props;
        const {visible, loading} = this.state;
        return (
            <Layout className="layout">
                {/* 头部header */}
                <Header>
                    <Row className="header">
                        <Col span={8}>
                            <div className="logo">
                                <h1>电力交易平台</h1>
                            </div>
                        </Col>
                        {/* 导航栏 */}
                        <Col span={8}>
                            <Menu
                                onClick={this.handleClick}
                                selectedKeys={[this.state.current]}
                                mode="horizontal"
                                style={{ lineHeight: '64px' }}
                                theme="dark"
                            >
                                <Menu.Item>
                                    首页
                                </Menu.Item>
                                <SubMenu title={<span>电力交易</span>} >
                                    <MenuItemGroup title="管理">
                                        <Menu.Item key="powermanage"  onClick={() => {this.props.history.push(`/powermanage`)}}>用电管理</Menu.Item>
                                        <Menu.Item key="contractmanage" onClick={() => {this.props.history.push(`/contractmanage`)}}>合同管理</Menu.Item>
                                    </MenuItemGroup>
                                    <MenuItemGroup title="双边协议">
                                        <Menu.Item key="companypublish">发布</Menu.Item>
                                        <Menu.Item key="companydetail">交易详情</Menu.Item>
                                    </MenuItemGroup>
                                    <MenuItemGroup title="双边协议">
                                        <Menu.Item key="first" onClick={() => {this.props.history.push(`/powermarket`)}} >集中竞价</Menu.Item>
                                    </MenuItemGroup>
                                </SubMenu>
                                <Menu.Item key="feecount">
                                    电费计算
                                </Menu.Item>
                            </Menu>
                        </Col>
                        {/* 头像 */}
                        <Col span={8} className="rightHeader">
                            <Icon type="bell" style={{fontSize: 16, color: "#FFFFFF"}} className="Avatar" />
                            <Icon type="search" style={{fontSize: 16, color: "#FFFFFF"}} className="Avatar" />
                            <Icon type="setting" style={{fontSize: 16, color: "#FFFFFF"}} className="Avatar" />
                            <Avatar icon="user" className="Avatar" /><span className="avatar">{this.state.userName}</span>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    {/* 面包屑 */}
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location"><span style={{color:"#999"}}>{"电力交易/"}</span>{"集中竞价交易"}</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className={`priceBox`}>
                        <div className={`bilateral`}>
                            <h4>双边预览</h4>
                            <div className={`left`}>
                                <div style={{width: "20%"}}>
                                    <p>{"我发布的"}</p>
                                    <a>{"4"}</a>
                                </div>
                                <div style={{width: "30%"}}>
                                    <p>{"供电需求(已成交/总数)"}</p>
                                    <a>{"8"} <span>{"/24"}</span></a>
                                </div>
                                <div style={{width: "30%"}}>
                                    <p>{"供电需求(已成交/总数)"}</p>
                                    <a>{"8"} <span>{"/24"}</span></a>
                                </div>
                                <div style={{width: "20%"}}>
                                    <p>{"信息总数"}</p>
                                    <a>{"65"} <span>{""}</span></a>
                                </div>

                            </div>
                            <div className={`right`}>
                                <h1>{"buyer"}</h1>
                                <div className={`clear`}></div>
                                <img src={Battery} style={{display: "bolck"}}/>
                                <img src={Shield} style={{display: "bolck"}}/>
                            </div>
                        </div>


                        <div className={`mapMessage`}>
                            <h4>交易信息</h4>
                            <Button type="primary" className={`clickOne`} onClick={this.showModal}>{"发布交易"}</Button>
                            <Modal
                                visible={visible}
                                title="发布电力交易信息"
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}


                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>{"取消"}</Button>,
                                    <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                        {"确定"}
                                    </Button>,
                                ]}
                            >
                                <div className={`priceone`}>
                                    <div className={`radiuinput`}>
                                        <span>{"交易类型: "}</span>
                                        <RadioGroup name="radiogroup" defaultValue={1} style={{margin: "0  20px"}}>
                                            <Radio value={1}>用电需求</Radio>
                                            <Radio value={2}>售电需求</Radio>
                                        </RadioGroup>
                                    </div>
                                    <br/>
                                    <div className={`radiuinput`}>
                                        <span>{"交易电量: "}</span>
                                        <Input placeholder="请输入" style={{width: "30%",margin: "0  20px"}}/>
                                        <span>{"交易电价: "}</span>
                                        <Input placeholder="请输入" style={{width: "30%"}}/>
                                    </div>
                                    <br/>
                                    <div className={`radiuinput`}>
                                        <span>{"交易备注: "}</span>
                                        <TextArea placeholder="请输入备注" autosize={{ minRows: 2, maxRows: 6 }}  style={{width:"77%",margin: "0  20px"}} />
                                    </div>
                                    <br/>
                                    <div className={`radiuinput`}>
                                        <span>{"有效期: "}</span>
                                        <InputNumber min={1} max={50} defaultValue={30} onChange={onChange} style={{margin: "0  33px"}} />
                                        <span>{"天 "}</span>
                                    </div>
                                </div>


                            </Modal>
                            <div className={`clear`}></div>
                            <Radio.Group value={size} onChange={this.handleSizeChange} className={`clickTwo`}>
                                <Radio.Button value="large" onClick={this.alldata(this)}>{"全部"}</Radio.Button>
                                <Radio.Button value="default" onChange={(e)=>gongdian(this)}>{"只看供电"}</Radio.Button>
                                <Radio.Button value="small" onChange={(e)=>shoudian(this)}>{"只看售电"}</Radio.Button>
                            </Radio.Group>
                            <div className={'pricedata'}>
                                {
                                    carddata.map((value, key)=> {
                                        return (
                                            <div className={`priceCard`} dataname={key}>
                                                <div className={`leftTop`}
                                                     style={{background: value.color, color: "#ffffff"}}>{value.state}</div>
                                                <img src={Battery} style={{display: "bolck", width: "20px", height: '20px'}}/>
                                                <h4>{value.title}</h4>
                                                <h5>{value.price}</h5>
                                                <div className={`clear`}></div>
                                                <p>{value.text}</p>
                                                <a href="">{value.company}</a>
                                                <span>{value.time}</span>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <div className={`priceplan`}>
                            <div className={`planTop`}>
                                <div className={`topli`}>
                                    <h3>{"五月用电计划"}</h3>
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
                                <div>
                                    {
                                        dynamic.map((value, key)=> {
                                            return (
                                                <div className={`planCard`} dataname={key}>
                                                    <img src={Battery}/>
                                                    <p>{value.name} <span style={{color: value.color0}}>{value.state}</span>
                                                        <span style={{color: "blue"}}>{value.name}</span>{"合同编号00" + key + 1}
                                                    </p>
                                                    <br/>
                                                    <div>{value.time}</div>
                                                    <a href="#">{"合同详情"}</a>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                        </div>


                    </div>






                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    PowerMarket ©2018 Created by ZN Tec
                </Footer>
            </Layout>
        )
    }
}