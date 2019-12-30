import React, { Component, PropTypes } from 'react';
import { Layout, Card, Row, Col } from 'antd';
import './style/dashboard.less';
import Pay from '../components/icon/缴费.png';
import Compact from '../components/icon/合同.png';
import Backlog from '../components/icon/待办.png';
import Bidding from '../components/icon/竞价.png';
import Manage from '../components/icon/双边.png';
import Inform from '../components/icon/通知.png';
/**
 * 右侧工具台
 *
 * @export
 * @class Ldashboard
 * @extends {Component}
 */
const gridStyle = {
	width: '50%',
  textAlign: 'center',
};
export default class Ldashboard extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<Row>
				<Col span="4">
											<div className="cardContainer">
												<Row>
														<Col span={12}>
															<Card className="cardItems">
																<img src={Inform} alt="" style={{display:"bolck"}} className="iconItem" />
																<p className="infoTitle">费用通知</p>
															</Card>
														</Col>
														<Col span={12}>
															<Card className="cardItems">
																<img src={Bidding} alt="" style={{display:"bolck"}} className="iconItem" />
																<p className="infoTitle">集中竞价</p>
															</Card>
														</Col>
													</Row>
													<Row>
														<Col span={12}>
															<Card className="cardItems">
																<img src={Pay} alt="" style={{display:"bolck"}} className="iconItem" />
																<p className="infoTitle">在线缴费</p>
															</Card>
														</Col>
														<Col span={12}>
															<Card className="cardItems">
																<img src={Manage} alt="" style={{display:"bolck"}} className="iconItem" />
																<p className="infoTitle">双边交易</p>
															</Card>
														</Col>
													</Row>
													<Row>
														<Col span={12}>
															<Card className="cardItems">
																<img src={Compact} alt="" style={{display:"bolck"}} className="iconItem" />
																<p className="infoTitle">合同管理</p>
															</Card>
														</Col>
														<Col span={12}>
															<Card className="cardItems">
																<img src={Backlog} alt="" style={{display:"bolck"}} className="iconItem" />
																<p className="infoTitle">待办事项</p>
															</Card>
														</Col>
													</Row>
											</div>
										</Col>
			</Row>
		)
	}
}