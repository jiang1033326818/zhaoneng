import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Row, Col, Avatar, Popover } from 'antd';
import './Iheader.less';
import api from "../../../api/tools";
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

/**
 * 公共头部
 *
 * @export
 * @class Lheader
 * @extends {Component}
 */
export default class Lheader extends React.Component {

	state = {
		userName: '',
		current: 'index',
        isAdmin:true
	}
	componentDidMount() {
		this.handleGet();
	}
	// 获取用户信息
	handleGet () {
        let headers = {
            'Authorization': sessionStorage.obj,
        }
        let params = {};
        let url = '/api/login/info'
        api.get(url, headers, params,
            (res) => {
				console.log(res,'用户信息');
                this.setState({
                    company: res.content.companyName,
                    userName: res.content.username,
                    roleCode: res.content.roleCode
                })

                sessionStorage.company = res.content.companyName;
                sessionStorage.userName = res.content.username;
				sessionStorage.userId = res.content.id;
				sessionStorage.companyId = res.content.companyId;
            },
            (err) => {
                console.log("failed" + err)
            }
        );
	}
	handleClick = (e) => {
		this.setState({
			current: e.key
		})
		console.log(this.props)
	}
	// 登出事件
        loginOut = () => {
            sessionStorage.removeItem('obj');
            this.props.history.push(`/login`);
        }
        // 用户中心
        toCenter = () => {
            this.props.history.push(`/seller/usercenter`);
        }
        toAdduser = () => {
            this.props.history.push(`/seller/adduser`);
        }
        tocontract = () => {
            this.props.history.push(`/seller/mycontract`);
		}
		// 账号备忘
		toMemo = () => {
			this.props.history.push(`/seller/accountmemo`);
		}
		// 到交易中心
		toTrade = () => {
			this.props.history.push(`/seller/useradmin`);
		}
        render() {
            //let menubox=this.props.history.location.pathname
            let {menubox}=this.props;
            const content = (
                <div id="popCard">
                    <p onClick={this.toCenter}>用户中心</p>
										<p onClick={this.toAdduser} style={{display:this.state.roleCode==="admin"?"block":"none"}}>用户管理</p>
                    {/*<p onClick={this.tocontract}>合同中心</p>*/}
										{/* <p onClick={this.toMemo}>交易中心账号管理</p> */}
										{/*<p onClick={this.toTrade}>客户管理</p>*/}
                    <p onClick={this.loginOut}>退出登录</p>
                </div>
			);
			const tips = (
				<div id="tipCard">
          {/*<p>申报电量时间为每月15号,</p>*/}
					{/*<p>请您抓紧时间提前申报</p>*/}
					<p>暂无紧急通知</p>
        </div>
			)
		// const { current } = this.state;
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
							className="menuIte"
          	>
							<Menu.Item key="/seller/index"><Link to="/seller/index" />首页</Menu.Item>

							 <SubMenu title={<span>售电业务</span>}>

								<MenuItemGroup title={"用电申报"}>
                                    <Menu.Item key="/seller/powerplan"><Link to="/seller/powerplan" />发布用电计划</Menu.Item>
                                    <Menu.Item key="/seller/statistics"><Link to="/seller/statistics" />年度用电申报</Menu.Item>
                                    <Menu.Item key="/seller/monthstatistics"><Link to="/seller/monthstatistics" />月度用电申报</Menu.Item>
								</MenuItemGroup>
                                 <Menu.Item key="/seller/buypower"><Link to="/seller/buypower" />购电管理</Menu.Item>
                                 <Menu.Item key="/seller/decompose"><Link to="/seller/decompose" />电量分解</Menu.Item>

                                 {/*<MenuItemGroup title={"月度竞价"}>*/}

                                     {/*<Menu.Item key="/seller/monthyear"><Link to="/seller/monthyear" />月度统计</Menu.Item>*/}
                                 {/*</MenuItemGroup>*/}
							</SubMenu>
							{/*<SubMenu title={<span>合同管理</span>}>*/}
								{/*<MenuItemGroup title="长期协议">*/}
									{/*<Menu.Item key="/seller/contractmanage"><Link to="/seller/contractmanage" />长期协议合同</Menu.Item>*/}
									{/*<Menu.Item key="/seller/yearcontract"><Link to="/seller/yearcontract" />长协统计</Menu.Item>*/}
								{/*</MenuItemGroup>*/}
								{/*<MenuItemGroup title="月度竞价">*/}
									{/*<Menu.Item key="/seller/biddingcontract"><Link to="/seller/biddingcontract" />月度竞价合同</Menu.Item>*/}
									{/*<Menu.Item key="/seller/yearbidding"><Link to="/seller/yearbidding" />月竞统计</Menu.Item>*/}
								{/*</MenuItemGroup>*/}
							{/*</SubMenu>*/}

							<Menu.Item key="/seller/forecasting"><Link to="/seller/forecasting" />负荷预测</Menu.Item>
							<SubMenu title={<span>结算管理</span>}>
								{/*<Menu.Item key="/seller/settle"><Link to="/seller/settle" />结算单录入</Menu.Item>*/}
								<Menu.Item key="/seller/statements"><Link to="/seller/statements" />电费管理</Menu.Item>
								{/*<Menu.Item key="/seller/settle"><Link to="/seller/settle" />收入预测</Menu.Item>*/}
								{/*<Menu.Item key="/seller/monthstatistics"><Link to="/seller/monthstatistics" />偏差考核</Menu.Item>*/}
							</SubMenu>
                            <SubMenu title={<span>客户管理</span>}>
                                <Menu.Item key="/seller/useradmin"><Link to="/seller/useradmin" />客户数据导入</Menu.Item>
                                <Menu.Item key="/seller/customeradmin"><Link to="/seller/customeradmin" />客户管理</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="/seller/powercollection"><Link to="/seller/powercollection" />用电管理</Menu.Item>
						</Menu>
					</Col>
					{/* 头像 */}
					<Col span={6} className="rightHeader">
						<Popover content={tips} trigger="hover">
							<Icon type="bell" style={{fontSize: 16, color: "red"}} className="Avatar" />
						</Popover>
						{/* <Icon type="search" style={{fontSize: 16, color: "#FFFFFF"}} className="Avatar" /> */}
						{/*<Icon type="setting" style={{fontSize: 16, color: "#FFFFFF"}} className="Avatar" onClick={this.toAdduser} />*/}

						<Popover content={content} trigger="hover">
							<Avatar icon="user" className="avatar1" /><span className="avatar">{this.state.userName}</span>
    					</Popover>
					</Col>
				</Row>
    	</Header>
		)
	}
}