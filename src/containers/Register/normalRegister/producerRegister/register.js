import React from 'react'
import './register.less';
import 'antd/dist/antd.css';
import data from "./register.json"
import api from '../../../../api/tools.js'
import {
    Form,
    Input,
    Progress,
    message,
    Checkbox
} from 'antd';
const FormItem = Form.Item;
let strongth = data.strongth[0].value;
let strongthnow = data.strongth[0].text;
let strongthcolor = data.strongth[0].color;





export  default class Register extends React.Component {
    componentDidMount(){

        console.log(this.state)
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
        let value = e.target.value;
        this.setState({
            strongthshow: 'block',
        })
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
            let headers={
                Domain_Name:this.state.href
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
            console.log(params2)
            let url2='api/register/producer'
            api.post(url2, headers,params2,
                (res) => {
                    console.log(res.message)
                    message.success('注册成功');
                    this.setState({

                    })
                    this.props.history.push(`/producer/success`)

                },
                (err) => {
                    console.log(err.response.data)
                    //console.log(res)
                    message.warning(err);
                }
            );

        }
        if(this.state.tongyi==="false"){
            message.warning("请先同意声明条款")
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




    postverificationCode =(e)=>{

        let params={

        }

        let url='api/kaptcha/render'
        api.get(url, params,
            (res) => {
                let rows = res
                console.log(this.state)
                console.log(res)
                this.setState({
                    postcode:rows,
                    postcodeshow:"block",
                    codeShow:"none",
                })

            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    upDateCode = () => {
        const url = api.basepath+"/api/kaptcha/render";
        //const url = window.location.origin+"/api/kaptcha/render";
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
            <div className="registerBox">
                <h1>电力交易平台</h1>
                <p>国内首家基于区块链技术的电力交易平台</p>
                <form onSubmit={this.handleSubmit} className={`form`}>
                    {/* <div className={`form_b`}>发电厂注册</div> */}


                    {/* <FormItem >
                    <RadioGroup name="radiogroup" defaultValue={"SALER"} style={{margin: "0  0"}} onChange={this.yongdianType}>
                                                    <Radio value={"SALER"}>售电用户</Radio>
                                                    <Radio value={"BUYER"} style={{margin:"0 70px"}}>用电用户</Radio>
                                                </RadioGroup>
                        <h4 htmlFor="" style={{display: companynameatt, color: "red"}}>{"请选择您的公司属性"}</h4>
                    </FormItem> */}

                    <FormItem >
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
                    <FormItem >
                        <Input className={`company`} key="name" placeholder="请输入公司邮箱"
                               onChange={this.handleBluremail}
                        />
                        <h4 htmlFor="" style={{display: this.state.companynameeml, color: "red"}}>{"请输入正确的公司邮箱"}</h4>
                    </FormItem>
                    <FormItem >
                        <Input className={`company`} key="name" placeholder="请输入公司电话"
                               onChange={this.phoneNumber}
                        />
                        <h4 htmlFor="" style={{display: this.state.phoneTest, color: "red"}} className="maeginh4">{"请输入正确的公司电话"}</h4>
                    </FormItem>
                    <FormItem >
                        <Input className={`company`} key="name" placeholder="请输入用户名"
                               onChange={this.usernamecome}
                        />
                        <h4 htmlFor="" style={{display: this.state.companyuser, color: "red"}}>{"请输入正确的用户名"}</h4>
                    </FormItem>
                    <FormItem>
                        <Input className={`company`} key="password" placeholder="请输入包含数字和大小写字母的密码" type="password"
                               maxLength="16"
                               onChange={this.handleBlurPassword}
                               onBlur={this.handleBlur}
                        />
                        <h4 htmlFor="" style={{display: this.state.passwordTestone, color: "red"}}>{"密码要包含大小写字母和数字"}</h4>
                    </FormItem>
                    <FormItem>
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
                    <FormItem>
                        <Input className={`company`} key="verificationCode" style={{width: '60%', float: "left"}}
                               placeholder="输入验证码" onChange={this.verificationCode}/>
                        {/* <Input  key="submit" placeholder="获取验证码" type="button" value="获取验证码"
                               style={{width: '35%', float: "left",display:this.state.codeShow}} className={`maeginButton`}
                               onClick={this.postverificationCode}
                               /> */}
                        {/* <div style={{display:this.state.postcodeshow}}> {this.state.postcode}</div> */}

                        <img src={api.basepath+"/api/kaptcha/render"}  alt="验证码" style={{width: '35%', height:"35px", float: "right",margin:"2px 0"}} id="code" onClick={this.upDateCode}  />
                        {/*<img src={window.location.origin+"/api/kaptcha/render"}  alt="验证码" style={{width: '35%', height:"35px", float: "right",margin:"2px 0"}} id="code" onClick={this.upDateCode}  />*/}



                    </FormItem>
                    <h4 htmlFor="" style={{display: this.state.vercode, color: "red"}}>{"验证码错误"}</h4>
                    <FormItem>
                        <Input  key="submit" placeholder="获取验证码" type="submit" value="注册"
                                style={{width: '100%', float: "left"}} className={`submitButton`}
                        />

                        {/*<a htmlFor="" style={{color: "#1890ff"}}*/}
                        {/*className="Existingaccount" onClick={() => {this.props.history.push(`/login`)}}>{"使用已有账号登录"}</a>*/}
                    </FormItem>
                    <div className={`tongyi`}>
                        <Checkbox onChange={this.tongyi} style={{color:"blue"}} className={`tongyi2`}>{"我同意《兆能科技法律声明和隐私权政策》"}</Checkbox>
                    </div>

                    <div className="Strength" style={{display: this.state.strongthshow}}>
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
                <p style={{ textAlign: 'center' }}>
					<p>北京兆信通能科技有限公司 版权所有Copyright © 2018</p>
					<p>京ICP备  18034505号</p>
                </p>
            </div>
        )
    }
}
