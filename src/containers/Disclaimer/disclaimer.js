import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import './disclaimer.less';
const { Header, Footer, Content } = Layout;
export default class disclaimer extends React.Component {
	constructor() {
		super();
		this.state = {}
	}
	render() {
		return (
			<Layout className="layout">
				<Header style={{ textAlign: 'center', background: '#c3c5c5' }} className="headerTitle">
					<h1>免责声明</h1>
				</Header>
				<Content>
					<div style={{ background: '#fff', padding: 24, minHeight: 820 }} className="content">
						<Row className="lawClass">
							<Row className="lawClassTitle">
								<Col span={8} offset={2}>
									<h3>【法律申明】</h3>
								</Col>
							</Row>
							<Row className="lawClassContent">
								<Row>
									<Col span={20} offset={2} className="contentItem">
										<p>1. 本系统所用的图表数据分析等内容均属于本网站的原创内容，版权均属本网站所有，任何媒体、网站或个人未经本网站协议授权(需要提供《授权协议》)不得转载、链接】转帖或以其他方式复制发表。已经本网站协议授权的媒体、网站，在下载使用时必须注明"稿件来源:北京兆信通能科技有限公司"，违者本网将依法追究责任。</p>
									</Col>
								</Row>
								<Row>
									<Col span={20} offset={2} className="contentItem">
										<p>2. 凡本系统站所载的资料版权归所有人所有，本站采用的非本站原创等内容无法一一和版权者联系，如果本网所选内容不应无偿使用,请及时联系我们，以迅速采取适当措施，避免给双方造成不必要的经济损失。</p>
									</Col>
								</Row>
								<Row>
									<Col span={20} offset={2} className="contentItem">
										<p>3. 本系统只供内部使用，未经本公司及购买方确认，不得用于其他商业用途，违者本公司将依法追究责任。</p>
									</Col>
								</Row>
							</Row>
							<Row className="lawClassTitle">
								<Col span={8} offset={2}>
									<h3>【免责声明】</h3>
								</Col>
							</Row>
							<Row className="lawClassContent">
								<Row>
									<Col span={20} offset={2} className="contentItem">
										<p>1. 本系统所采集的用户数据仅为考虑更好地为用户服务所用，使用户更好使用本系统为目的。</p>
									</Col>
								</Row>
								<Row>
									<Col span={20} offset={2} className="contentItem">
										<p>2. 本系统所收录的合同仅仅作为交易双方凭证，合同真伪以及双方纠纷与本公司无关。</p>
									</Col>
								</Row>
								<Row>
									<Col span={20} offset={2} className="contentItem">
										<p>3. 用户人为操作失误导致经济损失的，本公司不予赔偿。</p>
									</Col>
								</Row>
							</Row>
							<Row>
								<Col offset={18} className="companyName">
									<h3>北京兆信通能科技有限公司</h3>
									<h3 className="time">2018年六月七号</h3>
								</Col>
							</Row>
							<Row>
								<Col offset={8} span={8} className="returnBtnA">
									<Button type="primary" onClick={()=>{this.props.history.go(-1);}} id="returnBtn">返回</Button>
								</Col>
							</Row>
						</Row>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					<Row>北京兆信通能科技有限公司 版权所有Copyright © 2018</Row>
					<Row>京ICP备  18034505号</Row>
    		</Footer>
			</Layout>
		)
	}
}