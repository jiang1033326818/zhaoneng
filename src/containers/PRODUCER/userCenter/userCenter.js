import React from 'react';
import { Layout, Breadcrumb, Row, Col, Icon, Button  } from 'antd';
import './userCenter.less';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import Shield from '../../../components/icon/Shield.png';
import Battery from '../../../components/icon/Battery.png';
import axios from 'axios';
const { Content } = Layout;
const url = '/api/login/info';
var basepath = 'https://www.powerchainshop.com/';
export  default class userCenter extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'first',
			userName: '小顽童',
			location: '用户中心',
			company: '北京市小和尚有限公司',
			message: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！',
			userStatus: 'nocomplete',
			userTipsMessage: '电力交易需要完善企业资质信息资料备案和授权代理关系，请点击下方按钮，完善信息。'
		}
	}
componentDidMount() {
	this.handleGet();
}
// 获取当前的用户信息
handleGet = () => {
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
			sessionStorage.company = res.data.content.companyName;
			sessionStorage.userName = res.data.content.username;
		} else {      
			console.log(res,'错误信息');
		}
	})
	.catch(err=> {
		// console.log(err,'报错');
})}
render() {
	const { location, userName, company, message, userStatus, userTipsMessage  } = this.state;
  return (
    <Layout className="userCenterlayout">
			{/* 头部header */}
				<Lheader history={this.props.history}></Lheader>
    		<Content style={{ padding: '0 50px' }}>
					{/* 面包屑 */}
					<Row>
						<Col span={16}>
							<Breadcrumb style={{ margin: '16px 0' }}>
								<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="userCenterlocation">{location}</Breadcrumb.Item>
							</Breadcrumb>
						</Col>
					</Row>
					{/* 内容 */}
      			<div style={{ background: '#fff', padding: 24, minHeight: 762 }} className="userCentercontent">
							<Row className="topOne">
								<Col span={8}>
									<span className="welcome">欢迎</span>
									<span className="userName">{company}</span>
								</Col>
								<Col span={16}>
									<Row>
										<div className="companyNameOnes">
											{company}
										</div>
									</Row>
									<Row>
										<div className="iconGroups">
											<img src={Battery} alt="" style={{display:"bolck"}} className="icon-one" />                      
											<img src={Shield} alt="" style={{display:"bolck"}} className="icon-two" />
										</div>
									</Row>
								</Col>
							</Row>
							<Row className="floorArea">
								<div>
									<span className="broad">系统公告:</span>
									<span className="message">{message}</span>
								</div>
							</Row>
							<Row className="middle">
								<Row className="iconHead">
									<Col span={8} offset={8}>
										{
											userStatus==='nocomplete'? <Icon type="exclamation-circle" className="iconItem" /> : <Icon type="check-circle" className="iconItemCheck" />
										}
									</Col>
								</Row>
								<Row className="tipHead">
									<Col span={8} offset={8}>
										<p className="tipItem">{userStatus==='nocomplete'? '尚未完善资料':'资料已完善' }</p>
									</Col>
								</Row>
								{
									userStatus==='nocomplete'? 
									<Row>	
										<Row className="tipsMessage">
											<Col span={8} offset={8}>
												<p className="messageItem">{userTipsMessage}</p>
											</Col>
										</Row>
										<Row className="messageBtn">
											<Col span={8} offset={8}>
											<Button type="primary" className="msgBtn" onClick={()=>{this.props.history.push(`/producer/completeinfo`)}}>完善资料</Button>
											</Col>
										</Row>
									</Row> : ''
								}
							</Row>
						</div>
    			</Content>
    		<Lfooter></Lfooter>
  		</Layout>
    )
  }
}