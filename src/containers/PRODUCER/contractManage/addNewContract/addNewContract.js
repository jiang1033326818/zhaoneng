import React from 'react';
import { Layout, Breadcrumb, Row, Col, Timeline, Form, Input, Radio, Button, InputNumber, message, Spin, Select, DatePicker } from 'antd';
import Shield from '../../../../components/icon/Shield.png';
import Battery from '../../../../components/icon/Battery.png';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './addNewContract.less';
import moment from 'moment';
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

class producerAddNewContract extends React.Component {
	constructor() {
		super();
		this.state = {
			userName: '',
			location: '首页/合同管理/新建合同',
			company: '',
			spinLoading: false,
			companyList: [],
			templetList: [],
		};
	}
	componentDidMount() {
		this.getContractDetail();
		this.getCompanyList();
		this.getContractTrmplet();
		this.setState({
			company: sessionStorage.company,
			authorization: sessionStorage.obj
		})
	}
		getContractDetail = () => {
			let contractId = localStorage.matchingid;
			let url = '/api/notice/'+ contractId;
			const param = {};
			let headers = {
				'Authorization': sessionStorage.obj,
				'Domain-Name': sessionStorage.userName
			};
			api.get(url, headers, param,
				(res) => {
					localStorage.removeItem('matchingid');
					this.setState({
						power: res.content.power,
						powerPrice: res.content.powerPrice,
						name: res.content.name,
					})
				},
				(err) => {
					console.log("failed" + err);
				}
			);
		}
	getContractTrmplet = () => {
		let url = '/api/contract/templet';
		const param = {};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		api.post(url, headers, param,
			(res) => {
				let templetList = res.content;
				let templeteListArray = Array.from(templetList);
				templeteListArray.forEach((item)=>{
					this.setState({
						targetTemplateName: templetList[0].name
					})
				})
				this.setState({
					templetList: Array.from(templetList)
				})
			},
			(err) => {
				console.log("failed" + err);
			}
		);
	}
	getCompanyList = () => {
		// BIDDING BILATERAL
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
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({spinLoading:true});
    this.props.form.validateFields((err, values) => {
      if (!err) {
				const nameStr = values.companyName;
				let companyId = Number(nameStr.substr(nameStr.length-1,1));
				let companyName = nameStr.substr(0, nameStr.length-1);
				const templateStr = values.templateName;
				let templateId = Number(templateStr.substr(templateStr.length-1,1));
				const rangeValue = values.expiryDate;
				const effectiveDate = rangeValue[1].format('YYYY-MM-DD');
				const expiryDate = rangeValue[0].format('YYYY-MM-DD');
				const param = {
					"companyId": companyId,
					"companyName": companyName,
					"contractStr": templateStr,
					"contractTemplateId": templateId,
					"contractType": values.contractType,
					"effectiveDate": effectiveDate,
					"expiryDate": expiryDate,
					"name": values.name,
					"power": values.power,
					"powerPrice": values.powerPrice
				}
				let url = '/api/contract/create';
				let headers = {
					'Authorization': sessionStorage.obj
				};
				this.setState({spinLoading:false});
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
      } else {

				this.setState({spinLoading:false});
				message.error('创建失败');
			}
    });
	}
	onChangeModal = (e) => {

	}
	disabledDate = (current) => {
		return current && current <= moment().endOf('day')-86400000;
	}
  render() {
		const { getFieldDecorator } = this.props.form;
		const { spinLoading, companyList, templetList, targetTemplateName, power, powerPrice, name } = this.state;
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
					<Row className="contractInfo">
						<Row className="bigTitle">
							<h3>合同信息</h3>
						</Row>
						<Row>
							<Col span={15} offset={5} className="formArea">
								<Spin size='large' spinning={spinLoading} tip="创建中，请稍后...">
									<Form>
										<FormItem
											{...formItemLayout}
											label="合同模版"
											hasFeedback
										>
											{getFieldDecorator('templateName', {
												initialValue: targetTemplateName,
												rules: [
													{ required: true, message: '请选择模版' },
												],
											})(
												<Select placeholder="请选择模版" className="inputLengthd">
													{
														templetList.map((item)=>{
															return (
																<Option value={item.name+item.id} key={item.id}>{item.name}</Option>
															)
														})
													}
												</Select>
											)}
										</FormItem>
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
												initialValue: power,
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
												initialValue: powerPrice,
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
												initialValue: name,
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
											wrapperCol={{ span: 12, offset: 4 }}
										>
											<Button type="primary" htmlType="submit" className="sbuBtns" onClick={this.handleSubmit}>确认</Button>
											<Button className="calBtns" onClick={()=>{this.props.history.go(-1)}}>取消</Button>
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
export default Form.create()(producerAddNewContract)