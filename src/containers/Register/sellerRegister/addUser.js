import React from 'react';
import {Layout, Breadcrumb, Row, Form, Input, Tooltip, Icon, Button, message,Table,Pagination,Divider,Radio } from 'antd';
import Lheader from '../../SELLER/common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import "./selleradduser.less"
import addimg from "../../../components/icon/adduser.png"
import userlist from "../../../components/icon/user.png"
import api from "../../../api/tools";
import selleruser from '../../../components/icon/selleruser.png'
import adminuser from '../../../components/icon/adminuser.png'
import transuser from '../../../components/icon/transuser.png'

const {Content} = Layout;
const FormItem = Form.Item;
// const Option = Select.Option;
const RadioGroup = Radio.Group;

class addUser extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
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
        value:1,
    }


    get getcolumns(){
       return [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align:"center"
        }, {
            title: '电话',
            dataIndex: 'mobile',
            key: 'mobile',
            align:"center"
        },
           {
               title: '姓名',
               dataIndex: 'name',
               key: 'name',
               align:"center"
           },

            {
                title: '身份',
                dataIndex: "roleCode",
                key: 'roleCode',
                align:"center",
                render: text => <span>{
                    text==="salesman"?
                        // "管理员":"用户"
                        <span>销售人员</span>: text==="admin"?<span>管理员 </span>:<span>电力交易员 </span>
                }</span>,
            },
           {
               title: '操作',
               dataIndex: "isFreeze",
               key: 'isFreeze',
               align:"center",
               // render: text => <span>{
               //     text===true?
               //         // "管理员":"用户"
               //         <span>冻结</span>:<span><a onClick={this.freezeuser(text)}>冻结</a></span>
               // }</span>,
               render: ( record,text) => (
                   <span>
                        {
                            text.roleCode==="admin"?
                                <span>
                                    <span>冻结</span>
                                     <Divider type="vertical"/>
                                    <span>重置密码</span>
                                </span>:
                                text.isFreeze===false?
                                <span>
                                    <a onClick={()=>this.freezeuser(record,text)}>冻结</a>
                                     <Divider type="vertical"/>
                                    <a onClick={()=>this.chongzhi(record,text)}>重置密码</a>
                                </span>:<span>
                                        <a onClick={()=>this.unfreezeuser(record,text)}>解冻</a>
                                     <Divider type="vertical"/>
                                    <a onClick={()=>this.chongzhi(record,text)}>重置密码</a>
                                    </span>
                        }
                    </span>
               ),
           },

        ];
    }
    freezeuser=(record,text)=>{
        console.log(text)
        console.log(record)
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {


        };
        let url = '/api/user/'+text.id+'/freeze/'
        api.post(url, headers, params,
            (res) => {
                console.log(res)
                message.success("已冻结")
                let headers2 = {
                    'Authorization': sessionStorage.obj,
                }
                let params2 = {
                    // keyword: "",
                    page: 1,
                    size: 9
                };
                let url2 = '/api/user/list'
                api.post(url2, headers2, params2,
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
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }
    unfreezeuser=(record,text)=>{
        console.log(text)
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {


        };
        let url = '/api/user/'+text.id+'/unfreeze/'
        api.post(url, headers, params,
            (res) => {
                console.log(res)
                message.success("解除冻结成功")
                let headers2 = {
                    'Authorization': sessionStorage.obj,
                }
                let params2 = {
                    // keyword: "",
                    page: 1,
                    size: 9
                };
                let url2 = '/api/user/list'
                api.post(url2, headers2, params2,
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
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }
    chongzhi=(record,text)=>{
        let headers2 = {
            'Authorization': sessionStorage.obj,
        }
        let params2 = {

        };
        let url2 = '/api/user/reset/'+text.id
        api.post(url2, headers2, params2,
            (res) => {
                console.log(res)
                message.success("密码已重置为:Aa123456")
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }



    componentDidMount(){
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
           // keyword: "",
            page: 1,
            size: 9
        };
        let url = '/api/user/list'
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
    }
    Paging = (e) => {

        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            //keyword: "",
            page: e,
            size: 9
        };
        let url = '/api/user/list'
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
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let headers = {
                    'Authorization': sessionStorage.obj,
                }
                let params = {
                    name:values.name,
                    email: values.email,
                    password: values.password,
                    phone: values.phone2,
                    username: values.username,
                    mobile:values.phone,
                    nickname:values.nickname,
                    roleId:values.usertype,
                };
                let url = '/api/user/create'
                api.post(url, headers, params,
                    (res) => {
                        console.log(res)
                        message.success("用户添加成功!")
                        //this.props.form.setFields({"Input":""})
                        this.props.form.resetFields();
                        let headers2 = {
                            'Authorization': sessionStorage.obj,
                        }
                        let params2 = {
                            //keyword: "",
                            page: 1,
                            size: 9
                        };
                        let url2 = '/api/user/list'
                        api.post(url2, headers2, params2,
                            (res) => {
                                console.log(res)
                                this.setState({
                                    data:res.content.content,
                                    count:res.content.total,
                                })
                            },
                            (err) => {
                                console.log(err)
                                message.error(err.message)
                            }
                        );
                    },
                    (err) => {
                        console.log("failed" + err)
                        message.error(err.message)
                    }
                );
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }
    onatypeChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
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



        return (
            <Layout className="layout  ">
                {/* 头部header */}
                <Lheader history={this.props.history}></Lheader>
                <Content style={{padding: '0 50px',marginBottom:"50px"}}>
                    {/* 面包屑 */}
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span><Breadcrumb.Item className="location"><span
                        style={{color: "#999"}}>{"用户信息/"}</span>{"添加用户"}</Breadcrumb.Item>
                    </div>


                    <Row className={`priceBox`}>
                        <div className={`topconbox`}>
                            {/*<h4>用户管理</h4>*/}
                            <div className={`topconicon iconone`}>
                                <img src={selleruser} alt=""/>
                                <span>销售人员</span>
                                <Tooltip  placement="right" title="根据用户线索转化为客户收集客户需求,签约售电合同,维系客户关系">
                                    <Icon type="info-circle" theme="outlined" style={{color:"#1296db"}} />
                                </Tooltip>
                            </div>
                            <div className={`topconicon`}>
                                <img src={adminuser} alt=""/>
                                <span>管理人员</span>
                                <Tooltip placement="right" title="公司内部管理决策人员">
                                    <Icon type="info-circle" theme="outlined" style={{color:"#1296db"}} />
                                </Tooltip>
                            </div>
                            <div className={`topconicon`}>
                                <img src={transuser} alt=""/>
                                <span>电力交易</span>
                                <Tooltip placement="right" title="电力交易交易员">
                                    <Icon type="info-circle" theme="outlined" style={{color:"#1296db"}} />
                                </Tooltip>
                            </div>
                        </div>
                        <div className={`conbox`}>
                            <div className={`newBox`}>
                                <Form onSubmit={this.handleSubmit}>
                                    <img src={addimg} alt=""/>
                                    <h4>添加用户</h4>
                                    <div className={`clear`}></div>

                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                            用户角色
                                         </span>
                                        )}
                                    >
                                        {getFieldDecorator('usertype', {
                                            rules: [{required: true,message: '请选择要添加的角色!'}],
                                        })(
                                            <RadioGroup onChange={this.onatypeChange} defaultValue={1}  value={this.state.value} style={{height:"auto"}}>
                                                <Radio value={1}>管理人员</Radio>
                                                <Radio value={3}>销售人员</Radio>
                                                <Radio value={2}>电力交易</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>

                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                            用户名&nbsp;
                                                <Tooltip title="您添加的用户将会使用用户名来登录">
                                             <Icon type="question-circle-o"/>
                                             </Tooltip>
                                         </span>
                                        )}
                                    >
                                        {getFieldDecorator('username', {
                                            rules: [{required: true, message: '请输入要添加的用户名!', whitespace: true}],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label="密码"
                                    >
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                required: true, message: '请输入要添加用户的密码',
                                            }, {
                                                validator: this.validateToNextPassword,
                                            }],
                                        })(
                                            <Input type="password"/>
                                        )}
                                    </FormItem>
                                    {/*<FormItem*/}
                                        {/*className={`longbox`}*/}
                                        {/*{...formItemLayout}*/}
                                        {/*label="确认密码"*/}
                                    {/*>*/}
                                        {/*{getFieldDecorator('confirm', {*/}
                                            {/*rules: [{*/}
                                                {/*required: true, message: '请确认要添加的密码',*/}
                                            {/*}, {*/}
                                                {/*validator: this.compareToFirstPassword,*/}
                                            {/*}],*/}
                                        {/*})(*/}
                                            {/*<Input type="password" onBlur={this.handleConfirmBlur}/>*/}
                                        {/*)}*/}
                                    {/*</FormItem>*/}
                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label="姓名"
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{required: true, message: '请输入要添加的姓名!', whitespace: true}],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label="邮箱"
                                    >
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                type: 'email', message: '请输入正确的邮箱格式',
                                            }, {
                                                required: true, message: '请输入您的邮箱!',
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>


                                    {/*<FormItem*/}
                                        {/*className={`longbox`}*/}
                                        {/*{...formItemLayout}*/}
                                        {/*label={(*/}
                                            {/*<span>*/}
                                            {/*昵称&nbsp;*/}
                                                {/*<Tooltip title="您的昵称">*/}
                                             {/*<Icon type="question-circle-o"/>*/}
                                             {/*</Tooltip>*/}
                                         {/*</span>*/}
                                        {/*)}*/}
                                    {/*>*/}
                                        {/*{getFieldDecorator('nickname', {*/}
                                            {/*rules: [{required: true, message: '请输入要添加的昵称!', whitespace: true}],*/}
                                        {/*})(*/}
                                            {/*<Input/>*/}
                                        {/*)}*/}
                                    {/*</FormItem>*/}
                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label="手机号码"
                                    >
                                        {getFieldDecorator('phone', {
                                            rules: [{required: true, message: '请输入要添加的手机号码!'}],
                                        })(
                                            <Input  style={{width: '100%'}}/>
                                        )}
                                    </FormItem>
                                    {/*<FormItem*/}
                                        {/*className={`longbox`}*/}
                                        {/*{...formItemLayout}*/}
                                        {/*label="办公电话"*/}
                                    {/*>*/}
                                        {/*{getFieldDecorator('phone2', {*/}
                                            {/*rules: [{required: false, message: '请输入要添加的办公电话!', whitespace: true}],*/}
                                        {/*})(*/}
                                            {/*<Input/>*/}
                                        {/*)}*/}
                                    {/*</FormItem>*/}



                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" className={`add`}>添加</Button>
                                    </FormItem>
                                </Form>
                            </div>


                            <div className={`newBox2`}>
                                <img src={userlist} alt=""/>
                                <h4>用户列表</h4>
                                <div className={`clear`}></div>
                                <Table columns={this.getcolumns} dataSource={this.state.data} className={`usertable`} pagination={false}/>
                                <div style={{margin:"20px  5%", float:"right"}}>
                                    <Pagination total={this.state.count}  defaultCurrent={1} onChange={this.Paging} />
                                </div>
                            </div>
                        </div>
                    </Row>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )


    }
}

export default Form.create()(addUser)