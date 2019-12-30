import React from 'react';
import { Layout, Row, Col,message, Divider , Table, Button ,Steps,Pagination } from 'antd';
import './tradingCenter.less';
import './contract.less';
import api from "../../api/tools";

const Step = Steps.Step;
const { Header, Footer, Content } = Layout;
const columns = [{
    title: '合同信息',
    dataIndex: 'name',
    id:"name"
}, {
    title: '电量(万千瓦时)',
    dataIndex: 'power',
    id:"power"
}, {
    title: '创建时间',
    dataIndex: 'createTime',
    id:"createTime"
}];

const columns2 = [{
    title: '合同信息',
    dataIndex: 'name',
    id:"name"
}, {
    title: '电量(万千瓦时)',
    dataIndex: 'power',
    id:"power"
}, {
    title: '创建时间',
    dataIndex: 'createTime',
    id:"createTime"
}];



export  default class tradingIndex extends React.Component {
    constructor() {
        super();
        this.state={
            partyName: 'XX省电力市场交易系统',
            userName: '广州风神汽车有限公司',
            selectedRowKeys: [], // Check here to configure the default column
            selectedRowKeys2: [], // Check here to configure the default column
            loading: false,
            data:[],
            data2:[],
            count:0,
            count2:0,

        }
    }
    componentDidMount(){
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: '1',
            pageSize: '10',
            queryStr: '',
            status:'PENDING',
            type:''
        }
        let url = "/api/contract/plan/list";
        api.post(url, headers, params,
            (res) => {
                console.log(res)
                this.setState({
                    data:res.content.plans,
                    count:res.content.total,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );


        let headers2 = {
            'Authorization': sessionStorage.obj,
        }
        let params2 = {
            pageNo: '1',
            pageSize: '10',
            queryStr: '',
            status:'PENDING',
            type:''
        }
        let url2 = "/api/contract/bidding/list";
        api.post(url2, headers2, params2,
            (res) => {
                console.log(res)
                this.setState({
                    data2:res.content.list,
                    count2:res.content.total,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );




    }
    start = (e) => {
        if(this.state.selectedRowKeys.length>1){
            message.error("只能选择一个合同")
        }else{
            this.setState({
                loading: true,
            });

            localStorage.setItem("pricekey",this.state.data[this.state.Ae].id)
            localStorage.setItem("pricetype","bilateral")
            this.props.history.push("/tradingcenter")
        }
    }

    start2 = (e) => {
        if(this.state.selectedRowKeys2.length>1){
            message.error("只能选择一个合同")
        }else{
            this.setState({
                loading: true,
            });
            localStorage.setItem("pricekey",this.state.data[this.state.Ae2].id)
            localStorage.setItem("pricetype","bidding")
            this.props.history.push("/tradingcenter2")
        }
    }



    onSelectChange = (selectedRowKeys,e) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        console.log(this.state)

          this.setState({
              Ae:selectedRowKeys
          })
    }
    onSelectChange2 = (selectedRowKeys2,e) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys2);
        this.setState({ selectedRowKeys2 });
        console.log(this.state)

        this.setState({
            Ae2:selectedRowKeys2
        })
    }

    returnright =(e)=>{
        console.log(e.key)
        this.props.history.push(e.key)
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
            pageSize: '10',
            queryStr: '',
            status:'PENDING',
            type:''
        }
        let url = "/api/contract/plan/list";
        api.post(url, headers, params,
            (res) => {
                console.log(res)
                this.setState({
                    data:res.content.plans,
                    count:res.content.count,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );

    }
    Paging2 = (e) => {
        this.setState({
            pageNo: e,
        });
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            pageNo: e,
            pageSize: '10',
            queryStr: '',
            status:'PENDING',
            type:''
        }
        let url = "/api/contract/bidding/list";
        api.post(url, headers, params,
            (res) => {
                console.log(res)
                this.setState({
                    data:res.content.list,
                    count:res.content.count,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );

    }
    render() {
        const { partyName } = this.state;
        const { selectedRowKeys } = this.state;
        const { selectedRowKeys2 } = this.state;
        const rowSelection = {
            type:"radio",
            //hideDefaultSelections:true,
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const rowSelection2 = {
            type:"radio",
            //hideDefaultSelections:true,
            selectedRowKeys2,
            onChange: this.onSelectChange2,
        };


        const hasSelected = selectedRowKeys.length > 0;
        const hasSelected2 = selectedRowKeys2.length > 0;
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
                    <div style={{ background: '#fff', padding:  24,height:"1000px"}} className="conBoxht">
                        {/*<Row className='menuArea'>*/}
                            {/*<Menu*/}
                                {/*mode="horizontal"*/}
                                {/*style={{ lineHeight: '64px' }}*/}
                                {/*className="menuIte"*/}
                                {/*defaultSelectedKeys={['/tradingcontract']}*/}
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

                        <Steps current={0} style={{margin:"50px 10%",width:"80%"}}>
                            <Step title="合同确认" />
                            <Step title="双边审核"  />
                            <Step title="发布公告"  />
                        </Steps>
                        <Divider />
                        <div>
                            <div style={{ marginBottom: 16 }}>
                            </div>

                            <div>
                                <div className={`lefttable`} style={{width:"50%",float:"left"}}>
                                    <h3>长协合同</h3>
                                    <Table rowSelection={rowSelection}     columns={columns} pagination={false} dataSource={this.state.data} total={this.state.count} />
                                    <div style={{margin:"20px  0", float:"right"}}>
                                        <Pagination total={this.state.count}  defaultCurrent={1} onChange={this.Paging} />
                                    </div>
                                    <div style={{clear:"both"}}></div>
                                    <Button
                                        type="primary"
                                        onClick={()=>{this.props.history.go(-1)}}
                                        style={{float:"right",margin:"10px auto"}}
                                    >
                                        返回
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={this.start}
                                        disabled={!hasSelected}
                                        style={{float:"right",margin:"10px 20px"}}
                                    >
                                        审核
                                    </Button>
                                </div>


                                <div className={`righttable`} style={{width:"50%",float:"left"}}>
                                    <h3>竞价合同</h3>
                                    <Table rowSelection={rowSelection2}     columns={columns2} pagination={false} dataSource={this.state.data2} total={this.state.count2} />
                                    <div style={{margin:"20px  0", float:"right"}}>
                                        <Pagination total={this.state.count}  defaultCurrent={1} onChange={this.Paging2} />
                                    </div>
                                    <div style={{clear:"both"}}></div>
                                    <Button
                                        type="primary"
                                        onClick={()=>{this.props.history.go(-1)}}
                                        style={{float:"right",margin:"10px auto"}}
                                    >
                                        返回
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={this.start2}
                                        disabled={!hasSelected2}
                                        style={{float:"right",margin:"10px 20px"}}
                                    >
                                        审核
                                    </Button>
                                </div>
                            </div>








                            {/*<Button*/}
                                {/*type="danger"*/}
                                {/*onClick={this.startlast}*/}
                                {/*disabled={!hasSelected}*/}
                                {/*style={{float:"right",margin:"10px 3%"}}*/}
                            {/*>*/}
                                {/*退回*/}
                            {/*</Button>*/}

                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    版权所有  ©2018 XX电力交易中心 粤ICP备06044847号
                </Footer>
            </Layout>
        )
    }
}