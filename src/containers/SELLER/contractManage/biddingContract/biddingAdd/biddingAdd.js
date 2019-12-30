import React from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Input, Radio, Button, message, Spin,  DatePicker, Timeline, Select, InputNumber } from 'antd';
import Shield from '../../../../../components/icon/Shield.png';
import Battery from '../../../../../components/icon/Battery.png';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import './addNewContract.less';
import Lheader from '../../../common/Iheader.js';
import Lfooter from '../../../../../components/layout/Ifooter.js';
import api from '../../../../../api/tools.js';
const { Content } = Layout;
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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

class sellerAddNewContract extends React.Component {
	constructor() {
		super();
		this.state = {
			userName: '',
			location: '首页/合同管理/新建月竞线上合同',
			company: '',
			spinLoading: false,
			companyList: [],
			templetList: [],
			yearStr: '2018'
		};
	}
	componentDidMount() {
		this.getContractDetail();
		this.setState({
			company: sessionStorage.company,
			monthStr: localStorage.monthStr,
			authorization: sessionStorage.obj,
			monthcompid: localStorage.monthcompid
		})
	}
	subMonth = (date, dateString) => {
		this.setState({
			monthStr: dateString
		})
	}
	getContractDetail = () => {
		if(localStorage.monthcompid){
			let contractId = localStorage.monthcompid;
			let url = '/api/bidding/'+ contractId+'/details';
			const param = {};
			let headers = {
				'Authorization': sessionStorage.obj,
			};
			api.get(url, headers, param,
				(res) => {
					localStorage.removeItem('monthcompid');
					this.setState({
						monthStr: res.content.monthStr,
						yearStr: res.content.yearStr,
						power: res.content.power,
						spread: res.content.spread,
						companyName: res.content.companyName,
						companyId: res.content.companyId
					})
				},
				(err) => {
					console.log("failed" + err);
				}
			);
		}
	}
	handleParterCompany = () => {
		const param = {
			companyName: ''
		}
		let headers = {
			'Authorization': sessionStorage.obj
		}
		let url='/api/company/partner/partner';
		api.get(url, headers, param,
		  (res) => {
				let companyList = Array.from(res.content);
				let dataSource = [];
				companyList.forEach((item)=>{
					dataSource.push(item.partnerCompanyName);
				});
				this.setState({
					dataSource: dataSource,
					companyList: companyList
				})
			},
		  (err) => {
				console.log("failed" , err);
		  }
		);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({spinLoading:true});
    this.props.form.validateFields((err, values) => {
      if (!err) {
				let partyAName = String(values.partyAName);
				let index = partyAName.lastIndexOf('-');
				let companyId = Number(partyAName.substring(index+1,partyAName.length))?Number(partyAName.substring(index+1,partyAName.length)):this.state.companyId;
				let partyName = partyAName.substring(0,index)===''?this.state.companyName:partyAName.substr(0,index);
				const rangeValue = values.expiryDate;
				const effectiveTime = rangeValue[0].format('YYYY-MM-DD');
				const expiryTime = rangeValue[1].format('YYYY-MM-DD');
				const param = {
					"biddingId": Number(localStorage.monthcompid?localStorage.monthcompid:0),
					"effectiveTime": effectiveTime,
					"expiryTime": expiryTime,
					"isOnline": true,
					"name": values.name,
					"partyAId": companyId,
					"partyACode": values.partyACode,
					"partyAName": partyName,
					"partyBId": sessionStorage.companyId,
					"partyBName": sessionStorage.company,
					"partyBCode": values.partyBCode,
					"power": String(values.power),
					'monthStr': this.state.monthStr,
					"spread": String(values.spread),
  				"yearStr": this.state.yearStr
				}
				let url = '/api/contract/bidding/create';
				let headers = {
					'Authorization': sessionStorage.obj
				};
				this.setState({spinLoading:false});
				api.post(url, headers, param,
					(res) => {
						this.setState({spinLoading:false});
						message.success('创建成功');
						this.props.history.push(`/seller/biddingcontract`);
					},
					(err) => {
						this.setState({spinLoading:false});
						message.error(err.message);
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
	disabledDateMonth = (current) => {
		return current && current <= moment().endOf('month');
	}
  render() {
		const { getFieldDecorator } = this.props.form;
		const { spinLoading, companyList, power, spread, companyName, monthStr } = this.state;
    return (
      <Layout className="layout">
				<Lheader history={this.props.history} menubox={"/seller/biddingcontract"}></Lheader>
    		<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ background: '#fff', padding: 24, minHeight: 1350 }} className="content">
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
										<FormItem label="合同名称" {...formItemLayout}>
											{getFieldDecorator('name', {
												initialValue: '',
												rules: [
													{
														required: true,
														message: '请输入合同名称'
													}
												]
											})(<Input size='default' placeholder='请输入合同名称' className="inputLengths" />)}
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="合同类型"
										>
											{getFieldDecorator('isOnline', {
												initialValue: 'true',
												rules: [
													{
														required: true,
														message: '请选择合同类型'
													}
												]
											})(
											<RadioGroup disabled={true}>
												<Radio value="true">线上合同</Radio>
												<Radio value="false">线下合同</Radio>
											</RadioGroup>
											)}
										</FormItem>
										<FormItem label="甲方合同编号" {...formItemLayout}>
											{getFieldDecorator('partyACode', {
												initialValue: '',
												rules: [
													{
														required: true,
														message: '请输入甲方公司编号'
													}
												]
											})(<Input size='default' placeholder='请输入甲方合同编号' className="inputLengths" />)}
										</FormItem>
										<FormItem label="乙方合同编号" {...formItemLayout}>
											{getFieldDecorator('partyBCode', {
												rules: [
													{
														required: true,
														message: '请输入乙方公司编号'
													}
												]
											})(<Input size='default' placeholder='请输入乙方合同编号' className="inputLengths" />)}
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="企业名称"
											hasFeedback
										>
											{getFieldDecorator('partyAName', {
												initialValue: companyName,
												rules: [
													{ required: true, message: '请选择企业' },
												],
											})(
												<Select placeholder="企业名称" className="inputLengths" disabled={true}>
													{
														companyList.map((item)=>{
															return (
																<Option value={item.partnerCompanyName+'-'+item.partnerCompanyId} key={item.companyId}>{item.partnerCompanyName}</Option>
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
											label="月竞申报月份"
										>
											{getFieldDecorator('monthStr', {
												initialValue: moment(monthStr),
												rules: [
													{ required: true, message: '请选择申报月份' },
												],
											})(
												<MonthPicker locale={locale} disabledDate={this.disabledDateMonth} onChange={this.subMonth} />
											)}
										</FormItem>
										<FormItem
													{...formItemLayout}
													label="月竞交易电量"
												>
													{getFieldDecorator('power', {
														initialValue: power,
														rules: [
															{
																required: true,
																message: '请填写月竞交易电量'
															}
														]
												})(
													<InputNumber min={0} />
												)}
											<span className="ant-form-text"> 万千瓦时</span>
										</FormItem>
										<FormItem
													{...formItemLayout}
													label="月竞交易价差"
												>
													{getFieldDecorator('spread', {
														initialValue: spread,
														rules: [
															{
																required: true,
																message: '请填写月竞交易价差'
															}
														]
												})(
													<InputNumber min={-10} />
												)}
											<span className="ant-form-text"> 元</span>
										</FormItem>
										<Row className="buttonGroups">
											<FormItem
												wrapperCol={{ span: 12, offset: 5 }}
											>
												<Button type="primary" htmlType="submit" className="sbuBtns" onClick={this.handleSubmit}>确认</Button>
												<Button className="calBtns" onClick={()=>{this.props.history.go(-1)}}>取消</Button>
											</FormItem>
										</Row>
									</Form>
								</Spin>
							</Col>
							<Col span={4} className="timeLine">
								<Row className="title">
									<p>合同追踪</p>
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
export default Form.create()(sellerAddNewContract)