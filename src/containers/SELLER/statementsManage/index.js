import React from 'react';
import {
  Layout,
  Breadcrumb,
  Modal,
  Tabs,
  Button,
  Select,
  Table,
  Form,
  Spin,
  Input,
  InputNumber,
  DatePicker,
  message,
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import ContentBox from '../../../components/ContentBox';
import api from '../../../api/tools';

import './index.less';
import batteryIcon from '../../../components/icon/battery-circle.png';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import zhCN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import { getYearOptions } from '../../utils/utils';

const { Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;
const FormItem = Form.Item;
const feeCoefficient = 1.17; // 含税费率系数
const initMonthStatus = [
  "NO_DATA",
  "NO_DATA",
  "NO_DATA",
  "NO_DATA",
  "NO_DATA",
  "NO_DATA",
  "NO_DATA",
  "NO_DATA",
  "NO_DATA",
  "NO_DATA",
  "NO_DATA",
  "NO_DATA"
];

/* 弹框表单布局 */
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const statusMap = {confirmed: '已确认', checked: '已校核', pendingEntry: '待录入'};

class statementsManage extends React.Component {
  constructor() {
    super();
    this.state = {
      modalShow: false, // 结算单录入弹框控制
      monthStatus: [...initMonthStatus], // 每个月的状态
      selectedMonth: 10, // 选中的月份
      selectedYear: 2018, // 选中年份
      statementsTotal: { //结算单概况
        confirmed: 0,
        forEntry: 0,
        total: 0,
        unconfirmed: 0,
      },
      filter: { // 数据筛选
        status: 'all', // 结算状态
        settle: 'all', // 结算电量
        split: 'all', // 分解电量
        actual: 'all', // 实际电量
      },
      mainSpinning: 0, // 加载状态
      editing: false, // 是否正在编辑表格
      editingIndex: 0, // 正在编辑的行标
      modalTableList: [{id: 1, name: '江南第一机电厂', orderId: '201809', rateH: 17.5, rate: 10, explainPower: 30, balancePower: 30, actualPower: 30, status: 'confirmed'},
        {id: 2, name: '华北农业基地', orderId: '201809', rateH: 17.5, rate: 10, explainPower: 40, balancePower: 44, actualPower: 30, status: 'confirmed'},
      ], // 弹框表格数据列表
      list: [{id: 1, name: '江南第一机电厂', orderId: '201809', rateH: 17.5, rate: 10, explainPower: 30, balancePower: 30, actualPower: 30, status: 'confirmed'},
        {id: 2, name: '华北农业基地', orderId: '201809', rateH: 17.5, rate: 10, explainPower: 40, balancePower: 44, actualPower: 30, status: 'confirmed'},
      ], // 表格数据
    };
  }

  mainSpinning = 0; // 加载状态控制

  /* 获取电费管理概况数据 */
  getSummaryData = (year, month) => {
    const strMonth = `${year}-${this.getTwoDegreeMonth(month)}`;
    const url =  `/api/settlement/summary/${strMonth}`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.get(url, {}, {},
      (res) => {
        const data = res.content;
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
          statementsTotal: data,
        })
      },
      (err) => {
        message.error(err.message);
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 获取电费结算单列表 */
  getStatementsList = (year, month) => {
    const strMonth = `${year}-${this.getTwoDegreeMonth(month)}`;
    const url =  `/api/settlement/list/${strMonth}`;
    api.post(url, {}, {},
      (res) => {
        const data = res.content;
        if (data) {
          this.setState({
            list: data,
            modalTableList: data,
          })
        }
      },
      (err) => {
        message.error(err.message);
        console.log("failed" + err);
      }
    );
  };

  /* modal点击确定执行事件 */
  modalOk = () => {
    const { getFieldValue } = this.props.form;
    const { modalTableList, selectedMonth, selectedYear } = this.state;
    const batchNum = getFieldValue('modalBatchNum');
    const settlementPOS = [];
    modalTableList.forEach(item => {
      settlementPOS.push({
        id: item.id,
        agentFee: Number(item.agentFee),
        actualPower: Number(item.actualPower),
        settlementPower: Number(item.settlementPower)
      });
    });

    const url =  `/api/settlement/update`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning--,
    });
    api.post(url, {}, {
        batchNum,
        settlementPOS,
      },
      (res) => {
        message.info('操作成功！');
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
          modalShow: false,
        });
        this.getData(selectedYear, selectedMonth);
      },
      (err) => {
        message.error(err.message);
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 选择月份 */
  choseMonth = (index) => {
    const { selectedYear } = this.state;
    this.setState({selectedMonth: index+1});
    this.getData(selectedYear, index+1);
  };

  /* 选择年 */
  selectYear = (value) => {
    const { selectedMonth } = this.state;
    this.setState({
      selectedYear: value,
      monthStatus: [...initMonthStatus],
    });
    this.getData(value, selectedMonth);
  };

  // 点击修改行记录
  editRow = (index) => {
    this.setState({
      editing: true,
      editingIndex: index
    });
  };

  // 判断某一行是否正在编辑
  isEditing = (index) => {
    const { editing, editingIndex } = this.state;
    return editing && editingIndex === index;
  };

  // 取消编辑
  cancelEdit = () => {
    this.setState({editing: false});
  };

  // 保存编辑
  saveEdit = (record) => {
    const { validateFields } = this.props.form;
    const dataIndexArr = ['orderIdInput', 'rate', 'settlementPowerInput', 'actualPowerInput'];
    validateFields(dataIndexArr, (errs, values) => {
      if (!errs) {
        this.mainSpinning++;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
        const url = '/api/settlement/update';
        const params = {
          batchNum: values.orderIdInput,
          settlementPOS: [{
            "actualPower": values.actualPowerInput,
            "agentFee": Number(values.rate),
            "id": record.id,
            "settlementPower": values.settlementPowerInput
          }]
        };
        api.post(url, {}, params,
          (res) => {
            message.success('修改成功！');
            this.mainSpinning--;
            this.setState({
              editing: false,
              mainSpinning: this.mainSpinning,
            });
            const { selectedYear, selectedMonth } = this.state;
            this.getData(selectedYear, selectedMonth);
          },
          (err) => {
            message.error('修改失败！');
            console.log("failed" + err);
            this.mainSpinning--;
            this.setState({
              mainSpinning: this.mainSpinning,
            });
          }
        );
      }
    });
  };

  // 弹框代理费率输入改变
  modalFeeChange = (val, index) => {
    const { modalTableList } = this.state;
    modalTableList[index].agentFee = val;
    this.setState({
      modalTableList,
    });
  };

  // 弹框结算电量输入改变
  modalSettlementChange = (val, index) => {
    const { modalTableList } = this.state;
    modalTableList[index].settlementPower = val;
    this.setState({
      modalTableList,
    });
  };

  // 弹框实际电量输入改变
  modalActualChange = (val, index) => {
    const { modalTableList } = this.state;
    modalTableList[index].actualPower = val;
    this.setState({
      modalTableList,
    });
  };

  /* 录入弹框表格列模型 */
  getModalTableColumns = () => {
    const { getFieldDecorator } = this.props.form;
    return [{
      title: '客户',
      dataIndex: 'customerName',
      key: 'customerName',
      align: 'center',
      width: '15%'
    }, {
      title: '分解电量',
      dataIndex: 'splitPower',
      align: 'center',
      key: 'splitPower',
      render: (text) => {
        return text === null ? '-' : text;
      },
      width: '10%'
    }, {
      title: '结算电量',
      dataIndex: 'settlementPower',
      align: 'center',
      key: 'settlementPower',
      render :(text, record, index) => {
        return (
          <FormItem>
            {getFieldDecorator(`settlementPowerInput${index}`, {
              initialValue: text
            })(
              <InputNumber onChange={(text) => {this.modalSettlementChange(text, index)}} />
            )}
          </FormItem>
        );
      },
      width: '10%'
    }, {
      title: '实际电量',
      dataIndex: 'actualPower',
      align: 'center',
      key: 'actualPower',
      render :(text, record, index) => {
        return (
          <FormItem>
            {getFieldDecorator(`actualPowerInput${index}`, {
              initialValue: text
            })(
              <InputNumber onChange={(text) => {this.modalActualChange(text, index)}} />
            )}
          </FormItem>
        );
      },
      width: '10%'
    }, {
      title: '代理费率（%）',
      dataIndex: 'agentFee',
      align: 'center',
      key: 'agentFee',
      render :(text, record, index) => {
        return (
          <FormItem>
            {getFieldDecorator(`agentFee${index}`, {
              initialValue: text
            })(
              <InputNumber onChange={(text) => {this.modalFeeChange(text, index)}} />
            )}
          </FormItem>
        );
      },
      width: '10%'
    }, {
      title: '含税费率（%）',
      dataIndex: 'agentFee',
      align: 'center',
      key: 'agentFeeH',
      render: (text) => {
        return text === null ? '-' : (Number(text)*feeCoefficient).toFixed(2);
      },
      width: '13%'
    }];
  };

  /* 表格列模型 */
  getTableColumns = () => {
    const { getFieldDecorator } = this.props.form;
    return [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '5%'
    }, {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      align: 'center',
      width: '15%'
    }, {
      title: '交易批次',
      dataIndex: 'batchNum',
      align: 'center',
      render :(text, record, index) => {
        if (this.isEditing(index)) {
          return (
            <FormItem>
              {getFieldDecorator('orderIdInput', {
                initialValue: text
              })(
                <Input />
              )}
            </FormItem>
          );
        }
        return text;
      },
      key: 'batchNum',
      width: '10%'
    }, {
      title: '代理费率（含税）',
      dataIndex: 'agentFee',
      align: 'center',
      key: 'agentFeeH',
      render: (text) => {
        return text === null ? '-' : (Number(text)*feeCoefficient).toFixed(2);
      },
      width: '13%'
    }, {
      title: '代理费率',
      dataIndex: 'agentFee',
      align: 'center',
      render :(text, record, index) => {
        if (this.isEditing(index)) {
          return (
            <FormItem>
              {getFieldDecorator('rate', {
                initialValue: text
              })(
                <InputNumber />
              )}
            </FormItem>
          );
        }
        return text === null ? '-' : text;
      },
      key: 'agentFee',
      width: '10%'
    }, {
      title: '分解电量',
      dataIndex: 'splitPower',
      align: 'center',
      render: (text) => {
        return text === null ? '-' : text;
      },
      key: 'explainPower',
      width: '10%'
    }, {
      title: '结算电量',
      dataIndex: 'settlementPower',
      align: 'center',
      key: 'settlementPower',
      render :(text, record, index) => {
        if (this.isEditing(index)) {
          return (
            <FormItem>
              {getFieldDecorator('settlementPowerInput', {
                initialValue: text
              })(
                <InputNumber />
              )}
            </FormItem>
          );
        }
        return text === null ? '-' : text;;
      },
      width: '10%'
    }, {
      title: '实际电量',
      dataIndex: 'actualPower',
      align: 'center',
      key: 'actualPower',
      render :(text, record, index) => {
        if (this.isEditing(index)) {
          return (
            <FormItem>
              {getFieldDecorator('actualPowerInput', {
                initialValue: text
              })(
                <InputNumber />
              )}
            </FormItem>
          );
        }
        return text === null ? '-' : text;
      },
      width: '10%'
    },
    //   {
    //   title: '状态',
    //   dataIndex: 'orderFieldType',
    //   align: 'center',
    //   key: 'orderFieldType',
    //   render :(text, record, index) => {
    //     if (this.isEditing(index)) {
    //       return (
    //         <FormItem>
    //           {getFieldDecorator('statementsStatusInput', {
    //             initialValue: text
    //           })(
    //             <Select>
    //               <Option value='checked'>已校核</Option>
    //               <Option value='confirmed'>已确认</Option>
    //               <Option value='pendingEntry'>待录入</Option>
    //             </Select>
    //           )}
    //         </FormItem>
    //       );
    //     }
    //     return statusMap[text];
    //   },
    //   width: '10%'
    // },
      {
      title: '操作',
      align: 'center',
      key: 'action',
      render: (text, record, index) => {
        const isEditing = this.isEditing(index);
        return (
          isEditing ? (
            <span className="action-column">
              <a onClick={this.saveEdit.bind(this, record)}>确定</a>
              <a onClick={this.cancelEdit}>取消</a>
            </span>
          ) : (
            <span className="action-column">
              <a onClick={this.editRow.bind(this, index)}>修改</a>
            </span>
          )
        );
      }
    }];
  };

  /* 取数 */
  getData = (year, month) => {
    this.getSummaryData(year, month);
    this.getStatementsList(year, month);
  };

  componentDidMount() {
    const { selectedYear, selectedMonth } = this.state;
    this.getData(selectedYear, selectedMonth);
  };

  /* 过滤条件改变 */
  filterChange = (value, type) => {
    const { filter } = this.state;
    filter[type] = value;
    this.setState({
      filter,
    })
  };

  /* 获取两位数字的月 */
  getTwoDegreeMonth = (month) => {
    let strM = `0${month}`;
    return strM.slice(strM.length - 2);
  };


  render() {
    const {
      monthStatus,
      selectedMonth,
      list,
      modalTableList,
      modalShow,
      selectedYear,
      filter,
      mainSpinning,
      statementsTotal,
    } = this.state;
    const { getFieldDecorator } = this.props.form;

    const date = new Date();
    const curMonth = date.getMonth();
    const curYear = date.getFullYear();

    if (curYear === selectedYear && curMonth === (selectedMonth - 1)) {
      monthStatus[curMonth] = 'UNDERWAY';
    }


    /* 客户名称 */
    const customerName = (
      <FormItem
        {...formItemLayout}
        label="客户名称"
      >
        {getFieldDecorator('name', {
          rules: [{
            required: true, message: '请填写客户名称！',
          }],
        })(
          <Input type="text"/>
        )}
      </FormItem>
    );
    let showList = [];
    /* 数据过滤 */
    showList = list.filter(item => { // 分解电量
      switch(filter.split) {
        case 'data':{
          return item.splitPower !== null;
        }
        case 'noData':
          return item.splitPower === null;
        default:
          return true;
      }
    });

    /* 结算电量 */
    showList = showList.filter(item => { // 分解电量
      switch(filter.settle) {
        case 'data':
          return item.settlementPower !== null;
        case 'noData':
          return item.settlementPower === null;
        default:
          return true;
      }
    });

    /* 实际电量 */
    showList = showList.filter(item => { // 分解电量
      switch(filter.actual) {
        case 'data':
          return item.actualPower !== null;
        case 'noData':
          return item.actualPower === null;
        default:
          return true;
      }
    });

    let iconColor = 'icon-color-gray';
    let iconText = '无数据';
    let iconShow = false;
    switch(monthStatus[selectedMonth - 1]) {
      case 'COMPLETED': {
        iconColor = 'icon-color-blue';
        iconText = '已完成';
        iconShow = false;
        break;
      }
      case 'UNDERWAY': {
        iconColor = 'icon-color-green';
        iconText = '进行中';
        iconShow = true;
        break;
      }
    }

    return (
      <Layout locale={zhCN}>
        {/* 头部header */}
        <Lheader history={this.props.history} menubox={"/seller/statements"}></Lheader>
        <Content style={{padding: '0 50px'}}>
          {/* 面包屑 */}
          <div style={{margin: '16px 0'}}>
            <span>您当前的位置:   </span><Breadcrumb.Item className="location">结算管理</Breadcrumb.Item>
            <Breadcrumb.Item>电费管理</Breadcrumb.Item>
          </div>
          {/* 内容 */}
          <Spin
            spinning={Boolean(mainSpinning)}
            tip="加载中..."
            size="large"
          >
            <div style={{minHeight: 762}} className="statements-main">
              <div>
                <Select onChange={this.selectYear} defaultValue={selectedYear}>
                  {
                    getYearOptions()
                  }
                </Select>
              </div>
              <div className="month-list">
                {
                  monthStatus.map((item, index) => {
                    let bgText = '无数据';
                    let bgColor = 'bg-gray';
                    switch(item) {
                      case 'COMPLETED': {
                        bgColor = 'bg-blue';
                        bgText = '已完成';
                        break;
                      }
                      case 'UNDERWAY': {
                        bgColor = 'bg-green';
                        bgText = '进行中';
                        break;
                      }
                    }
                    return (
                      <div key={index} onClick={this.choseMonth.bind(this, index)} className={`month-item ${bgColor} ${index === selectedMonth - 1 ? 'month-active' : ''}`}>
                        <div>{this.getTwoDegreeMonth(index + 1)}月</div>
                      </div>
                    );
                  })
                }
              </div>
              <ContentBox
                title="电费管理"
                style={{marginTop: '5px'}}
                titleStyle={{borderColor: 'white', fontWeight: 'bold', paddingRight: '40px'}}
              >
                <div className="title-box">
                  <span>{selectedYear}年{this.getTwoDegreeMonth(selectedMonth)}月 电费结算单</span>
                  {
                    iconShow ? (
                      <div className={`icon-doing ${iconColor}`}><span className="icon-text">{iconText}</span></div>
                    ) : ''
                  }
                </div>
                <div className="statements-total-box">
                  <div className="statements-total">
                    <div className="title-item">
                      <span>全部</span>
                      <span>{statementsTotal.total || 0}</span>
                    </div>
                    {/*<div className="title-item">*/}
                      {/*<span>已校核</span>*/}
                      {/*<span>{statementsTotal.unconfirmed || 0}</span>*/}
                    {/*</div>*/}
                    {/*<div className="title-item">*/}
                      {/*<span>已确认</span>*/}
                      {/*<span>{statementsTotal.confirmed || 0}</span>*/}
                    {/*</div>*/}
                    {/*<div className="title-item">*/}
                      {/*<span>待录入</span>*/}
                      {/*<span>{statementsTotal.forEntry || 0}</span>*/}
                    {/*</div>*/}
                  </div>
                  <Button onClick={() => {this.setState({modalShow: true})}} type="primary">结算单录入</Button>
                </div>
              </ContentBox>
              <ContentBox
                title="数据筛选"
                style={{marginTop: '2px'}}
                titleStyle={{borderColor: '#009DFF', fontWeight: 'bold', paddingRight: '40px'}}
              >
                <div style={{margin: '20px 40px'}}>
                  <Form
                    layout="inline"
                  >
                    {/*<FormItem

                      label="结算状态"
                    >
                      {getFieldDecorator('statementsStatus', {
                        initialValue: 'all'
                      })(
                        <Select onChange={(value) => {this.filterChange(value, 'status')}}>
                          <Option value='all'>全部</Option>
                          <Option value='checked'>已校核</Option>
                          <Option value='confirmed'>已确认</Option>
                          <Option value='pendingEntry'>待录入</Option>
                        </Select>
                      )}
                    </FormItem>*/}
                    <FormItem
                      label="分解电量"
                    >
                      {getFieldDecorator('explainPower', {
                        initialValue: 'all'
                      })(
                        <Select onChange={(value) => {this.filterChange(value, 'split')}}>
                          <Option value='all'>全部</Option>
                          <Option value='data'>有数据</Option>
                          <Option value='noData'>无数据</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                      label="结算电量"
                    >
                      {getFieldDecorator('balancePower', {
                        initialValue: 'all'
                      })(
                        <Select onChange={(value) => {this.filterChange(value, 'settle')}}>
                          <Option value='all'>全部</Option>
                          <Option value='data'>有数据</Option>
                          <Option value='noData'>无数据</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                      label="实际电量"
                    >
                      {getFieldDecorator('actualPower', {
                        initialValue: 'all'
                      })(
                        <Select onChange={(value) => {this.filterChange(value, 'actual')}}>
                          <Option value='all'>全部</Option>
                          <Option value='data'>有数据</Option>
                          <Option value='noData'>无数据</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Form>
                </div>
              </ContentBox>
              <ContentBox
                title="结算明细"
                className="statements-table"
                titleStyle={{borderColor: '#33CC00', fontWeight: 'bold', paddingRight: '40px', margin: '20px'}}
              >
                <Table columns={this.getTableColumns()} dataSource={showList} pagination={false} />
              </ContentBox>
            </div>
          </Spin>
        </Content>
        <Lfooter />
        <Modal
          title="结算单录入"
          visible={modalShow}
          bodyStyle={{padding: 0}}
          width="65%"
          okText="确定"
          cancelText="取消"
          onCancel={() => {this.setState({modalShow: false})}}
          onOk={this.modalOk}
        >
          <div className="modal-main">
            <div className="entry-title">{selectedYear}年{selectedMonth}月 电费结算单</div>
            <div className="modal-statement-content">
              <FormItem
                label="交易批次（选填）"
                labelCol={{ span: 6}}
                wrapperCol={{ span: 18}}
              >
                {getFieldDecorator('modalBatchNum', {
                })(
                  <Input placeholder="请输入交易批次" type="text" />
                )}
              </FormItem>
              <div style={{marginTop: '20px'}}>
                <Table columns={this.getModalTableColumns()} dataSource={modalTableList} pagination={false} />
              </div>
            </div>
          </div>
        </Modal>
      </Layout>
    )
  }
}

const StatementsManage = Form.create()(statementsManage);

export default StatementsManage;