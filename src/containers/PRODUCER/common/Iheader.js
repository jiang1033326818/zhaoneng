import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Avatar, Popover } from 'antd';
import './Iheader.less';
import axios from 'axios';
const { Header } = Layout;
const url = '/api/login/info';
var basepath = 'https://www.powerchainshop.com/';
/**
 * 公共头部
 *
 * @export
 * @class Lheader
 * @extends {Component}
 */
export default class Lheader extends React.Component {
	constructor(props) {
		super();
		this.state = {
			userName: 'producer',
			//current: "index"
		}
	}
	componentDidMount() {
		this.handleGet();
	}
	// 获取用户信息
	handleGet () {
		let str = sessionStorage.obj;
		axios.get(url,{
			headers: {
				'Authorization': str
			},
			params: {
				authorization: str
			},
			baseURL: basepath,
		}).then(res => {
		if (res.data.code === 0) {
			this.setState({
				company: res.data.content.companyName,
				userName: res.data.content.username
			})
		} else {
			console.log(res,'错误信息');
		}
	})
	.catch(err=> {
		// console.log(err,'报错');
	})}
	handleClick = (e) => {
		console.log(e.key, "当前的键值")
		// state的值没变
		this.setState({
			current: e.key
		})
	}
    // 登出事件
    loginOut = () => {
        sessionStorage.removeItem('obj');
        this.props.history.push(`/producer/login`);
    }
    // 用户中心
    toCenter = () => {
        this.props.history.push(`/producer/usercenter`);
    }
    toAdduser = () => {
        this.props.history.push(`/producer/adduser`);
    }
    tocontract = () => {
        this.props.history.push(`/producer/mycontract`);
	}
	// 账号备忘
	toMemo = () => {
		this.props.history.push(`/producer/accountmemo`);
	}
    render() {
        //let menubox=this.props.history.location.pathname
        let {menubox}=this.props;
        const content = (
            <div id="popCard">
                <p onClick={this.toCenter}>个人中心</p>
                <p onClick={this.tocontract}>合同中心</p>
				<p onClick={this.toMemo}>账号备忘</p>
                <p onClick={this.toAdduser} style={{display:this.state.isAdmin===true?"block":"none"}}>添加用户</p>
                <p onClick={this.loginOut}>退出登录</p>
            </div>
		);
		const tips = (
			<div id="tipCard">
				<p>申报电量时间为每月15号,</p>
				<p>请您抓紧时间提前申报</p>
			</div>
		)
		return (
			<Header>
				<Row className="header">
					<Col span={6}>
						<div className="logo">
							<h1>电力交易平台</h1>
						</div>
					</Col>
					{/* 导航栏 */}
					<Col span={12}>
						<Menu
                            onClick={this.handleClick}
                            selectedKeys={[menubox]}
							mode="horizontal"
							style={{ lineHeight: '64px' }}
							theme="dark"
          	>
							<Menu.Item key="/producer/index"><Link to="/producer/index" />首页</Menu.Item>
							<Menu.Item key="/producer/contractmanage"><Link to="/producer/contractmanage" />合同管理</Menu.Item>
							<Menu.Item key="/producer/powermanage"><Link to="/producer/powermanage" />发电管理</Menu.Item>
							<Menu.Item key="/producer/powermarket"><Link to="/producer/powermarket" />供需信息</Menu.Item>
							<Menu.Item key="/seller/forecasting"><Link to="/producer/forecasting" />负荷预测</Menu.Item>
						</Menu>
					</Col>
					{/* 头像 */}
					<Col span={6} className="rightHeader">
						<Popover content={tips} trigger="hover">
							<Icon type="bell" style={{fontSize: 16, color: "red"}} className="Avatar" />
						</Popover>
						{/* <Icon type="search" style={{fontSize: 16, color: "#FFFFFF"}} className="Avatar" /> */}
						<Icon type="setting" style={{fontSize: 16, color: "#FFFFFF"}} className="Avatar" onClick={this.toCenter} />
						<Popover content={content} trigger="hover" arrowPointAtCenter>
							<Avatar icon="user" className="avatar1" /><span className="avatar">{this.state.userName}</span>
    				</Popover>
					</Col>
				</Row>
    	</Header>
		)
	}
}