import React from 'react'
import './login.less';
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Icon,
		message,
		Spin,
		Row,
} from 'antd';
import api from '../../../api/tools.js';
const FormItem = Form.Item;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			companyCode: 'PRODUCER',
			href:window.location.search.slice(4,window.location.search.length)
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({loading:true});
				let params = {
					captcha: values.captcha,
					isAdmin: true,
					password: values.password,
					remember: true,
					username: values.userName
				}
				let headers = {
					'Authorization': sessionStorage.obj,
					Domain_Name : this.state.href
				};
				const url1 = '/api/login/producer';
				api.post(url1,headers,params,(res)=>{
					this.setState({loading:false});
					message.success('登录成功');
					sessionStorage.obj = res.content.token;
					sessionStorage.type = res.content.companyType;
					this.props.history.push(`/producer/index`);
					setTimeout(() => {
						sessionStorage.removeItem('obj');
						this.props.history.push(`/producerlogin`);
					}, 6000000);
				},
				(err) => {
					this.setState({loading:false});
					message.warning(err.message);
					this.upDateCode();
				})
			}
		});
	}
  upDateCode = () => {
		const url = api.basepath+'/api/kaptcha/render';
		var img = document.getElementById('code');
		img.src=url;
	}
	handleLink = () => {
		if (this.companyCode === 'PRODUCER') {
			this.props.history.push(`/producer/register`);
		} else if (this.companyCode === 'CONSUMER') {
			this.props.history.push(`/customer/register`);
		}
	}
    render() {
			const { form } = this.props;
      const getFieldDecorator = form.getFieldDecorator;
        return (
					<Row>
            <div className="loginBox">
              <h1>电力交易平台</h1>
                <p>国内首家基于区块链技术的电力交易平台</p>
								<Spin spinning={this.state.loading} size="large">
									<Form onSubmit={this.handleSubmit} className="login-form">
										<FormItem>
											{getFieldDecorator('userName', {
												rules: [{ required: true, message: '请输入用户名称' }],
											})(
												<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名称" />
											)}
										</FormItem>
										<FormItem>
											{getFieldDecorator('password', {
												rules: [{ required: true, message: '请输入密码' }],
											})(
												<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
											)}
										</FormItem>
										<FormItem>
											{getFieldDecorator('captcha', {
												rules: [{ required: true, message: '请输入验证码' }],
											})(
												<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}  />} key="verificationCode" style={{width: '60%', float: "left"}} placeholder="输入验证码(点击图片切换)" onChange={this.verificationCode} />
											)}
											<img src={api.basepath+"/api/kaptcha/render"} alt="验证码" className={`maeginButton`} id="code" onClick={this.upDateCode}  />
										</FormItem>
										<FormItem>
											<Input  key="submit" placeholder="获取验证码" type="submit" value="登录" id="submit"
												style={{width: '100%',cursor: 'pointer'}} className={`submitButton`}/>
										</FormItem>
									</Form>
								</Spin>
                <p className="reglisterBottom">
                    <a>{"帮助"}</a>
                    <a>{"隐私"}</a>
                    <a>{"条款"}</a>
                </p>
                <p style={{ textAlign: 'center' }}>
									<p>北京兆信通能科技有限公司 版权所有Copyright © 2018</p>
									<p>京ICP备  18034505号</p>
                </p>
            </div>
					</Row>
        )
    }
}
const LoginForm = Form.create()(Login);

export default LoginForm;