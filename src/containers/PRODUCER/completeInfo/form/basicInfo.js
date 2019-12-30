import React from 'react';
import { Row, Col, Button, Form, Select, Input, InputNumber, Cascader, Spin, message, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import './common.less';
import api from '../../../../api/tools.js';
import AddressPicker from './addressData';
const FormItem = Form.Item;
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
class userBasicInfo extends React.Component {
	constructor() {
		super();
		this.state = {
			spinLoading:false,
			powerCompanyOptions : [
				{
					value: '南方供电局',
					label: '南方供电局',
					children: [{
						value: '广州供电局',
						label: '广州供电局',
						children: [{
							value: '佛山供电所',
							label: '佛山供电所',
						}],
					}],
				}, {
					value: '北方供电局',
					label: '北方供电局',
					children: [{
						value: '新疆供电局',
						label: '新疆供电局',
						children: [{
							value: '伊犁供电所',
							label: '伊犁供电所',
						}],
					}],
				}
			],
			industryCategory : [
				{
					value: '工商业',
					label: '工商业',
					children: [{
						value: '手工业',
						label: '手工业',
						children: [{
							value: '纺织业',
							label: '纺织业',
						},{
							value: '买办业',
							label: '买办业',
						}],
					}],
				}, {
					value: '重工业',
					label: '重工业',
					children: [{
						value: '冶金业',
						label: '冶金业',
						children: [{
							value: '炼钢厂',
							label: '炼钢厂',
						},{
							value: '焦煤厂',
							label: '焦煤厂',
						},{
							value: '热电厂',
							label: '热电厂',
						}],
					}],
				},
				{
					value: '服务业',
					label: '服务业',
					children: [{
						value: '医疗教育行业',
						label: '医疗教育行业',
						children: [{
							value: '医疗行业',
							label: '医疗行业',
						},{
							value: '教育行业',
							label: '教育行业',
						}],
					}],
				},
				{
					value: '农业',
					label: '农业',
					children: [{
						value: '灌溉畜牧业',
						label: '灌溉畜牧业',
						children: [{
							value: '灌溉业',
							label: '灌溉业',
						},{
							value: '畜牧业',
							label: '畜牧业',
						}],
					}],
				}
			]
		}
	}
componentDidMount() {
	this.setState({
		company: sessionStorage.company
	})
}
onChange = (value) => {
}
handleNext = (e) => {
	e.preventDefault();
	this.setState({spinLoading:true});
	this.props.form.validateFields((err, value) => {
		if (!err) {
			const param = {
				"belongGridNameA": value.belongGridName[0],
				"belongGridNameB": value.belongGridName[1],
				"currency": value.currency,
				"id": Number(sessionStorage.userId),
				"industryNameA": value.industryName[0],
				"industryNameB": value.industryName[1],
				"industryNameC": value.industryName[2],
				"name": value.name,
				"regionNameA": value.regionName[0],
				"regionNameB": value.regionName[1],
				"regionNameC": value.regionName[2],
				"registeredCapital": value.registeredCapital,
				"shortName": value.shortName,
				"unifiedSocialCreditCode": value.unifiedSocialCreditCode
			}
			let url = '/api/company/update';
			let headers = {
				'Authorization': sessionStorage.obj
			};
			api.post(url, headers, param,
				(res) => {
					this.setState({spinLoading:false});
					message.success('创建成功!');
					const newKey = String(Number(this.props.activeKey)+1);
					const regionName = value.regionName[1];
					const unifiedSocialCreditCode = value.unifiedSocialCreditCode;
					const belongGridName = value.belongGridName[1];
					const industryName = value.industryName[1];
					this.setState({activeKey: String(newKey)});
					this.props.handleActiveKeyOne(newKey,regionName, unifiedSocialCreditCode, belongGridName,industryName);
				},
				(err) => {
					this.setState({spinLoading:false});
					message.success('创建失败!');
				}
			);
		} else {
			this.setState({spinLoading: false});
		}
	});
}
testCellphone = (rule, value, callback) => {
	this.setState({spinLoading:false});
	if(value.length>10){
		if (!/^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/.test(value)) {
			message.warning("手机号格式不正确");
			return
		}
		callback();
	}
}
testDuty = (rule, value, callback) => {
	this.setState({spinLoading:false});
	if(value.length>15){
		if (!/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(value)) {
			message.warning("税号格式不正确");
			return
		}
		callback();
	}
}
render() {
	const { getFieldDecorator } = this.props.form;
	const { powerCompanyOptions, industryCategory, company, spinLoading } = this.state;
  return (
			<Row className="basicArea">
				<Row className="basicHeader">
					<Col span={8} offset={8} className="title">
						<p>基本信息</p>
					</Col>
				</Row>
				<Row className="basicForm">
					<Spin size='large' spinning={spinLoading} tip="验证中,请稍后...">
						<Form>
							<Row>
								<Col span={12}>
									<FormItem label="企业名称" {...formItemLayout}>
										{getFieldDecorator('name', {
											initialValue: company,
											rules: [
												{
													required: true,
													message: '请输入企业名称'
												}
											]
										})(<Input size='default' placeholder='请输入企业名称' className="inputMeter" />)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="所属电网公司"
									>
										{getFieldDecorator('belongGridName', {
											initialValue: ['南方供电局', '广州供电局', '佛山供电所'],
											rules: [{ type: 'array', required: true, message: '请选择所属电网公司' }],
										})(
											<Cascader options={powerCompanyOptions} className="inputMeter" />
										)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="行政区域"
										hasFeedback
									>
										{getFieldDecorator('regionName', {
											initialValue: ['广东省', '广州市', '天河区'],
											rules: [
												{ required: true, message: '请选择所属行政区域' },
											],
										})(
											<AddressPicker />
										)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="币种"
										hasFeedback
									>
										{getFieldDecorator('currency', {
											initialValue: '人民币',
											rules: [
												{ required: true, message: '请选择交易币种' },
											],
										})(
											<Select placeholder="请选择交易币种" className="inputMeter">
												<Option value="人民币">人民币</Option>
												<Option value="美元">美元</Option>
												<Option value="欧元">欧元</Option>
												<Option value="卢布">卢布</Option>
												<Option value="马克">马克</Option>
											</Select>
										)}
									</FormItem>
									<FormItem label="税号" {...formItemLayout}>
										{getFieldDecorator('duty', {
											initialValue: 'a13155859365576',
											rules: [
												{
													required: true,
													message: '请输入税号'
												},
												{
													validator: this.testDuty,
												}
											]
										})(<Input size='default' placeholder='请输入税号' className="inputMeter" />)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="注册资本"
									>
										{getFieldDecorator('registeredCapital', {
											initialValue: '3242',
											rules: [
												{
													required: true,
													message: '请填写注册资本'
												}
											]
										})(
											<InputNumber min={0}  />
										)}
										<span className="ant-form-text"> 万元</span>
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="电压等级"
									>
										{getFieldDecorator('voltageClasses', {
											initialValue: '30000',
											rules: [
												{
													required: true,
													message: '请输入电压等级'
												}
											]
										})(
											<InputNumber min={0} />
										)}
										<span className="ant-form-text"> 千伏</span>
									</FormItem>
								</Col>
								<Col span={12}>
									<FormItem label="企业简称" {...formItemLayout}>
										{getFieldDecorator('shortName', {
											initialValue: '广电公司',
										})(<Input size='default' placeholder='请输入企业简称' className="inputMeter" />)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="企业性质"
										hasFeedback
									>
										{getFieldDecorator('unifiedSocialCreditCode', {
											initialValue: '三资(独资,合资,合作)企业',
											rules: [
												{ required: true, message: '请选择企业性质' },
											],
										})(
											<Select placeholder="请选择企业性质" className="inputMeter">
												<Option value="三资(独资,合资,合作)企业">三资(独资,合资,合作)企业</Option>
												<Option value="独资企业">独资企业</Option>
												<Option value="合资企业">合资企业</Option>
												<Option value="合作企业">合作企业</Option>
											</Select>
										)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="行业分类"
										hasFeedback
									>
										{getFieldDecorator('industryName', {
											initialValue: ['重工业', '冶金业', '炼钢厂'],
											rules: [
												{ required: true, message: '请选择行业分类' },
											],
										})(
											<Cascader options={industryCategory} className="inputMeter" />
										)}
									</FormItem>
									<FormItem label="手机号" {...formItemLayout}>
										{getFieldDecorator('phone', {
											initialValue: '13155859365',
											rules: [
												{
													required: true,
													message: '请输入手机号'
												},
												{
													validator: this.testCellphone,
												}
											]
										})(<Input size='default' placeholder='请输入手机号' className="inputMeter" />)}
									</FormItem>
									<FormItem label="法人姓名" {...formItemLayout}>
										{getFieldDecorator('lawName', {
											initialValue: 'Json Nick',
											rules: [
												{
													required: true,
													message: '请输入法人姓名'
												}
											]
										})(<Input size='default' placeholder='请输入法人姓名' className="inputMeter" />)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="变压器容量"
									>
										{getFieldDecorator('transformerCapacity', {
											initialValue: '324265',
											rules: [
												{
													required: true,
													message: '请输入变压器容量'
												}
											]
										})(
											<InputNumber min={0} />
										)}
										<span className="ant-form-text"> 千伏安</span>
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="总用电容量"
									>
										{getFieldDecorator('totalCapacity', {
											initialValue: '3242',
											rules: [
												{
													required: true,
													message: '请输入总用电容量'
												}
											]
										})(
											<InputNumber min={0}  />
										)}
										<span className="ant-form-text"> 千瓦</span>
									</FormItem>
								</Col>
							</Row>
							<Row className="footerLine">
								<Col span={8} offset={8} className="btnGroups">
									<FormItem>
										{getFieldDecorator('agreement', {
											initialValue: true,
											rules: [
												{
													required: true,
													message: '请仔细阅读免责声明'
												}
											]
										})(
											<Checkbox className="checkTags" defaultChecked={true}>我已阅读 <Link to="/disclaimer">免责声明</Link></Checkbox>
										)}
									</FormItem>
									<FormItem
										wrapperCol={{ span: 12, offset: 4 }} className="btnItem"
									>
										<Button type="primary" htmlType="submit" className="sbuBt" onClick={this.handleNext}>下一步</Button>
										<Button className="calBt" onClick={()=>{this.props.history.push(`/producer/index`)}}>取消</Button>
									</FormItem>
								</Col>
							</Row>
						</Form>
					</Spin>
				</Row>
			</Row>
    )
  }
}
export default Form.create()(userBasicInfo)