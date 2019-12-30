import React from 'react'
import './register.less';
import 'antd/dist/antd.css';
//import data from "./register.json"
import api from '../../../api/tools.js'
import {
    Form,
    Input,
    message,
    Checkbox,
    Radio
} from 'antd';
//import loginimg from  '../../../components/icon/img.png'
const FormItem = Form.Item;
// let strongth = data.strongth[0].value;
// let strongthnow = data.strongth[0].text;
// let strongthcolor = data.strongth[0].color;
const RadioGroup = Radio.Group;

export  default class Register extends React.Component {
    componentDidMount(){

        console.log(sessionStorage)
    }

    state={
        codeShow:"block",
        postcodeshow : 'none',
        address:"",
        name:"",
        verification_code:"",
        phone_number:"",
        password:"",
        email:'',
        PasswordConfirm:'',
        passwordTest:"none",
        passwordTestone:"none",
        vercode:'none',
        companynameeml:'none',
        companynameadd:"none",
        companyname:"none",
        companyuser:"none",
        phoneTest:"none",
        strongthshow:"none",
        href:window.location.search.slice(4,window.location.search.length),
        tongyi:"false",
        value:1,
    }

    onatypeChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }


    handleBlurname = (e) => {
        this.setState({
            detailShow: 'block',
            name: e.target.value,
        })
        if (!e.target.value) {
            this.setState({
                companyname: 'block',
            })
        }else{
            this.setState({
                companyname: 'none',
            })
        }
    }

    handleBluremail = (e) => {
        this.setState({
            email: e.target.value,
        })
        if (!e.target.value || !( /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(e.target.value))) {
            this.setState({
                companynameeml: 'block',
            })
            //companynameeml = data.display[0].show;
        }else{
            this.setState({
                companynameeml: 'none',
            })
        }
    }
    handleBlur = (e) => {
        if(e.target.value || !(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/.test(e.target.value))){
            this.setState({
                passwordTestone: 'none',
            })
        }else{
            this.setState({
                passwordTestone: 'block',
            })
        }
        this.setState({
            password: e.target.value
        })
        this.setState({
            strongthshow: 'none',
        })
    }
    usernamecome =(e)=>{
        this.setState({
            usernameone: e.target.value,
        })
        localStorage.setItem("username",e.target.value)
    }
    handleBlurPassword = (e) => {
        // const form = this.props.form;
        this.setState({
            detailShow: 'block',
        })
        //let value = e.target.value;
        this.setState({
            strongthshow: 'block',
        })
        // if (value.length < 6) {
        //     strongth = data.strongth[0].value
        //     strongthcolor = data.strongth[0].color;
        //     strongthnow = data.strongth[0].text;
        // } else if (value.length >= 6 && value.length < 11) {
        //     strongth = data.strongth[1].value
        //     strongthcolor = data.strongth[1].color;
        //     strongthnow = data.strongth[1].text;
        // } else {
        //     strongth = data.strongth[2].value
        //     strongthcolor = data.strongth[2].color;
        //     strongthnow = data.strongth[2].text;
        // }
    }
    handleBlurPasswordConfirm = (e) => {
        // const form = this.props.form;
        this.setState({
            PasswordConfirm: e.target.value,
        })
        let value = e.target.value
        if (this.state && value !== this.state.password) {
            this.setState({
                passwordTest: "block",
            })

        } else {
            this.setState({
                passwordTest: "none",
            })
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
        if (!(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(value)) && !(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value))) {
            this.setState({
                phoneTest: "block",
            })

        } else {
            this.setState({
                phoneTest: "none",
            })
        }
    }
    verificationCode = (e) => {
        this.setState({
            verification_code: e.target.value,
        })
    }
    handleSubmit = (e) => {



        e.preventDefault();
        console.log(e)
        if(this.state.email ===""){
            message.warning("请输入正确的邮箱")
        }
        if(this.state.name ===""){
            message.warning("请输入公司名称")
        }
        if(this.state.phone_number ===""){
            message.warning("请输入手机号")
        }
        if(this.state.password ===""){
            message.warning("请输入包含大小写字母和数字的密码")
        }
        if(this.state.verification_code ===""){
            message.warning("请输入验证码")
        }
        if(this.state.username ===""){
            message.warning("请输入用户名")
        }


        if (this.state.name !== "" && this.state.password !=="" && this.state.email !==""  && this.state.phone_number !=="" && this.state.verification_code !==""  ) {
            //     let params={
            //     code:this.state.verification_code
            // }
            //
            // let url='/api/kaptcha/valid'
            // api.post(url, params,
            //     (res) => {
            //         console.log(res)

//   验证码验证成功后调取注册接口
            if(this.state.tongyi==="false"){
                message.warning("请先同意声明条款")
            } else{
                let headers={
                    //Domain_Name:this.state.href,
                    'Authorization': sessionStorage.obj,
                }
                let params2={
                    captcha:this.state.verification_code,
                    confirmPassword: this.state.PasswordConfirm,
                    companyEmail: this.state.email,
                    username: this.state.usernameone,
                    companyName: this.state.name,
                    companyPhone: this.state.phone_number,
                    password: this.state.password,
                }
                if(this.state.value===1){
                    let url2='api/register/seller'
                    api.post(url2, headers,params2,
                        (res) => {
                            console.log(res.message)
                            message.success('注册成功');
                            this.setState({

                            })
                            this.props.history.push(`/Success`)
                        },
                        (err) => {
                            console.log(err.response.data)
                            //console.log(res)
                            message.warning(err);
                            this.upDateCode();
                        }
                    );
                } else if(this.state.value===2){
                    let url2='api/register/customer'
                    api.post(url2, headers,params2,
                        (res) => {
                            console.log(res.message)
                            message.success('注册成功');
                            this.setState({

                            })
                            this.props.history.push(`/success`)
                        },
                        (err) => {
                            console.log(err.response.data)
                            //console.log(res)
                            message.warning(err);
                            this.upDateCode();
                        }
                    );
                }else{
                    message.success('功能开发中');
                }


            }


        }

        if(this.state.name===""){
            // alert("到这啦")

            this.setState({
                companyname: "block",
            })
            console.log(this.state)
        }
        if(this.state.email==='none'){
            this.setState({
                companynameeml: "block",
            })
        }
        if(this.state.address==='none'){
            this.setState({
                companynameadd: "block",
            })
        }
        if(this.state.phone_number==='none'){
            this.setState({
                phoneTest: "block",
            })
        }
    }




    upDateCode = () => {
        const url = api.basepath+"/api/kaptcha/render";
        // const url = window.location.origin+"/api/kaptcha/render";
        var img = document.getElementById('code');
        img.src=url;
    }

    tongyi =(e) =>{
        console.log(`${e.target.checked}`);
        if(`${e.target.checked}`==="true"){
            this.setState({
                tongyi: true,
            })
        }else{
            this.setState({
                tongyi: "false",
            })
        }
    }

    render() {


        return (
            <div className={`login_ant_row`}>
                <div className={`loginimg`}>
                    

                </div>
            <div className="registerBox">
                <h1>电力交易平台</h1>
                <p className={`magintop50`}>国内首家基于区块链技术的电力交易平台</p>
                <h4 className={`titletext`}>用户注册</h4>


                <form onSubmit={this.handleSubmit} className={`form`}>
                    {/* <div className={`form_b`}>发电厂注册</div> */}


                    {/* <FormItem >
                    <RadioGroup name="radiogroup" defaultValue={"SALER"} style={{margin: "0  0"}} onChange={this.yongdianType}>
                                                    <Radio value={"SALER"}>售电用户</Radio>
                                                    <Radio value={"BUYER"} style={{margin:"0 70px"}}>用电用户</Radio>
                                                </RadioGroup>
                        <h4 htmlFor="" style={{display: companynameatt, color: "red"}}>{"请选择您的公司属性"}</h4>
                    </FormItem> */}
                    <FormItem className={`inputbox`}>
                    <span>请选择公司类型:</span>
                    <RadioGroup onChange={this.onatypeChange} value={this.state.value} style={{height:"auto"}}>
                        <Radio value={1}>售电用户</Radio>
                        <Radio disabled value={2}>用电用户</Radio>
                        <Radio disabled value={3}>发电用户</Radio>
                    </RadioGroup>
                    </FormItem>

                    <FormItem className={`inputbox`}>
                        <Input className={`company`} key="name" placeholder="请输入公司名称" id="name"
                               onChange={this.handleBlurname}
                        />
                        <h4 htmlFor="" style={{display: this.state.companyname, color: "red"}}>{"请输入正确的公司名称"}</h4>
                    </FormItem>
                    {/*<FormItem >*/}
                    {/*<Input className={`company`} key="name" placeholder="请输入公司地址"*/}
                    {/*onChange={this.handleBluraddress}*/}
                    {/*/>*/}
                    {/*<h4 htmlFor="" style={{display: this.state.companynameadd, color: "red"}}>{"请输入正确的公司地址"}</h4>*/}
                    {/*</FormItem>*/}
                    <FormItem className={`inputbox`}>
                        <Input className={`company`} key="name" placeholder="请输入公司邮箱"
                               onChange={this.handleBluremail}
                        />
                        <h4 htmlFor="" style={{display: this.state.companynameeml, color: "red"}}>{"请输入正确的公司邮箱"}</h4>
                    </FormItem>
                    <FormItem className={`inputbox`}>
                        <Input className={`company`} key="name" placeholder="请输入公司电话"
                               onChange={this.phoneNumber}
                        />
                        <h4 htmlFor="" style={{display: this.state.phoneTest, color: "red"}} className="maeginh4">{"请输入正确的公司电话"}</h4>
                    </FormItem>
                    <FormItem className={`inputbox`}>
                        <Input className={`company`} key="name" placeholder="请输入用户名"
                               onChange={this.usernamecome}
                        />
                        <h4 htmlFor="" style={{display: this.state.companyuser, color: "red"}}>{"请输入正确的用户名"}</h4>
                    </FormItem>
                    <FormItem className={`inputbox`}>
                        <Input className={`company`} key="password" placeholder="请输入包含数字和大小写字母的密码" type="password"
                               maxLength="16"
                               onChange={this.handleBlurPassword}
                               onBlur={this.handleBlur}
                        />
                        <h4 htmlFor="" style={{display: this.state.passwordTestone, color: "red"}}>{"密码要包含大小写字母和数字"}</h4>
                    </FormItem>
                    <FormItem className={`inputbox`}>
                        <Input className={`company`} key="confirmPassword" placeholder="确认密码" type="password"
                               maxLength="16"
                               onChange={this.handleBlurPasswordConfirm}
                        />
                        <h4 htmlFor="" style={{display: this.state.passwordTest, color: "red"}}>{"两次密码输入不一致"}</h4>
                    </FormItem>
                    {/* <FormItem>
                        <Select style={{width: "20%", float: "left", height: "40px"}} onChange={this.selectPhone}
                                defaultValue="+86" className="selectStyle">
                            <Option value="86" selected="selected">+86</Option>
                            <Option value="87">+87</Option>
                        </Select>
                        <Input addonBefore={""} style={{width: '80%', float: "left"}} placeholder="输入手机号"
                               onChange={this.phoneNumber}
                        />
                    </FormItem>
                    <h4 htmlFor="" style={{display: phoneTest, color: "red"}} className="maeginh4">{"手机号格式不正确"}</h4> */}
                    <FormItem className={`inputbox`}>
                        <Input className={`company`} key="verificationCode" style={{width: '60%', float: "left"}}
                               placeholder="输入验证码" onBlur={this.verificationCode}/>
                        {/* <Input  key="submit" placeholder="获取验证码" type="button" value="获取验证码"
                               style={{width: '35%', float: "left",display:this.state.codeShow}} className={`maeginButton`}
                               onClick={this.postverificationCode}
                               /> */}
                        {/* <div style={{display:this.state.postcodeshow}}> {this.state.postcode}</div> */}




                        <img src={api.basepath+"/api/kaptcha/render"}  alt="验证码" style={{width: '35%', height:"35px", float: "right",margin:"2px 0"}} id="code" onClick={this.upDateCode}  />
                        {/*<img src={window.location.origin+"/api/kaptcha/render"}  alt="验证码" style={{width: '35%', height:"35px", float: "right",margin:"2px 0"}} id="code" onClick={this.upDateCode}  />*/}


                    </FormItem>
                    <h4 htmlFor="" style={{display: this.state.vercode, color: "red"}}>{"验证码错误"}</h4>
                    <FormItem className={`inputbox`}>
                        <Input  key="submit"  type="submit" value="注册"
                                style={{width: '100%', float: "left"}} className={`submitButton`}
                        />

                        <a htmlFor=""
                           style={{color: "#1890ff"}}
                           onClick={() => {this.props.history.push(`/login`)}}
                        >我要登录</a>
                    </FormItem>
                    <div className={`tongyi`}>
                        <Checkbox onChange={this.tongyi} style={{color:"blue"}} className={`tongyi2`}>{"我同意《兆能科技法律声明和隐私权政策》"}</Checkbox>
                    </div>

                    {/*<div className="Strength" style={{display: this.state.strongthshow}}>*/}
                        {/*<b style={{color: strongthcolor}}>{strongthnow}</b>*/}
                        {/*<Progress percent={strongth} showInfo={false}/>*/}
                        {/*<h4>{data.text}</h4>*/}
                    {/*</div>*/}
                </form>
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
            </div>
        )
    }
}
