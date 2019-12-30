import React, { Component, PropTypes } from 'react';
import { Layout, Row, Col, Affix } from 'antd';
import './style/slider.less';
// import Pay from '../components/icon/缴费.png';
// import Compact from '../components/icon/合同.png';
// import Backlog from '../components/icon/待办.png';
// import Bidding from '../components/icon/竞价.png';
// import Manage from '../components/icon/双边.png';
// import Inform from '../components/icon/通知.png';
/**
 * 右侧工具台
 *
 * @export
 * @class Ldashboard
 * @extends {Component}
 */

export default class Ldashboard extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				<Affix className="pinGroup">
					<ul>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>6</li>
					</ul>
				</Affix>
			</div>
		)
	}
}