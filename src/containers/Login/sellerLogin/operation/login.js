import React from 'react'
import './sellerLogin.less';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Icon,
  message,
  Row,
  Switch,
} from 'antd';
import api from '../../../../api/tools.js';
//import loginimg from  '../../../../components/icon/img.png'
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      companyCode: 'SELLER',
      href: window.location.search.slice(4, window.location.search.length),
      adminlogin: true,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true});
        let params = {
          captcha: values.captcha,
          isAdmin: this.state.adminlogin,
          password: values.password,
          remember: true,
          username: values.userName
        }
        let headers = {
          'Authorization': sessionStorage.obj,
          Domain_Name: this.state.href
        };
        const url1 = '/api/login/login';
        api.post(url1, headers, params, (res) => {
            this.setState({loading: false});
            message.success('登录成功');
            sessionStorage.obj = res.content.token;
            sessionStorage.type = res.content.companyType;
            sessionStorage.userName = res.content.username;
            console.log(res)
            if (res.content.companyType === "SELLER") {
              this.props.history.push(`/seller/index`);
            } else if (res.content.companyType === "CUSTOMER") {
              this.props.history.push(`/customer/index`);
            } else {
              this.props.history.push(`/seller/index`);
            }
            // this.props.history.push(`/seller/index`);
            setTimeout(() => {
              sessionStorage.removeItem('obj');
              this.props.history.push(`/login`);
            }, 6000000);
          },
          (err) => {
            this.setState({loading: false});
            message.warning(err.message);
            this.upDateCode();
          })
      }
    });
  }
  upDateCode = () => {
    // const url = window.location.origin+'/api/kaptcha/render';
    const url = api.basepath+'/api/kaptcha/render';
    var img = document.getElementById('code');
    img.src = url;
  }
  adminlog = (e) => {
    this.setState({
      adminlogin: e,
    })
  }

  render() {
    const {form} = this.props;
    const getFieldDecorator = form.getFieldDecorator;
    return (
      <Row className={'login_ant_row'}>
        <div className={`loginimg`}>

        </div>
        <div className="loginBox">
          <h1>电力交易平台</h1>
          <p className={`magintop50`}>国内首家基于区块链技术的电力交易平台</p>
          <h4 className={`titletext`}>用户登录</h4>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem className={`inputbox`}>
              {getFieldDecorator('userName', {
                rules: [{required: true, message: '请输入用户名称'}],
              })(
                <Input maxLength={11} prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入用户名称"/>
              )}
            </FormItem>
            <FormItem className={`inputbox`}>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码'}],
              })(
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                       placeholder="请输入密码"/>
              )}
            </FormItem>
            <FormItem className={`inputbox`}>
              {getFieldDecorator('captcha', {
                rules: [{required: true, message: '请输入验证码'}],
              })(
                <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} key="verificationCode"
                       style={{width: '60%', float: "left"}} placeholder="输入验证码(点击图片切换)"
                       onChange={this.verificationCode}/>
              )}

              {/*<img src={window.location.origin+"/api/kaptcha/render"} alt="验证码" className={`maeginButton`} id="code" onClick={this.upDateCode}  />*/}
              <img src={api.basepath+"/api/kaptcha/render"} alt="验证码" className={`maeginButton`} id="code"
                   onClick={this.upDateCode}/>
            </FormItem>
            <FormItem style={{float: "right", display: "none"}}>
              <b>{"以管理员身份登录:"}&nbsp;&nbsp;</b>
              <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked onChange={this.adminlog}/>
            </FormItem>
            <FormItem style={{clear: "both"}} className={`inputbox`}>
              <Input key="submit" placeholder="获取验证码" type="submit" value="登录" id="submit"
                     style={{width: '100%', cursor: 'pointer', height: "40px"}} className={`submitButton`}/>
               <div className="login-form-forgot" onClick={() => {this.props.history.push(`/register`)}}>我要注册!</div>
            </FormItem>


            <p className="reglisterBottom">
              <a>{"帮助"}</a>
              <a>{"隐私"}</a>
              <a>{"条款"}</a>
            </p>
            <p style={{textAlign: 'center'}} className={`bottomtext`}>
              <span>北京兆信通能科技有限公司 版权所有Copyright © 2018</span>

            </p>
            <p style={{textAlign: 'center'}} className={`bottomtext2`}>

              <span>京ICP备  18034505号</span>
            </p>

          </Form>


        </div>
      </Row>
    )
  }
}
const LoginForm = Form.create()(Login);

export default LoginForm;