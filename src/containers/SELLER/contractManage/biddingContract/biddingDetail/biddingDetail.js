// import React from 'react';
// import { Layout, Breadcrumb, Row, Col, Form, Input, Radio, Button, InputNumber, message, Spin, Select, DatePicker, Timeline } from 'antd';
// import { Link } from 'react-router-dom';
// import Shield from '../../../../../components/icon/Shield.png';
// import Battery from '../../../../../components/icon/Battery.png';
// import locale from 'antd/lib/date-picker/locale/zh_CN';
// import moment from 'moment';
// import './contractDetail.less';
// import Lheader from '../../../common/Iheader';
// import Lfooter from '../../../../../components/layout/Ifooter';
// import api from '../../../../../api/tools';
// const { Content } = Layout;
// const FormItem = Form.Item;
// const RadioGroup = Radio.Group;
// const { MonthPicker, RangePicker } = DatePicker;
// const Option = Select.Option;
// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 5 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 12 },
//   },
// };
// const dateFormat = 'YYYY-MM-DD';
//
// class sellerContractDetail extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			userName: 'customer',
// 			location: '首页/合同管理/月竞合同详情',
// 			company: '',
// 			spinLoading: false,
// 			companyList: [],
// 			templetList: [],
// 			current: 0,
// 			noEdit: true
// 		};
// 	}
// 	componentDidMount() {
// 		const id =  this.props.match.params.id;
// 		this.handleParterCompany();
// 		this.getContractDetail();
// 		this.setState({
// 			company: sessionStorage.company,
// 			authorization: sessionStorage.obj,
// 			id: id
// 		})
// 	}
// 	getContractDetail = () => {
// 		let contractId = this.props.match.params.id;
// 		let url = '/api/contract/bidding/'+ contractId+'/detail';
// 		const param = {};
// 		let headers = {
// 			'Authorization': sessionStorage.obj,
// 		};
// 		api.get(url, headers, param,
// 			(res) => {
// 				if (res.content.status==='') {
// 					this.setState({current: 0});
// 				} else if (res.content.status==='UNCONFIRMED') {
// 					this.setState({current: 1});
// 				} else if (res.content.status==='PENDING') {
// 					this.setState({current: 2});
// 				} else if (res.content.status==='CONFIRMED') {
// 					this.setState({current: 3});
// 				} else if (res.content.status==='CANCEL') {
// 					this.setState({current:4})
// 				}
// 				if(res.content.status!=='CONFIRMED' || res.content.status !== 'PENDING') {
// 					this.setState({noEdit: false });
// 				}
// 				let effective = new Date(res.content.effectiveTime);
// 				let effectiveYear = effective.getFullYear();
// 				let effectiveMonth = effective.getMonth() + 1;
// 				let effectiveDay = effective.getDate();
// 				let effectiveTime = effectiveYear+'-'+(effectiveMonth<10?'0'+effectiveMonth:effectiveMonth)+'-'+(effectiveDay<10?'0'+effectiveDay:effectiveDay);
// 				let expiry = new Date(res.content.expiryTime);
// 				let expiryYear = expiry.getFullYear();
// 				let expiryMonth = expiry.getMonth() + 1;
// 				let expiryDay = expiry.getDate();
// 				let expiryTime = expiryYear+'-'+(expiryMonth<10?'0'+expiryMonth:expiryMonth)+'-'+(expiryDay<10?'0'+expiryDay:expiryDay);
// 				if(res.content.partyAConfirmedTime){
// 					let partyAConfirm = new Date(res.content.partyAConfirmedTime);
// 					let partyAConfirmYear = partyAConfirm.getFullYear();
// 					let partyAConfirmMonth = partyAConfirm.getMonth() + 1;
// 					let partyAConfirmDay = partyAConfirm.getDate();
// 					var partyAConfirmedTime = partyAConfirmYear+'年'+ partyAConfirmMonth+'月'+partyAConfirmDay+'日';
// 				}
// 				if(res.content.partyBConfirmedTime) {
// 					let partyBConfirm = new Date(res.content.partyBConfirmedTime);
// 					let partyBConfirmYear = partyBConfirm.getFullYear();
// 					let partyBConfirmMonth = partyBConfirm.getMonth() + 1;
// 					let partyBConfirmDay = partyBConfirm.getDate();
// 					var partyBConfirmedTime = partyBConfirmYear+'年'+ partyBConfirmMonth+'月'+partyBConfirmDay+'日';
// 				}
// 				let monthList = res.content.formulateVOList?res.content.formulateVOList:[];
// 				this.setState({
// 					power: res.content.power,
// 					powerPrice: res.content.powerPrice,
// 					spread: res.content.spread,
// 					monthStr: res.content.monthStr,
// 					effectiveDate: effectiveTime,
// 					expiryDate: expiryTime,
// 					name: res.content.name,
// 					partyACode: res.content.partyACode,
// 					partyBCode: res.content.partyBCode,
// 					status: res.content.status,
// 					partyAConfirmedTime: partyAConfirmedTime,
// 					partyBConfirmedTime: partyBConfirmedTime,
// 					isOnline: String(res.content.isOnline),
// 					partyAName: res.content.partyAName,
// 					partyBName: res.content.partyBName,
// 					partyAConfirmed: res.content.partyAConfirmed,
// 					partyBConfirmed: res.content.partyBConfirmed,
// 				})
// 			},
// 			(err) => {
// 				message.error(err.message);
// 				this.props.history.push(`/seller/biddingcontract`);
// 			}
// 		);
// 	}
// 	// 获取合作企业列表
// 	handleParterCompany = () => {
// 		const param = {
// 			companyName: ''
// 		}
// 		let headers = {
// 			'Authorization': sessionStorage.obj
// 		}
// 		let url='/api/company/partner/partner';
// 		api.get(url, headers, param,
// 		  (res) => {
// 				let companyList = Array.from(res.content);
// 				let dataSource = [];
// 				companyList.forEach((item)=>{
// 					dataSource.push(item.partnerCompanyName);
// 				});
// 				this.setState({
// 					dataSource: dataSource,
// 					companyList: companyList
// 				})
// 			},
// 		  (err) => {
//
// 		  }
// 		);
// 	}
// 	handleSubmit = (e) => {
// 		e.preventDefault();
// 		this.setState({spinLoading:true});
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
// 				let partyAName = String(values.partyAName);
// 				let index = partyAName.lastIndexOf('-');
// 				let companyId = Number(partyAName.substring(index+1,partyAName.length))?Number(partyAName.substring(index+1,partyAName.length)):this.state.companyId;
// 				let partyName = partyAName.substring(0,index)===''?this.state.companyName:partyAName.substr(0,index);
// 				const rangeValue = values.expiryDate;
// 				const effectiveTime = rangeValue[1].format('YYYY-MM-DD');
// 				const expiryTime = rangeValue[0].format('YYYY-MM-DD');
// 				const param = {
// 					"biddingId": Number(localStorage.monthcompid?localStorage.monthcompid:0),
// 					"effectiveTime": effectiveTime,
// 					"expiryTime": expiryTime,
// 					"isOnline": true,
// 					"name": values.name,
// 					"partyAId": companyId,
// 					"partyACode": values.partyACode,
// 					"partyAName": partyName,
// 					"partyBId": sessionStorage.userId,
// 					"partyBName": sessionStorage.company,
// 					"partyBCode": values.partyBCode,
// 					"power": String(values.power),
// 					"powerPrice": String(values.powerPrice),
// 					'monthStr': this.state.monthStr,
// 					"spread": String(values.spread),
//   				"yearStr": this.state.yearStr
// 				}
// 				let url = '/api/contract/bidding/create';
// 				let headers = {
// 					'Authorization': sessionStorage.obj
// 				};
// 				this.setState({spinLoading:false});
// 				api.post(url, headers, param,
// 					(res) => {
// 						this.setState({spinLoading:false});
// 						message.success('创建成功');
// 						this.props.history.push(`/seller/biddingcontract`);
// 					},
// 					(err) => {
// 						this.setState({spinLoading:false});
// 						message.error(err.message);
// 					}
// 				);
//       } else {
// 				this.setState({spinLoading:false});
// 				message.error('创建失败');
// 			}
//     });
// 	}
// 	disabledDate = (current) => {
// 		return current && current <= moment().endOf('day')-86400000;
// 	}
// 	handleConfirm = (e) => {
// 		e.preventDefault();
// 		this.setState({spinLoading:true});
// 		let id = this.state.id;
// 		let url = '/api/contract/bidding/'+id+'/confirmed';
// 		const param = {};
// 		let headers = {
// 			'Authorization': sessionStorage.obj
// 		};
// 		api.post(url, headers, param,
// 			(res) => {
// 				this.setState({spinLoading:false});
// 				if(res.code===0){
// 					message.success('确认成功');
// 					this.props.history.push(`/seller/biddingcontract`);
// 				}
// 			},
// 			(err) => {
// 				this.setState({spinLoading:false});
// 				message.error('确认失败');
// 			}
// 		);
// 	}
//   render() {
// 		const { getFieldDecorator } = this.props.form;
// 		const { spinLoading, companyList, expiryDate, effectiveDate, partyBConfirmed, partyAConfirmedTime, partyBConfirmedTime, status, partyACode, name, partyBCode, isOnline, partyAName, power, spread, monthStr } = this.state;
//     return (
//       <Layout className="layout">
// 				<Lheader history={this.props.history} menubox={"/seller/biddingcontract"}></Lheader>
//     		<Content style={{ padding: '0 50px' }}>
// 				<Breadcrumb style={{ margin: '16px 0' }}>
// 					<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
// 				</Breadcrumb>
// 				<div style={{ background: '#fff', padding: 24, minHeight: 860 }} className="content">
// 					<Row className="topOne">
// 						<Col span={24}>
// 							<Row>
// 									<div className="companyNameOne">
// 										{this.state.company}
// 									</div>
// 							</Row>
// 							<Row>
// 									<div className="iconGroup">
// 										<img src={Battery} alt="" style={{display:"bolck"}} className="icon-one" />
// 										<img src={Shield} alt="" style={{display:"bolck"}} className="icon-two" />
// 									</div>
// 							</Row>
// 						</Col>
// 					</Row>
// 					<Row className="contractInfo">
// 						<Row className="bigTitle">
// 							<h3>合同信息</h3>
// 						</Row>
// 						<Row>
// 							<Col span={15} offset={5} className="formArea">
// 								<Spin size='large' spinning={spinLoading} tip="创建中，请稍后...">
// 									<Form>
// 										<FormItem label="合同名称" {...formItemLayout}>
// 											{getFieldDecorator('name', {
// 												initialValue: name,
// 												rules: [
// 													{
// 														required: true,
// 														message: '请输入合同名称'
// 													}
// 												]
// 											})(<Input size='default' placeholder='请输入合同名称' className="inputLengths" disabled={true} />)}
// 										</FormItem>
// 										<FormItem
// 											{...formItemLayout}
// 											label="合同类型"
// 										>
// 											{getFieldDecorator('isOnline', {
// 												initialValue: isOnline,
// 												rules: [
// 													{
// 														required: true,
// 														message: '请选择合同类型'
// 													}
// 												]
// 											})(
// 											<RadioGroup disabled={true}>
// 												<Radio value="true">线上合同</Radio>
// 												<Radio value="false">线下合同</Radio>
// 											</RadioGroup>
// 											)}
// 										</FormItem>
// 										<FormItem label="甲方合同编号" {...formItemLayout}>
// 											{getFieldDecorator('partyACode', {
// 												initialValue: partyACode,
// 												rules: [
// 													{
// 														required: true,
// 														message: '请输入甲方公司编号'
// 													}
// 												]
// 											})(<Input size='default' placeholder='请输入甲方合同编号' className="inputLengths" disabled={true} />)}
// 										</FormItem>
// 										<FormItem label="乙方合同编号" {...formItemLayout}>
// 											{getFieldDecorator('partyBCode', {
// 												initialValue: partyBCode,
// 												rules: [
// 													{
// 														required: true,
// 														message: '请输入乙方公司编号'
// 													}
// 												]
// 											})(<Input size='default' placeholder='请输入乙方合同编号' className="inputLengths" disabled={true} />)}
// 										</FormItem>
// 										<FormItem
// 											{...formItemLayout}
// 											label="企业名称"
// 											hasFeedback
// 										>
// 											{getFieldDecorator('partyAName', {
// 												initialValue: partyAName,
// 												rules: [
// 													{ required: true, message: '请选择企业' },
// 												],
// 											})(
// 												<Select placeholder="请选择企业名称" className="inputLengths" disabled={true}>
// 													{
// 														companyList.map((item)=>{
// 															return (
// 																<Option value={item.name+item.id} key={item.id}>{item.name}</Option>
// 															)
// 														})
// 													}
// 												</Select>
// 											)}
// 										</FormItem>
// 										<FormItem
// 											{...formItemLayout}
// 											label="合同生效日期"
// 										>
// 											{getFieldDecorator('expiryDate', {
// 												initialValue: [moment(effectiveDate, dateFormat), moment(expiryDate, dateFormat)],
// 												rules: [
// 													{ required: true, message: '请选择企业' },
// 												],
// 											})(
// 												<RangePicker locale={locale} disabled={true} disabledDate={this.disabledDate} />
// 											)}
// 										</FormItem>
// 										<FormItem
// 											{...formItemLayout}
// 											label="月竞申报月份"
// 										>
// 											{getFieldDecorator('monthStr', {
// 												initialValue: moment(monthStr),
// 												rules: [
// 													{ required: true, message: '请选择申报月份' },
// 												],
// 											})(
// 												<MonthPicker locale={locale} disabledDate={this.disabledDateMonth} onChange={this.subMonth} disabled={true}  />
// 											)}
// 										</FormItem>
// 										<FormItem
// 													{...formItemLayout}
// 													label="月竞交易电量"
// 												>
// 													{getFieldDecorator('power', {
// 														initialValue: power,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写月竞交易电量'
// 															}
// 														]
// 												})(
// 													<InputNumber min={0} disabled={true}  />
// 												)}
// 											<span className="ant-form-text"> 万千瓦时</span>
// 										</FormItem>
// 										<FormItem
// 													{...formItemLayout}
// 													label="月竞交易价差"
// 												>
// 													{getFieldDecorator('spread', {
// 														initialValue: spread,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写月竞交易价差'
// 															}
// 														]
// 												})(
// 													<InputNumber min={-10} disabled={true}  />
// 												)}
// 											<span className="ant-form-text"> 元</span>
// 										</FormItem>
// 										<FormItem
// 											wrapperCol={{ span: 16, offset: 2 }} md={{span: 16, offset: 2}} lg={{span: 16, offset: 3}}
// 										>
// 											<Button type="primary" htmlType="submit" className="sbuBtnA" disabled={true}>已保存</Button>
// 											<Button className="calBtnsAs" onClick={()=>{this.props.history.push(`/seller/biddingcontract`)}}>返回</Button>
// 											<Button className="calBtnsAs" onClick={()=>{this.props.history.push(`/seller/preview`)}}>预览</Button>
// 											<Button className="calBtnsAs" onClick={this.handleConfirm} type="primary" disabled={partyBConfirmed}>{partyBConfirmed===false?'合同确认':'已确认'}</Button>
// 										</FormItem>
// 									</Form>
// 								</Spin>
// 							</Col>
// 							{/*<Col span={4} className="timeLine">*/}
// 								{/*<Row className="title">*/}
// 									{/*<p>合同追踪</p>*/}
// 								{/*</Row>*/}
// 								{/*<Row>*/}
// 									{/*{*/}
// 										{/*status === 'UNCONFIRMED' ?*/}
// 										{/*<Timeline>*/}
// 											{/*<Timeline.Item color="green">新建合同</Timeline.Item>*/}
// 											{/*<Timeline.Item color="red">*/}
// 												{/*<p>确认合同</p>*/}
// 												{/*<p>甲方确认 {partyAConfirmedTime}</p>*/}
// 												{/*<p>乙方确认 {partyBConfirmedTime}</p>*/}
// 											{/*</Timeline.Item>*/}
// 											{/*<Timeline.Item>审批合同</Timeline.Item>*/}
// 											{/*<Timeline.Item>合同完成</Timeline.Item>*/}
// 											{/*<Timeline.Item>合同取消</Timeline.Item>*/}
// 										{/*</Timeline> :*/}
// 										{/*status === 'PENDING' ?*/}
// 										{/*<Timeline>*/}
// 											{/*<Timeline.Item color="green">新建合同</Timeline.Item>*/}
// 											{/*<Timeline.Item color="green">*/}
// 												{/*<p>确认合同</p>*/}
// 												{/*<p>甲方确认 {partyAConfirmedTime}</p>*/}
// 												{/*<p>乙方确认 {partyBConfirmedTime}</p>*/}
// 											{/*</Timeline.Item>*/}
// 											{/*<Timeline.Item color="red">审批合同*/}
// 												{/*/!*<Link to="/tradingcontract" id="toTrade">前往(模拟)交易中心查看</Link>*!/*/}
// 											{/*</Timeline.Item>*/}
// 											{/*<Timeline.Item>合同完成</Timeline.Item>*/}
// 											{/*<Timeline.Item>合同取消</Timeline.Item>*/}
// 										{/*</Timeline> :*/}
// 										{/*status === 'CONFIRMED' ?*/}
// 										{/*<Timeline>*/}
// 											{/*<Timeline.Item color="green">新建合同</Timeline.Item>*/}
// 											{/*<Timeline.Item color="green">*/}
// 												{/*<p>确认合同</p>*/}
// 												{/*<p>甲方确认 {partyAConfirmedTime}</p>*/}
// 												{/*<p>乙方确认 {partyBConfirmedTime}</p>*/}
// 											{/*</Timeline.Item>*/}
// 											{/*<Timeline.Item color="green">审批合同</Timeline.Item>*/}
// 											{/*<Timeline.Item color="green">合同完成</Timeline.Item>*/}
// 											{/*<Timeline.Item>合同取消</Timeline.Item>*/}
// 										{/*</Timeline> : status === 'REVOKED'?*/}
// 										{/*<Timeline>*/}
// 										{/*<Timeline.Item>新建合同</Timeline.Item>*/}
// 										{/*<Timeline.Item>*/}
// 											{/*<p>确认合同</p>*/}
// 											{/*<p>甲方确认</p>*/}
// 											{/*<p>乙方确认</p>*/}
// 										{/*</Timeline.Item>*/}
// 										{/*<Timeline.Item>审批合同</Timeline.Item>*/}
// 										{/*<Timeline.Item>合同完成</Timeline.Item>*/}
// 										{/*<Timeline.Item color="red">合同取消</Timeline.Item>*/}
// 									{/*</Timeline> : status === 'APPROVED'?*/}
// 									{/*<Timeline>*/}
// 										{/*<Timeline.Item color="green">新建合同</Timeline.Item>*/}
// 										{/*<Timeline.Item color="green">*/}
// 											{/*<p>确认合同</p>*/}
// 											{/*<p>甲方确认 {partyAConfirmedTime}</p>*/}
// 											{/*<p>乙方确认 {partyBConfirmedTime}</p>*/}
// 										{/*</Timeline.Item>*/}
// 										{/*<Timeline.Item color="green">审核通过*/}
// 											{/*<Link to="/tradingcontract" id="toTrade">前往(模拟)交易中心查看</Link>*/}
// 										{/*</Timeline.Item>*/}
// 									{/*<Timeline.Item color="green">合同完成</Timeline.Item>*/}
// 									{/*<Timeline.Item>合同取消</Timeline.Item>*/}
// 								{/*</Timeline> : status === 'UNAPPROVED'?*/}
// 								{/*<Timeline>*/}
// 								{/*<Timeline.Item color="green">新建合同</Timeline.Item>*/}
// 								{/*<Timeline.Item color="green">*/}
// 									{/*<p>确认合同</p>*/}
// 									{/*<p>甲方确认 {partyAConfirmedTime}</p>*/}
// 									{/*<p>乙方确认 {partyBConfirmedTime}</p>*/}
// 								{/*</Timeline.Item>*/}
// 								{/*<Timeline.Item color="red">审核未通过*/}
// 									{/*/!*<Link to="/tradingcontract" id="toTrade">前往(模拟)交易中心查看</Link>*!/*/}
// 								{/*</Timeline.Item>*/}
// 							{/*<Timeline.Item color="red">合同完成</Timeline.Item>*/}
// 							{/*<Timeline.Item>合同取消</Timeline.Item>*/}
// 						{/*</Timeline>:''*/}
// 									{/*}*/}
// 								{/*</Row>*/}
// 							{/*</Col>*/}
// 						</Row>
// 					</Row>
// 				</div>
//     	</Content>
//     	<Lfooter></Lfooter>
//   	</Layout>
//     )
//   }
// }
// export default Form.create()(sellerContractDetail)