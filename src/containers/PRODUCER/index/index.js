import React from 'react';
import { Layout, Breadcrumb, Row, Col, Card, Divider  } from 'antd';
import './index.less';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import Shield from '../../../components/icon/Shield.png';
import Battery from '../../../components/icon/Battery.png';
import Pcharts from './chart/payChart.js';
import Ccharts from './chart/chargeChart.js';
import Rcharts from './chart/priceChart.js';
import Tcharts from './chart/countChart.js';
import Fcharts from './chart/currentCrops.js';
import Wcharts from './chart/currentPower.js';
import Zcharts from './chart/commonTime.js';
import Mcharts from './chart/commonCrops.js';
import axios from 'axios';
const { Content } = Layout;
const url = '/api/login/info';
var basepath = 'https://www.powerchainshop.com/';
export  default class Index extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'first',
			userName: '',
			location: '首页',
			company: '',
			message1: '广东省广州市***集团，2019年度购电1000MW',
			message2: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！'
		}
	}
	componentDidMount() {
		this.handleGet();
	}
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
			sessionStorage.company = res.data.content.companyName;
			sessionStorage.userName = res.data.content.username;
			sessionStorage.userId = res.data.content.id;
		} else {      
			console.log(res,'错误信息');
		}
	})
	.catch(err=> {
		// console.log(err,'报错');
	})}
    render() {
        return (
            <Layout className="layout">
						{/* 头部header */}
						<Lheader history={this.props.history} menubox={"/producer/index"}></Lheader>
    					<Content style={{ padding: '0 50px' }}>
							{/* 面包屑 */}
							<Row>
								<Col span={16}>
									<Breadcrumb style={{ margin: '16px 0' }}>
									<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
									</Breadcrumb>
								</Col>
							</Row>
							{/* 内容 */}
      					<div style={{ background: '#fff', padding: 24, minHeight: 1100}} className="content">
									<Row className="topOne">
										<Col span={8}>
											<span className="welcome">欢迎</span>
											<span className="userName">{this.state.company}</span>
										</Col>
										<Col span={16}>
											<Row>
												<div className="companyNameOnes">
													{this.state.company}
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
									<Row className="middle">
										<Col span="24">
											<div className="left">
												<Row>
													<Col span={8}>
														<Card title="全年计划发电量" bordered={false} className="cardChart">
															<Col span="12">
																<p className="shuangBian"><span>240000</span></p>
																<Rcharts style={{width:"100%",height:'auto'}} className="barChart"></Rcharts>
															</Col>
															<Col span="12">
																<div className="chart">
																	<p className="danWei">单位:<span>万千瓦时</span></p>
																</div>
															</Col>
														</Card>
													</Col>
													<Col span={8}>
														<Card title="已发电量" bordered={false} className="cardChart">
															<Col span="12">
																<p className="shuangBian"><span>127000</span></p>
																<Wcharts style={{width:"100%",height:'auto'}} className="barChart"></Wcharts>
															</Col>
															<Col span="12">
																<div className="chart">
																	<p className="danWei">单位:<span>万千瓦时</span></p>
																</div>
															</Col>
														</Card>
													</Col>
													<Col span={8}>
														<Card title="合约类型" bordered={false} className="cardChart">
															<Col span="12">
																<p className="shuangBianPie">双边<span>78%</span></p>
																<p className="jingJiaPie">竞价<span>22%</span></p>
															</Col>
															<Col span="12">
																<div className="chart">
																	<Ccharts style={{width:"100%",height:'auto'}} className="pieChart"></Ccharts>
																</div>
															</Col>
														</Card>
													</Col>
												</Row>
												<Row> 
													<Col span={8}>
														<Card title="全年计划发电收入" bordered={false} className="cardChart">
															<Col span="12">
																<p className="shuangBian"><span>12000</span></p>
																<Tcharts style={{width:"100%",height:'auto'}} className="barChart"></Tcharts>
															</Col>
															<Col span="12">
																<div className="chart">
																	<p className="danWei">单位:<span>万元</span></p>
																</div>
															</Col>
														</Card>
													</Col>
													<Col span={8}>
														<Card title="累计发电收入" bordered={false} className="cardChart">
															<Col span="12">
																<p className="shuangBian"><span>6350</span></p>
																<Fcharts style={{width:"100%",height:'auto'}} className="barChart"></Fcharts>
															</Col>
															<Col span="12">
																<div className="chart">
																	<p className="danWei">单位:<span>万元</span></p>
																</div>
															</Col>
														</Card>
													</Col>
													<Col span={8}>
														<Card title="收入占比" bordered={false} className="cardChart">
															<Col span="12">
																<p className="shuangBianPie">双边<span>78%</span></p>
																<p className="jingJiaPie">竞价<span>22%</span></p>
															</Col>
															<Col span="12">
																<div className="chart">
																	<Pcharts style={{width:"100%",height:'auto'}} className="pieChart"></Pcharts>
																</div>
															</Col>	
														</Card>
													</Col>
												</Row>
												<Row>
													<Col span={24} className="lineChart">
														<Card title="历史同期对比" bordered={false}>
															<Col span="12">
																<p className="danwei">单位:万千瓦时</p>
																<div className="toolGroup">
																	<span className="toolItem">
																		<span className="icon1"></span>
																		今年预计发电量
																	</span>
																	<span className="toolItem">
																		<span className="icon2"></span>
																		去年预计发电量
																	</span>
																	<span className="toolItem">
																		<span className="icon3"></span>
																		今年实际发电量
																	</span>
																	<span className="toolItem">
																		<span className="icon4"></span>
																		去年同期发电量
																	</span>
																</div>
																<div className="chart">
																	<Zcharts style={{width:"100%",height:'auto'}} className="pieChart"></Zcharts>
																</div>
															</Col>
															<Col span="12">
																<p className="danwei" id="espec">单位:万元</p>
																<div className="toolGroup">
																	<span className="toolItem">
																		<span className="icon1"></span>
																			今年预计发电收入
																	</span>
																	<span className="toolItem">
																		<span className="icon2"></span>
																			去年预计发电收入
																	</span>
																	<span className="toolItem">
																		<span className="icon3"></span>
																			今年实际发电收入
																	</span>
																	<span className="toolItem">
																		<span className="icon4"></span>
																			去年同期发电收入
																	</span>
																</div>
																<div className="chart">
																	<Mcharts style={{width:"100%",height:'auto'}} className="pieChart"></Mcharts>
																</div>
															</Col>
														</Card>
													</Col>
												</Row>
												<Divider />
												<Row>
													<div>
														<span className="broad">最新购电需求:</span>
														<span className="message">{this.state.message1}</span>
													</div>
													<div>
														<span className="broad">系统公告:</span>
														<span className="message">{this.state.message2}</span>
													</div>
												</Row>
											</div>
										</Col>
									</Row>
								</div>
    					</Content>
    					<Lfooter></Lfooter>
  					</Layout>
        )
    }
}