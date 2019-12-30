import React from 'react';
import { Layout, Breadcrumb, Row, Col, Icon, Divider,DatePicker } from 'antd';
import './powerManage.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import Shield from '../../../components/icon/Shield.png';
import Battery from '../../../components/icon/Battery.png';
import Ccharts from './chart/powerCountChart.js';
import Pcharts from './chart/powerCompanyChart.js';
import Wcharts from './chart/watchChart.js';
import api from '../../../api/tools.js';
const { Content } = Layout;
moment.locale('zh-cn');
const { MonthPicker } = DatePicker;
moment.locale('zh-cn');
export  default class powerManage extends React.Component {
		componentDidMount () {
			const params = {
				
			}
			// 查询上各个月用电偏差
			let dateTime = new Date();
			let monthTime = dateTime.getMonth();
			let yearTime = dateTime.getFullYear();
			let timeString = yearTime+'年'+monthTime+'月';
			let headers = {
				'Authorization': sessionStorage.obj
			};
			console.log(headers, '现在的头')
			const url1 = '/api/electricBias/';
			api.get(url1,headers,params,(res)=>{
				let data=res.content;
				console.log(data, '上个月用电偏差');
				let percent = data*100+'%';
				this.setState({
					electricBiasPercent: percent,
					timeString: timeString
				})
			},
			(err) => {
				console.log("failed" + err)
			}
		)
			// 电量交易统计列列表查询
			const url2 = '/api/powertrans/';
			api.get(url2,headers,params,
				(res) => {          
					let data=res.content;
					console.log(data, '电量交易统计列表查询');
					this.setState({
						powerTransData: data
					}) 
				},
				(err) => {
					console.log("failed" + err)
				}
			); 
			// 用电年度总览
			const url3 = '/api/summary/annual/';
			api.get(url3,headers,params,
				(res) => {          
					let data=res.content;
					console.log(data, '年度用电总览');
					let annualBidding = data.annualBiddingTotal/data.annualPowerConsumptionTotal;
					let BilateralTotal = data.annualBilateralTotal/data.annualPowerConsumptionTotal;
					let annualBiddingPercent = Math.round((annualBidding*10000)/100).toFixed(2)+'%';
					let BilateralTotalPercent = Math.round((BilateralTotal*10000)/100).toFixed(2)+'%';
					this.setState({
						annualBiddingTotal: data.annualBiddingTotal,
						annualBilateralTotal: data.annualBilateralTotal,
						annualPowerConsumptionTotal: data.annualPowerConsumptionTotal,
						annualBiddingPercent: annualBiddingPercent,
						BilateralTotalPercent: BilateralTotalPercent
					}) 
				},
				(err) => {
					console.log("failed" + err)
				}
			); 
			// 查询月度用电计划
			let date = new Date();
			let year = date.getFullYear();
			let month = (date.getMonth()+2)> 10 ? (date.getMonth()+2): '0'+(date.getMonth()+2);
			let Month = year+"-"+month;
			let month1 = date.getMonth()+2;
			console.log(Month,'年月')
			// 2018-08
			const url4 = '/api/summary/monthly/'+ Month;
			api.get(url4,headers,params,
				(res) => {          
					let data=res.content;
					console.log(data, '月度用电总览');
					this.setState({
						scheduleEnergy: data.scheduleEnergy,
						monthlyBidding: data.monthlyBidding,
						monthlyBilateral: data.monthlyBilateral,
						year: year+'  年',
						month: month1+' 月'
					}) 
				},
				(err) => {
					console.log("failed" + err)
				}
			);
			// 查询电厂合同电量排名
			const url5= '/api/transRanking/';
			api.get(url5,headers,params,
				(res) => {          
					let data=res.content;
					console.log(data, '电厂合同电量排名');
					this.setState({
						transRankingData: data
					}) 
				},
				(err) => {
					console.log("failed" + err)
				}
			); 
			this.setState({
				company: sessionStorage.company
			})
		}
    state = {
			current: 'first',
			userName: 'buyer',
			location: '首页/用电管理',
			company: 'buyer',
			message: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！',
			annualBiddingTotal:'0',
			annualBilateralTotal:'0',
			annualPowerConsumptionTotal:'0',
			BilateralTotalPercent: '0',
			annualBiddingPercent:'0',
			electricBiasPercent: '0',
			powerTransData: {},
			scheduleEnergy: '0',
			monthlyBidding: '0',
			monthlyBilateral: '0',
			transRankingData: {},
			year: '',
			month: '',
			timeString: ''
		}
		handleClick = (e) => {
			console.log('click', e);
			this.setState({
				current: e.key,
			})
		}
		disabledDate = (current) => {
			return current && current > moment().endOf('year');
		}
		handleMonthChange = (value, dateString) => {
			console.log('Selected Time: ', value);
			console.log('Formatted Selected Time: ', dateString);
			const year = dateString.substr(0,4) + '年';
			const month= Number(dateString.substr(5)) < 10? dateString.substr(6) + '月': dateString.substr(5) + '月';
			console.log(year,month,"111222");
			// 查询月度用电计划
			const params = {
				
			}
			let userId = 1;
			const url4 = '/api/summary/monthly/'+ userId +'/'+ dateString;
			api.get(url4,params,
				(res) => {          
					let data=res.content;
					console.log(data, '月度用电总览');
					this.setState({
						scheduleEnergy: data.scheduleEnergy,
						monthlyBidding: data.monthlyBidding,
						monthlyBilateral: data.monthlyBilateral,
						year: year,
						month: month
					}) 
				},
				(err) => {
					console.log("failed" + err)
				}
			);
		}
    render() {
				moment.locale('zh-cn');
        return (
            <Layout className="layout">
						{/* 头部header */}
						<Lheader history={this.props.history} menubox={"/seller/powermanage"}></Lheader>
    					<Content style={{ padding: '0 50px' }}>
							{/* 面包屑 */}
      					<Breadcrumb style={{ margin: '16px 0' }}>
								<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
      					</Breadcrumb>
							{/* 内容 */}
      					<div style={{ background: '#fff', padding: 24, minHeight: 760 }} className="content">
									<Row className="top">
										<Col span={16}>
											<Col span={3}>
												<span className="welcome"><Icon type="area-chart" />  年度总览</span>
											</Col>
											<Col span={4}>
												<div>
													<p className="itemsName">年累计用电量</p>
													<p className="itemsNumber">{this.state.annualPowerConsumptionTotal}</p>
												</div>
											</Col>
											<Col span={4}>
												<p  className="danwei">单位:万千瓦时</p>
											</Col>
											<Col span={4}>
												<div>
													<p className="itemsName">双边</p>
													<p className="itemsNumber">{this.state.annualBilateralTotal}<span>{this.state.BilateralTotalPercent}</span></p>
												</div>
											</Col>
											<Col span={5}>
												<div className="jingjiaCard">
													<div>
														<p className="itemsName">竞价</p>
														<p className="itemsNumber">{this.state.annualBiddingTotal}<span>{this.state.annualBiddingPercent}</span></p>
													</div>
												</div>
											</Col>
										</Col>
										<Col span={8}>
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
												<h3><Icon type="calendar" />  用电计划</h3>
												<Row>
													<Col span={12}>
														<div className="calender">
															<MonthPicker disabledDate={this.disabledDate} placeholder="请选择月份" locale={moment.locale} onChange={this.handleMonthChange} allowClear={true} />
															<p className="month">{this.state.month}</p>
															<p className="year">{this.state.year}</p>
														</div>
													</Col>
													<Col span={12}>
														<div className="rightContainer">
															<div className="planPower">
																<p className="itemName">计划用电量</p>
																<p className="danweis">单位:万千瓦时</p>
																<p className="itemNumber">{this.state.scheduleEnergy}</p>
															</div>
															<div className="twoItem">
																<Col span={12}>
																	<p className="itemName">双边</p>
																	<p className="itemNumber1">{this.state.monthlyBidding}</p>
																</Col>
																<Col span={12}>
																	<p className="itemName">竞价</p>
																	<p className="itemNumber2">{this.state.monthlyBilateral}</p>
																</Col>
															</div>
														</div>
													</Col>
												</Row>
											</div>
										</Col>
									</Row>
									<Row className="chartArea">
										<h3><Icon type="bar-chart" /> 电力交易统计</h3>
										<p className="danweis">单位:万元</p>
										<div className="barChart">
											<Ccharts style={{width:"100%",height:'auto'}} className="barChart"></Ccharts>
										</div>
										<div className="toolGroup">
											<span className="toolItem">
												<span className="icon1"></span>
												用户委托电量
											</span>
											<span className="toolItem">
												<span className="icon2"></span>
												结算电量
											</span>
											<span className="toolItem">
												<span className="icon3"></span>
												购电量(双边+竞价)
											</span>
										</div>
									</Row>
									<Row className="pieChartArea">
										<Col span={12}>
											<h3><Icon type="pie-chart" />  电厂合同电量排名</h3>
											<p className="danwei">单位:万千瓦时</p>
											<div className="barChart">
												<Pcharts style={{width:"100%",height:'auto'}} className="pieChart"></Pcharts>
											</div>
											<ul className="toolGroup">
												<li className="toolItem">
													<span className="icon1"></span>
													广东第一发电厂
													<Divider type="vertical" />
													<span className="baifeng">35%</span>
													<Divider type="vertical" />
													<span className="itemNumber">500,000,000</span>
												</li>
												<li className="toolItem">
													<span className="icon2"></span>
													广东第二发电厂
													<Divider type="vertical" />
													<span className="baifeng">10%</span>
													<Divider type="vertical" />
													<span className="itemNumber">125,000,000</span>
												</li>
												<li className="toolItem">
													<span className="icon3"></span>
													广东第三发电厂
													<Divider type="vertical" />
													<span className="baifeng">5%</span>
													<Divider type="vertical" />
													<span className="itemNumber">125,000,000</span>
												</li>
												<li className="toolItem">
													<span className="icon4"></span>
													广东第四发电厂
													<Divider type="vertical" />
													<span className="baifeng">5%</span>
													<Divider type="vertical" />
													<span className="itemNumber">125,000,000</span>
												</li>
												<li className="toolItem">
													<span className="icon5"></span>
													广东第五发电厂
													<Divider type="vertical" />
													<span className="baifeng">5%</span>
													<Divider type="vertical" />
													<span className="itemNumber">500,000,000</span>
												</li>
												<li className="toolItem">
													<span className="icon6"></span>
													其他地区发电厂   
													<Divider type="vertical" />
													<span className="baifeng">40%</span>
													<Divider type="vertical" />
													<span className="itemNumber">500,000,000</span>
												</li>
											</ul>
										</Col>
										<Divider type="vertical" />
										<Col span={12}>
											<h3><Icon type="environment" />  上月用电偏差情况</h3>
											<p className="dateTime">{this.state.timeString}</p>
											<div className="barChart">
												<Wcharts style={{width:"100%",height:'auto'}} className="pieChart"></Wcharts>
											</div>
											<p className="powerWrong">用电偏差  <span>{this.state.electricBiasPercent}</span></p>
										</Col>
									</Row>
								</div>
    					</Content>
    					<Lfooter></Lfooter>
  					</Layout>
        )
    }
}