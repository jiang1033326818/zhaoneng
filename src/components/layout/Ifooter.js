import React from 'react';

import { Layout, Row } from 'antd';
const { Footer } = Layout;

/**
 * 公共底部
 *
 * @export
 * @class Lfooter
 * @extends {Component}
 */
export default class Lfooter extends React.Component {

	render() {
		return (
			<Footer style={{ textAlign: 'center' }}>
				<Row>北京兆信通能科技有限公司 版权所有Copyright © 2018</Row>
				<Row>京ICP备  18034505号</Row>
    	</Footer>
		)
	}
}