import React from 'react';
import { Layout, Row,Steps, Divider , Col,Button } from 'antd';
import './tradingCenter.less';
import './contract.less';
const { Header, Footer, Content } = Layout;
const Step = Steps.Step;




export  default class tradingIndex extends React.Component {
    constructor() {
        super();
        this.state={
            partyName: 'XX省电力市场交易系统',
            userName: '广州风神汽车有限公司',
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            data:[
                {
                    "name":"关于《广东省粤电售电公司与广东省白云机场电力交易合同》审批完成的公告",
                    "titleb":" 广东省白云机场",
                    "titlec":" 广东省粤电售电公司",
                    "text":"200兆千瓦时",
                    "power":"2000",
                    "powerPrice":"1.1",
                    "time":"2018年6月22日"
                },
                {
                    "name":" 关于《广东省广汽集团与广东省广州市越秀售电公司》审批完成的公告",
                    "titleb":"  广东省广州市越秀售电公司",
                    "titlec":"  广东省广汽集团",
                    "text":"200兆千瓦时",
                    "power":"60000",
                    "powerPrice":"1.4",
                    "time":"2018年6月22日"
                },
                {
                    "name":"关于《广东省湛江发电厂与广东省深圳招商局电力交易合同》审批完成的公告",
                    "titleb":" 广东省深圳招商局",
                    "titlec":" 广东省湛江发电厂",
                    "text":"200兆千瓦时",
                    "power":"791000",
                    "powerPrice":"1.0",
                    "time":"2018年6月22日"
                }
            ]
        }
    }

    returnone=(e)=>{
        this.props.history.push("./tradingcontract")
    }
    returnright =(e)=>{
        console.log(e.key)
        this.props.history.push(e.key)
    }
    render() {
        const { partyName } = this.state;
        return (
            <Layout className="layout">
                <Header className="headerArea">
                    <Row className="headerLogo">
                        <Col span={8}>
                            <h1>{partyName}</h1>
                        </Col>
                    </Row>

                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding:  24, minHeight: 815 }} className="content">
                        {/*<Row className='menuArea'>*/}
                            {/*<Menu*/}
                                {/*mode="horizontal"*/}
                                {/*style={{ lineHeight: '64px' }}*/}
                                {/*className="menuIte"*/}
                                {/*defaultSelectedKeys={['/notice']}*/}
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
                        <Steps current={2} style={{margin:"50px 10%",width:"80%"}}>
                            <Step title="合同确认" />
                            <Step title="双边审核"  />
                            <Step title="发布公告"  />
                        </Steps>
                        {/*<Row className="breadGroup">*/}
                            {/*<Breadcrumb.Item>首页</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item><a>发布公告</a></Breadcrumb.Item>*/}
                        {/*</Row>*/}
                        <Divider />
                        <h2>{"最新发布"}</h2>
                        <div>
                            {
                                this.state.data.map((value,key)=>{
                                    return(
                                        <div className={`mapgg`}>
                                            <a>{value.name}</a>
                                            <span>{value.time}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <Divider/>
                        <Button  type="primary" style={{float:"right"}} className={`nobutton`} onClick={this.returnone}>{"返回"}</Button>

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    版权所有  ©2018 XX电力交易中心 粤ICP备06044847号
                </Footer>
            </Layout>
        )
    }
}