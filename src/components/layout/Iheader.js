import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Avatar, Popover } from 'antd';
const SubMenu = Menu.SubMenu;
const { Header } = Layout;
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
			userName: '',
			current: "index"
		}
	}
	handleClick = (e) => {
		this.setState({
			current: e.key
		})
	}
	loginOut = () => {
		sessionStorage.removeItem('obj');
		console.log('1',this.props);
		this.props.history.push(`/normallogin`);
	}
	render() {
		const content = (
			<div id="popCard">
				<p>用户中心</p>
				<p onClick={this.loginOut}>退出登录</p>
			</div>
		);
		return (
			<Header>
				<Row className="header">
					<Col span={8}>
						<div className="logo">
							<h1>电力交易平台</h1>
						</div>
					</Col>
					{/* 导航栏 */}
					<Col span={8}>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.current]}
							mode="horizontal"
							style={{ lineHeight: '64px' }}
							theme="dark"
          	>
							<Menu.Item key="index">
								<Link to="/index" />
								首页
							</Menu.Item>
							<SubMenu title={<span>电力交易</span>}>
									{/* <Menu.Item key="powermanage"><Link to="/powermanage" />用电管理</Menu.Item> */}
									<Menu.Item key="contractmanage"><Link to="/contractmanage" />合同管理</Menu.Item>
									<Menu.Item key="pointcount"><Link to="/powermarket" />集中竞价</Menu.Item>
							</SubMenu>
							<Menu.Item key="feecount">
								电费计算
							</Menu.Item>
						</Menu>
					</Col>
					{/* 头像 */}
					<Col span={8} className="rightHeader">
						<Icon type="bell" style={{fontSize: 16, color: "#FFFFFF"}} className="Avatar" />
						<Icon type="search" style={{fontSize: 16, color: "#FFFFFF"}} className="Avatar" />
						<Icon type="setting" style={{fontSize: 16, color: "#FFFFFF"}} className="Avatar" />
						<Popover content={content} trigger="hover">
							<Avatar icon="user" className="Avatar" /><span className="avatar">{this.state.userName}</span>
    				</Popover>
					</Col>
				</Row>
    	</Header>
		)
	}
}