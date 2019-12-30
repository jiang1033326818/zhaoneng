// import React from 'react';
// import { Layout, Breadcrumb, Row, Col, Form, Input, Radio, Button, InputNumber, message, Spin, Select, DatePicker, Timeline, Divider } from 'antd';
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
// const RangePicker = DatePicker.RangePicker;
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
// const formItemLayoutOne = {
//   labelCol: {
//     xs: { span: 24 },
// 		sm: { span: 5 },
// 		md: { span: 11 }
//   },
//   wrapperCol: {
//     xs: { span: 24 },
// 		sm: { span: 12 },
// 		md: { span: 4 }
//   },
// };
// const dateFormat = 'YYYY-MM-DD';
//
// class sellerContractDetail extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			userName: '',
// 			location: '首页/合同管理/长协合同详情',
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
// 		let url = '/api/contract/plan/'+ contractId+'/detail';
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
// 					bidding: res.content.bidding,
// 					biddingSpread: res.content.biddingSpread,
// 					bilateral: res.content.bilateral,
// 					bilateralSpread: res.content.bilateralSpread,
// 					effectiveDate: effectiveTime,
// 					expiryDate: expiryTime,
// 					name: res.content.name,
// 					createTime: res.content.createTime,
// 					partyACode: res.content.partyACode,
// 					partyBCode: res.content.partyBCode,
// 					planId: res.content.planId,
// 					status: res.content.status,
// 					partyAConfirmedTime: partyAConfirmedTime,
// 					partyBConfirmedTime: partyBConfirmedTime,
// 					isOnline: String(res.content.isOnline),
// 					partyAName: res.content.partyAName,
// 					partyBName: res.content.partyBName,
// 					partyAConfirmed: res.content.partyAConfirmed,
// 					partyBConfirmed: res.content.partyBConfirmed,
// 					JanL: monthList[0]?monthList[0].bilateral:0,
// 					JanS: monthList[0]?monthList[0].bidding:0,
// 					FebL: monthList[1]?monthList[1].bilateral:0,
// 					FebS: monthList[1]?monthList[1].bidding:0,
// 					MarL: monthList[2]?monthList[2].bilateral:0,
// 					MarS: monthList[1]?monthList[2].bidding:0,
// 					AprL: monthList[3]?monthList[3].bilateral:0,
// 					AprS: monthList[3]?monthList[3].bidding:0,
// 					MayL: monthList[4]?monthList[4].bilateral:0,
// 					MayS: monthList[4]?monthList[4].bidding:0,
// 					JuneL: monthList[5]?monthList[5].bilateral:0,
// 					JuneS: monthList[5]?monthList[5].bidding:0,
// 					JulyL: monthList[6]?monthList[6].bilateral:0,
// 					JulyS: monthList[6]?monthList[6].bidding:0,
// 					AugL: monthList[7]?monthList[7].bilateral:0,
// 					AugS: monthList[7]?monthList[7].bidding:0,
// 					SeptL: monthList[8]?monthList[8].bilateral:0,
// 					SeptS: monthList[8]?monthList[8].bidding:0,
// 					OctL: monthList[9]?monthList[9].bilateral:0,
// 					OctS: monthList[9]?monthList[9].bidding:0,
// 					NovL: monthList[10]?monthList[10].bilateral:0,
// 					NovS: monthList[10]?monthList[10].bidding:0,
// 					DecL: monthList[11]?monthList[11].bilateral:0,
// 					DecS: monthList[11]?monthList[11].bidding:0,
// 				})
// 			},
// 			(err) => {
// 				message.error(err.message);
// 				this.props.history.push(`/seller/contractmanage`);
// 			}
// 		);
// 	}
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
// 				console.log("failed" , err);
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
// 				let companyId = Number(partyAName.substring(index+1,partyAName.length));
// 				let partyName = partyAName.substring(0,index);
// 				let longPower = [].push(values.JanL,values.FebL,values.MarL,values.AprL,values.MayL,values.JuneL,values.JulyL,values.AugL,values.SeptL,values.OctL,values.NovL,values.DecL);
// 				let shortPower = [].push(values.JanS,values.FebS,values.MarS,values.AprS,values.MayS,values.JuneS,values.JulyS,values.AugS,values.SeptS,values.OctS,values.NovS,values.DecS);
// 				let bilateral= values.JanL+values.FebL+values.MarL+values.AprL+values.MayL+values.JuneL+values.JulyL+values.AugL+values.SeptL+values.OctL+values.NovL+values.DecL;
// 				let bidding = values.JanS+values.FebS+values.MarS+values.AprS+values.MayS+values.JuneS+values.JulyS+values.AugS+values.SeptS+values.OctS+values.NovS+values.DecS;
// 				let year= values.yearStr;
// 				let formulateCreatePOList = [
// 					{
// 						"bidding": values.JanS,
// 						"bilateral": values.JanL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-01",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.FebS,
// 						"bilateral": values.FebL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-02",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.MarS,
// 						"bilateral": values.MarL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-03",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.AprS,
// 						"bilateral": values.AprL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-04",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.MayS,
// 						"bilateral": values.MayL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-05",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.JuneS,
// 						"bilateral": values.JuneL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-06",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.JulyS,
// 						"bilateral": values.JulyL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-07",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.AugS,
// 						"bilateral": values.AugL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-08",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.SeptS,
// 						"bilateral": values.SeptL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-09",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.OctS,
// 						"bilateral": values.OctL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-10",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.NovS,
// 						"bilateral": values.NovL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-11",
// 						"yearStr": year
// 					},
// 					{
// 						"bidding": values.DecS,
// 						"bilateral": values.DecL,
// 						"companyId": companyId,
// 						"companyName": partyName,
// 						"monthStr": year+"-12",
// 						"yearStr": year
// 					},
// 				]
// 				const rangeValue = values.expiryDate;
// 				const effectiveTime = rangeValue[1].format('YYYY-MM-DD');
// 				const expiryTime = rangeValue[0].format('YYYY-MM-DD');
// 				const param = {
// 					"bidding": String(bidding),
// 					"biddingSpread": String(values.biddingSpread),
// 					"bilateral": String(bilateral),
// 					"bilateralSpread": String(values.bilateralSpread),
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
// 					"planId": Number(values.planId),
// 					"formulateCreatePOList":formulateCreatePOList,
// 					"yearStr": values.yearStr
// 				}
// 				let url = '/api/contract/plan/create';
// 				let headers = {
// 					'Authorization': sessionStorage.obj
// 				};
// 				this.setState({spinLoading:false});
// 				api.post(url, headers, param,
// 					(res) => {
// 						this.setState({spinLoading:false});
// 						message.success('创建成功');
// 						this.props.history.push(`/seller/contractmanage`);
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
// 	formatTime = (time) => {
// 		if (!time) {
// 			return '';
// 		}
// 		const t = new Date(time);
// 		const y = t.getFullYear();
// 		const m = t.getMonth() + 1;
// 		const d = t.getDate();
// 		return y + '年' + m + '月' + d + '日';
// 	};
// 	handleConfirm = (e) => {
// 		e.preventDefault();
// 		this.setState({spinLoading:true});
// 		let id = this.state.id;
// 		let url = '/api/contract/plan/'+id+'/confirmed';
// 		const param = {};
// 		let headers = {
// 			'Authorization': sessionStorage.obj
// 		};
// 		api.post(url, headers, param,
// 			(res) => {
// 				this.setState({spinLoading:false});
// 				if(res.code===0){
// 					message.success('确认成功');
// 					this.props.history.push(`/seller/contractmanage`);
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
// 		const { createTime, spinLoading, companyList, expiryDate, effectiveDate, noEdit, partyBConfirmed, partyAConfirmedTime, partyBConfirmedTime, status, bidding, biddingSpread, bilateral, bilateralSpread, partyACode, name, partyBCode, isOnline, partyAName, JanL, FebL, MarL, AprL, MayL, JuneL, JulyL, AugL, SeptL, OctL, NovL, DecL,JanS, FebS, MarS, AprS, MayS, JuneS, JulyS, AugS, SeptS, OctS, NovS, DecS  } = this.state;
//     return (
//       <Layout className="layout">
// 				<Lheader history={this.props.history} menubox={"/seller/contractmanage"}></Lheader>
//     		<Content style={{ padding: '0 50px' }}>
// 				<Breadcrumb style={{ margin: '16px 0' }}>
// 					<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
// 				</Breadcrumb>
// 				<div style={{ background: '#fff', padding: 24, minHeight: 2450 }} className="content">
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
// 												<RangePicker locale={locale} disabled={noEdit} disabledDate={this.disabledDate} />
// 											)}
// 										</FormItem>
// 										<FormItem
// 													{...formItemLayout}
// 													label="长协交易电量"
// 												>
// 													{getFieldDecorator('bilateral', {
// 														initialValue: bilateral,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写长协交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} />
// 													)}
// 													<span className="ant-form-text"> 万千瓦时</span>
// 										</FormItem>
// 										<FormItem
// 													{...formItemLayout}
// 													label="长协交易价差"
// 												>
// 													{getFieldDecorator('bilateralSpread', {
// 														initialValue: bilateralSpread,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写长协交易价差'
// 															}
// 														]
// 													})(
// 														<InputNumber min={-10} />
// 													)}
// 													<span className="ant-form-text"> 元</span>
// 										</FormItem>
// 										<FormItem
// 													{...formItemLayout}
// 													label="月竞交易电量"
// 												>
// 													{getFieldDecorator('bidding', {
// 														initialValue: bidding,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写月竞交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} />
// 													)}
// 													<span className="ant-form-text"> 万千瓦时</span>
// 										</FormItem>
// 										<FormItem
// 													{...formItemLayout}
// 													label="月竞交易价差"
// 												>
// 													{getFieldDecorator('biddingSpread', {
// 														initialValue: biddingSpread,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写月竞交易价差'
// 															}
// 														]
// 												})(
// 													<InputNumber min={-10} />
// 												)}
// 											<span className="ant-form-text"> 元</span>
// 										</FormItem>
// 										<Divider />
// 										{/* 长协交易电量 */}
// 										<h3>长期协议用电量(单位:万千瓦时)</h3>
// 										<Row>
// 											<Col span={4}>
// 												<FormItem
// 												{...formItemLayoutOne}
// 												label="一月"
// 											>
// 														{getFieldDecorator('JanL', {
// 															initialValue: JanL,
// 															rules: [
// 																{
// 																	required: true,
// 																	message: '请填写一月交易电量'
// 																}
// 															]
// 														})(
// 															<InputNumber min={0} style={{width:'60px'}} />
// 														)}
// 													</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="二月"
// 												>
// 													{getFieldDecorator('FebL', {
// 														initialValue: FebL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写二月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="三月"
// 												>
// 													{getFieldDecorator('MarL', {
// 														initialValue: MarL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写三月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="四月"
// 												>
// 													{getFieldDecorator('AprL', {
// 														initialValue: AprL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写四月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="五月"
// 												>
// 													{getFieldDecorator('MayL', {
// 														initialValue: MayL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写五月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="六月"
// 												>
// 													{getFieldDecorator('JuneL', {
// 														initialValue: JuneL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写六月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 										</Row>
// 										<Row>
// 										<Col span={4}>
// 											<FormItem
// 													{...formItemLayoutOne}
// 													label="七月"
// 												>
// 													{getFieldDecorator('JulyL', {
// 														initialValue: JulyL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写七月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 											<FormItem
// 													{...formItemLayoutOne}
// 													label="八月"
// 												>
// 													{getFieldDecorator('AugL', {
// 														initialValue: AugL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写八月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 											<FormItem
// 													{...formItemLayoutOne}
// 													label="九月"
// 												>
// 													{getFieldDecorator('SeptL', {
// 														initialValue: SeptL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写九月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="十月"
// 												>
// 													{getFieldDecorator('OctL', {
// 														initialValue: OctL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写十月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 											<FormItem
// 													{...formItemLayoutOne}
// 													label="十一月"
// 												>
// 													{getFieldDecorator('NovL', {
// 														initialValue: NovL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写十一月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 											<FormItem
// 													{...formItemLayoutOne}
// 													label="十二月"
// 												>
// 													{getFieldDecorator('DecL', {
// 														initialValue: DecL,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写十二月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 										</Row>
// 										<Divider />
// 										<h3>月度竞价用电量(单位:万千瓦时)</h3>
// 										<Row>
// 											<Col span={4}>
// 												<FormItem
// 												{...formItemLayoutOne}
// 												label="一月"
// 											>
// 														{getFieldDecorator('JanS', {
// 															initialValue: JanS,
// 															rules: [
// 																{
// 																	required: true,
// 																	message: '请填写一月交易电量'
// 																}
// 															]
// 														})(
// 															<InputNumber min={0} style={{width:'60px'}} />
// 														)}
// 													</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="二月"
// 												>
// 													{getFieldDecorator('FebS', {
// 														initialValue: FebS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写二月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="三月"
// 												>
// 													{getFieldDecorator('MarS', {
// 														initialValue: MarS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写三月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="四月"
// 												>
// 													{getFieldDecorator('AprS', {
// 														initialValue: AprS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写四月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="五月"
// 												>
// 													{getFieldDecorator('MayS', {
// 														initialValue: MayS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写五月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="六月"
// 												>
// 													{getFieldDecorator('JuneS', {
// 														initialValue: JuneS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写六月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 										</Row>
// 										<Row>
// 											<Col span={4}>
// 											<FormItem
// 													{...formItemLayoutOne}
// 													label="七月"
// 												>
// 													{getFieldDecorator('JulyS', {
// 														initialValue: JulyS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写七月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 											<FormItem
// 													{...formItemLayoutOne}
// 													label="八月"
// 												>
// 													{getFieldDecorator('AugS', {
// 														initialValue: AugS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写八月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 											<FormItem
// 													{...formItemLayoutOne}
// 													label="九月"
// 												>
// 													{getFieldDecorator('SeptS', {
// 														initialValue: SeptS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写九月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 												<FormItem
// 													{...formItemLayoutOne}
// 													label="十月"
// 												>
// 													{getFieldDecorator('OctS', {
// 														initialValue: OctS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写十月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 											<FormItem
// 													{...formItemLayoutOne}
// 													label="十一月"
// 												>
// 													{getFieldDecorator('NovS', {
// 														initialValue: NovS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写十一月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 											<Col span={4}>
// 											<FormItem
// 													{...formItemLayoutOne}
// 													label="十二月"
// 												>
// 													{getFieldDecorator('DecS', {
// 														initialValue: DecS,
// 														rules: [
// 															{
// 																required: true,
// 																message: '请填写十二月交易电量'
// 															}
// 														]
// 													})(
// 														<InputNumber min={0} style={{width:'60px'}} />
// 													)}
// 												</FormItem>
// 											</Col>
// 										</Row>
// 										<FormItem
// 											wrapperCol={{ span: 16, offset: 2 }} md={{span: 16, offset: 2}} lg={{span: 16, offset: 3}}
// 										>
// 											<Button type="primary" htmlType="submit" className="sbuBtnA" disabled={true}>已保存</Button>
// 											<Button className="calBtnsAs" onClick={()=>{this.props.history.push(`/seller/contractmanage`)}}>返回</Button>
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
// 											{/*<Timeline.Item color="green">新建合同 {this.formatTime(createTime)}</Timeline.Item>*/}
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
// 											{/*<Timeline.Item color="green">新建合同 {this.formatTime(createTime)}</Timeline.Item>*/}
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
// 											{/*<Timeline.Item color="green">新建合同 {this.formatTime(createTime)}</Timeline.Item>*/}
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
// 										{/*<Timeline.Item>新建合同 {this.formatTime(createTime)}</Timeline.Item>*/}
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
// 										{/*<Timeline.Item color="green">新建合同 {this.formatTime(createTime)}</Timeline.Item>*/}
// 										{/*<Timeline.Item color="green">*/}
// 											{/*<p>确认合同</p>*/}
// 											{/*<p>甲方确认 {partyAConfirmedTime}</p>*/}
// 											{/*<p>乙方确认 {partyBConfirmedTime}</p>*/}
// 										{/*</Timeline.Item>*/}
// 										{/*<Timeline.Item color="green">审核通过*/}
// 											{/*/!*<Link to="/tradingcontract" id="toTrade">前往(模拟)交易中心查看</Link>*!/*/}
// 										{/*</Timeline.Item>*/}
// 									{/*<Timeline.Item color="green">合同完成</Timeline.Item>*/}
// 									{/*<Timeline.Item>合同取消</Timeline.Item>*/}
// 								{/*</Timeline> : status === 'UNAPPROVED'?*/}
// 								{/*<Timeline>*/}
// 								{/*<Timeline.Item color="green">新建合同 {this.formatTime(createTime)}</Timeline.Item>*/}
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