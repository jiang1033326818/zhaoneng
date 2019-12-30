import React from 'react';
import {
  Layout,
  Breadcrumb,
  Select,
  Form,
  Table,
  Modal,
  message,
  Spin,
  Input,
  Tabs,
  Icon,
  Button,
} from 'antd';
import api from "../../../api/tools"
import ECharts from 'echarts-for-react';
import { Link } from 'react-router-dom';
import Lheader from '../common/Iheader.js';
import Lfooter from '../../../components/layout/Ifooter.js';
import "./customerdetail.less";

const {Content} = Layout;
const FormItem = Form.Item;

const { Option } = Select;
const curYear = new Date().getFullYear();

const CNMonth = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const jsDataIndex = 'settlementPower';
const cxDataIndex = 'bilateralPower';
const yjDataIndex = 'planPower';

// 客户的用电数据
const powerData = [{
  id: 1,
  year: 2018,
}];
powerData[0][jsDataIndex] = 0;
powerData[0][cxDataIndex] = 0;
powerData[0][yjDataIndex] = 0;

// 客户用电数据表格
const contactDataColumns = [{
  title: '序号',
  dataIndex: 'id',
  key: 'id',
  align: 'center',
  // fixed: 'left',
  width: '100px',
}, {
  title: '年度',
  dataIndex: 'yearStr',
  key: 'yearStr',
  align: 'center',
  // fixed: 'left',
  width: '100px',
}, {
  title: '合计',
  key: 'hj',
  children: [{
    title: '结算',
    dataIndex: jsDataIndex,
    key: jsDataIndex,
    width: '100px',
    sorter: (a, b) => a[jsDataIndex] - b[jsDataIndex]
  }, {
    title: '长协',
    dataIndex: cxDataIndex,
    key: cxDataIndex,
    width: '100px',
    sorter: (a, b) => a[cxDataIndex] - b[cxDataIndex]
  }, {
    title: '月竞',
    dataIndex: yjDataIndex,
    key: yjDataIndex,
    width: '100px',
    sorter: (a, b) => a[yjDataIndex] - b[yjDataIndex]
  }]
}];

CNMonth.forEach((item, index) => {
  const obj = {};
  obj.title = item;
  obj.key = item;
  const js = `${jsDataIndex}${index}`;
  const cx = `${cxDataIndex}${index}`;
  const yj = `${yjDataIndex}${index}`;
  powerData[0][js] = 0;
  powerData[0][cx] = 0;
  powerData[0][yj] = 0;
  obj.children = [{
    title: '结算',
    dataIndex: js,
    key: js,
    width: '100px',
    sorter: (a, b) => a[js] - b[js]
  }, {
    title: '长协',
    dataIndex: cx,
    key: cx,
    width: '100px',
    sorter: (a, b) => a[cx] - b[cx]
  }, {
    title: '月竞',
    dataIndex: yj,
    key: yj,
    width: '100px',
    sorter: (a, b) => a[yj] - b[yj]
  }];
  contactDataColumns.push(obj);
});

