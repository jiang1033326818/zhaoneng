import React from 'react';
import { Layout, Breadcrumb, Row, Col, Table, Modal } from 'antd';
import './contractManage.less';
import Lheader from '../../../common/Iheader.js';
import Lfooter from '../../../../../components/layout/Ifooter.js';
import api from '../../../../../api/tools.js';
const { Content } = Layout;
export  default class ContractManage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sorter: {field: '', order: ''},
			pagination: {number: 1, size: 10},
			current: '1',
			userName: '',
			location: '合同管理/长期协议年度合同',
			company: '',
			barginName: '',
			pageSize: 10,
			valuetype:'',
			valuestatus:'',
			count: 0,
			total: 0,
			pageNum: 1,
			pageNo: 1,
			loading: false,
			visibileMonth: false,
			visibileCompany: false
		};
	}
	componentDidMount() {
		this.handleMonthList();
		this.handleCompanyList();
		this.setState({
			company: sessionStorage.company
		})
	}
	get tableColumnsOne() {
		return [{
			title: '月份',
			dataIndex: 'month',
			key: 'month',
		},{
			title: '竞价月度汇总',
			dataIndex: 'biddingMonthlyTotal',
			key: 'biddingMonthlyTotal',
		}, {
			title: '双边月度汇总',
			dataIndex: 'bilateralMonthlyTotal',
			key: 'bilateralMonthlyTotal',
		},{
			title: '计划总数',
			dataIndex: 'planTotal',
			key: 'planTotal',
		}, {
			title: '操作',
			align: 'center',
			key: 'action',
			render: (text, record, index) => (
				<span>
					<a onClick={()=> this.handleDetailMonth(text,record,index)}>查看</a>
				</span>
			)
		}];
	}
	get tableColumnsTwo() {
		return [{
			title: '公司名称',
			dataIndex: 'companyName',
			key: 'companyName',
		},{
			title: '竞价月度汇总',
			dataIndex: 'biddingMonthlyTotal',
			key: 'biddingMonthlyTotal',
		}, {
			title: '双边月度汇总',
			dataIndex: 'bilateralMonthlyTotal',
			key: 'bilateralMonthlyTotal',
		},{
			title: '计划总数',
			dataIndex: 'planTotal',
			key: 'planTotal',
		}, {
			title: '操作',
			align: 'center',
			key: 'action',
			render: (text, record, index) => (
				<span>
					<a onClick={()=> this.handleDetailCompany(text,record,index)}>查看</a>
				</span>
			)
		}];
	}
	handleDetailMonth = (record) => {
		this.setState({
			visibileMonth: true
		})
	}
	handleDetailCompany = (record) => {
		this.setState({
			visibileCompany: true
		})
	}
	handleDetail = (record) => {
		sessionStorage.targetYearId = record.id;
		this.props.history.push(`/seller/companycontract`);
	}
	handleMonthList = (params) => {
		const param = {
			pageNo: '1',
			pageSize: '10',
			status:'',
			year:''
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		let url='/api/contract/plan/month/summary';
		api.post(url, headers, param,
		  (res) => {
			let rows = res.content.content;
			this.setState({
			  dataOne:rows,
				count:rows?Number(rows.length):0,
			})},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
	handleCompanyList = (params) => {
		const param = {
			pageNo: '1',
			pageSize: '10',
			status:'',
			year:''
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		let url='/api/contract/plan/company/summary';
		api.post(url, headers, param,
		  (res) => {
			let rows = res.content.content;
			this.setState({
			  dataTwo:rows,
				count:rows?Number(rows.length):0,
			})},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
	// 模态框信息
	handleOk = (e) => {
    this.setState({
			visibileMonth: false,
			visibileCompany: false
    });
  }

  handleCancel = (e) => {
    this.setState({
			visibileMonth: false,
			visibileCompany: false
    });
	}
	handleMonthDetail = () => {
		const param = {
			pageNo: '1',
			pageSize: '10',
			status:'',
			year:''
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		let url='/api/contract/plan/monthly/detail/{param}';
		api.post(url, headers, param,
		  (res) => {
			},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
	handleCompanyDetail = () => {
		const param = {
			pageNo: '1',
			pageSize: '10',
			status:'',
			year:''
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		let url='/api/contract/plan/company/detail/{param}';
		api.post(url, headers, param,
		  (res) => {
			},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
  render() {
		const { location, visibileMonth, visibileCompany } = this.state;
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
					<Row className="monthArea">
						<Row>
							<h3 style={{marginTop:"20px"}}>月份列表</h3>
						</Row>
						<Row>
							<Col span={24}>
								<Table dataSource={this.state.dataOne} columns={this.tableColumnsOne} border={true} pagination={true} rowKey="id" history={this.props.history}
								/>
							</Col>
						</Row>
					</Row>
					<Row className="companyArea">
						<Row>
							<h3>公司列表</h3>
						</Row>
						<Row>
							<Col span={24}>
								<Table dataSource={this.state.dataTwo} columns={this.tableColumnsTwo} border={true} pagination={true} rowKey="id" history={this.props.history}
								/>
							</Col>
						</Row>
					</Row>
					<Row>
						<Modal
							title="月份详情"
							visible={visibileMonth}
							onOk={this.handleOk}
							onCancel={this.handleCancel}
							okText="确认"
							cancelText="取消"
						>
							<p>竞价</p>
							<p>双边</p>
							<p>计划</p>
						</Modal>
					</Row>
					<Row>
						<Modal
							title="公司详情"
							visible={visibileCompany}
							onOk={this.handleOk}
							onCancel={this.handleCancel}
							okText="确认"
							cancelText="取消"
						>
							<p>竞价</p>
							<p>双边</p>
							<p>计划</p>
						</Modal>
					</Row>
			</div>
    </Content>
  	<Lfooter></Lfooter>
  	</Layout>
    )
  }
}