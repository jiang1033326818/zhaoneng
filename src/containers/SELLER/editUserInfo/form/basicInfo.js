import React from 'react';
import { Row, Col, Button, Form, Select, Input, InputNumber, Cascader, Spin, } from 'antd';
// message
import './common.less';
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
// 下一步
handleNext = (e) => {
	e.preventDefault();
	this.props.form.validateFields((err, value) => {
		if (!err) {
			const newKey = String(Number(this.props.activeKey)+1);
			this.setState({activeKey: String(newKey)});
			this.props.handleActiveKey(newKey);

		} else {
			this.setState({spinLoading: false});
		}
	});
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
										{getFieldDecorator('belongGridNameA', {
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
										{getFieldDecorator('registeredAddress', {
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
										{getFieldDecorator('money', {
											initialValue: '1',
											rules: [
												{ required: true, message: '请选择交易币种' },
											],
										})(
											<Select placeholder="请选择交易币种" className="inputMeter">
												<Option value="1">人民币</Option>
												<Option value="2">美元</Option>
												<Option value="3">欧元</Option>
												<Option value="4">卢布</Option>
												<Option value="5">马克</Option>
											</Select>
										)}
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
											initialValue: '1',
											rules: [
												{ required: true, message: '请选择企业性质' },
											],
										})(
											<Select placeholder="请选择企业性质" className="inputMeter">
												<Option value="1">三资(独资,合资,合作)企业</Option>
												<Option value="2">独资企业</Option>
												<Option value="3">合资企业</Option>
												<Option value="4">合作企业</Option>
											</Select>
										)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="行业分类"
										hasFeedback
									>
										{getFieldDecorator('industryNameA', {
											initialValue: ['重工业', '冶金业', '炼钢厂'],
											rules: [
												{ required: true, message: '请选择行业分类' },
											],
										})(
											<Cascader options={industryCategory} className="inputMeter" />
										)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="注册资本"
									>
										{getFieldDecorator('loginPrice', {
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
								</Col>
							</Row>
							<Row className="footerLine">
								<Col span={8} offset={8} className="btnGroups">
									<FormItem
										wrapperCol={{ span: 12, offset: 4 }} className="btnItem"
									>
										<Button type="primary" htmlType="submit" className="sbuBt" onClick={this.handleNext}>下一步</Button>
										<Button className="calBt" onClick={()=>{this.props.history.push(`/seller/index`)}}>取消</Button>
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