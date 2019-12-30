import React from 'react';
import { Row, Col, Button, Form, Input, InputNumber, Spin, message, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import './common.less';
import api from '../../../../api/tools.js';
const FormItem = Form.Item;
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
class preserveId extends React.Component {
	constructor() {
		super();
		this.state = {
			cidList: [],
			spinLoading:false,
		}
	}
componentDidMount() {
	this.setState({
		company: sessionStorage.company,
	})
}
handleSearch = (value) => {
	this.setState({
		cidList: !value ? [] : [
			value,
		],
	});
}
handleNext = (e) => {
	e.preventDefault();
	this.setState({spinLoading:true});
	this.props.form.validateFields((err, value) => {
		if (!err) {
			const param = {
				"cid": value.cid,
				"name": value.name,
				"shortName": value.shortName,
				"totalCapacity": Number(value.totalCapacity),
				"transformerCapacity": Number(value.transformerCapacity),
				"voltageClasses": Number(value.voltageClasses)
			}
			let url = '/api/company/cid/insert';
			let headers = {
				'Authorization': sessionStorage.obj
			};
			api.post(url, headers, param,
				(res) => {
					this.setState({spinLoading:false});
					message.success('创建成功!');
					const newKey = String(Number(this.props.activeKey)+1);
					const cid = param.cid;
					const name = param.name;
					const totalCapacity = value.totalCapacity;
					this.setState({activeKey: String(newKey)});
					this.props.handleActiveKeyTwo(newKey, cid, name , totalCapacity);
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
handlePre =() => {
	const newKey = String(Number(this.props.activeKey)-1);
	this.setState({activeKey: String(newKey)});
	this.props.handleActiveKeyTwo(newKey);
}
testCid = (rule, value, callback) => {
	if(value.length>5){
		if (!/^[a-zA-Z0-9]{6,10}$/.test(value)) {
			message.warning("户号格式不正确");
			return
		}
		callback();
	}
}
render() {
	const { getFieldDecorator } = this.props.form;
	const { company, spinLoading } = this.state;
  return (
			<Row className="preverArea">
				<Row className="basicHeader">
					<Col span={8} offset={8} className="title">
						<p>户号维护</p>
					</Col>
				</Row>
				<Row className="basicForm">
					<Spin size='large' spinning={spinLoading} tip="验证中,请稍后...">
					<Form>
							<Row>
								<Col span={12}>
									<FormItem
										{...formItemLayout}
										label="户号"
										hasFeedback
									>
											{getFieldDecorator('cid', {
												rules: [
													{ required: true, message: '请输入户号' },
													{
														validator: this.testCid,
													}
												],
											})(<Input size='default' placeholder='请输入户号' className="inputLong" />)}
									</FormItem>
									<FormItem label="户名简称" {...formItemLayout}>
										{getFieldDecorator('shortName', {
											initialValue: company,
										})(<Input size='default' placeholder='请输入户名简称' className="inputLong" />)}
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
								</Col>
								<Col span={12}>
									<FormItem label="户名" {...formItemLayout}>
										{getFieldDecorator('name', {
											initialValue: company,
											rules: [
												{
													required: true,
													message: '请输入企业名称'
												}
											]
										})(<Input size='default' placeholder='请输入户名' className="inputLong" />)}
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
										<Button className="sbuBt" onClick={this.handlePre}>上一步</Button>
										<Button type="primary" htmlType="submit" className="sbuBt" onClick={this.handleNext}>下一步</Button>
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
export default Form.create()(preserveId)
