import React from 'react';
import { Layout, Breadcrumb, Row, Col, Table, Divider, Pagination, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './contractManage.less';
import Lheader from '../../../common/Iheader';
import Lfooter from '../../../../../components/layout/Ifooter';
import api from '../../../../../api/tools';
const { Content } = Layout;
export  default class yearContract extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sorter: {field: '', order: ''},
			pagination: {number: 1, size: 10},
			current: '1',
			userName: '',
			location: '合同管理/月竞统计/年度汇总',
			company: '',
			barginName: '',
			pageSize: 10,
			valuetype:'',
			valuestatus:'',
			count: 0,
			total: 0,
			pageNum: 1,
			pageNo: '1',
			loading: false,
			visible: false,
			visibility: false
		};
	}
	componentDidMount() {
		this.handleTableList();
		this.setState({
			company: sessionStorage.company
		})
	}
	get tableColumns() {
		return [{
			title: '年份',
			dataIndex: 'year',
			key: 'year',
		},{
			title: '甲方企业名称',
			dataIndex: 'partyAName',
			key: 'partyAName',
		},{
			title: '乙方企业名称',
			dataIndex: 'partyBName',
			key: 'partyBName',
		},{
			title: '用电总量(万千瓦时)',
			dataIndex: 'powerTotal',
			align: 'center',
			key: 'powerTotal',
		}, {
			title: '操作',
			align: 'center',
			key: 'action',
			render: (text, record, index) => (
				<span>
					<a onClick={()=> this.toCompany(text,record,index)}>企业详情</a>
					<Divider type="vertical" />
					<a onClick={()=> this.toMonth(text,record,index)}>月度详情</a>
				</span>
			)
		}];
	}
	toCompany = (record) => {
		this.props.history.push(`/seller/companybidding/${record.year}`);
	}
	toMonth = (record) => {
		this.props.history.push(`/seller/monthbidding/${record.year}`);
	}
	handleTableList = (params) => {
		const param = {
			pageNo: 1,
			pageSize: 10,
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		let url='/api/contract/bidding/yearly';
		api.post(url, headers, param,
		  (res) => {
			let rows = res.content?res.content.content:[];
			this.setState({
			  data:rows,
				count:res.content?res.content.total:0,
			})
		},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
	onShowSizeChange = (current,pageSize) => {
		this.setState({
			pageSize: pageSize,
			current: current
		});
		const param = {
			pageNo: current,
			pageSize: pageSize,
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		let url='/api/contract/bidding/yearly';
		api.post(url, headers, param,
		  (res) => {
			let rows = res.content?res.content.content:[];
			this.setState({
			  data:rows,
				count:res.content?res.content.total:0,
			})
		},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
	onChange = (pageNumber) => {
		this.setState({current: pageNumber});
		const param = {
			pageNo: pageNumber,
			pageSize: this.state.pageSize,
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		let url='/api/contract/bidding/yearly';
		api.post(url, headers, param,
		  (res) => {
			let rows = res.content?res.content.content:[];
			this.setState({
			  data:rows,
				count:res.content?res.content.total:0,
			})
		},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
  render() {
		const { location } = this.state;
    return (
      <Layout className="layout">
				<Lheader history={this.props.history} menubox={"/seller/yearbidding"}></Lheader>
    		<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{location}</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ background: '#fff', padding: 24, minHeight: 760 }} className="content">
					{/*<Row className="payClas">*/}
						{/*<Row>*/}
							{/*<h3>购电交易流程</h3>*/}
						{/*</Row>*/}
						{/*<Row>*/}
							{/*<div className="bgcImgs"></div>*/}
						{/*</Row>*/}
					{/*</Row>*/}
					<Row className="payList">
						<Row>
							<h3 style={{marginTop:"20px"}}>月度竞价统计-年度汇总</h3>
						</Row>
						<Row>
							<Col span={24} className="tableList">
								<Table dataSource={this.state.data} columns={this.tableColumns} border={true} pagination={false} rowKey="partyAId" history={this.props.history}
								/>
							</Col>
						</Row>
						<Row>
							<LocaleProvider locale={zhCN}>
								<Pagination
									total={this.state.count}
									showTotal={total => `总共 ${total===null?0:total} 项`}
									defaultCurrent={1}
									showSizeChanger
									pageSizeOptions={['10','20','50']}
									onShowSizeChange={this.onShowSizeChange}
									showQuickJumper
									onChange={this.onChange}
									className="pageNations"
								/>
							</LocaleProvider>
        		</Row>
				</Row>
			</div>
    </Content>
  	<Lfooter></Lfooter>
  	</Layout>
    )
  }
}