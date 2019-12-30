import React from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Input, Radio, Button, message, Spin,  DatePicker, Timeline, Select, InputNumber, Divider} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Shield from '../../../../../components/icon/Shield.png';
import Battery from '../../../../../components/icon/Battery.png';
import moment from 'moment';
import './addNewContract.less';
import Lheader from '../../../common/Iheader.js';
import Lfooter from '../../../../../components/layout/Ifooter.js';
import api from '../../../../../api/tools.js';
const { Content } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const formItemLayoutOne = {
  labelCol: {
    xs: { span: 24 },
		sm: { span: 5 },
		md: { span: 15 }
  },
  wrapperCol: {
    xs: { span: 24 },
		sm: { span: 12 },
		md: { span: 3 }
  },
};
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
			location: '首页/合同管理/新建长协线上合同',
			company: '',
			spinLoading: false,
			companyList: [],
			templetList: [],
			JanL: 0,
			FebL: 0,
			MarL: 0,
			AprL: 0,
			MayL: 0,
			JuneL: 0,
			JulyL:0,
			AugL: 0,
			SeptL: 0,
			OctL: 0,
			NovL: 0,
			DecL: 0,
			JanS: 0,
			FebS: 0,
			MarS: 0,
			AprS: 0,
			MayS: 0,
			JuneS: 0,
			JulyS: 0,
			AugS: 0,
			SeptS: 0,
			OctS: 0,
			NovS: 0,
			DecS: 0,
			planId: 7,
			biddingSpread: 0,
			bilateralSpread: 0,
			yearStr: '2018'
		};
	}
	componentDidMount() {
		this.getContractDetail();
		this.getContractTrmplet();
		this.setState({
			company: sessionStorage.company,
			authorization: sessionStorage.obj
		})
	}
	getContractDetail = () => {
		if(localStorage.plancompid) {
			let contractId = localStorage.plancompid;
			let url = '/api/plan/details/'+ contractId;
			const param = {};
			let headers = {
				'Authorization': sessionStorage.obj,
			};
			api.get(url, headers, param,
				(res) => {
					localStorage.removeItem('plancompid');
					let monthList = res.content.list?res.content.list:[];
					let filePlan = res.content.fillPlan?res.content.fillPlan:[];
					this.setState({
						bidding: filePlan.bidding,
						biddingSpread: filePlan.biddingSpread,
						bilateral: filePlan.bilateral,
						bilateralSpread: filePlan.bilateralSpread,
						yearStr: filePlan.yearStr,
						companyName: filePlan.companyName,
						companyId: filePlan.companyId,
						name: filePlan.name,
						planId: filePlan.id,
						JanL: monthList[0]?monthList[0].bilateral:0,
						JanS: monthList[0]?monthList[0].bidding:0,
						FebL: monthList[1]?monthList[1].bilateral:0,
						FebS: monthList[1]?monthList[1].bidding:0,
						MarL: monthList[2]?monthList[2].bilateral:0,
						MarS: monthList[1]?monthList[2].bidding:0,
						AprL: monthList[3]?monthList[3].bilateral:0,
						AprS: monthList[3]?monthList[3].bidding:0,
						MayL: monthList[4]?monthList[4].bilateral:0,
						MayS: monthList[4]?monthList[4].bidding:0,
						JuneL: monthList[5]?monthList[5].bilateral:0,
						JuneS: monthList[5]?monthList[5].bidding:0,
						JulyL: monthList[6]?monthList[6].bilateral:0,
						JulyS: monthList[6]?monthList[6].bidding:0,
						AugL: monthList[7]?monthList[7].bilateral:0,
						AugS: monthList[7]?monthList[7].bidding:0,
						SeptL: monthList[8]?monthList[8].bilateral:0,
						SeptS: monthList[8]?monthList[8].bidding:0,
						OctL: monthList[9]?monthList[9].bilateral:0,
						OctS: monthList[9]?monthList[9].bidding:0,
						NovL: monthList[10]?monthList[10].bilateral:0,
						NovS: monthList[10]?monthList[10].bidding:0,
						DecL: monthList[11]?monthList[11].bilateral:0,
						DecS: monthList[11]?monthList[11].bidding:0,
					})
				},
				(err) => {
					console.log("failed" + err);
				}
			);
		}
	}
	getContractTrmplet = () => {
		let url = '/api/plan/list';
		const param = {
			pageSize: 100
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		api.post(url, headers, param,
			(res) => {
				let templetList = res.content?res.content.content:[];
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
				let partyName = partyAName.substring(0,index)===''?this.state.companyName:partyAName.substring(0,index);
				//let longPower = [].push(values.JanL,values.FebL,values.MarL,values.AprL,values.MayL,values.JuneL,values.JulyL,values.AugL,values.SeptL,values.OctL,values.NovL,values.DecL);
				//let shortPower = [].push(values.JanS,values.FebS,values.MarS,values.AprS,values.MayS,values.JuneS,values.JulyS,values.AugS,values.SeptS,values.OctS,values.NovS,values.DecS);
				let bilateral= values.JanL+values.FebL+values.MarL+values.AprL+values.MayL+values.JuneL+values.JulyL+values.AugL+values.SeptL+values.OctL+values.NovL+values.DecL;
				let bidding = values.JanS+values.FebS+values.MarS+values.AprS+values.MayS+values.JuneS+values.JulyS+values.AugS+values.SeptS+values.OctS+values.NovS+values.DecS;
				let year= values.yearStr;
				let formulateCreatePOList = [
					{
						"bidding": values.JanS,
						"bilateral": values.JanL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-01",
						"yearStr": year
					},
					{
						"bidding": values.FebS,
						"bilateral": values.FebL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-02",
						"yearStr": year
					},
					{
						"bidding": values.MarS,
						"bilateral": values.MarL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-03",
						"yearStr": year
					},
					{
						"bidding": values.AprS,
						"bilateral": values.AprL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-04",
						"yearStr": year
					},
					{
						"bidding": values.MayS,
						"bilateral": values.MayL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-05",
						"yearStr": year
					},
					{
						"bidding": values.JuneS,
						"bilateral": values.JuneL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-06",
						"yearStr": year
					},
					{
						"bidding": values.JulyS,
						"bilateral": values.JulyL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-07",
						"yearStr": year
					},
					{
						"bidding": values.AugS,
						"bilateral": values.AugL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-08",
						"yearStr": year
					},
					{
						"bidding": values.SeptS,
						"bilateral": values.SeptL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-09",
						"yearStr": year
					},
					{
						"bidding": values.OctS,
						"bilateral": values.OctL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-10",
						"yearStr": year
					},
					{
						"bidding": values.NovS,
						"bilateral": values.NovL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-11",
						"yearStr": year
					},
					{
						"bidding": values.DecS,
						"bilateral": values.DecL,
						"companyId": companyId,
						"companyName": partyName,
						"monthStr": year+"-12",
						"yearStr": year
					},
				]
				const rangeValue = values.expiryDate;
				const effectiveTime = rangeValue[0].format('YYYY-MM-DD');
				const expiryTime = rangeValue[1].format('YYYY-MM-DD');
				let planId = /^\d+$/.test(values.planId)?values.planId:this.state.planId
				const param = {
					"bidding": String(bidding),
					"biddingSpread": String(values.biddingSpread),
					"bilateral": String(bilateral),
					"bilateralSpread": String(values.bilateralSpread),
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
					"planId": planId,
					"formulateCreatePOList":formulateCreatePOList,
					"yearStr": values.yearStr
				}
				let url = '/api/contract/plan/create';
				let headers = {
					'Authorization': sessionStorage.obj
				};
				this.setState({spinLoading:false});
				api.post(url, headers, param,
					(res) => {
						this.setState({spinLoading:false});
						message.success('创建成功');
						this.props.history.push(`/seller/contractmanage`);
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
	handlePlan = (value) => {
		let url = '/api/plan/details/' + Number(value);
		const param = {};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		api.get(url, headers, param,
			(res) => {
				let monthList = res.content.list?res.content.list:[];
				let fillPlan = res.content.fillPlan?res.content.fillPlan:[];
				this.setState({
					biddingSpread: fillPlan.biddingSpread,
					bilateralSpread: fillPlan.bilateralSpread,
					companyName: fillPlan.companyName,
					JanL: monthList[0]?monthList[0].bilateral:0,
					JanS: monthList[0]?monthList[0].bidding:0,
					FebL: monthList[1]?monthList[1].bilateral:0,
					FebS: monthList[1]?monthList[1].bidding:0,
					MarL: monthList[2]?monthList[2].bilateral:0,
					MarS: monthList[1]?monthList[2].bidding:0,
					AprL: monthList[3]?monthList[3].bilateral:0,
					AprS: monthList[3]?monthList[3].bidding:0,
					MayL: monthList[4]?monthList[4].bilateral:0,
					MayS: monthList[4]?monthList[4].bidding:0,
					JuneL: monthList[5]?monthList[5].bilateral:0,
					JuneS: monthList[5]?monthList[5].bidding:0,
					JulyL: monthList[6]?monthList[6].bilateral:0,
					JulyS: monthList[6]?monthList[6].bidding:0,
					AugL: monthList[7]?monthList[7].bilateral:0,
					AugS: monthList[7]?monthList[7].bidding:0,
					SeptL: monthList[8]?monthList[8].bilateral:0,
					SeptS: monthList[8]?monthList[8].bidding:0,
					OctL: monthList[9]?monthList[9].bilateral:0,
					OctS: monthList[9]?monthList[9].bidding:0,
					NovL: monthList[10]?monthList[10].bilateral:0,
					NovS: monthList[10]?monthList[10].bidding:0,
					DecL: monthList[11]?monthList[11].bilateral:0,
					DecS: monthList[11]?monthList[11].bidding:0,
					planId: value
				})
			},
			(err) => {
				console.log("failed" + err);
			}
		);
	}
	disabledDate = (current) => {
		return current && current <= moment().endOf('day')-86400000;
	}
  render() {
		const { getFieldDecorator } = this.props.form;
		const { spinLoading, templetList, companyList, JanL, FebL, MarL, AprL, MayL, JuneL, JulyL, AugL, SeptL, OctL, NovL, DecL,JanS, FebS, MarS, AprS, MayS, JuneS, JulyS, AugS, SeptS, OctS, NovS, DecS, bilateralSpread, biddingSpread, yearStr, companyName, name	} = this.state;
    return (
      <Layout className="layout">
				<Lheader history={this.props.history} menubox={"/seller/contractmanage"}></Lheader>
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
							<Col span={16} offset={3} className="formArea">
								<Spin size='large' spinning={spinLoading} tip="创建中，请稍后...">
									<Form>
										<FormItem
											{...formItemLayout}
											label="用电计划"
											hasFeedback
										>
											{getFieldDecorator('planId', {
												initialValue: name,
												rules: [
													{ required: true, message: '请选择用电计划' },
												],
											})(
												<Select placeholder="请选择用电计划" className="inputLengths" onChange={this.handlePlan}>
													{
														templetList.map((item)=>{
															return (
																<Option value={item.id} key={item.id}>{item.name}</Option>
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
												<Select placeholder="请选择计划" className="inputLengths" disabled={true}>
													{
														companyList.map((item)=>{
															return (
																<Option value={item.partnerCompanyName+"-"+item.partnerCompanyId} key={item.companyId}>{item.partnerCompanyName}</Option>
															)
														})
													}
												</Select>
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
												initialValue: '',
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
											label="合同生效日期"
										>
											{getFieldDecorator('expiryDate', rangeConfig)(
												<RangePicker format="YYYY-MM-DD" locale={locale} disabledDate={this.disabledDate} />
											)}
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="申报计划年份"
										>
											{getFieldDecorator('yearStr', {
												initialValue: yearStr,
												rules: [
													{ required: true, message: '请选择申报年份' },
												],
											})(
												<Select placeholder="请选择申报年份" className="inputLengths">
													<Option value="2018">2018年</Option>
													<Option value="2019">2019年</Option>
													<Option value="2020">2020年</Option>
													<Option value="2021">2021年</Option>
													<Option value="2022">2022年</Option>
													<Option value="2023">2023年</Option>
													<Option value="2024">2024年</Option>
													<Option value="2025">2025年</Option>
												</Select>
											)}
										</FormItem>
										<FormItem
													{...formItemLayout}
													label="长协交易价差"
												>
													{getFieldDecorator('bilateralSpread', {
														initialValue: bilateralSpread,
														rules: [
															{
																required: true,
																message: '请填写长协交易价差'
															}
														]
													})(
														<InputNumber min={-10} />
													)}
													<span className="ant-form-text"> 元</span>
										</FormItem>
										<FormItem
													{...formItemLayout}
													label="月竞交易价差"
												>
													{getFieldDecorator('biddingSpread', {
														initialValue: biddingSpread,
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
										<Divider />
										{/* 长协交易电量 */}
										<h3>长期协议用电量 (单位:万千瓦时)  <span>(必填)</span> </h3>
										<Row>
											<Col span={4}>
												<FormItem
												{...formItemLayoutOne}
												label="一月"
											>
														{getFieldDecorator('JanL', {
															initialValue: JanL,
														})(
															<InputNumber min={0} className="monthLength"  />
														)}
													</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="二月"
												>
													{getFieldDecorator('FebL', {
														initialValue: FebL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="三月"
												>
													{getFieldDecorator('MarL', {
														initialValue: MarL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="四月"
												>
													{getFieldDecorator('AprL', {
														initialValue: AprL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="五月"
												>
													{getFieldDecorator('MayL', {
														initialValue: MayL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="六月"
												>
													{getFieldDecorator('JuneL', {
														initialValue: JuneL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
										</Row>
										<Row>
										<Col span={4}>
											<FormItem
													{...formItemLayoutOne}
													label="七月"
												>
													{getFieldDecorator('JulyL', {
														initialValue: JulyL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
											<FormItem
													{...formItemLayoutOne}
													label="八月"
												>
													{getFieldDecorator('AugL', {
														initialValue: AugL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
											<FormItem
													{...formItemLayoutOne}
													label="九月"
												>
													{getFieldDecorator('SeptL', {
														initialValue: SeptL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="十月"
												>
													{getFieldDecorator('OctL', {
														initialValue: OctL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
											<FormItem
													{...formItemLayoutOne}
													label="十一月"
												>
													{getFieldDecorator('NovL', {
														initialValue: NovL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
											<FormItem
													{...formItemLayoutOne}
													label="十二月"
												>
													{getFieldDecorator('DecL', {
														initialValue: DecL,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
										</Row>
										<Divider />
										<h3>月度竞价用电量  (单位:万千瓦时)</h3>
										<Row>
											<Col span={4}>
												<FormItem
												{...formItemLayoutOne}
												label="一月"
											>
														{getFieldDecorator('JanS', {
															initialValue: JanS,
														})(
															<InputNumber min={0} className="monthLength"  />
														)}
													</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="二月"
												>
													{getFieldDecorator('FebS', {
														initialValue: FebS,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="三月"
												>
													{getFieldDecorator('MarS', {
														initialValue: MarS,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="四月"
												>
													{getFieldDecorator('AprS', {
														initialValue: AprS,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="五月"
												>
													{getFieldDecorator('MayS', {
														initialValue: MayS,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="六月"
												>
													{getFieldDecorator('JuneS', {
														initialValue: JuneS,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
										</Row>
										<Row>
											<Col span={4}>
											<FormItem
													{...formItemLayoutOne}
													label="七月"
												>
													{getFieldDecorator('JulyS', {
														initialValue: JulyS,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
											<FormItem
													{...formItemLayoutOne}
													label="八月"
												>
													{getFieldDecorator('AugS', {
														initialValue: AugS,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
											<FormItem
													{...formItemLayoutOne}
													label="九月"
												>
													{getFieldDecorator('SeptS', {
														initialValue: SeptS,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
												<FormItem
													{...formItemLayoutOne}
													label="十月"
												>
													{getFieldDecorator('OctS', {
														initialValue: OctS,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
											<FormItem
													{...formItemLayoutOne}
													label="十一月"
												>
													{getFieldDecorator('NovS', {
														initialValue: NovS,
													})(
														<InputNumber min={0} className="monthLength"  />
													)}
												</FormItem>
											</Col>
											<Col span={4}>
											<FormItem
													{...formItemLayoutOne}
													label="十二月"
												>
													{getFieldDecorator('DecS', {
														initialValue: DecS,
													})(
														<InputNumber min={0} className="monthLength" />
													)}
												</FormItem>
											</Col>
										</Row>
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