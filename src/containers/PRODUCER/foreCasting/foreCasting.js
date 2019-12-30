import React from 'react';
import { Layout, Breadcrumb} from 'antd';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import './foreCasting.less';
const { Content } = Layout;
export  default class forceCasting extends React.Component {
	constructor(props){
		super();
		this.state = {
			current: 'first',
			userName: 'buyer',
			location: '首页/负荷预测',
			company: 'buyer',
		}
	}
  render() {
    return (
      <Layout className="layout">
				<Lheader history={this.props.history} menubox={"/seller/forecasting"}></Lheader>
    		<Content style={{ padding: '0 50px' }}>
      		<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
      		</Breadcrumb>
      		<div style={{ background: '#fff', padding: 24, minHeight: 760 }} className="content">

					</div>
    		</Content>
    	<Lfooter></Lfooter>
  	</Layout>
  	)
  }
}