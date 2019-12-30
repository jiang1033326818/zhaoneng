import React from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Input, Radio, Button, InputNumber, DatePicker, Upload, message, Spin, Timeline, Select, LocaleProvider,Icon } from 'antd';
import Shield from '../../../../components/icon/Shield.png';
import Battery from '../../../../components/icon/Battery.png';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Operation from '../../../../components/common/basicOperation';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './uploadContract.less';
import Lheader from '../../common/Iheader.js';
import Lfooter from '../../../../components/layout/Ifooter.js';
import api from '../../../../api/tools.js';
const { Content } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
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
const rangeConfig = {
    rules: [{ type: 'array', required: true, message: '请选择合同生效时间' }],
};
class customerUploadContract extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            location: '首页/合同管理/上传合同',
            company: '',
            spinLoading:false,
            companyList: [],
            showupload:true,

        };
    }
    componentDidMount() {
        this.getCompanyList();
        this.setState({
            company: sessionStorage.company,
            authorization: sessionStorage.obj
        })
    }
    getCompanyList = () => {
        let url = '/api/company/list';
        const param = {};
        let headers = {
            'Authorization': sessionStorage.obj
        };
        api.get(url, headers, param,
            (res) => {
                let companyList = res.content;
                this.setState({
                    companyList: Array.from(companyList)
                })
            },
            (err) => {
                console.log("failed" + err);
            }
        );
    }
    handleBeforeUploadCheck = (file) => {
        if (file.name.endsWith('.doc')||file.name.endsWith('.pdf')||file.name.endsWith('.docx')) {
            if (Operation.isExceedFileSizeLimit(file.size)) {
                message.error('上传文件最大2M');
                return false;
            }
            message.success('上传成功');
            this.setState({
                showupload:true,
                fileList:[{
                    uid: file.uid,
                    name: file.name,
                    status: 'done',
                    url: '',
                }]
            })

        } else {

            this.setState({
                showupload:false,
                fileList:[{
                    uid: file.uid,
                    name: file.name,
                    status: file.status,
                    url: '',
                }]
            })

            message.error('只能上传word或pdf格式的文件');
        }
        this.setState({spinLoading:true});
    }
    handleAfterUpload = (info) => {
        const response = info.file.response;

        if (response) {
            this.setState({spinLoading:false, md5Str: response.content});
            if (response.code===0) {
            } else {
                this.setState({
                    showupload:false,
                })
                message.error('上传失败');
            }
        }
    }
    removeitemnow = (file)=>{
        message.success('删除成功');
        this.setState({
            showupload:false,
            fileList:[{
                uid: file.uid,
                name: file.name,
                status: file.status,
                url: '',
            }]
        })
    }
    // 表单提交事件
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({spinLoading:true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const nameStr = values.companyName;
                let companyId = Number(nameStr.substr(nameStr.length-1,1));
                let companyName = nameStr.substr(0, nameStr.length-1);
                const rangeValue = values.expiryDate;
                const effectiveDate = rangeValue[1].format('YYYY-MM-DD');
                const expiryDate = rangeValue[0].format('YYYY-MM-DD');
                const param = {
                    "companyId": companyId,
                    "companyName": companyName,
                    "contractStr": "string",
                    "contractTemplateId": "string",
                    "noticeId": 0,
                    "contractType": values.contractType,
                    "effectiveDate": effectiveDate,
                    "expiryDate": expiryDate,
                    "md5Str": this.state.md5Str,
                    "name": values.name,
                    "power": values.power,
                    "powerPrice": values.powerPrice
                }
                let url = '/api/contract/create';
                let headers = {
                    'Authorization': sessionStorage.obj
                };
                api.post(url, headers, param,
                    (res) => {
                        this.setState({spinLoading:false});
                        message.success('创建成功');
                        this.props.history.push(`/producer/contractmanage`);
                    },
                    (err) => {
                        this.setState({spinLoading:false});
                        message.error('创建失败');
                    }
                );
            }
        });
    }
	disabledDate = (current) => {
		return current && current <= moment().endOf('day')-86400000;
	}
    render() {
        const { getFieldDecorator } = this.props.form;
        const { spinLoading, authorization, companyList,fileName } = this.state;
        return (
            <Layout className="layout">
                <Lheader history={this.props.history} menubox={"/producer/contractmanage"}></Lheader>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 760 }} className="content">
                        <Row className="topOne">
                            <Col span={16} className="bigTitle">
                              {this.state.userName}
                            </Col>
                            <Col span={8}>
                            <Row>
									<div className="companyNameOne">
										{this.state.company}
									</div>
							</Row>
							<Row>
									<div className="iconGroup">
										<img src={Battery} alt="" style={{display:"bolck"}} className="icon-one" />
										<img src={Shield} alt="" style={{display:"bolck"}} className="icon-two" />
									</div>
							</Row>
                            </Col>
                        </Row>
                        <Row className="contractInfoA">
                            <Row className="bigTitle">
                                <h3>合同信息</h3>
                            </Row>
                            <Row>
                                <Col span={15} offset={5} className="formArea">
                                    <Spin size='large' spinning={spinLoading} tip="上传中，请稍后...">
                                        <Form>
                                            <FormItem label="合同名称" {...formItemLayout}>
                                                {getFieldDecorator('name', {
                                                    initialValue: '',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请输入合同名称'
                                                        }
                                                    ]
                                                })(<Input size='default' placeholder='请输入合同名称' className="inputLengthd" />)}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="合同类型"
                                            >
                                                {getFieldDecorator('contractType', {
                                                    initialValue: 'BIDDING',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请选择合同类型'
                                                        }
                                                    ]
                                                })(
                                                    <RadioGroup>
                                                        <Radio value="BIDDING">双边交易</Radio>
                                                        <Radio value="BILATERAL">集中竞价</Radio>
                                                    </RadioGroup>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="交易电量"
                                            >
                                                {getFieldDecorator('power', {
                                                    initialValue: '',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请填写交易电量'
                                                        }
                                                    ]
                                                })(
                                                    <InputNumber min={0} />
                                                )}
                                                <span className="ant-form-text"> 万千瓦时</span>
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="交易电价"
                                            >
                                                {getFieldDecorator('powerPrice', {
                                                    initialValue: '',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请填写交易电价'
                                                        }
                                                    ]
                                                })(
                                                    <InputNumber min={0} />
                                                )}
                                                <span className="ant-form-text"> 元</span>
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="企业名称"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('companyName', {
                                                    rules: [
                                                        { required: true, message: '请选择企业' },
                                                    ],
                                                })(
                                                    <Select placeholder="请选择企业名称" className="inputLengthd">
                                                        {
                                                            companyList.map((item)=>{
                                                                return (
                                                                    <Option value={item.name+item.id} key={item.id}>{item.name}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="合同生效日期"
                                            >
                                                {getFieldDecorator('expiryDate', rangeConfig)(
                                                    <RangePicker format="YYYY-MM-DD" locale={locale} disabledDate={this.disabledDate} />
                                                )}
                                            </FormItem>
                                            <FormItem

                                                {...formItemLayout}
                                                label="合同文件"
                                                extra="只能上传word或pdf格式的文件"
                                            >
                                                {getFieldDecorator('upload', {
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: fileName,
                                                })(
                                                    <LocaleProvider locale={zhCN} >
                                                        <Upload name='file'
                                                                action={api.basepath + "/api/contract/upload"}
                                                                headers= {{authorization}}
                                                                beforeUpload={this.handleBeforeUploadCheck}
                                                                onChange={this.handleAfterUpload}
                                                                showUploadList={this.state.showupload}
                                                                onRemove={this.removeitemnow}
                                                                fileList={this.state.fileList}
                                                        >
                                                            <Button>
                                                                <Icon type="upload" />点击上传
                                                            </Button>
                                                        </Upload>

                                                    </LocaleProvider>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                wrapperCol={{ span: 12, offset: 4 }}
                                            >
                                                <Button type="primary" htmlType="submit" className="sbuBtns" onClick={this.handleSubmit}>确认</Button>
                                                <Button className="calBtns" onClick={()=>{this.props.history.push(`/producer/contractmanage`)}}>取消</Button>
                                            </FormItem>
                                        </Form>
                                    </Spin>
                                </Col>
                                <Col span={4} className="timeLine">
								<Row className="title">
									<p>合同状态</p>
								</Row>
								<Row>
                                    <Timeline>
										<Timeline.Item color="green">新建合同</Timeline.Item>
										<Timeline.Item>
											<p>确认合同</p>
										</Timeline.Item>
										<Timeline.Item>审批合同</Timeline.Item>
										<Timeline.Item>合同完成</Timeline.Item>
										<Timeline.Item>合同取消</Timeline.Item>
									</Timeline>
								    </Row>
							    </Col>
                            </Row>
                        </Row>
                    </div>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )
    }
}
export default Form.create()(customerUploadContract)