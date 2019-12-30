import React from 'react';
import { Layout, Breadcrumb, Row, Col, Icon, Form, Input, Radio, Button, InputNumber, message, Spin, Select, DatePicker, Timeline } from 'antd';
import Shield from '../../../../components/icon/Shield.png';
import Battery from '../../../../components/icon/Battery.png';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import './contractDetail.less';
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
const dateFormat = 'YYYY-MM-DD';

class producerContractDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			userName: '',
			location: '首页/合同管理/合同详情',
			company: '',
			spinLoading: false,
			companyList: [],
			templetList: [],
			current: 0,
			noEdit: true
		};
	}
	componentDidMount() {
		this.getContractDetail();
		this.getCompanyList();
		this.getContractTrmplet();
		this.setState({
			company: sessionStorage.company,
			authorization: sessionStorage.obj,
			contractId: sessionStorage.targetContractId
		})
	}
	getContractDetail = () => {
		let contractId = sessionStorage.targetContractId;
		let url = '/api/contract/detail/'+ contractId;
		const param = {};
		let headers = {
			'Authorization': sessionStorage.obj,
			'Domain-Name': sessionStorage.userName
		};
		api.get(url, headers, param,
			(res) => {
				if (res.content.status==='') {
					this.setState({current: 0});
				} else if (res.content.status==='UNCONFIRMED') {
					this.setState({current: 1});
				} else if (res.content.status==='PENDING') {
					this.setState({current: 2});
				} else if (res.content.status==='CONFIRMED') {
					this.setState({current: 3});
				} else if (res.content.status==='CANCEL') {
					this.setState({current:4})
				}
				if(res.content.status!=='CONFIRMED' || res.content.status !== 'PENDING') {
					this.setState({noEdit: false });
				}
				this.setState({
					status: res.content.status,
					partyName: res.content.oppositeCompanyName,
					partyId: res.content.oppositeCompanyId,
					contractTemplateId: res.content.contractTemplateId,
					power: res.content.power,
					powerPrice: res.content.powerPrice,
					id: res.content.id,
					name: res.content.name,
					type: res.content.type,
					effectiveDate: res.content.effectiveDate,
					expiryDate: res.content.expiryDate,
					contractStr: res.content.contractStr,
					currentUserConfirmed: res.content.currentUserConfirmed,
					partyAConfirmedTime: res.content.partyAConfirmedTime,
					partyBConfirmedTime: res.content.partyBConfirmedTime
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
						templetList: templetList
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
				console.log('Received values of form: ', values);
				const templateStr = values.templateName;
				let templateId = Number(templateStr.substr(templateStr.length-1,1));
				const rangeValue = values.expiryDate;
				const effectiveDate = rangeValue[1].format('YYYY-MM-DD');
				const expiryDate = rangeValue[0].format('YYYY-MM-DD');
				const param = {
					"companyId": this.state.oppositeCompanyId,
					"companyName": this.state.partyName,
					"contractStr": templateStr,
					"contractTemplateId": templateId,
					"contractType": values.contractType,
					"effectiveDate": effectiveDate,
					"expiryDate": expiryDate,
					"id": this.state.id,
					"name": values.name,
					"power": values.power,
					"powerPrice": values.powerPrice
				}
				let url = '/api/contract/update';
				let headers = {
					'Authorization': sessionStorage.obj
				};
				api.post(url, headers, param,
					(res) => {
						this.setState({spinLoading:false});
						message.success('更新成功');
						this.props.history.push(`/producer/contractmanage`);
					},
					(err) => {
						this.setState({spinLoading:false});
						message.error('更新失败');
					}
				);
      } else {

				this.setState({spinLoading:false});
				message.error('创建失败');
			}
    });
	}
	disabledDate = (current) => {
		return current && current <= moment().endOf('day')-86400000;
	}
	handleConfirm = (e) => {
		console.log(this.state.currentUserConfirmed,this.state.contractId, '现在的状态');
		e.preventDefault();
		this.setState({spinLoading:true});
		let contractId = this.state.contractId;
		let url = '/api/contract/confirmed/'+ contractId;
		const param = {};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		api.post(url, headers, param,
			(res) => {
				this.setState({spinLoading:false});
				if(res.code===0){
					message.success('确认成功');
					this.props.history.push(`/producer/contractmanage`);
				}
			},
			(err) => {
				console.log("failed" + err);
				this.setState({spinLoading:false});
				message.error('确认失败');
			}
		);
	}
  render() {
		const { getFieldDecorator } = this.props.form;
		const { spinLoading, companyList, templetList, expiryDate, effectiveDate, noEdit, currentUserConfirmed, partyAConfirmedTime, partyBConfirmedTime, status } = this.state;
    return (
      <Layout className="layout">
				<Lheader history={this.props.history} menubox={"/producer/contractmanage"}></Lheader>
    		<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ background: '#fff', padding: 24, minHeight: 760 }} className="content">
					<Row className="topOne">
							<Col span={24}>
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
							<h3><Icon type="exception" className="Icon" />合同信息</h3>
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
												initialValue: this.state.contractStr,
												rules: [
													{ required: true, message: '请选择模版' },
												],
											})(
												<Select placeholder="请选择模版" className="inputLengthd" disabled={true}>
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
												initialValue: this.state.name,
												rules: [
													{
														required: true,
														message: '请输入合同名称'
													}
												]
											})(<Input size='default' placeholder='请输入合同名称' className="inputLengthd" disabled={true} />)}
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="合同类型"
										>
											{getFieldDecorator('contractType', {
												initialValue: this.state.type,
												rules: [
													{
														required: true,
														message: '请选择合同类型'
													}
												]
											})(
											<RadioGroup disabled={true}>
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
												initialValue: this.state.power,
												rules: [
													{
														required: true,
														message: '请填写交易电量'
													}
												]
											})(
												<InputNumber min={0} disabled={noEdit} precision={2} />
											)}
											<span className="ant-form-text"> 万千瓦时</span>
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="交易电价"
										>
											{getFieldDecorator('powerPrice', {
												initialValue: this.state.powerPrice,
												rules: [
													{
														required: true,
														message: '请填写交易电价'
													}
												]
											})(
												<InputNumber min={0} disabled={noEdit} precision={2} />
											)}
											<span className="ant-form-text"> 元</span>
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="企业名称"
											hasFeedback
										>
											{getFieldDecorator('companyName', {
												initialValue: this.state.partyName,
												rules: [
													{ required: true, message: '请选择企业' },
												],
											})(
												<Select placeholder="请选择企业名称" className="inputLengthd" disabled={true}>
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
											{getFieldDecorator('expiryDate', {
												initialValue: [moment(effectiveDate, dateFormat), moment(expiryDate, dateFormat)],
												rules: [
													{ required: true, message: '请选择企业' },
												],
											})(
												<RangePicker locale={locale} disabled={noEdit} disabledDate={this.disabledDate} />
											)}
										</FormItem>
										<FormItem
											wrapperCol={{ span: 16, offset: 2 }} md={{span: 16, offset: 2}} lg={{span: 16, offset: 3}}
										>
											<Button type="primary" htmlType="submit" className="sbuBtnA" onClick={this.handleSubmit} disabled={noEdit}>保存</Button>
											<Button className="calBtnsA" onClick={()=>{this.props.history.push(`/producer/contractmanage`)}}>返回</Button>
											<Button className="calBtnsA" onClick={()=>{this.props.history.push(`/producer/preview`)}}>预览</Button>
											<Button className="calBtnsAs" onClick={this.handleConfirm} type="primary" disabled={currentUserConfirmed}>{currentUserConfirmed===false?'合同确认':'已确认'}</Button>
										</FormItem>
									</Form>
								</Spin>
							</Col>
							<Col span={4} className="timeLine">
								<Row className="title">
									<p>合同状态</p>
								</Row>
								<Row>
									{
										status === 'UNCONFIRMED' ?
										<Timeline>
											<Timeline.Item color="green">新建合同</Timeline.Item>
											<Timeline.Item color="red">
												<p>确认合同</p>
												<p>甲方确认 {partyAConfirmedTime}</p>
												<p>乙方确认 {partyBConfirmedTime}</p>
											</Timeline.Item>
											<Timeline.Item>审批合同</Timeline.Item>
											<Timeline.Item>合同完成</Timeline.Item>
											<Timeline.Item>合同取消</Timeline.Item>
										</Timeline> :
										status === 'PENDING' ?
										<Timeline>
											<Timeline.Item color="green">新建合同</Timeline.Item>
											<Timeline.Item color="green">
												<p>确认合同</p>
												<p>甲方确认 {partyAConfirmedTime}</p>
												<p>乙方确认 {partyBConfirmedTime}</p>
											</Timeline.Item>
											<Timeline.Item color="red">审批合同</Timeline.Item>
											<Timeline.Item>合同完成</Timeline.Item>
											<Timeline.Item>合同取消</Timeline.Item>
										</Timeline> :
										status === 'CONFIRMED' ?
										<Timeline>
											<Timeline.Item color="green">新建合同</Timeline.Item>
											<Timeline.Item color="green">
												<p>确认合同</p>
												<p>甲方确认 {partyAConfirmedTime}</p>
												<p>乙方确认 {partyBConfirmedTime}</p>
											</Timeline.Item>
											<Timeline.Item color="green">审批合同</Timeline.Item>
											<Timeline.Item color="green">合同完成</Timeline.Item>
											<Timeline.Item>合同取消</Timeline.Item>
										</Timeline> : ''
									}
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
export default Form.create()(producerContractDetail)