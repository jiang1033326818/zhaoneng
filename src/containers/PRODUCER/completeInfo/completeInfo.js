import React from 'react';
import { Layout, Breadcrumb, Row, Col, Tabs, Card, Tag, Button, Icon, Steps } from 'antd';
import './completeInfo.less';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import BasicInfo from './form/basicInfo.js';
import PreserveId from './form/preserveId.js';
const { Content } = Layout;
const Step = Steps.Step;
const TabPane = Tabs.TabPane;
export  default class completeInfo extends React.Component {
	constructor() {
		super();
		this.state = {
			location: '完善资料',
			activeKey: '1',
			status: '待审核',
			current: 0,
			value: {}
		}
	}
componentDidMount () {
	this.setState({
		company: sessionStorage.company
	})
}
handleTab = (activeKey) => {
	this.setState({activeKey: activeKey, current: activeKey - 1});
}
handleNext = () => {
	const newKey = Number(this.state.activeKey)+1;
	this.setState({activeKey: String(newKey), current: String(newKey)-1});
}
handlePre =() => {
	const newKey = this.state.activeKey-2;
	this.setState({activeKey: String(newKey), current: String(newKey)-1});
}
handleActiveKeyOne = (activeKey,regionName, unifiedSocialCreditCode, belongGridName,industryName)=>{
	this.setState({
		activeKey: activeKey,
		current: Number(activeKey)-1,
		regionName: regionName,
		unifiedSocialCreditCode: unifiedSocialCreditCode,
		belongGridName: belongGridName,
		industryName: industryName
	})
}
handleActiveKeyTwo = (activeKey,cid, name, totalCapacity) => {
	this.setState({
		activeKey: activeKey,
		current: Number(activeKey)-1,
		cid: cid,
		name: name,
		totalCapacity:totalCapacity
	})
}
render() {
	const { location, company, status, activeKey, current, cid, name, totalCapacity, regionName, unifiedSocialCreditCode, belongGridName,industryName } = this.state;
  return (
    <Layout className="completeInfoLayout">
				<Lheader history={this.props.history}></Lheader>
    		<Content style={{ padding: '0 50px' }}>
					<Row>
						<Col span={16}>
							<Breadcrumb style={{ margin: '16px 0' }}>
								<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="completeInfoLocation">{location}</Breadcrumb.Item>
							</Breadcrumb>
						</Col>
					</Row>
      			<div style={{ background: '#fff', padding: 24, minHeight: 762 }} className="completeInfoContent">
							<Row className="formArea">
								<Row className="stepArea">
									<div>
										<Steps current={current}>
											<Step title="基本信息" description="" icon={<Icon type="solution" />} />
											<Step title="户号维护" description="" icon={<Icon type="exception" />} />
											<Step title="用户认证" description="" icon={<Icon type="safety" />} />
											<Step title="完成" description="" icon={<Icon type="smile-o" />} />
										</Steps>
									</div>
								</Row>
								<Tabs className="tabsGroup" activeKey={activeKey} onChange={this.handleTab}>
									<TabPane tab="基本信息" key="1">
										<BasicInfo history={this.props.history} handleActiveKeyOne={this.handleActiveKeyOne.bind(this)} activeKey={activeKey} />
									</TabPane>
									<TabPane tab="户号维护" key="2">
										<PreserveId activeKey={activeKey} handleActiveKeyTwo={this.handleActiveKeyTwo.bind(this)} />
									</TabPane>
									<TabPane tab="用户认证" key="3" className="tabsItem3">
										<Row className="checkArea">
											<Row className="checkHeader">
												<Col span={8} offset={8} className="title">
													<p>用户认证</p>
												</Col>
											</Row>
											<Row className="checkCompany">
												<Col span={8} offset={8} className="title">
													<p>{company}</p>
												</Col>
											</Row>
											<Row className="checkCard">
												<Col span={13} offset={6}>
													<Row>
														<Card className="cardArea">
															<Row>
																<Tag color="#f50" className="leftTips">{status}</Tag>
																<Col span={12} className="cardItem">
																	<p>企业名称: {company?company:'广州粤电公司'}</p>
																	<p>行政区划: {regionName?regionName:'广州市'} </p>
																	<p>行业分类: {industryName?industryName:'食品安全'}</p>
																	<p>注册资本:  {totalCapacity?totalCapacity+'万元':'3350万元'}</p>
																</Col>
																<Col span={12} className="cardItem">
																	<p>所属电网公司: {belongGridName?belongGridName:'南方售电公司'} </p>
																	<p>企业性质: {unifiedSocialCreditCode?unifiedSocialCreditCode:'食品安全'} </p>
																	<p>户号:  {cid?cid:'a123456'}</p>
																	<p>户名: {name?name:'广电公司'}</p>
																</Col>
															</Row>
														</Card>
													</Row>
												</Col>
											</Row>
											<Row className="footerLines">
												<Col span={10} offset={8} className="btnGroups">
													<Button className="preBt" onClick={this.handlePre}>修改</Button>
													<Button type="primary" htmlType="submit" className="nextBt" onClick={this.handleNext}>确认</Button>
												</Col>
											</Row>
										</Row>
									</TabPane>
									<TabPane tab="完成" key="4" className="tabItems4">
										<Row className="iconHead">
											<Col span={8} offset={8}>
												 <Icon type="check-circle" className="iconItemCheck" />
											</Col>
										</Row>
										<Row className="tipHead">
											<Col span={8} offset={8}>
												<p className="tipItem">认证成功</p>
											</Col>
										</Row>
										<Row className="tipCompany">
											<Col span={8} offset={8}>
												<p className="tipItem">{company}</p>
											</Col>
										</Row>
										<Row className="tipCompany">
											<Col span={8} offset={8}>
												<Button  type="primary" className="preBt" onClick={()=>{this.props.history.push(`/producer/index`)}}>返回首页</Button>
											</Col>
										</Row>
									</TabPane>
								</Tabs>
							</Row>
						</div>
    			</Content>
    		<Lfooter></Lfooter>
  		</Layout>
    )
  }
}