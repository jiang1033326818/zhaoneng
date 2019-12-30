import React from 'react'
import './register.less';
import 'antd/dist/antd.css';
import {Icon,Button} from 'antd';


export  default class Success extends React.Component {
    state={
        reciprocal:"5"
    }

    selectpriceDate =()=>{
        if(this.state.reciprocal>1){
            this.setState({
                reciprocal: this.state.reciprocal-1,
            })
        }else{
            this.props.history.push(`/customer/login`)
        }
    }


    componentDidMount() {
        this.interval = setInterval(() => this.selectpriceDate(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }



    render() {



        return (
            <div className="successBox">
                <h1>电力交易平台</h1>
                <p>国内首家基于区块链技术的电力交易平台</p>
                <div className={`success`}>
                    <Icon type="check-circle" style={{color:"#52c41a"}} className={`bigicon`} />
                    <h3>{"你的账户:"} <span>{localStorage.getItem("username")}</span>{"注册成功"}</h3>
                    <p>{"激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"}</p>
                    <p> <span>{this.state.reciprocal}</span> {"秒后返回主页"}</p>
                    <Button type="primary" size="large"  onClick={() => {this.props.history.push(`/customer/login`)}}>{"返回首页"}</Button>
                </div>
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
