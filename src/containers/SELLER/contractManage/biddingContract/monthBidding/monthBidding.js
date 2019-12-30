import React from 'react';
import { Layout, Breadcrumb, Row, Col, Input, Radio, Table, Pagination, LocaleProvider, Button, Divider, message, Modal, AutoComplete } from 'antd';
// import { Link } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import fileDownload from 'react-file-download';
import Shield from '../../../../../components/icon/Shield.png';
import Battery from '../../../../../components/icon/Battery.png';
import './contractManage.less';
import Lheader from '../../../common/Iheader.js';
import Lfooter from '../../../../../components/layout/Ifooter.js';
import api from '../../../../../api/tools.js';
import axios from 'axios';
var basepath = api.basepath+"/";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Content } = Layout;
const Search = Input.Search;
export  default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sorter: {field: '', order: ''},
			pagination: {number: 1, size: 10},
			current: '1',
			userName: '',
			location: '合同管理/月度竞价合同',
			company: '',
			barginName: '',
			pageSize: 10,
			valuetype:'',
			valuestatus:'',
			count: 0,
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
			confirmedNum: 0,
			fileName:'',
			loading: false,
			visible: false,
			visibility: false,
			companyList: []
		};
	}
	componentDidMount() {
		this.handleConNum();
		this.handleParterCompany();
		this.handleTableList();
		this.setState({
			company: sessionStorage.company
		})
	}
		handleParterCompany = () => {
			const param = {
				companyName: ''
			}
			let headers = {
				'Authorization': sessionStorage.obj
			}
			let url='/api/company/partner/partner';
			api.get(url, headers, param,
				(res) => {
					let companyList = Array.from(res.content);
					let dataSource = [];
					companyList.forEach((item)=>{
						dataSource.push(item.partnerCompanyName);
					});
					this.setState({
						dataSource: dataSource,
						companyList: companyList
					})
				},
				(err) => {
					console.log("failed" , err);
				}
			);
		}
	get tableColumns() {
		return [{
			title: '合同名称',
			dataIndex: 'name',
			key: 'name',
		},{
			title: '合同类型',
			dataIndex: 'isOnline',
			align: 'center',
			key: 'isOnline',
		}, {
			title: '电量(万千瓦时)',
			dataIndex: 'power',
			key: 'power',
		},{
			title: '价差(元)',
			dataIndex: 'spread',
			key: 'spread',
		}, {
			title: '合同生效时间',
			dataIndex: 'effectiveTime',
			align: 'center',
			key: 'effectiveTime',
		}, {
			title: '合同截止时间',
			dataIndex: 'expiryTime',
			align: 'center',
			key: 'expiryTime',
		}, {
			title: '状态',
			dataIndex: 'status',
			align: 'center',
			key: 'status',
		}, {
			title: '操作',
			align: 'center',
			width: '250px',
			key: 'action',
			render: (text, record, index) => (
				<span>
					<a onClick={()=> this.handleDetail(text,record,index)}>查看</a>
					<Divider type="vertical" />
					<a onClick={()=> this.handleDownLoad(text,record,index)}>下载</a>
					<Divider type="vertical" />
					<a onClick={()=> this.handlePrint(text,record,index)}>打印</a>
					<Divider type="vertical" />
					{
						record.status === '待确认'?
						<a onClick={()=> this.showModal(text,record,index)}>提交审核</a> : <span>提交审核</span>
					}
				</span>
			)
		}];
	}
	showModal = (text,record,index) => {
    this.setState({
      visible: true,
    });
	}
	handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false, visibility: false });
  }
	handlePrint = (record) => {
		message.success('请点击打印按钮打印合同');
		this.props.history.push(`/seller/preview`);
	}
	handleDetail = (record) => {
		this.props.history.push(`/seller/biddingdetail/`+record.id);
	}
	handleDownLoad = (record) => {
		let contractId = record.id;
		let headers = {
			'authorization': sessionStorage.obj,
		}
		let url='/api/contract/file/download/bidding/' + contractId;
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
		let url='/api/contract/bidding/summary';
		api.get(url, headers, param,
		  (res) => {
				this.setState({
					approvedTotal: res.content.approvedTotal?res.content.approvedTotal:0,
					cancelTotal: res.content.cancelTotal?res.content.cancelTotal:0,
					confirmedTotal: res.content.confirmedTotal?res.content.confirmedTotal:0,
					pendingTotal: res.content.pendingTotal?res.content.pendingTotal:0,
					unapprovedTotal: res.content.unapprovedTotal?res.content.unapprovedTotal:0,
					unconfirmedTotal: res.content.unconfirmedTotal?res.content.unconfirmedTotal:0,
					totalNum : res.content.approvedTotal?res.content.approvedTotal:0 + res.content.cancelTotal?res.content.cancelTotal:0 + res.content.confirmedTotal?res.content.confirmedTotal:0 + res.content.pendingTotal?res.content.pendingTotal:0 + res.content.unapprovedTotal?res.content.unapprovedTotal:0 + res.content.unconfirmedTotal?res.content.unconfirmedTotal:0
				})
			},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
	handleTableList = (params) => {
		const param = {
			pageNo: 1,
			pageSize: 10,
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		let url='/api/contract/bidding/list';
		api.post(url, headers, param,
		  (res) => {
			let rows = res.content?res.content.list:[];
			rows.forEach((item, index) => {
				if (item.isOnline === true) {
					item.isOnline ='线上合同';
				} else if (item.isOnline === false) {
					item.isOnline = '线下合同';
				} else {
					item.isOnline = '未知';
				}
				if (item.status === 'UNCONFIRMED') {
					item.status = '待确认';
				} else if (item.status === 'CONFIRMED') {
					item.status = '已确认';
				} else if (item.status === 'REVOKED') {
					item.status = '已撤销';
				} else if (item.status === 'PENDING') {
					item.status = '待审核';
				} else if (item.status === 'APPROVED') {
					item.status = '审核通过';
				} else if (item.status === 'UNAPPROVED') {
					item.status = '审核未通过';
				} else {
					item.status = '未知';
				}
				let effective = new Date(item.effectiveTime);
				let effectiveYear = effective.getFullYear();
				let effectiveMonth = effective.getMonth() + 1;
				let effectiveDay = effective.getDate();
				let effectiveTime = effectiveYear+'-'+(effectiveMonth<10?'0'+effectiveMonth:effectiveMonth)+'-'+(effectiveDay<10?'0'+effectiveDay:effectiveDay);
				item.effectiveTime = effectiveTime;
				let expiry = new Date(item.expiryTime);
				let expiryYear = expiry.getFullYear();
				let expiryMonth = expiry.getMonth() + 1;
				let expiryDay = expiry.getDate();
				let expiryTime = expiryYear+'-'+(expiryMonth<10?'0'+expiryMonth:expiryMonth)+'-'+(expiryDay<10?'0'+expiryDay:expiryDay);
				item.expiryTime = expiryTime;
			})
			this.setState({
			  data:rows,
				count:res.content?res.content.total:0
			})
		},
		  (err) => {
				console.log("failed" + err);
		  }
		);
	}
	onChangeBarginName = (value) => {
		this.setState({ contractName: value });
    let params={
      pageNo: Number(this.state.current),
			pageSize: this.state.pageSize,
			contractName: value,
			year: this.state.year,
			status:this.state.valuestatus,
			isOnline: this.state.valuetype,
			companyName: this.state.companyName
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
    let url='/api/contract/bidding/list';
    api.post(url, headers, params,
      (res) => {
				let rows = res.content?res.content.list:[];
				rows.forEach((item, index)=>{
					if(item.isOnline === true) {
						item.isOnline ='线上合同';
					} else if (item.isOnline === false) {
						item.isOnline = '线下合同';
					} else {
						item.isOnline = '未知';
					}
					if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已确认';
					} else if (item.status === 'REVOKED') {
						item.status = '已撤销';
					} else if (item.status === 'PENDING') {
						item.status = '待审核';
					} else if (item.status === 'APPROVED') {
						item.status = '审核通过';
					} else if (item.status === 'UNAPPROVED') {
						item.status = '审核未通过';
					} else {
						item.status = '未知';
					}
				let effective = new Date(item.effectiveTime);
				let effectiveYear = effective.getFullYear();
				let effectiveMonth = effective.getMonth() + 1;
				let effectiveDay = effective.getDate();
				let effectiveTime = effectiveYear+'-'+(effectiveMonth<10?'0'+effectiveMonth:effectiveMonth)+'-'+(effectiveDay<10?'0'+effectiveDay:effectiveDay);
				item.effectiveTime = effectiveTime;
				let expiry = new Date(item.expiryTime);
				let expiryYear = expiry.getFullYear();
				let expiryMonth = expiry.getMonth() + 1;
				let expiryDay = expiry.getDate();
				let expiryTime = expiryYear+'-'+(expiryMonth<10?'0'+expiryMonth:expiryMonth)+'-'+(expiryDay<10?'0'+expiryDay:expiryDay);
				item.expiryTime = expiryTime;
				})
				this.setState({
					data:rows,
					count:res.content?res.content.total:0,
					contractName: value
				})
      },
      (err) => {
        console.log("failed" + err)
      }
    );
	}
	onClassChange = (e) => {
		this.setState({ valuetype: e.target.value===""? "":e.target.value==="true"? true: false });
		let params={
			pageNo: Number(this.state.current),
			pageSize: this.state.pageSize,
			contractName: this.state.contractName,
			year: this.state.year,
			status:this.state.status,
			isOnline: e.target.value===""? "":e.target.value==="true"? true: false,
			companyName: this.state.companyName
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
    let url='/api/contract/bidding/list'
    api.post(url, headers, params,
      (res) => {
				let rows = res.content?res.content.list:[];
				rows.forEach((item, index)=>{
					if(item.isOnline === true) {
						item.isOnline ='线上合同';
					} else if (item.isOnline === false) {
						item.isOnline = '线下合同';
					} else {
						item.isOnline = '未知';
					}
					if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已确认';
					} else if (item.status === 'REVOKED') {
						item.status = '已撤销';
					} else if (item.status === 'PENDING') {
						item.status = '待审核';
					} else if (item.status === 'APPROVED') {
						item.status = '审核通过';
					} else if (item.status === 'UNAPPROVED') {
						item.status = '审核未通过';
					} else {
						item.status = '未知';
					}
				let effective = new Date(item.effectiveTime);
				let effectiveYear = effective.getFullYear();
				let effectiveMonth = effective.getMonth() + 1;
				let effectiveDay = effective.getDate();
				let effectiveTime = effectiveYear+'-'+(effectiveMonth<10?'0'+effectiveMonth:effectiveMonth)+'-'+(effectiveDay<10?'0'+effectiveDay:effectiveDay);
				item.effectiveTime = effectiveTime;
				let expiry = new Date(item.expiryTime);
				let expiryYear = expiry.getFullYear();
				let expiryMonth = expiry.getMonth() + 1;
				let expiryDay = expiry.getDate();
				let expiryTime = expiryYear+'-'+(expiryMonth<10?'0'+expiryMonth:expiryMonth)+'-'+(expiryDay<10?'0'+expiryDay:expiryDay);
				item.expiryTime = expiryTime;
				})
				this.setState({
					data:rows,
					count:res.content?res.content.total:0,
				})
      },
      (err) => {
        console.log("failed" + err)
      }
    );
	}
	onStateChange = (e) => {
		this.setState({ status: e.target.value===""? "":e.target.value});
		let params={
			pageNo: Number(this.state.current),
			pageSize: this.state.pageSize,
			contractName: this.state.contractName,
			year: this.state.year,
			status:e.target.value===""? "":e.target.value,
			isOnline: this.state.valuetype,
			companyName: this.state.companyName
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
    let url='/api/contract/bidding/list';
    api.post(url, headers, params,
    	(res) => {
				let rows = res.content?res.content.list:[];
				rows.forEach((item, index)=>{
					if(item.isOnline === true) {
						item.isOnline ='线上合同';
					} else if (item.isOnline === false) {
						item.isOnline = '线下合同';
					} else {
						item.isOnline = '未知';
					}
					if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已确认';
					} else if (item.status === 'REVOKED') {
						item.status = '已撤销';
					} else if (item.status === 'PENDING') {
						item.status = '待审核';
					} else if (item.status === 'APPROVED') {
						item.status = '审核通过';
					} else if (item.status === 'UNAPPROVED') {
						item.status = '审核未通过';
					} else {
						item.status = '未知';
					}
				let effective = new Date(item.effectiveTime);
				let effectiveYear = effective.getFullYear();
				let effectiveMonth = effective.getMonth() + 1;
				let effectiveDay = effective.getDate();
				let effectiveTime = effectiveYear+'-'+(effectiveMonth<10?'0'+effectiveMonth:effectiveMonth)+'-'+(effectiveDay<10?'0'+effectiveDay:effectiveDay);
				item.effectiveTime = effectiveTime;
				let expiry = new Date(item.expiryTime);
				let expiryYear = expiry.getFullYear();
				let expiryMonth = expiry.getMonth() + 1;
				let expiryDay = expiry.getDate();
				let expiryTime = expiryYear+'-'+(expiryMonth<10?'0'+expiryMonth:expiryMonth)+'-'+(expiryDay<10?'0'+expiryDay:expiryDay);
				item.expiryTime = expiryTime;
				})
				this.setState({
					data:rows,
					count:res.content?res.content.total:0,
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
			pageNo: Number(current),
			pageSize: pageSize,
			contractName: this.state.contractName,
			year: this.state.year,
			status:this.state.status,
			isOnline: this.state.valuetype,
			companyName: this.state.companyName
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
    let url='/api/contract/bidding/list';
    api.post(url, headers, params,
    	(res) => {
				let rows = res.content?res.content.list:[];
				rows.forEach((item, index)=>{
					if(item.isOnline === true) {
						item.isOnline ='线上合同';
					} else if (item.isOnline === false) {
						item.isOnline = '线下合同';
					} else {
						item.isOnline = '未知';
					}
					if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已确认';
					} else if (item.status === 'REVOKED') {
						item.status = '已撤销';
					} else if (item.status === 'PENDING') {
						item.status = '待审核';
					} else if (item.status === 'APPROVED') {
						item.status = '审核通过';
					} else if (item.status === 'UNAPPROVED') {
						item.status = '审核未通过';
					} else {
						item.status = '未知';
					}
				let effective = new Date(item.effectiveTime);
				let effectiveYear = effective.getFullYear();
				let effectiveMonth = effective.getMonth() + 1;
				let effectiveDay = effective.getDate();
				let effectiveTime = effectiveYear+'-'+(effectiveMonth<10?'0'+effectiveMonth:effectiveMonth)+'-'+(effectiveDay<10?'0'+effectiveDay:effectiveDay);
				item.effectiveTime = effectiveTime;
				let expiry = new Date(item.expiryTime);
				let expiryYear = expiry.getFullYear();
				let expiryMonth = expiry.getMonth() + 1;
				let expiryDay = expiry.getDate();
				let expiryTime = expiryYear+'-'+(expiryMonth<10?'0'+expiryMonth:expiryMonth)+'-'+(expiryDay<10?'0'+expiryDay:expiryDay);
				item.expiryTime = expiryTime;
				})
				this.setState({
					data:rows,
					count:res.content?res.content.total: 0,
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
			pageNo: Number(pageNumber),
			pageSize: this.state.pageSize,
			contractName: this.state.contractName,
			year: this.state.year,
			status:this.state.status,
			isOnline: this.state.valuetype,
			companyName: this.state.companyName
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
    let url='/api/contract/bidding/list';
    api.post(url, headers, params,
    	(res) => {
				let rows = res.content?res.content.list:[];
				rows.forEach((item, index)=>{
					if(item.isOnline === true) {
						item.isOnline ='线上合同';
					} else if (item.isOnline === false) {
						item.isOnline = '线下合同';
					} else {
						item.isOnline = '未知';
					}
					if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已确认';
					} else if (item.status === 'REVOKED') {
						item.status = '已撤销';
					} else if (item.status === 'PENDING') {
						item.status = '待审核';
					} else if (item.status === 'APPROVED') {
						item.status = '审核通过';
					} else if (item.status === 'UNAPPROVED') {
						item.status = '审核未通过';
					} else {
						item.status = '未知';
					}
				let effective = new Date(item.effectiveTime);
				let effectiveYear = effective.getFullYear();
				let effectiveMonth = effective.getMonth() + 1;
				let effectiveDay = effective.getDate();
				let effectiveTime = effectiveYear+'-'+(effectiveMonth<10?'0'+effectiveMonth:effectiveMonth)+'-'+(effectiveDay<10?'0'+effectiveDay:effectiveDay);
				item.effectiveTime = effectiveTime;
				let expiry = new Date(item.expiryTime);
				let expiryYear = expiry.getFullYear();
				let expiryMonth = expiry.getMonth() + 1;
				let expiryDay = expiry.getDate();
				let expiryTime = expiryYear+'-'+(expiryMonth<10?'0'+expiryMonth:expiryMonth)+'-'+(expiryDay<10?'0'+expiryDay:expiryDay);
				item.expiryTime = expiryTime;
				})
				this.setState({
					data:rows,
					count:res.content?res.content.total: 0,
				})
      },
      (err) => {
        console.log("failed" + err)
      }
    );
	}
	onTimeChange = (value) => {
		if(value.length===4){
			if(/^[1-9]\d{3}$/.test(value)){
				this.setState({year: value});
				let params={
					pageNo: Number(this.state.current),
					pageSize: this.state.pageSize,
					contractName: this.state.contractName,
					year: value,
					status:this.state.status,
					isOnline: this.state.valuetype,
					companyName: this.state.companyName
				};
				let headers = {
					'Authorization': sessionStorage.obj
				};
				let url='/api/contract/bidding/list';
				api.post(url, headers, params,
					(res) => {
						let rows = res.content?res.content.list:[];
						rows.forEach((item, index)=>{
							if(item.isOnline === true) {
								item.isOnline ='线上合同';
							} else if (item.isOnline === false) {
								item.isOnline = '线下合同';
							} else {
								item.isOnline = '未知';
							}
							if (item.status === 'UNCONFIRMED') {
								item.status = '待确认';
							} else if (item.status === 'CONFIRMED') {
								item.status = '已确认';
							} else if (item.status === 'REVOKED') {
								item.status = '已撤销';
							} else if (item.status === 'PENDING') {
								item.status = '待审核';
							} else if (item.status === 'APPROVED') {
								item.status = '审核通过';
							} else if (item.status === 'UNAPPROVED') {
								item.status = '审核未通过';
							} else {
								item.status = '未知';
							}
							let effective = new Date(item.effectiveTime);
							let effectiveYear = effective.getFullYear();
							let effectiveMonth = effective.getMonth() + 1;
							let effectiveDay = effective.getDate();
							let effectiveTime = effectiveYear+'-'+(effectiveMonth<10?'0'+effectiveMonth:effectiveMonth)+'-'+(effectiveDay<10?'0'+effectiveDay:effectiveDay);
							item.effectiveTime = effectiveTime;
							let expiry = new Date(item.expiryTime);
							let expiryYear = expiry.getFullYear();
							let expiryMonth = expiry.getMonth() + 1;
							let expiryDay = expiry.getDate();
							let expiryTime = expiryYear+'-'+(expiryMonth<10?'0'+expiryMonth:expiryMonth)+'-'+(expiryDay<10?'0'+expiryDay:expiryDay);
							item.expiryTime = expiryTime;
						})
						this.setState({
							data:rows,
							count:res.content?res.content.total: 0,
						})
					},
					(err) => {
						console.log("failed" + err)
					}
				);
			} else {
				message.error('请输入正确的日期格式');
			}
		} else if(value===''){
			let params={
				pageNo: this.state.current,
				pageSize: this.state.pageSize,
				contractName: this.state.contractName,
				year: value,
				status:this.state.status,
				isOnline: this.state.valuetype,
				companyId: this.state.companyId
			};
			let headers = {
				'Authorization': sessionStorage.obj
			};
			let url='/api/contract/bidding/list';
			api.post(url, headers, params,
				(res) => {
					let rows = res.content?res.content.list:[];
					rows.forEach((item, index)=>{
						if(item.isOnline === true) {
							item.isOnline ='线上合同';
						} else if (item.isOnline === false) {
							item.isOnline = '线下合同';
						} else {
							item.isOnline = '未知';
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
						count:res.content?res.content.total: 0,
					})
				},
				(err) => {
					console.log("failed" + err)
				}
			);
		} else if(value.length===7){
			if(/^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(value)) {
				this.setState({year: value});
				let params={
					pageNo: Number(this.state.current),
					pageSize: this.state.pageSize,
					contractName: this.state.contractName,
					year: value,
					status:this.state.status,
					isOnline: this.state.valuetype,
					companyName: this.state.companyName
				};
				let headers = {
					'Authorization': sessionStorage.obj
				};
				let url='/api/contract/bidding/list';
				api.post(url, headers, params,
					(res) => {
						let rows = res.content?res.content.list:[];
						rows.forEach((item, index)=>{
							if(item.isOnline === true) {
								item.isOnline ='线上合同';
							} else if (item.isOnline === false) {
								item.isOnline = '线下合同';
							} else {
								item.isOnline = '未知';
							}
							if (item.status === 'UNCONFIRMED') {
								item.status = '待确认';
							} else if (item.status === 'CONFIRMED') {
								item.status = '已确认';
							} else if (item.status === 'REVOKED') {
								item.status = '已撤销';
							} else if (item.status === 'PENDING') {
								item.status = '待审核';
							} else if (item.status === 'APPROVED') {
								item.status = '审核通过';
							} else if (item.status === 'UNAPPROVED') {
								item.status = '审核未通过';
							} else {
								item.status = '未知';
							}
							let effective = new Date(item.effectiveTime);
							let effectiveYear = effective.getFullYear();
							let effectiveMonth = effective.getMonth() + 1;
							let effectiveDay = effective.getDate();
							let effectiveTime = effectiveYear+'-'+(effectiveMonth<10?'0'+effectiveMonth:effectiveMonth)+'-'+(effectiveDay<10?'0'+effectiveDay:effectiveDay);
							item.effectiveTime = effectiveTime;
							let expiry = new Date(item.expiryTime);
							let expiryYear = expiry.getFullYear();
							let expiryMonth = expiry.getMonth() + 1;
							let expiryDay = expiry.getDate();
							let expiryTime = expiryYear+'-'+(expiryMonth<10?'0'+expiryMonth:expiryMonth)+'-'+(expiryDay<10?'0'+expiryDay:expiryDay);
							item.expiryTime = expiryTime;
						})
						this.setState({
							data:rows,
							count:res.content?res.content.total: 0,
						})
					},
					(err) => {
						console.log("failed" + err)
					}
				);
			} else {
				message.error('请输入正确的日期格式');
			}
		} else {
			message.error('请输入正确的日期格式');
		}
	}
	handleParter = (value) => {
		this.setState({
			companyName: value === undefined ? '' : value
		});
		let params = {
			pageNo: Number(this.state.current),
			pageSize: this.state.pageSize,
			contractName: this.state.contractName,
			year: this.state.year,
			status: this.state.status,
			isOnline: this.state.valuetype,
			companyName: value === undefined ? '' : value
		};
		let headers = {
			'Authorization': sessionStorage.obj
		};
		let url='/api/contract/bidding/list';
		api.post(url, headers, params,
			(res) => {
				let rows = res.content ? res.content.plans : [];
				rows.forEach((item, index) => {
					if (item.isOnline === true) {
						item.isOnline = '线上合同';
					} else if (item.isOnline === false) {
						item.isOnline = '线下合同';
					} else {
						item.isOnline = '未知';
					}
					if (item.status === 'UNCONFIRMED') {
						item.status = '待确认';
					} else if (item.status === 'CONFIRMED') {
						item.status = '已确认';
					} else if (item.status === 'REVOKED') {
						item.status = '已撤销';
					} else if (item.status === 'PENDING') {
						item.status = '待审核';
					} else if (item.status === 'APPROVED') {
						item.status = '审核通过';
					} else if (item.status === 'UNAPPROVED') {
						item.status = '审核未通过';
					} else {
						item.status = '未知';
					}
					let effective = new Date(item.effectiveTime);
					let effectiveYear = effective.getFullYear();
					let effectiveMonth = effective.getMonth() + 1;
					let effectiveDay = effective.getDate();
					let effectiveTime = effectiveYear + '-' + (effectiveMonth < 10 ? '0' + effectiveMonth : effectiveMonth) + '-' + (effectiveDay<10?'0'+effectiveDay:effectiveDay);
					item.effectiveTime = effectiveTime;
					let expiry = new Date(item.expiryTime);
					let expiryYear = expiry.getFullYear();
					let expiryMonth = expiry.getMonth() + 1;
					let expiryDay = expiry.getDate();
					let expiryTime = expiryYear + '-' + (expiryMonth < 10 ? '0' + expiryMonth : expiryMonth) + '-' + (expiryDay<10?'0'+expiryDay:expiryDay);
					item.expiryTime = expiryTime;
				})
				this.setState({
					data: rows,
					count: res.content ? res.content.total : 0,
				})
			},
			(err) => {
				console.log("failed" + err)
			}
		);
	}
  render() {
		const { visible, loading, location, count,approvedTotal,cancelTotal,confirmedTotal,pendingTotal,unapprovedTotal,unconfirmedTotal, company, dataSource } = this.state;
    return (
      <Layout className="layout">
				<Lheader history={this.props.history} menubox={"/seller/biddingcontract"}></Lheader>
    		<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{location}</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ background: '#fff', padding: 24, minHeight: 760 }} className="content">
					<Row className="topOne">
						<Row>
							<Col span={8}>
								<h3 className="welcomes">月度竞价合同总览</h3>
							</Col>
						</Row>
						<Row>
						<Col span={20}>
								<Col span={2}>
									<div>
										<p className="itemName">全部</p>
										<p className="itemNumber">{count}</p>
									</div>
								</Col>
								<Col span={3}>
									<p  className="itemName">待确认</p>
									<p className="itemNumber">{unconfirmedTotal}</p>
								</Col>
								<Col span={3}>
									<p  className="itemName">已确认</p>
									<p className="itemNumber">{confirmedTotal}</p>
								</Col>
								<Col span={3}>
									<div>
										<p className="itemName">已撤销</p>
										<p className="itemNumber">{cancelTotal}</p>
									</div>
								</Col>
								<Col span={3}>
									<div className="jingjiaCard">
										<div>
											<p className="itemName">待审核</p>
											<p className="itemNumber">{pendingTotal}</p>
										</div>
									</div>
								</Col>
								<Col span={3}>
									<div className="jingjiaCard">
										<div>
											<p className="itemName">审核通过</p>
											<p className="itemNumber">{approvedTotal}</p>
										</div>
									</div>
								</Col>
								<Col span={3}>
									<div className="jingjiaCard">
										<div>
											<p className="itemName">审核未通过</p>
											<p className="itemNumber">{unapprovedTotal}</p>
										</div>
									</div>
								</Col>
							</Col>
							<Col span={4}>
								<Row>
									<div className="companyNameOne">
										{company}
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
							<h3 style={{marginTop:"20px"}}>月度竞价合同列表</h3>
						</Row>
						<Row>
							<Col span={8}>
								<div className="radioClass">
									<span className="title">合同名称</span>
									<Search
										style={{ width: 334 }}
										placeholder="请输入合同名称"
										onSearch={this.onChangeBarginName}
									/>
								</div>
							</Col>
							<Col span={8}>
								<div className="radioClass">
									<span className="title">时间查询</span>
									{/* <MonthPicker onChange={this.onTimeChange} placeholder="请选择月份" style={{ width: 334 }} locale={locale} /> */}
									<Search
										style={{ width: 334 }}
										placeholder="请输入查询时间  (例如2018或2018-01)"
										onSearch={this.onTimeChange}
									/>
								</div>
							</Col>
							<Col span={8}>
								<div className="radioClass">
									<span className="title">公司列表</span>
									<AutoComplete
										style={{ width: 382 }}
										dataSource={dataSource}
										placeholder="请输入关键词"
										filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
										onChange={this.handleParter}
										onSelect={this.handleParter}
									/>
								</div>
							</Col>
							{/* <Col span={8}>
								<div className="radioClass">
									<span className="title">合作企业</span>
									<Select placeholder="请选择合作企业" style={{ width: 334 }} allowClear={true} onChange={this.handleParter}>
										{
											companyList.map((item)=>{
												return (
													<Option value={item.companyId} key={item.companyId}>{item.companyName}</Option>
												)
											})
										}
									</Select>
								</div>
							</Col> */}
						</Row>
						<Row>
							<Col span={8}>
								<div className="radioClass">
									<span className="title">合同类型</span>
									<RadioGroup onChange={this.onClassChange} defaultValue="">
										<RadioButton value="">全部</RadioButton>
										<RadioButton value="true">线上合同</RadioButton>
										<RadioButton value="false">线下合同</RadioButton>
									</RadioGroup>
								</div>
							</Col>
							<Col span={16}>
								<div className="radioClass">
									<span className="title">交易状态</span>
									<RadioGroup onChange={this.onStateChange} defaultValue="">
										<RadioButton value="">全部</RadioButton>
										<RadioButton value="UNCONFIRMED">待确认</RadioButton>
										<RadioButton value="REVOKED">已撤销</RadioButton>
										<RadioButton value="PENDING">待审核</RadioButton>
										<RadioButton value="APPROVED">审核通过</RadioButton>
										<RadioButton value="UNAPPROVED">审核未通过</RadioButton>
									</RadioGroup>
								</div>
							</Col>
						</Row>
						<Row>
							<Col span={16}></Col>
							<Col className="buttonGroups" span={8}>
								{/* <Button type="primary" className="uploadBtn" onClick={()=>{this.props.history.push(`/seller/uploadcontract`)}}>新建线下合同</Button> */}
								{/* <Button type="primary" onClick={()=>{this.props.history.push(`/seller/biddingadd`)}}>新建线上合同</Button> */}
							</Col>
						</Row>
						<Row>
							<Col span={24} className="tableLists">
								<Table dataSource={this.state.data} columns={this.tableColumns} border={true} pagination={false} rowKey="id" history={this.props.history}
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
		<Row>
			<Modal
				visible={visible}
				title="提交合同"
				onOk={this.handleOk}
				onCancel={this.handleCancel}
				footer={[
					<Button key="back" onClick={this.handleCancel}>取消</Button>,
					<Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
						确认提交
					</Button>,
				]}
			>
				<p id="msgInfo">您确认要提交本合同吗?(合同提交后不可撤回)</p>
				{/*<Link to="/tradingcontract" id="msgTips">前往(仿真)交易中心查看</Link>*/}
			</Modal>
		</Row>
  	<Lfooter></Lfooter>
  	</Layout>
    )
  }
}