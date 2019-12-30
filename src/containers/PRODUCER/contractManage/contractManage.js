import React from 'react';
import { Layout, Breadcrumb, Row, Col, Input, Radio, Table, Pagination, LocaleProvider, Button, Divider, message } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import fileDownload from 'react-file-download';
import Shield from '../../../components/icon/Shield.png';
import Battery from '../../../components/icon/Battery.png';
import './contractManage.less';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import api from '../../../api/tools.js';
import axios from 'axios';
var basepath = api.basepath+'/';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Content } = Layout;
const Search = Input.Search;
export  default class Index extends React.Component {
	constructor() {
		super();
		this.state = {
			sorter: {field: '', order: ''},
			pagination: {number: 1, size: 10},
			current: '1',
			userName: '',
			location: '首页/合同管理',
			company: '',
			barginName: '',
			pageSize: 10,
			valuetype:'',
			valuestatus:'',
			count: 1,
			total: 0,
			pageNum: 1,
			pageNo: '1',
			queryStr: '',
			status:'',
			type:'',
			totalNum: 0,
			cancelNum: 0,
			unconfirmedNum: 0,
			pendingNum: 0,
			confirmedNum: 0
		};
	}
	componentDidMount() {
		this.handleConNum();
		this.handleTableList();
		this.setState({
			company: sessionStorage.company
		})
	}
	get tableColumns() {
		return [{
			title: '合同名称',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '合同类型',
			dataIndex: 'type',
			align: 'center',
			key: 'contractType',
		},{
			title: '交易类型',
			dataIndex: 'type',
			align: 'center',
			key: 'tradeType',
		}, {
			title: '电量(万千瓦时)',
			dataIndex: 'power',
			key: 'power',
		}, {
			title: '电价(元)',
			dataIndex: 'powerPrice',
			key: 'powerPrice',
		}, {
			title: '开始时间',
			dataIndex: 'createTime',
			align: 'center',
			key: 'createTime',
		}, {
			title: '状态',
			dataIndex: 'status',
			align: 'center',
			key: 'status',
		}, {
			title: '操作',
			align: 'center',
			width: '180px',
			key: 'action',
			render: (text, record, index) => (
				<span>
					<a onClick={()=> this.handleDetail(text,record,index)}>查看</a>
					<Divider type="vertical" />
					<a onClick={()=> this.handleDownLoad(text,record,index)}>下载</a>
					<Divider type="vertical" />
					<a onClick={()=> this.handlePrint(text,record,index)}>打印</a>
				</span>
			)
		}];
	}
	handlePrint = (record) => {
		message.success('请点击打印按钮打印合同');
		this.props.history.push(`/producer/preview`);
	}
	handleDetail = (record) => {
		sessionStorage.targetContractId = record.id;
		this.props.history.push(`/producer/contractdetail`);
	}
	handleDownLoad = (record) => {
		let contractId = record.id;
		let headers = {
			'authorization': sessionStorage.obj,
		}
		let url='/api/download/contract/' + contractId;
		axios({
			method: 'GET',
			url: url,
			data: null,
			params: null,
			baseURL: basepath,
			withCredentials: false,
			headers: headers,
			responseType: 'blob',
		})
		.then(function (res) {
			if(res.headers['content-disposition']){
				let fileName=decodeURI(res.headers['content-disposition'].split('filename=')[1]);
				let blob = res.data;
		  	fileDownload(blob, fileName);
			} else {
				message.error('您没有权限下载此文件');
			}
		})
		.catch(function (err) {
			message.error('您没有权限下载此文件');
		})
	}
	handleConNum = (params) => {
		const param = {}
		let headers = {
			'Authorization': sessionStorage.obj
		}
		let url='/api/contract/summary';
		api.get(url, headers, param,
		  (res) => {
				this.setState({
					totalNum: res.content.totalNum,
					cancelNum: res.content.cancelNum,
					unconfirmedNum: res.content.unconfirmedNum,
					pendingNum: res.content.pendingNum,
					confirmedNum: res.content.confirmedNum
				})
			},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
	handleTableList = (params) => {
		const param = {
			pageNo: '1',
			pageSize: '10',
			queryStr: '',
			status:'',
			type:''
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		let url='/api/contract/list';
		api.post(url, headers, param,
		  (res) => {
			let rows = res.content.contracts;
			rows.forEach((item, index) => {
				if (item.type === 'BILATERAL') {
					item.type ='竞价';
				} else if (item.type === 'BIDDING') {
					item.type = '双边';
				} else {
					item.type = '未知';
				}
				if(item.status === 'PENDING') {
					item.status = '待审批';
				} else if (item.status === 'CONFIRMED') {
					item.status = '已完成';
				} else if (item.status === 'CANCEL') {
					item.status = '取消';
				} else if (item.status === 'UNCONFIRMED') {
					item.status = '待确认';
				} else {
					item.status = '未知';
				}
			})
			this.setState({
			  data:rows,
				count:res.content.count,
			})},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
	onChangeBarginName = (value) => {
		this.setState({ barginName: value });
    let params={
      pageNo: this.state.current,
			pageSize: this.state.pageSize,
			queryStr: value,
			status:this.state.valuestatus,
			type: this.state.valuetype
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
    let url='/api/contract/list';
    api.post(url, headers, params,
      (res) => {
				let rows = res.content.contracts;
				rows.forEach((item, index)=>{
					if(item.type === 'BILATERAL') {
						item.type ='竞价';
					} else if (item.type === 'BIDDING') {
						item.type = '双边';
					} else {
						item.type = '未知';
					}
					if(item.status === 'PENDING') {
						item.status = '待审批';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已完成';
					} else if (item.status === 'CANCEL') {
						item.status = '取消';
					} else if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else {
						item.status = '未知';
					}
				})
				this.setState({
					data:rows,
					count:res.content.count,
				})
      },
      (err) => {
        console.log("failed" + err)
      }
    );
	}
	onClassChange = (e) => {
		this.setState({ valuetype: e.target.value===""? "":e.target.value });
		let params={
      pageNo: this.state.current,
			pageSize: this.state.pageSize,
			queryStr: this.state.queryStr,
			status:this.state.valuestatus,
			type: e.target.value===""? "":e.target.value
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
    let url='/api/contract/list'
    api.post(url, headers, params,
      (res) => {
				let rows = res.content.contracts;
				rows.forEach((item, index)=>{
					if(item.type === 'BILATERAL') {
						item.type ='竞价';
					} else if (item.type === 'BIDDING') {
						item.type = '双边';
					} else {
						item.type = '未知';
					}
					if(item.status === 'PENDING') {
						item.status = '待审批';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已完成';
					} else if (item.status === 'CANCEL') {
						item.status = '取消';
					} else if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else {
						item.status = '未知';
					}
				})
				this.setState({
					data:rows,
					count:res.content.count,
				})
      },
      (err) => {
        console.log("failed" + err)
      }
    );
	}
	onStateChange = (e) => {
		this.setState({ valuestatus: e.target.value===""? "":e.target.value});
		let params={
      pageNo: this.state.current,
			pageSize: this.state.pageSize,
			queryStr: this.state.queryStr,
			status:e.target.value===""? "":e.target.value,
			type:this.state.valuetype
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
    let url='/api/contract/list';
    api.post(url, headers, params,
    	(res) => {
				let rows = res.content.contracts;
				rows.forEach((item, index)=>{
					if(item.type === 'BILATERAL') {
						item.type ='竞价';
					} else if (item.type === 'BIDDING') {
						item.type = '双边';
					} else {
						item.type = '未知';
					}
					if(item.status === 'PENDING') {
						item.status = '待审批';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已完成';
					} else if (item.status === 'CANCEL') {
						item.status = '取消';
					} else if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else {
						item.status = '未知';
					}
				})
				this.setState({
					data:rows,
					count:res.content.count,
				})
      },
      (err) => {
        console.log("failed" + err)
      }
    );
	}
	onShowSizeChange=(current,pageSize)=>{
		this.setState({ pageSize: pageSize, current: current});
		let params={
      pageNo: current,
			pageSize: pageSize,
			queryStr: this.state.queryStr,
			status:this.state.status,
			type:this.state.valuetype
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
    let url='/api/contract/list';
    api.post(url, headers, params,
    	(res) => {
				let rows = res.content.contracts;
				rows.forEach((item, index)=>{
					if(item.type === 'BILATERAL') {
						item.type ='竞价';
					} else if (item.type === 'BIDDING') {
						item.type = '双边';
					} else {
						item.type = '未知';
					}
					if(item.status === 'PENDING') {
						item.status = '待审批';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已完成';
					} else if (item.status === 'CANCEL') {
						item.status = '取消';
					} else if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else {
						item.status = '未知';
					}
				})
				this.setState({
					data:rows,
					count:res.content.count,
				})
      },
      (err) => {
        console.log("failed" + err)
      }
    );
	}
	onChange = (pageNumber)=> {
		this.setState({ current: pageNumber });
		let params={
      pageNo: pageNumber,
			pageSize: this.state.pageSize,
			queryStr: this.state.queryStr,
			status:this.state.status,
			type:this.state.valuetype
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
    let url='/api/contract/list';
    api.post(url, headers, params,
    	(res) => {
				let rows = res.content.contracts;
				rows.forEach((item, index)=>{
					if(item.type === 'BILATERAL') {
						item.type ='竞价';
					} else if (item.type === 'BIDDING') {
						item.type = '双边';
					} else {
						item.type = '未知';
					}
					if(item.status === 'PENDING') {
						item.status = '待审批';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已完成';
					} else if (item.status === 'CANCEL') {
						item.status = '取消';
					} else if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else {
						item.status = '未知';
					}
				})
				this.setState({
					data:rows,
					count:res.content.count,
				})
      },
      (err) => {
        console.log("failed" + err)
      }
    );
	}
  render() {
    return (
      <Layout className="layout">
				<Lheader history={this.props.history} menubox={"/producer/contractmanage"}></Lheader>
    		<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ background: '#fff', padding: 24, minHeight: 760 }} className="content">
					<Row className="topOne">
						<Row>
							<Col span={8}>
								<span className="welcomes">合同总览</span>
							</Col>
						</Row>
						<Row>
							<Col span={15} offset={1}>
								<Col span={3}>
									<div>
										<p className="itemName">全部</p>
										<p className="itemNumber">{this.state.totalNum}</p>
									</div>
								</Col>
								<Col span={3}>
									<p  className="itemName">待确认</p>
									<p className="itemNumber">{this.state.unconfirmedNum}</p>
								</Col>
								<Col span={3}>
									<div>
										<p className="itemName">待审批</p>
										<p className="itemNumber">{this.state.pendingNum}</p>
									</div>
								</Col>
								<Col span={3}>
									<div className="jingjiaCard">
										<div>
											<p className="itemName">已完成</p>
											<p className="itemNumber">{this.state.confirmedNum}</p>
										</div>
									</div>
								</Col>
								<Col span={3}>
									<div className="jingjiaCard">
										<div>
											<p className="itemName">取消</p>
											<p className="itemNumber">{this.state.cancelNum}</p>
										</div>
									</div>
								</Col>
							</Col>
							<Col span={8}>
								<Row>
									<div className="companyNameOne">
										{this.state.company}
									</div>
								</Row>
								<Row>
									<div className="iconGroup">
										<img src={Battery} alt="" style={{display:"bolck"}} className="icon-one" />
										<img src={Shield} alt="" style={{display:"bolck"}} className="icon-two" />
									</div>
								</Row>
							</Col>
						</Row>
					</Row>
					{/*<Row className="payClas">*/}
						{/*<Row>*/}
							{/*<h3>购电交易流程</h3>*/}
						{/*</Row>*/}
						{/*<Row>*/}
							{/*<div className="bgcImgs"></div>*/}
						{/*</Row>*/}
					{/*</Row>*/}
					<Row className="payLists">
						<Row>
							<h3 style={{marginTop:"20px"}}>合同列表</h3>
						</Row>
						<Row>
							<Col span={6}>
								<div className="inputVallue">
									<Search
										placeholder="请输入合同名称"
										onSearch={this.onChangeBarginName}
										enterButton
									/>
								</div>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<div className="radioClass">
									<span className="title">合同类型</span>
									<RadioGroup onChange={this.onStateChange} defaultValue="">
										<RadioButton value="">全部</RadioButton>
										<RadioButton value="UNCONFIRMED">长期协议</RadioButton>
										<RadioButton value="PENDING">月度竞价</RadioButton>
									</RadioGroup>
								</div>
							</Col>
							<Col span={6}>
								<div className="radioClass">
									<span className="title">交易类型</span>
									<RadioGroup onChange={this.onClassChange} defaultValue="">
										<RadioButton value="">全部</RadioButton>
										<RadioButton value="BIDDING">双边</RadioButton>
										<RadioButton value="BILATERAL">竞价</RadioButton>
									</RadioGroup>
								</div>
							</Col>
							<Col span={10}>
								<div className="radioClass">
									<span className="title">交易状态</span>
									<RadioGroup onChange={this.onStateChange} defaultValue="">
										<RadioButton value="">全部</RadioButton>
										<RadioButton value="UNCONFIRMED">待确认</RadioButton>
										<RadioButton value="PENDING">待审批</RadioButton>
										<RadioButton value="CONFIRMED">已完成</RadioButton>
										<RadioButton value="CANCEL">取消</RadioButton>
									</RadioGroup>
								</div>
							</Col>
						</Row>
						<Row>
							<Col span={16}></Col>
							<Col className="buttonGroups" span={8}>
								<Button type="primary" icon="upload" className="uploadBtn" onClick={()=>{this.props.history.push(`/producer/uploadcontract`)}}>上传合同</Button>
								<Button type="primary" icon="plus-square" onClick={()=>{this.props.history.push(`/producer/addnewcontract`)}}>新建合同</Button>
							</Col>
						</Row>
						<Row>
							<Col span={24} className="tableLists">
								<Table dataSource={this.state.data} columns={this.tableColumns} border={true} pagination={false} rowKey="id" history={this.props.history} />
							</Col>
						</Row>
					<Row>
						<LocaleProvider locale={zhCN}>
							<Pagination
								total={this.state.count}
								showTotal={total => `总共 ${total===null?0:total} 项`}
								defaultCurrent={1}
								showSizeChanger
								pageSizeOptions={['10','20','40']}
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