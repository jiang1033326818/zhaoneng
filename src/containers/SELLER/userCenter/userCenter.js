import React from 'react';
import {Layout, Breadcrumb, Row, Col, Icon, Button, Form, Input, Modal, Spin} from 'antd';
import './userCenter.less';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import Shield from '../../../components/icon/Shield.png';
import Battery from '../../../components/icon/Battery.png';
import api from '../../../api/tools.js';

const {Content} = Layout;
const FormItem = Form.Item;
const url = '/api/login/info';

class UserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'first',
            userName: '',
            location: '用户中心',
            confirmModalShow: false,
            userInfo: {
                corporation: '', // 法人名称
                companyAddress: '', // 公司注册地址
                tradingCenter: '', // 省交易中心
            },
            showUserInfo: false, // 控制是否显示用户信息
            showSubmitBtn: true, // 用户信息按钮控制，是否显示提交按钮，false，则显示完善资料按钮
            spinShow: false, // 加载图标是否显示
            company: '',
            message: '2018年5月5日0点进行系统维护，届时系统停止服务，预计维护8小时，请各位企业成员注意!',
            userStatus: 'nocomplete',
            userTipsMessage: '电力交易需要完善企业资质信息资料备案和授权代理关系，请点击下方按钮，完善信息。'
        }
    }

    componentDidMount() {
        this.handleGet();
    }

    getCompanyInfo = (companyId) => {
        let str = sessionStorage.obj;
        api.get('/api/company/details/' + companyId, {
                'Authorization': str
            },
            {
                authorization: str
            }, res => {
                if (res.code === 0) {
                    const userInfo = {
                        corporation: res.content.legalPerson,
                        companyAddress: res.content.registeredAddress,
                        tradingCenter: res.content.tradingCenter
                    };
                    this.setState({
                        userInfo,
                        showSubmitBtn: !userInfo.corporation, // 判断该显示那个按钮
                        showUserInfo: !!userInfo.corporation,
                    });
                }
            }
        );
    };
    handleGet = () => {
        let str = sessionStorage.obj;
        api.get(url, {
                'Authorization': str
            }, {
                authorization: str
            }, res => {
                if (res.code === 0) {
                    this.setState({
                        companyId: res.content.companyId,
                        company: res.content.companyName,
                        userName: res.content.username,
                    });
                    this.getCompanyInfo(res.content.companyId);
                    sessionStorage.company = res.content.companyName;
                    sessionStorage.userName = res.content.username;
                }
            }
        )
    }
    // 提交执行函数
    submitHandler = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    confirmModalShow: true,
                    userInfo: values
                });
            }
        });
    };

    // 二次确认ok执行函数
    confirmOk = () => {
        this.setState({
            spinShow: true,
        });
        let str = sessionStorage.obj;
        const {companyAddress, corporation, tradingCenter} = this.state.userInfo;
        api.post('/api/company/update', {
            'Authorization': str
        }, {
            authorization: str,
            id: this.state.companyId,
            registeredAddress: companyAddress,
            tradingCenter,
            legalPerson: corporation,
        }, res => {
            this.setState({
                spinShow: false,
            });
            if (res.code === 0) {
                this.setState({
                    confirmModalShow: false,
                });
                this.showSuccessModal();
            } else {

            }
        }, err => {
            this.setState({
                spinShow: false,
            });
        });
    };

    // 二次确认cancel执行函数
    confirmCancel = () => {
        this.setState({
            confirmModalShow: false
        })
    };

    // 返回首页
    backHome = () => {
        this.props.history.push(`/seller/index`);
    };

    // 操作成功之后显示成功提示框
    showSuccessModal = () => {
        const modal = Modal.success({
            title: '成功完善企业信息',
            content: <span>操作成功后5秒返回首页，或直接点击按钮返回</span>,
            okText: '返回首页',
            onOk: this.backHome
        });
        setTimeout(() => {
            this.props.history.push(`/seller/index`);
            modal.destroy();
        }, 5000);
    };

    render() {
        const {
            location,
            company,
            message,
            userStatus,
            userTipsMessage,
            userInfo,
            showUserInfo,
            showSubmitBtn,
            spinShow
        } = this.state;
        const {getFieldDecorator} = this.props.form;

        const userInfoLess = (
            <div>
                <Row>
                    <div className="system-tip">
                        <span className="broad">系统公告:</span>
                        <span className="message">{message}</span>
                    </div>
                </Row>
                <Row className="middle">
                    <Row className="iconHead">
                        <Col span={8} offset={8}>
                            {
                                userStatus === 'nocomplete' ? <Icon type="exclamation-circle" className="iconItem"/> :
                                    <Icon type="check-circle" className="iconItemCheck"/>
                            }
                        </Col>
                    </Row>
                    <Row className="tipHead">
                        <Col span={8} offset={8}>
                            <p className="tipItem">{userStatus === 'nocomplete' ? '尚未完善资料' : '资料已完善'}</p>
                        </Col>
                    </Row>
                    {
                        userStatus === 'nocomplete' ?
                            <Row>
                                <Row className="tipsMessage">
                                    <Col span={8} offset={8}>
                                        <p className="messageItem">{userTipsMessage}</p>
                                    </Col>
                                </Row>
                                <Row className="messageBtn">
                                    <Col span={8} offset={8}>
                                        <Button type="primary" className="msgBtn" onClick={() => {
                                            this.setState({showUserInfo: true})
                                        }}>完善资料</Button>
                                    </Col>
                                </Row>
                            </Row> :
                            <Row className="messageBtn">
                                <Col span={8} offset={8}>
                                    <Button type="primary" className="msgBtn" onClick={() => {
                                        this.props.history.push(`/seller/completeinfo`)
                                    }}>修改资料</Button>
                                </Col>
                            </Row>
                    }
                </Row>
            </div>
        );

        const btnShow = showSubmitBtn ? (
            <div className="btn-container">
                <Button className="btn-cancel" onClick={this.backHome}>
                    跳过
                </Button>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </div>
        ) : (
            <div className="btn-container">
                <Button type="primary" htmlType="submit">
                    修改资料
                </Button>
            </div>
        );

        const perfectUserInfo = (
            <div className="form-container">
                <div className="form-box">
                    <div className="form-title">完善信息</div>
                    <Form onSubmit={this.submitHandler}>
                        <FormItem
                            label="企业法人名称"
                        >
                            {getFieldDecorator('corporation', {
                                initialValue: userInfo.corporation,
                                rules: [{
                                    required: true, message: '企业法人不能为空',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        {/*<FormItem*/}
                        {/*label="法人联系电话"*/}
                        {/*>*/}
                        {/*{getFieldDecorator('phone', {*/}
                        {/*rules: [{*/}
                        {/*required: true, message: '企业联系电话不能为空',*/}
                        {/*}],*/}
                        {/*})(*/}
                        {/*<Input />*/}
                        {/*)}*/}
                        {/*</FormItem>*/}
                        <FormItem
                            label="公司注册地址"
                        >
                            {getFieldDecorator('companyAddress', {
                                initialValue: userInfo.companyAddress,
                                rules: [{
                                    required: true, message: '公司注册地址不能为空',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            label="所属省级电力交易中心"
                        >
                            {getFieldDecorator('tradingCenter', {
                                initialValue: userInfo.tradingCenter,
                                rules: [{
                                    required: true, message: '所属省级电力交易中心不能为空',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        {btnShow}
                    </Form>
                </div>
            </div>
        );

        const confirmModal = (
            <Modal
                title="企业信息确认"
                visible={this.state.confirmModalShow}
                okText="确定"
                cancelText="取消"
                onOk={this.confirmOk}
                onCancel={this.confirmCancel}
            >
                <div className="confirm-modal-text">
                    <p><span>企业法人名称:</span> <span className="text-detail">{userInfo.corporation}</span></p>
                    <p><span>公司注册地址:</span> <span className="text-detail">{userInfo.companyAddress}</span></p>
                    <p><span>省级交易中心:</span> <span className="text-detail">{userInfo.tradingCenter}</span></p>
                </div>
            </Modal>
        );
        const userShow = showUserInfo ? perfectUserInfo : userInfoLess;

        return (
            <Layout className="userCenterlayout">
                <Lheader history={this.props.history}></Lheader>
                <Content style={{padding: '0 100px'}}>
                    <Row>
                        <Col span={16}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>您当前的位置: </Breadcrumb.Item><Breadcrumb.Item
                                className="userCenterlocation">{location}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <div style={{background: '#fff', padding: 24, minHeight: 762}} className="userCentercontent">
                        <Row className="topOne">
                            <Col span={8}>
                                <span className="welcome">欢迎</span>
                                <span className="userName">{company}</span>
                            </Col>
                            <Col span={16}>
                                <Row>
                                    <div className="companyNameOnes">
                                        {company}
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
                        <Spin spinning={spinShow}>
                            {userShow}
                        </Spin>
                    </div>
                </Content>
                {
                    confirmModal
                }
                <Lfooter></Lfooter>
            </Layout>
        )
    }
}

export default Form.create()(UserCenter);