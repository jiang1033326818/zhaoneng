import React from 'react'
import './register.less';
import 'antd/dist/antd.css';
import data from "./register.json"
import api from '../../api/tools.js'
import {
    Form,
    Input,
    Select,
    Progress,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
let strongth = data.strongth[0].value;
let strongthnow = data.strongth[0].text;
let strongthcolor = data.strongth[0].color;
let strongthshow = data.display[1].show;
let passwordTest = data.display[1].show;
let phoneTest = data.display[1].show;
let companyname = data.display[1].show;


export  default class Register extends React.Component {

    state={
        codeShow:"block",
        postcodeshow : 'none',
    }
    handleBlurname = (e) => {
        this.setState({
            detailShow: 'block',
            name: e.target.value,
        })
        console.log(e.target.value)
        strongthshow = data.display[1].show;
        if (!e.target.value) {
            companyname = data.display[0].show;
        }

    }
    handleBlur = (e) => {
        this.setState({
            password: e.target.value
        })
        console.log(e.target.value)
        strongthshow = data.display[1].show;
    }
    handleBlurPassword = (e) => {
        // const form = this.props.form;
        this.setState({
            detailShow: 'block',
        })
        console.log(this.props)
        let value = e.target.value;
        strongthshow = data.display[0].show;
        if (value.length < 6) {
            strongth = data.strongth[0].value
            strongthcolor = data.strongth[0].color;
            strongthnow = data.strongth[0].text;
        } else if (value.length >= 6 && value.length < 11) {
            strongth = data.strongth[1].value
            strongthcolor = data.strongth[1].color;
            strongthnow = data.strongth[1].text;
        } else {
            strongth = data.strongth[2].value
            strongthcolor = data.strongth[2].color;
            strongthnow = data.strongth[2].text;
        }
    }
    handleBlurPasswordConfirm = (e) => {
        // const form = this.props.form;
        this.setState({
            PasswordConfirm: e.target.value,
        })
        let value = e.target.value
        console.log(this.state)
        if (this.state && value !== this.state.password) {
            passwordTest = data.display[0].show;
        } else {
            passwordTest = data.display[1].show;
        }

    }
    selectPhone = (e) => {
        this.setState({
            select_phone: e,
        })
    }
    phoneNumber = (e) => {
        this.setState({
            phone_number: e.target.value,
        })
        let value = e.target.value
        if (this.state && !(/^1[34578]\d{9}$/.test(value))) {
            phoneTest = data.display[0].show;
        } else {
            phoneTest = data.display[1].show;
        }
    }
    verificationCode = (e) => {
        this.setState({
            verification_code: e.target.value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            detailShow: 'block',
            
        })
        console.log(this.state)
        // if (this.state.name !== "" || this.state.password.length > 6 == "null") {
        //     alert(data.password[5].text + this.state.name + this.state.password + this.state.name + this.state.PasswordConfirm + this.state.phone_number + this.state.verification_code)
        // }
    }
    // postverificationCode =(e)=>{
        
    //     let params={

    //     }
      
    //   let url='api/kaptcha/render'  
    //   api.get(url, params,
    //     (res) => {          
    //       let rows = res
    //       console.log(this.state)
    //       console.log(res)
    //       this.setState({
    //         postcode:rows,
    //         postcodeshow:"block",
    //         codeShow:"none",
    //       }) 
          
    //     },
    //     (err) => {
    //       console.log("failed" + err)
    //     }
    //   );
    // }

    upDateCode = () => {
        const url = api.basepath+'/api/kaptcha/render';
        var img = document.getElementById('code');
        img.src=url;
    }

    render() {
        

        return (
            <div className="registerBox">
                <h1>电力交易平台</h1>
                <p>国内首家基于区块链技术的电力交易平台</p>
                <form onSubmit={this.handleSubmit} className={`form`}>
                    <div className={`form_b`}>注册</div>
                    <FormItem >
                        <Input className={`company`} key="name" placeholder="请输入公司名称" id="name"
                               onChange={this.handleBlurname}
                        />
                        <h4 htmlFor="" style={{display: companyname, color: "red"}}>{"请输入正确的公司名称"}</h4>
                    </FormItem>
                    <FormItem>
                        <Input className={`company`} key="password" placeholder="请输入6-16位密码,区别大小写" type="password"
                               maxLength="16"
                               onChange={this.handleBlurPassword}
                               onBlur={this.handleBlur}
                        />
                    </FormItem>
                    <FormItem>
                        <Input className={`company`} key="confirmPassword" placeholder="确认密码" type="password"
                               maxLength="16"
                               onChange={this.handleBlurPasswordConfirm}
                        />
                        <h4 htmlFor="" style={{display: passwordTest, color: "red"}}>{"两次密码输入不一致"}</h4>
                    </FormItem>
                    <FormItem>
                        <Select style={{width: "20%", float: "left", height: "40px"}} onChange={this.selectPhone}
                                defaultValue="+86" className="selectStyle">
                            <Option value="86" selected="selected">+86</Option>
                            <Option value="87">+87</Option>
                        </Select>
                        <Input addonBefore={""} style={{width: '80%', float: "left"}} placeholder="输入手机号"
                               onChange={this.phoneNumber}
                        />
                    </FormItem>
                    <h4 htmlFor="" style={{display: phoneTest, color: "red"}} className="maeginh4">{"手机号格式不正确"}</h4>
                    <FormItem>
                        <Input className={`company`} key="verificationCode" style={{width: '60%', float: "left"}}
                               placeholder="输入验证码" onChange={this.verificationCode}/>
                        {/* <Input  key="submit" placeholder="获取验证码" type="button" value="获取验证码"
                               style={{width: '35%', float: "left",display:this.state.codeShow}} className={`maeginButton`}
                               onClick={this.postverificationCode}
                               /> */}
                               {/* <div style={{display:this.state.postcodeshow}}> {this.state.postcode}</div> */}
                               <img src={api.basepath+"/api/kaptcha/render"} alt="验证码" style={{width: '35%', float: "right",margin:"2px 0"}} id="code" onClick={this.upDateCode}  />
                    </FormItem>
                    <FormItem>
                        <Input  key="submit" placeholder="获取验证码" type="submit" value="注册"
                               style={{width: '35%', float: "left"}} className={`submitButton`}
                               />
                        <a htmlFor="" style={{color: "#1890ff"}}
                           className="Existingaccount" onClick={() => {this.props.history.push(`/login`)}}>{"使用已有账号登录"}</a>
                    </FormItem>

                    <div className="Strength" style={{display: strongthshow}}>
                        <b style={{color: strongthcolor}}>{strongthnow}</b>
                        <Progress percent={strongth} showInfo={false}/>
                        <h4>{data.text}</h4>
                    </div>
                </form>
                <p className="reglisterBottom">
                    <a>{"帮助"}</a>
                    <a>{"隐私"}</a>
                    <a>{"条款"}</a>
                </p>
                <p>
                    PowerMarket ©2018 Created by ZN Tec
                </p>
            </div>
        )
    }
}
// const mapStateToProps = (state) => {
//     return {}
// };

// const mapDispatchToProps = (dispatch) => {
//     return {};
// }