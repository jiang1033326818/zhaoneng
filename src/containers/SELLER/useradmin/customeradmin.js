import React from 'react';
import {Layout, Breadcrumb, Row, Form, Table,Pagination,Button,Select,Input,LocaleProvider,Col,Divider,Modal,Icon,message} from 'antd';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import "./customeradmin.less"
import api from "../../../api/tools"
import zhCN from "antd/lib/locale-provider/zh_CN";
import Shield from '../../../components/icon/Shield.png';
import Battery from '../../../components/icon/Battery.png';
const {Content} = Layout;
const Option = Select.Option;
const FormItem = Form.Item;


class customeradmin extends React.Component {
    state = {
        page:1,
        size: 10,
        status:null,
        type:null,
        name:"",
        user:[],
        loading: false,
        visible: false,
        visible2: false,
        visible3: false,
        visible4: false,
        current: 'first',
        userName: 'buyer',
        location: '首页',
        company: '',
        company2: '',
        data:[],
        monthdata:[],
        compdata:[],
        count:0,
        stateyear:"2018",
        statemonth:"01",
        datamonth:'',
        detidata:'',
        messagehid:"none",
        filteredInfo: null,
        sortedInfo: null,
        confirmDirty: false,
        autoCompleteResult: [],
        userstatus:"",
        pluslist0:[
            {
                name:"",
                mobile:"",
            }
        ],
        pluslist:[
            {
                name:"",
                mobile:"",
            }
        ],
        all:{
            all:"0",
            customer:"0",
            producer:"0",

        }
    }
    handleGet() {    //获取用户信息
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {};
        let url = '/api/login/info'
        api.get(url, headers, params,
            (res) => {
                this.setState({
                    company: res.content.companyName,
                    userName: res.content.username
                })

                sessionStorage.company = res.content.companyName;
                sessionStorage.userName = res.content.username;
                sessionStorage.userId = res.content.id;
            },
            (err) => {
                console.log("failed" + err)
            }
        );

    }
    getdatalist(){
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            name: this.state.name,
            pageNo: this.state.page,
            pageSize: this.state.size,
            status: this.state.status,
            type: this.state.type
        };
        let url = '/api/customer/list'
        api.post(url, headers, params,
            (res) => {
                this.setState({
                    data:res.content.content,
                    count:res.content.total,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }
    getuserlist(){
        let headers = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params = {
            // roleId:3
        };
        let url = '/api/user/'+3+'/list'
        api.post(url, headers, params,
            (res) => {
                this.setState({
                    user:res.content,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }
    gerusernum(){
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {

        };
        let url = '/api/customer/count'
        api.get(url, headers, params,
            (res) => {
                this.setState({
                    all:res.content,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }


    componentDidMount() {
        this.handleGet();
        this.getdatalist();
        this.getuserlist();
        this.gerusernum();
    }
    showModal = (record) => {
        console.log(record)
        this.setState({
            visible: true,
            company2:record.name,
            id:record.id,
            userstatus:record.status,
        });
    }

    handleOk = (e) => {
        let i =this.state.userstatus
        let headers = {
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params = i==="COMPLETED"?0:i==="UNFINISHED"?1:i==="UNBINDING"?2:3

        let url = '/api/customer/'+this.state.id+'/status'
        api.post(url, headers, params,
            (res) => {
                this.setState({
                    visible: false,
                });
                message.success("修改成功")
                this.getdatalist();
            },
            (err) => {
                console.log("failed" + err)
                message.error(err.message)
            }
        );
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
        console.log(record)
        this.setState({
            visible2: true,
            pluslist0:[
                {
                    name:"",
                    mobile:"",
                }
            ],
            pluslist:[
                {
                    name:"",
                    mobile:"",
                }
            ],
        });
    }

    handleOk2 = (e) => {
        this.handleSubmit()
    }

    handleCancel2 = (e) => {
        console.log(e);
        this.setState({
            visible2: false,
        });
    }


    showModal4 = (record) => {
        localStorage.setItem("customerId",record.id)
        this.props.history.push("/seller/customerdetail")
    }

    showModal3 = (record) => {
        console.log(record)
        this.setState({
            visible3: true,
            company2:record.userName,
            id:record.id,
        });
    }

    handleOk3 = (e) => {
        let i =this.state.userId
        console.log(e);
        let headers = {
            'Authorization': sessionStorage.obj,
            'Content-Type': "application/json",
        }
        let params = i;
        let url = '/api/customer/'+this.state.id+'/assign'
        api.post(url, headers, params,
            (res) => {
                this.setState({
                    visible3: false,
                });
                message.success("修改成功")
                this.getdatalist();
            },
            (err) => {
                console.log("failed" + err)
                message.error(err.message)
            }
        );

    }

    handleCancel3 = (e) => {
        console.log(e);
        this.setState({
            visible3: false,
        });
    }



    handleChangetable = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }


    handleChange = (e) =>{
        this.setState({
            type:e==="all"?null:e
        })
    }
    handleChangetype2 = (e) =>{
        console.log(e)
        this.setState({
            status:e==="all"?null:e
        })
    }
    handleChangetype = (e) =>{
        console.log(e)
        this.setState({
            userstatus:e
        })
    }
    componyname= (e) =>{
        this.setState({
            name:e.target.value,
        })
    }


    selectmonth= (e) =>{
        this.getdatalist()

    }
    Paging = (e)=>{
        this.setState({
            page:e
        })
        this.getdatalist()
    }

    onShowSizeChange = (current,pageSize)=>{
        this.setState({ size: pageSize});
        this.getdatalist()
    }

    selectuser =(e)=>{
        console.log(e)
        this.setState({
            userId:e
        })
    }
    handleBlur2 =(e)=>{
        console.log(e)
    }
    handleFocus2=(e)=>{
        console.log(e)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let a =this.state.pluslist
        let b =this.state.pluslist0

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                a.unshift(b[0])
                console.log(a);

                let headers = {
                    'Authorization': sessionStorage.obj,
                    'Content-Type': "application/json",
                }
                let params = {
                    contactCreatePOS:a,
                    name:values.name,
                    registeredAddress:values.address,
                    regionName:values.frname,
                    type:values.type,
                };
                let url = '/api/customer/create'
                api.post(url, headers, params,
                    (res) => {
                        this.setState({
                            visible2: false,
                        });
                        message.success("创建成功")
                        this.getdatalist();
                        this.gerusernum();
                    },
                    (err) => {
                        console.log("failed" + err)
                        message.error(err.message)
                    }
                );
            }
        });
    }

    addname0 =(e) =>{
        let a=this.state.pluslist0;
        a[0].name=e.target.value;
        this.setState({
            pluslist0:a
        })
    }
    addphone0 =(e) =>{
        let a=this.state.pluslist0;
        a[0].mobile=e.target.value;
        this.setState({
            pluslist0:a
        })
    }
    addname =(e) =>{
        console.log(e.target.name)
        let a=this.state.pluslist;
        a[e.target.name].name=e.target.value;
        this.setState({
            pluslist:a
        })
    }
    addphone =(e) =>{
        console.log(e.target.name)
        let a=this.state.pluslist;
        a[e.target.name].mobile=e.target.value;
        this.setState({
            pluslist:a
        })
    }
    addicon =(e) =>{
        console.log(e)
        let a=this.state.pluslist;
        a.push(
            {
                name:"",
                mobile:"",
            }
        )
        this.setState({
            pluslist:a
        })

    }
    reduceicon=(e)=>{
        let a=this.state.pluslist;
        a.splice(e.target.id,1);
        this.setState({
            pluslist:a
        })
        console.log(this.state.pluslist)
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const   tableColumns2= [{
                title: '序号',
                dataIndex: 'id',
                key: 'id',
            //align:"right",
            }, {
                title: '公司名称',
                dataIndex: 'name',
                key: 'name',
            //align:"right",
            },
                {
                    title: '客户类型',
                    key: 'type',
                    dataIndex: 'type',
                    align:"right",
                    render: (index) => (
                        <span >
                            {index==="CUSTOMER"?"用电企业":"发电企业"}
                    </span>
                    ),

                },{
                    title: '联系人数量',
                    dataIndex: 'contactNum',
                    key: 'contactNum',
                align:"right",
                },{
                    title: '累计合同电量',
                    dataIndex: 'planPower',
                    key: 'planPower',
                align:"right",
                    sorter: (a, b) => a.bilateralPower - b.bilateralPower,
                    sortOrder: sortedInfo.columnKey === 'bilateralPower' && sortedInfo.order,
                },
                {
                    title: '累计结算电量',
                    dataIndex: 'settlementPower',
                    key: 'settlementPower',
                    align:"right",
                },
                {
                    title: '我方销售',
                    key: 'xiaoshou',
                    align:"right",
                    //marginRight:"50px",
                    render: ( record) => (
                        <div>
                        <span style={{width:50}}>{record.userName}</span>
                        <Divider type="vertical"/>
                        <span onClick={() => this.showModal3(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"修改"}</span>
                    </div>
                    ),
                },
                {
                    title: '客户状态',
                    key: 'status',
                    align:"right",
                    render: (record) => (
                        <span >
                            {record.status==="COMPLETED"?"已绑定":record.status==="UNFINISHED"?"未绑定":record.status==="UNBINDING"?"已解绑":record.status==="NOT_PASS"?"未通过":"未知"}
                            <Divider type="vertical"/>
                             <span  onClick={() =>this.showModal(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"修改"}</span>
                    </span>
                    ),
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (record) => (
                        <span >
                        <span onClick={() => this.showModal4(record)} style={{color: "#1890FF", cursor: "pointer"}}>{"详情"}</span>
                    </span>
                    ),
                }

            ];

        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/customeradmin"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span><Breadcrumb.Item className="location">客户管理</Breadcrumb.Item>
                    </div>


                    <Row className={`priceBox`} style={{height: "auto",minHeight:1000}}>

                        <div className={`allBox`}>
                            <h2 style={{marginTop:"10px"}}>{"客户管理"}</h2>
                            <Row className="topOne">
                                <Col span={8} className={`topone1`}>
                                    <div>
                                        <p>全部</p>
                                        <b>{this.state.all===null?"0":this.state.all.all}</b>
                                    </div>
                                    <div>
                                        <p>发电企业</p>
                                        <b>{this.state.all===null?"0":this.state.all.producer}</b>
                                    </div>
                                    <div>
                                        <p>用电企业</p>
                                        <b>{this.state.all===null?"0":this.state.all.customer}</b>
                                    </div>
                                </Col>
                                <Col span={16} className={`padding24`}>
                                    <Row>
                                        <div className="companyNameOnes">
                                            {this.state.company}
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="iconGroups">
                                            <img src={Battery} alt="" style={{display: "bolck"}} className="icon-one"/>
                                            <img src={Shield} alt="" style={{display: "bolck"}} className="icon-two"/>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <Divider/>
                            <div className={`secendcss`}>
                                <h4>数据筛选</h4>
                            </div>

                            <b>客户类型:</b>
                            <Select defaultValue="all" style={{width: 120}} onChange={this.handleChange} className={`marginsel`}>
                                <Option value="all">全部</Option>
                                <Option value="PRODUCER">发电用户</Option>
                                <Option value="CUSTOMER">用电用户</Option>
                            </Select>

                            <b style={{marginLeft:"10%"}}>客户状态:</b>
                            <Select defaultValue="all" style={{width: 120,marginLeft:"3%"}} onChange={this.handleChangetype2} className={`marginsel`}>
                                <Option value="all">全部</Option>
                                <Option value="COMPLETED">已绑定</Option>
                                <Option value="UNFINISHED">未绑定</Option>
                                <Option value="UNBINDING">已解绑</Option>
                                <Option value="NOT_PASS">未通过</Option>
                            </Select>

                            <span>公司名:</span>
                            <Input onChange={this.componyname} style={{width: 200}} placeholder={"输入要查询的公司名称"}/>
                            <Button type={"primary"} onClick={this.selectmonth}>{"查询"}</Button>
                        </div>
                        <Divider/>
                        <div className={`secendcss2`}>
                            <h4>客户列表</h4>
                            <Button type={"primary"} onClick={this.showModal2}  style={{float:"right",right:"2%"}}>{"新建"}</Button>
                        </div>


                        <div style={{margin:"50px 2%"}}>



                            <Table columns={tableColumns2} dataSource={this.state.data} pagination={false} onChange={this.handleChangetable} />
                            <div style={{margin:"20px  0", float:"right"}}>
                                {/*<Pagination total={this.state.count}  defaultCurrent={1} onChange={this.Paging} />*/}
                                <LocaleProvider locale={zhCN}>
                                    <Pagination
                                        total={this.state.count}
                                        showTotal={total => `总共 ${total===null?0:total} 项`}
                                        defaultCurrent={1}
                                        showSizeChanger
                                        pageSizeOptions={['5','10','15']}
                                        onShowSizeChange={this.onShowSizeChange}
                                        showQuickJumper
                                        onChange={this.Paging}
                                        className="pageNations"
                                    />
                                </LocaleProvider>
                            </div>

                            <Modal
                                title="修改客户状态"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <p className={`userstatus`}>正在设置 <span>{this.state.company2}</span>的客户状态</p>
                                <div className={`userstatus`}>客户状态:
                                    <Select defaultValue="UNFINISHED" style={{width: 200,marginLeft:"3%"}} onChange={this.handleChangetype} className={`marginsel`}>
                                        <Option value="COMPLETED">已绑定</Option>
                                        <Option value="UNFINISHED">未绑定</Option>
                                        <Option value="UNBINDING">已解绑</Option>
                                        <Option value="NOT_PASS">未通过</Option>
                                    </Select>
                                </div>
                            </Modal>

                            <Modal
                                title="修改客户状态"
                                visible={this.state.visible3}
                                onOk={this.handleOk3}
                                onCancel={this.handleCancel3}
                            >
                                <p className={`userstatus`}>正在为 <span>{this.state.company2}</span>分配销售人员</p>
                                <div className={`userstatus`}>我方销售:
                                    <Select
                                        showSearch
                                        style={{ width: 200 ,marginLeft:"5%"}}
                                        placeholder="选择销售人员"
                                        optionFilterProp="children"
                                        onChange={this.selectuser}
                                        onFocus={this.handleFocus2}
                                        onBlur={this.handleBlur2}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            this.state.user.map((value,key)=>{
                                                return(
                                                        <Option value={value.id} key={key}>{value.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                            </Modal>

                            <Modal
                                title="新建客户"
                                visible={this.state.visible2}
                                onOk={this.handleSubmit}
                                onCancel={this.handleCancel2}
                                destroyOnClose
                            >


                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label="客户名称"
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{required: true, message: '请输入客户名称!', whitespace: true}],
                                        })(
                                            <Input style={{width:"80%"}} />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label="企业注册地址"
                                    >
                                        {getFieldDecorator('address', {
                                            rules: [{required: true, message: '请输入企业注册地址!', whitespace: true}],
                                        })(
                                            <Input style={{width:"80%"}} />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label="法人名称"
                                    >
                                        {getFieldDecorator('frname', {
                                            rules: [{required: true, message: '请输入法人名称!', whitespace: true}],
                                        })(
                                            <Input style={{width:"80%"}} />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label="客户类型"
                                    >
                                        {getFieldDecorator('type', {
                                            rules: [{required: true, message: '请输入法人名称!', whitespace: true}],
                                        })(
                                            <Select defaultValue="CUSTOMER" style={{width: "80%"}} >
                                                <Option value="CUSTOMER">用电客户</Option>
                                                <Option value="PRODUCER">发电客户</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Form>
                                <Divider/>
                                <div className={'newcustomer'} >
                                    <span>{'联系人名称:'}</span>
                                    <Input onChange={this.addname0} />
                                    <span>{'联系人手机:'}</span>
                                    <Input onChange={this.addphone0} />
                                    <Icon type="plus-circle" theme="outlined"  style={{fontSize:"25px",color:"#009dff",marginLeft:"1%",marginTop:"3px",cursor:"pointer"}}  onClick={this.addicon} />
                                </div>
                                <div>
                                    {
                                        this.state.pluslist.map((value,key)=>{
                                            return(
                                                <div className={'newcustomer'} key={key}>
                                                    <span>{"联系人名称:"}</span>
                                                    <Input onChange={this.addname} name={key} value={value.name} />
                                                    <span>{"联系人电话:"}</span>
                                                    <Input onChange={this.addphone} name={key} value={value.mobile} />
                                                    <Icon type="minus-circle" theme="outlined"   id={key}  style={{fontSize:"25px",color:"#009dff",marginLeft:"1%",marginTop:"3px",cursor:"pointer"}} onClick={this.reduceicon}  />
                                                </div>
                                            )
                                        })
                                    }

                                </div>

                            </Modal>
                        </div>

                        <Divider/>

                    </Row>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )


    }
}

export default Form.create()(customeradmin)