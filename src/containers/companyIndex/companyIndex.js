import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row, Col, Carousel } from 'antd';
import './companyIndex.less';
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';
const { Footer } = Layout;

export  default class CompanyIndex extends React.Component {
	constructor() {
		super();
		this.state={
		}
	}
  render() {
		return (
			<Layout className="layout">
						<Row className="headerC">
							<Col span={10} className="logo">
								<h2>北京兆信通能科技有限公司</h2>
							</Col>
							<Col span={10} className="menuCla">
								<Menu
									mode="horizontal"
									defaultSelectedKeys={['']}
									style={{ lineHeight: '64px' }}
									className="menuIte"
								>
									<Menu.Item key="1">关于我们</Menu.Item>
									<Menu.Item key="2">合作伙伴</Menu.Item>
									<Menu.Item key="3">媒体新闻</Menu.Item>
									<Menu.Item key="4">联系我们</Menu.Item>
								</Menu>
							</Col>
						</Row>
						<Row className="content">
							<Carousel autoplay className="sliderCla">
								<Row className="box"><img src={img1} alt="" /></Row>
								<Row className="box"><img src={img2} alt="" /></Row>
								<Row className="box"><img src={img3} alt="" /></Row>
								<Row className="box"><img src={img4} alt="" /></Row>
							</Carousel>
						</Row>
						<Row>
							<Link to="/seller/register" id="regBtn" >现在注册></Link>
						</Row>
						<Footer style={{ textAlign: 'center' }}>
							<Row>北京兆信通能科技有限公司 版权所有Copyright © 2018</Row>
							<Row>京ICP备  18034505号</Row>
						</Footer>
  		</Layout>
		)
  }
}