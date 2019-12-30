import React from 'react';
import {Layout, Breadcrumb, Row, Form, Input, Tooltip, Icon, Select, Button, message,Table,Pagination } from 'antd';
import Lheader from '../../../PRODUCER/common/Iheader.js';
import Lfooter from '../../../../components/layout/Ifooter.js';
import "./adduser.less"
import addimg from "../../../../components/icon/adduser.png"
import userlist from "../../../../components/icon/user.png"
import api from "../../../../api/tools";

const {Content} = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [{
    title: '用户名',
    dataIndex: 'username',
    key: 'name',
    align:"center"
}, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    align:"center"
},
    {
        title: '身份',
        dataIndex: "isAdmin",
        key: 'phone',
        align:"center",
        render: text => <span>{text===true?"管理员":"用户"}</span>,
    },

   ];



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
    }
    componentDidMount(){
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {
            keyword: "",
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
            keyword: "",
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
                //console.log('Received values of form: ', values);
                let headers = {
                    'Authorization': sessionStorage.obj,
                }
                let params = {
                    email: values.email,
                    password: values.password,
                    phone: values.phone,
                    username: values.nickname,
                };
                let url = '/api/register/create'
                api.post(url, headers, params,
                    (res) => {
                        console.log(res)
                        message.success("用户添加成功!")
                        //this.props.form.setFields({"Input":""})
                        this.props.form.resetFields();
                    },
                    (err) => {
                        console.log("failed" + err)
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );


        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <div style={{margin: '16px 0'}}>
                        <span>您当前的位置:   </span><Breadcrumb.Item className="location"><span
                        style={{color: "#999"}}>{"用户信息/"}</span>{"添加用户"}</Breadcrumb.Item>
                    </div>


                    <Row className={`priceBox`}>
                        <div className={`conbox`}>
                            <div className={`newBox`}>
                                <Form onSubmit={this.handleSubmit}>
                                    <img src={addimg} alt=""/>
                                    <h4>添加用户</h4>
                                    <div className={`clear`}></div>
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
                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label="确认密码"
                                    >
                                        {getFieldDecorator('confirm', {
                                            rules: [{
                                                required: true, message: '请确认要添加的密码',
                                            }, {
                                                validator: this.compareToFirstPassword,
                                            }],
                                        })(
                                            <Input type="password" onBlur={this.handleConfirmBlur}/>
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
                                        {getFieldDecorator('nickname', {
                                            rules: [{required: true, message: '请输入要添加的用户名!', whitespace: true}],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        className={`longbox`}
                                        {...formItemLayout}
                                        label="电话号码"
                                    >
                                        {getFieldDecorator('phone', {
                                            rules: [{required: true, message: '请输入要添加的手机号码!'}],
                                        })(
                                            <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                                        )}
                                    </FormItem>


                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" className={`add`}>添加</Button>
                                    </FormItem>
                                </Form>
                            </div>


                            <div className={`newBox2`}>
                                <img src={userlist} alt=""/>
                                <h4>用户列表</h4>
                                <div className={`clear`}></div>
                                <Table columns={columns} dataSource={this.state.data} className={`usertable`} pagination={false}/>
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