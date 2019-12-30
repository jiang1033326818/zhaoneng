import React from 'react';
import { Layout, Breadcrumb, Row, Col, Form, Input, Button,  Spin, Select, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import './accountMemo.less';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import api from '../../../api/tools.js';
const { Content } = Layout;
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
class accountMemo extends React.Component {
	constructor() {
		super();
		this.state = {
			userName: '',
			location: '用户中心/账号备忘',
			company: '',
			spinLoading:false,
			companyList: [],
			showupload:true,
			isEdit: true,
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
handleSubmit = (e) => {
	e.preventDefault();
	this.setState({spinLoading:true});
	this.props.form.validateFields((err, values) => {
		if (!err) {
			this.setState({isEdit: true, spinLoading:false});
		}
	});
}
  render() {
		const { getFieldDecorator } = this.props.form;
		const { spinLoading, companyList, isEdit } = this.state;
    return (
      <Layout className="layout">
				<Lheader history={this.props.history}></Lheader>
    		<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ background: '#fff', padding: 24, minHeight: 760 }} className="content">
					<Row>
						<Col span={8} offset={8} className="memoTitle">
							<h2>交易中心账号备忘</h2>
						</Col>
					</Row>
					<Row>
						<Col span={8} offset={8} className="memoForm">
							<Spin size='large' spinning={spinLoading} tip="上传中，请稍后...">
								<Form>
									<FormItem label="账号名称" {...formItemLayout}>
										{getFieldDecorator('name', {
										initialValue: '广东省粤电售电公司',
										rules: [
											{
												required: true,
												message: '请输入合同名称'
											}
										]
										})(<Input size='default' placeholder='请输入合同名称' className="inputLengths" disabled={isEdit} />)}
									</FormItem>
									<FormItem label="身份证号" {...formItemLayout}>
										{getFieldDecorator('IDnumber', {
											initialValue: '14022219982210320x',
											rules: [
												{
													required: true,
													message: '请输入身份证号'
												}
											]
										})(<Input size='default' placeholder='请输入身份证号' className="inputLengths" disabled={isEdit} />)}
									</FormItem>
									<FormItem label="邮箱" {...formItemLayout}>
										{getFieldDecorator('email', {
											initialValue: '142368654@qq.com',
											rules: [
												{
													required: true,
													message: '请输入邮箱号'
												}
											]
										})(<Input size='default' placeholder='请输入邮箱号' className="inputLengths" disabled={isEdit} />)}
									</FormItem>
									<FormItem label="手机号码" {...formItemLayout}>
										{getFieldDecorator('cellphone', {
											initialValue: '18399335562',
											rules: [
												{
													required: true,
													message: '请输入手机号码'
												}
											]
										})(<Input size='default' placeholder='请输入手机号码' className="inputLengths" disabled={isEdit} />)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="用户类型"
										hasFeedback
									>
										{getFieldDecorator('customerLike', {
											initialValue: '售电企业用户',
											rules: [
												{ required: true, message: '请选择用户类型' },
											],
										})(
											<Select placeholder="请选择用户类型" className="inputLengths" disabled={isEdit}>
												<Option value="用电企业用户">用电企业用户</Option>
												<Option value="售电企业用户">售电企业用户</Option>
												<Option value="发电企业用户">发电企业用户</Option>
											</Select>
										)}
									</FormItem>
									<FormItem
										{...formItemLayout}
										label="所属单位"
										hasFeedback
									>
										{getFieldDecorator('companyName', {
											initialValue: '广东省粤电售电第一发电厂',
											rules: [
												{ required: true, message: '请选择所属单位' },
											],
										})(
											<Select placeholder="请选择企业名称" className="inputLengths" disabled={isEdit}>
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
										wrapperCol={{ span: 12, offset: 4 }}
									>
										<Button type="primary" htmlType="submit" className="sbuBtns" onClick={this.handleSubmit} disabled={isEdit}>{isEdit===true?"已保存":"保存"}</Button>
										<Button className="calBtns" onClick={()=>{this.setState({isEdit: false})}}>修改</Button>
									</FormItem>
								</Form>
							</Spin>
						</Col>
					</Row>
				</div>
    	</Content>
    	<Lfooter></Lfooter>
  	</Layout>
    )
  }
}
export default Form.create()(accountMemo)