function ContentBox(props) {
  const { title, children, titleBtn: TitleBtn, borderColor, titleClassName } = props;
  return (
    <div className="content-box">
      <div style={{borderColor}} className="content-box-head">
        <span className={`title ${titleClassName}`}>{title}</span>
        <div>{TitleBtn ? <TitleBtn /> : ''}</div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

class CustomerDetail extends React.Component {
  state = {
    contactList: [{
      id: 1,
      name: '张三',
      // job: '高级电工',
      mobile: '18635253654',
      // status: '正常'
    }],
    selectYear: curYear, // 选择年
    modal: {
      show: false,
      type: 'add'
    },
    editContact: {}, // 待修改的联系人
    modalSpinning: false, // modal中的加载控制
    customerDetail: {
      customerName: '', // 公司名称
      contactNum: 0, // 联系人数量
      settlementPower: 0, // 结算电量
      planPower: 0, // 计划电量
    },
    spinning: 0, // 加载状态控制
    powerData: powerData,
    data1: [320, 33, 301, 334, 390, 320, 33, 301, 334, 390, 111, 222],
    data2: [220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 231, 234],
    data3: [150, 232, 201, 154, 190, 150, 232, 201, 154, 190, 111, 100]
  };
  // 显示加载状态
  showSpinning = () => {
    this.setState({
      spinning: this.state.spinning + 1,
    });
  };
  // 隐藏加载状态
  hideSpinning = () => {
    this.setState({
      spinning: this.state.spinning - 1,
    });
  };
  // 获取客户详细信息
  getCustomerDetail = (id) => {
    const url = `/api/customer/${id}/statistics`;
    this.showSpinning();
    api.get(url,{}, {}, (res) => {
      if (res.code === 0) {
        this.setState({
          customerDetail: res.content,
        })
      }
      this.hideSpinning();
    });
  };
  // 获取客户联系人列表
  getContactList = () => {
    const id = localStorage.getItem('customerId');
    const url = `/api/customer/${id}/contact`;
    this.showSpinning();
    api.get(url,{}, {}, (res) => {
      if (res.code === 0) {
        this.setState({
          contactList: res.content,
        })
      }
      this.hideSpinning();
    });
  };
  // 获取客户所有用电数据
  getPowerData = (id) => {
    const url = `/api/customer/${id}/power`;
    this.showSpinning();
    api.get(url,{}, {}, (res) => {
      if (res.code === 0 && res.content.length) {
        // 处理用电数据，拼凑出需要的数据格式
        const arr = [];
        res.content.forEach((item, index) => {
          const obj = { ...item };
          obj.id  = index + 1;
          const p = item.powerDtos;
          for (let i = 0; i < 12; i++) {
            const js = `${jsDataIndex}${i}`;
            const cx = `${cxDataIndex}${i}`;
            const yj = `${yjDataIndex}${i}`;
            obj[js] = p[i].settlementPower || 0;
            obj[cx] = p[i].bilateralPower || 0;
            obj[yj] = p[i].planPower || 0;
          }
          arr.push(obj);
        });
        this.setState({
          powerData: arr,
          selectYear: Number(arr[0].yearStr)
        });
        this.getYearPowerData(arr[0].yearStr);
      }
      this.hideSpinning();
    });
  };
  // 获取客户某一年的数据
  getYearPowerData = (year) => {
    const id = localStorage.getItem('customerId');
    const url = `/api/customer/${id}/${year}/power`;
    this.showSpinning();
    api.get(url,{}, {}, (res) => {
      if (res.code === 0 && res.content) {
        // 处理用电数据，拼凑出需要的数据格式
        const data1 = [], data2 = [], data3 = [];
        res.content.powerDtos.forEach((item, index) => {
          data1.push(item.settlementPower || 0);
          data2.push(item.bilateralPower || 0);
          data3.push(item.planPower || 0);
        });
        this.setState({
          data1, data2, data3
        });
      }
      this.hideSpinning();
    });
  };
  componentDidMount() {
    const id = localStorage.getItem('customerId');
    this.getCustomerDetail(id);
    this.getContactList();
    this.getPowerData(id);
  }

  //新建联系人
  addContact = () => {
    this.props.form.resetFields(); // 重置表单
    this.setState({
      modal: {
        show: true,
        type: 'add'
      },
      editContact: {}
    });
  };

  // modal确定按钮执行事件
  modalOk = () => {
    const { modal, editContact } = this.state;
    const { validateFields } = this.props.form;
    // 校验输入，没有错误再进行下发
    validateFields((err, values) => {
      if (!err) {
        this.setState({
          modalSpinning: true,
        });
        const param = { ...editContact, ...values };
        const id = localStorage.getItem('customerId');
        const url = modal.type === 'add' ? `/api/customer/${id}/create` : `/api/customer/${param.id}/contact/update`;
        api.post(url, {}, param, (res) => {
          this.setState({
            modalSpinning: false
          });
          message.success(`${modal.type === 'add' ? '添加' : '修改'}成功`);
          this.modalCancel();
          this.getContactList();
        }, (res) => {
          this.setState({
            modalSpinning: false
          });
          message.error(`${modal.type === 'add' ? '添加' : '修改'}失败，${res.message}`);
        });
      }
    });
  };

  // modal取消按钮执行事件
  modalCancel = () => {
    this.setState({
      modal: {
        ...this.state.modal,
        show: false
      }
    })
  };

  // 修改联系人
  editContact = (record) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      name: record.name,
      mobile: record.mobile
    });
    this.setState({
      modal: {
        show: true,
        type: 'edit'
      },
      editContact: record
    });
  };

  // 年份改变，查找新数据
  yearChange = (value) => {
    this.getYearPowerData(value);
  };

  render() {

    const option = {
      color: ['#999999', '#2FC25B', '#1890FF'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['结算', '长协', '月竞']
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: {show: false},
          data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '结算',
          type: 'bar',
          barGap: 0,
          data: this.state.data1,
        },
        {
          name: '长协',
          type: 'bar',
          data: this.state.data2,
        },
        {
          name: '月竞',
          type: 'bar',
          data: this.state.data3,
        }
      ]
    };

    const { customerDetail, contactList, powerData, modal, modalSpinning, selectYear } = this.state;

    // 年份选择器
    const yearSelector = (
      <Select onChange={this.yearChange} defaultValue={selectYear}>
        {
          (() => {
            const optionList = [];
            for (let i = curYear + 1; i > 2014; i--) {
              optionList.push(
                <Option value={i} key={i}>{i}</Option>
              )
            }
            return optionList;
          })()
        }
      </Select>
    );

    // 联系人表格列
    const contactColumns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '联系人姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '联系人电话',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (<a onClick={this.editContact.bind(this, record)}>修改</a>);
      }
    }];

    const { getFieldDecorator } = this.props.form;

    return (
      <Layout>
        {/* 头部header */}
        <Lheader history={this.props.history} menubox={"/seller/customeradmin"}></Lheader>
        <Content style={{padding: '0 50px'}}>
          <div className="cd-content">
            {/* 面包屑 */}
            <div className="content-breadcrumb">
              <Breadcrumb>
                <span>您当前的位置: </span>
                <Breadcrumb.Item>客户管理</Breadcrumb.Item>
                <Breadcrumb.Item><Link to={'/seller/customeradmin'}>客户管理</Link></Breadcrumb.Item>
                <Breadcrumb.Item>客户详情</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/* 内容主题 */}
            <div className="content-main">
              <Spin tip="Loading..." spinning={Boolean(0)} wrapperClassName="spinning-container">
                <div className="content-l">
                  <div className="content-title">客户详情</div>
                  <ContentBox title="用户概况">
                    <div className="detail-abstract">
                      <div className="detail-abstract-item">
                        <span>累计计划电量</span>
                        <span>{Number(customerDetail===null?"0":customerDetail.planPower===undefined?0:customerDetail.planPower).toLocaleString()}</span>
                      </div>
                      <div className="detail-abstract-item">
                        <span>结算电量</span>
                        <span>{customerDetail===null?"0":customerDetail.settlementPower}</span>
                      </div>
                      <div className="detail-abstract-item">
                        <span>联系人</span>
                        <span>{customerDetail===null?"0":customerDetail.contactNum}</span>
                      </div>
                      <span className="company-name">{customerDetail===null?"":customerDetail.customerName}</span>
                    </div>
                  </ContentBox>
                  {/*<ContentBox title="用户详情" borderColor="#2fc25b" titleBtn={() => {*/}
                    {/*return (*/}
                      {/*<a>+展开</a>*/}
                    {/*);*/}
                  {/*}} />*/}
                  <ContentBox title="联系人列表" borderColor="#9900FF" titleBtn={() => (
                    <Button type="primary" onClick={this.addContact}>+新建</Button>
                  )}>
                    <div className="contact-list">
                      <Table pagination={false} columns={contactColumns} dataSource={contactList} />
                    </div>
                  </ContentBox>
                  <ContentBox title="计划用电数据" borderColor="#FF6600">
                    <div className="customer-data">
                      <Tabs type="line">
                        <Tabs.TabPane tab={<span><Icon type="table" /></span>} key="1">
                          <Table scroll={{x: '400%'}} columns={contactDataColumns} dataSource={powerData} />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={<span><Icon type="bar-chart" /></span>} key="2">
                          <div className="e-charts-year">{yearSelector}</div>
                          <ECharts option={option} />
                        </Tabs.TabPane>
                      </Tabs>
                    </div>
                  </ContentBox>
                </div>
              </Spin>
              <div className="content-r"></div>
              <Modal
                title={modal.type === 'add' ? '新建联系人' : '修改联系人'}
                visible={modal.show}
                onOk={this.modalOk}
                onCancel={this.modalCancel}
              >
                <Spin spinning={modalSpinning}>
                  <Form>
                    <FormItem>
                      {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入联系人姓名' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="联系人姓名" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('mobile', {
                        rules: [{
                          required: true,
                          message: '请输入联系人电话'
                        }, {
                          pattern: /^1[34578]\d{9}$/,
                          message: '请输入正确的手机号码'
                        }],
                      })(
                        <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="联系人电话" />
                      )}
                    </FormItem>
                  </Form>
                </Spin>
              </Modal>
            </div>
          </div>
        </Content>
        <Lfooter></Lfooter>
      </Layout>
    )
  }
}

export default Form.create()(CustomerDetail)