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
  Input,
  Spin,
  DatePicker,
  Row,
  message,
  Col,
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

import './powerplan.less';
import './buypower.less';
import batteryIcon from '../../../components/icon/battery-circle.png';
import rmbIcon from '../../../components/icon/rmb.png';
import orderIcon from '../../../components/icon/order.png';
import boltIcon from '../../../components/icon/bolt.png';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import zhCN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import api from '../../../api/tools';
import { getYearOptions } from '../../utils/utils';


const { Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;
const FormItem = Form.Item;
const { MonthPicker } = DatePicker;

const yearOptions = getYearOptions();

/* 表单布局 */
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

const monthX = ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'];
const compriseKinds = ['双边长协', '月度竞价'];
const typeMap = {
  'BIDDING': '月度竞价',
  'BILATERAL': '双边长协',
  'CENTRALIZED': '集中挂牌'
};

/* 总量数据展示卡片 */
function Card(props) {
  const { icon, name, num, unit } = props;
  return (
    <div className="total-info-item">
      <div className="total-info-item-detail">
        <img className="total-info-item-icon" src={icon} alt=""/>
        <div className="total-info-item-desc">
          <div>
            <span>{name}</span>
            <span className="total-info-item-unit">{unit}</span>
          </div>
          <span className="total-info-item-desc-number">{num}</span>
        </div>
      </div>
    </div>
  );
}

class completeInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      totalData: {
        "avg": 0, // 平均价差
        "power": 0, // 累计购电总量
        "producer": 0, // 发电企业数量
        "spread": 0,
        "trade": 0 // 累计购电次数
      },
      mainSpinning: 0, // 总的加载状态控制
      selectedYear: 2018,
      compriseBiddingList: [], // 月竞组成
      compriseBiddingTotal: 0, // 月竞总数
      compriseBilateralList: [], // 双边组成
      compriseBilateralTotal: 0, // 双边总数
      compriseCentralizedList: [], // 集中挂牌组成
      compriseCentralizedTotal: 0, // 集中挂牌总数
      costPowerList: [], // 购电成本-购电量列表
      costDiffPriceList: [], // 购电成本-价差列表
      customerList: [],// 客户列表
      powerSpreadOptionPower: [], // 电量和价格关系图-电量散点
      powerSpreadOptionSpread: [], // 电量和价格关系图-价格散点
      customerContacts: [], // 客户联系人列表
      tabIndex: '1',
      systemSuggest: {
        power: 0, // 购电总量
        avg: 0, // 均价
        reportPower: 0, // 申报电量
        forecastPower: 0, // 负荷预测
      },
      powerPriceInfo: { // 电价信息
        "avgSpread": 0,
        "maxSpread": 0,
        "minSpread": 0
      },
      modalTime: { // 弹框表单中的时间
        year: '',
        month: '',
      },
      actionType: 'ADD',
      modalData: {},
      modalTitle: '新增购电记录',
      monthPower: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 长协每月电量
      monthPowerTotal: 0, // 长协总电量
      modalShow: false,
      buyList: []
    }
  }
  mainSpinning = 0;
  /* 获取购电总体数据 */
  getTotalData = (year) => {
    const url = `/api/purchase/summary/${year}`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.get(url, {}, {},
      (res) => {
        this.mainSpinning--;
        this.setState({
          totalData: res.content,
          mainSpinning: this.mainSpinning,
        });
      },
      (err) => {
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 获取购电组成数据 */
  getCompriseData = (year) => {
    const url = `/api/purchase/composition/${year}`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.get(url, {}, {},
      (res) => {
        // 遍历数组，并将数组分发到哥哥组成部分。
        const dataList = res.content || [];
        let compriseBiddingList = [], // 月竞组成
          compriseBiddingTotal = 0, // 月竞总数
          compriseBilateralList = [], // 双边组成
          compriseBilateralTotal = 0, // 双边总数
          compriseCentralizedList = [], // 集中挂牌组成
          compriseCentralizedTotal= 0;// 集中挂牌总数

        dataList.forEach((item) => {
          compriseBiddingList.push(item.biddingPower);
          compriseBiddingTotal += Number(item.biddingPower);
          compriseBilateralList.push(item.bilateralPower);
          compriseBilateralTotal += Number(item.bilateralPower);
          compriseCentralizedList.push(item.centralizedPower);
          compriseCentralizedTotal += Number(item.centralizedPower);
        });

        this.mainSpinning--;
        this.setState({
          compriseBiddingList,
          compriseBiddingTotal,
          compriseBilateralList,
          compriseBilateralTotal,
          compriseCentralizedList,
          compriseCentralizedTotal,
          mainSpinning: this.mainSpinning,
        });
      },
      (err) => {
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 电价电量关系数据 */
  getPowerSpreadData = (year) => {
    const url = `/api/purchase/cost/purchase/${year}`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.get(url, {}, {},
      (res) => {
        // 遍历数组，并将数组分发到哥哥组成部分。
        const dataList = res.content || [];

        const powerSpreadOptionPower = [];
        const powerSpreadOptionSpread = [];
        dataList.forEach((item) => {
          powerSpreadOptionPower.push(item.power);
          powerSpreadOptionSpread.push(item.spread);
        });

        this.mainSpinning--;
        this.setState({
          powerSpreadOptionPower,
          powerSpreadOptionSpread,
          mainSpinning: this.mainSpinning,
        });
      },
      (err) => {
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 获取购电成本数据 */
  getCostData = (year) => {
    const url = `/api/purchase/cost/${year}`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.get(url, {}, {},
      (res) => {
        // 遍历数组，并将数组分发到哥哥组成部分。
        const dataList = res.content || [];
        let costPowerList = [], // 购电量
          costDiffPriceList = []; // 价差

        dataList.forEach((item) => {
          costPowerList.push(item.power);
          costDiffPriceList.push(item.avg);
        });

        this.mainSpinning--;
        this.setState({
          costPowerList,
          costDiffPriceList,
          mainSpinning: this.mainSpinning,
        });
      },
      (err) => {
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 获取电价信息，平均值，最大值，最小值 */
  getPowerPrice = (year) => {
    const url = `/api/purchase/mma/purchase/${year}`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.get(url, {}, {},
      (res) => {
        // 遍历数组，并将数组分发到哥哥组成部分。
        const dataList = res.content;
        if (dataList) {
          this.mainSpinning--;
          this.setState({
            powerPriceInfo: dataList,
            mainSpinning: this.mainSpinning,
          });
        }
      },
      (err) => {
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 获取购电记录列表 */
  getPowerList = (year) => {
    const url = `/api/purchase/list/${year}`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.get(url, {}, {},
      (res) => {
        // 遍历数组，并将数组分发到哥哥组成部分。
        const dataList = res.content;
        if (dataList) {
          this.mainSpinning--;
          this.setState({
            buyList: dataList,
            mainSpinning: this.mainSpinning,
          });
        }
      },
      (err) => {
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 获取系统建议购电成本 */
  getSystemSuggestData = (time) => {
    this.getSystemPowerAndAvg(time);
    this.getForecastPower(time);
  };

  /* 获取已购电量和均价 */
  getSystemPowerAndAvg = (time) => {
    const url = `/api/purchase/cost/${time}`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.get(url, {}, {},
      (res) => {
        // 遍历数组，并将数组分发到哥哥组成部分。
        const dataList = res.content;
        this.mainSpinning--;
        this.setState({
          systemSuggest: {
            ...this.state.systemSuggest,
            power: dataList ? dataList.power : 0,
            avg: dataList ? dataList.avg : 0
          },
          mainSpinning: this.mainSpinning,
        });
      },
      (err) => {
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 获取申报电量和符合预测 */
  getForecastPower = (time) => {
    const url = `/api/gather/${time}/sum`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.get(url, {}, {},
      (res) => {
        // 遍历数组，并将数组分发到哥哥组成部分。
        const dataList = res.content;
        this.mainSpinning--;
        this.setState({
          systemSuggest: {
            ...this.state.systemSuggest,
            reportPower: dataList ? dataList.reportPower : 0,
            forecastPower: dataList ? dataList.bayesRidgePredict : 0,
          },
          mainSpinning: this.mainSpinning,
        });
      },
      (err) => {
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 获取数据 */
  getData = (selectedYear) => {
    this.getTotalData(selectedYear);
    this.getCompriseData(selectedYear);
    this.getCostData(selectedYear);
    this.getPowerList(selectedYear);
    this.getPowerPrice(selectedYear);
    this.getPowerSpreadData(selectedYear);
  };

  /* 获取客户列表 */
  getCustomerList = () => {
    const url = '/api/customer/list';
    const params = {
      name: '',
      pageNo: 1,
      pageSize: 100,
      type: 'PRODUCER',
    };
    api.post(url, {}, params,
      (res) => {
        const dataList = res.content ? res.content.content : [];
        if (dataList && dataList.length) {
          this.setState({
            customerList: dataList,
          })
        }
      },
      (err) => {
        console.log("failed" + err);
      }
    );
  };

  /* 获取客户联系人列表 */
  getCustomerContacts = (id) => {
    const url = `/api/customer/${id}/contact`;
    api.get(url, {}, {},
      (res) => {
        const dataList = res.content;
        if (dataList && dataList.length) {
          this.setState({
            customerContacts: dataList,
          })
        }
      },
      (err) => {
        console.log("failed" + err);
      }
    );
  };

  /* 联系人改变 */
  customerChange = (val) => {
    this.getCustomerContacts(val);
  };

  componentDidMount() {
    const { selectedYear } = this.state;
    this.getData(selectedYear);
  };

  /* 购电组成柱状图图表配置 */
  getCompriseOptions = () => {
    const { compriseBiddingList, compriseBilateralList, compriseCentralizedList } = this.state;
    return {
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: compriseKinds
      },
      grid: {
        left: 0,
        right: 0,
        bottom: '3%',
        containLabel: true
      },
      xAxis:  {
        type: 'category',
        data: monthX,
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        }
      },
      series: [
        {
          name: '双边长协',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#3BA1FF',
          },
          barWidth: '30%',
          data: compriseBilateralList,
        },
        {
          name: '月度竞价',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#29AA4F'
          },
          data: compriseBiddingList,
        },
        // {
        //   name: '集中挂牌',
        //   type: 'bar',
        //   stack: '总量',
        //   itemStyle: {
        //     color: '#FF6600'
        //   },
        //   data: compriseCentralizedList
        // },

      ]
    };
  };

  /* 购电组成占比图图表配置 */
  getPercentCompriseOptions = () => {
    const { compriseBiddingTotal, compriseBilateralTotal, compriseCentralizedTotal } = this.state;
    return {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        data: compriseKinds
      },
      series : [
        {
          name: '购电组成',
          type: 'pie',
          radius : '55%',
          center: ['55%', '50%'],
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data:[
            {value:compriseBilateralTotal, name:'双边长协', itemStyle: {color: '#3BA1FF'}},
            {value:compriseBiddingTotal, name:'月度竞价', itemStyle: {color: '#29AA4F'}},
            // {value:compriseCentralizedTotal, name:'集中挂牌', itemStyle: {color: '#FF6600'}},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  };

  /* 购电成本柱状图图表配置 */
  getCostOptions = () => {
    const { costDiffPriceList, costPowerList } = this.state;
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      legend: {
        data:['购电量', '购电均价']
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: monthX
        },
        {
          type: 'category',
          boundaryGap: true,
          data: monthX,
          show: false,
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        }
      ],
      series: [
        {
          name:'购电量',
          type:'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            color: '#3BA1FF',
          },
          barWidth: '30%',
          data: costPowerList
        },
        {
          name:'购电均价',
          type:'line',
          data: costDiffPriceList
        }
      ]
    };
  };

  /* 购电电量与价格关系图配置 */
  getPriceOptions = () => {
    const { powerSpreadOptionPower, powerSpreadOptionSpread } = this.state;
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      // grid: {
      //   left: '1%',
      //   top: 20,
      //   right: '2%',
      //   bottom: 40,
      //   containLabel: true
      // },
      xAxis: {
        type: 'value',
        max: 'dataMax',
        min: 'dataMin',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
          onZero: true,
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        data: powerSpreadOptionSpread,
        axisLabel: {
          inside: true,
        },
        zlevel: 10,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false
        }
      },
      series: [{
        type: 'bar',
        name: '电量',
        data: powerSpreadOptionPower,
        itemStyle: {
          color: '#3BA1FF',
        }
      }]
    };
  };

  /* 获取双边购电详情 */
  getBilateralDetail = (id) => {
    const url = `/api/purchase/${id}/detail`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.get(url, {}, {},
      (res) => {
        // 遍历数组，并将数组分发到哥哥组成部分。
        const dataList = res.content.purchaseMonthlies;
        let monthPower = [];
        let monthPowerTotal = 0;

        if (dataList && dataList.length) {

          if (this.state.tabIndex === '1') { // 月竞需要设置时间
            this.props.form.setFieldsValue({
              month: moment(dataList[0].monthStr),
            });
            this.getSystemSuggestData(dataList[0].monthStr);
          } else {
            this.getSystemSuggestData(dataList[0].yearStr);
          }

          dataList.forEach(item => {
            monthPower.push(item.power);
            monthPowerTotal += item.power || 0;
          });
        } else {
          monthPower = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        this.mainSpinning--;
        this.setState({
          monthPower,
          monthPowerTotal,
          modalTime: {
            year: dataList[0].yearStr,
            month: this.state.tabIndex === '1' ? moment(dataList[0].monthStr).format('MM') : ''
          },
          mainSpinning: this.mainSpinning,
        });
      },
      (err) => {
        console.log("failed" + err);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /*修改记录*/
  editRow = (record, actionType) => {
    const tabIndex = record.type === 'BIDDING' ? '1' : '2';
    const modalTitle = actionType === 'UPDATE' ? '修改购电记录' : '查看购电记录';
    this.tabChange(tabIndex);
    this.setState({
      modalData: record,
      modalShow: true,
      actionType,
      modalTitle,
    });
    this.getCustomerList();
    this.getCustomerContacts(record.customerId);
    if (tabIndex === '1') { // 月竞
      this.props.form.setFieldsValue({
        name: '交易中心',
        contact: '交易中心',
        powerNum: record.power,
        price: record.spread
      })
    } else {
      this.props.form.setFieldsValue({
        year: record.yearStr,
        power: record.power,
        price: record.spread,
        name: record.customerId,
        contact: record.customerContactId,
        phone: record.customerContactMobile
      });
    }
    this.getBilateralDetail(record.id);
  };

  /* 删除记录 */
  deleteRow = (id) => {
    const url = `/api/purchase/${id}/delete`;
    this.mainSpinning++;
    this.setState({
      mainSpinning: this.mainSpinning,
    });
    api.delete(url, {}, {},
      (res) => {
        // 遍历数组，并将数组分发到哥哥组成部分。
        message.success('删除成功！');
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
        this.getData(this.state.selectedYear)
      },
      (err) => {
        console.log("failed" + err);
        message.error('删除失败！' + err.message);
        this.mainSpinning--;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
      }
    );
  };

  /* 列表列模型获取 */
  getTableColumns = () => {
    return [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '10%'
    }, {
      title: '来源',
      dataIndex: 'customerName',
      key: 'customerName',
      align: 'center',
      width: '20%'
    }, {
      title: '交易类型',
      dataIndex: 'type',
      align: 'center',
      key: 'type',
      render: (value) => {
        return typeMap[value];
      },
      width: '10%'
    }, {
      title: '交易电量',
      dataIndex: 'power',
      align: 'center',
      key: 'power',
      width: '10%'
    }, {
      title: '价差',
      dataIndex: 'spread',
      align: 'center',
      key: 'spread',
      width: '10%'
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      key: 'createTime',
      render: (value) => {
        const date = new Date(value);
        return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
      },
      width: '10%'
    }, {
      title: '状态',
      dataIndex: 'isEnabled',
      align: 'center',
      key: 'isEnabled',
      render: (value) => {
        return value ? '已生效' : '待生效'
      },
      width: '10%'
    }, {
      title: '操作',
      align: 'center',
      key: 'action',
      render: (text, record) => (
        <span className="action-column">
          <a onClick={() => {this.editRow(record, 'UPDATE')}}>修改</a>
          {/*<a onClick={() => {this.deleteRow(record.id)}}>删除</a>*/}
          <a onClick={() => {this.editRow(record, 'SEARCH')}}>查看详情</a>
        </span>
      )
    }];
  };

  /* modal点击确定执行事件 */
  modalOk = () => {
    const { tabIndex, actionType, modalData, monthPower, selectedYear } = this.state;
    const { validateFields } = this.props.form;
    let url = '';
    let dataIndexList = [];
    const params = {};

    if (actionType !== 'ADD' && modalData.type) {
      if((modalData.type === 'BIDDING' && tabIndex !== '1') || (modalData.type === 'BILATERAL' && tabIndex !== '2')) {
        message.error('购电记录类型不一致');
        return;
      }
    }

    if (tabIndex === '1') {
      if ( actionType === 'ADD' ) {
        url = '/api/purchase/bidding/create';
      } else {
        url = '/api/purchase/bidding/update';
      }
      dataIndexList = ['name', 'contact', 'month', 'price', 'powerNum']; // 月竞
    } else if (tabIndex === '2') {
      if ( actionType === 'ADD' ) {
        url = '/api/purchase/bilateral/create';
      } else {
        url = '/api/purchase/bilateral/update';
      }
      dataIndexList = ['name', 'contact', 'phone', 'year', 'price' ]; // 双边长协
      let i = 1;
      while (i < 13) {
        dataIndexList.push(`mp${i}`);
        i++;
      }
    }

    // 校验
    validateFields(dataIndexList, (errs, values) => {
      if (!errs ) { // 验证通过
        params.customerContactId = tabIndex === '1' ? 0 : values.contact;
        params.customerId = tabIndex === '1' ? 0 : values.name;

        params.spread = Number(values.price);
        params.yearStr = tabIndex === '1' ? values.month.format('YYYY') : values.year;
        if (actionType !== 'ADD') {
          params.id = modalData.id;
        }
        if (tabIndex === '2') {
          params.powers = monthPower;
        } else {
          params.power = Number(values.powerNum);
          params.monthStr = values.month.format('YYYY-MM');
        }
        this.mainSpinning++;
        this.setState({
          mainSpinning: this.mainSpinning,
        });
        api.post(url, {}, params,
          (res) => {
            // 遍历数组，并将数组分发到哥哥组成部分。
            message.success('操作成功！');
            this.mainSpinning--;
            this.setState({
              modalShow: false,
              mainSpinning: this.mainSpinning,
            });
            this.props.form.resetFields(dataIndexList);
            this.getData(selectedYear)
          },
          (err) => {
            console.log("failed" + err);
            message.error('操作失败！' + err.message);
            this.mainSpinning--;
            this.setState({
              mainSpinning: this.mainSpinning,
            });
          }
        );
      }
    });
  };

  /* 新增购电记录,打开新增界面 */
  add = () => {
    this.setState({
      modalTitle: '新增购电记录',
      modalShow: true,
      actionType: 'ADD',
      tabIndex: '1',
      modalData: {},
      monthPower: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      monthPowerTotal: 0,
    });
    this.getCustomerList(); // 获取联系人列表
    this.props.form.resetFields(['name', 'contact', 'phone', 'month', 'year', 'power', 'price']);
  };

  // 查询年份改变
  yearSelectChange = (value) => {
    this.setState({
      selectedYear: value,
    });
    this.getData(value);
  };

  /* tab选项切换 */
  tabChange = (activeKey) => {
    const { actionType } = this.state;
    this.setState({
      tabIndex: activeKey
    });
    if (actionType === 'ADD') {
      if (activeKey === '1') {
        this.props.form.setFieldsValue({
          name: '交易中心',
          contact: '交易中心'
        });
        this.props.form.resetFields();
      } else {
        this.props.form.resetFields();
      }
    }
  };

  /* 每月输入数据改变 */
  monthPowerChange = (e, i) => {
    let { monthPower, monthPowerTotal } = this.state;
    monthPower[i] = Number(e.target.value || 0);
    monthPowerTotal = 0;
    monthPower.forEach(item => {
      monthPowerTotal += Number(item);
    });
    this.setState({
      monthPowerTotal,
      monthPower,
    });
  };

  /* 联系人改变 */
  contactChange = (value, option) => {
    this.props.form.setFieldsValue({
      phone: option.props.phone
    });
  };

  /* modal时间选择变化，需要去系统建议数据 */
  modalTimeChange = (data) => {
    let time = '';
    const obj = {};
    if (typeof data === 'object') { // 月竞
      obj.year = data.format('YYYY');
      obj.month = data.format('MM');
      time = data.format('YYYY-MM');
    } else { // 双边
      obj.year = data.toString();
      time = obj.year;
    }
    this.setState({
      modalTime: {...obj}
    });
    this.getSystemSuggestData(time);
  };


  render() {
    const {
      modalTitle,
      modalShow,
      tabIndex,
      buyList,
      totalData,
      selectedYear,
      mainSpinning,
      compriseCentralizedTotal,
      compriseBilateralTotal,
      compriseBiddingTotal,
      customerList,
      customerContacts,
      actionType,
      monthPowerTotal,
      modalTime,
      powerPriceInfo,
      monthPower,
      systemSuggest,
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    console.log(mainSpinning);

    const compriseTotal = compriseBilateralTotal + compriseBiddingTotal + compriseCentralizedTotal;

    const cards = [{
      icon: batteryIcon,
      name: '累计购电总量',
      num: totalData.power || 0,
      unit: '万千瓦时'
    }, {
      icon: rmbIcon,
      name: '平均价差',
      num: totalData.avg || 0,
      unit: '厘/千瓦时'
    }, {
      icon: orderIcon,
      name: '累计购电次数',
      num: totalData.trade || 0,
      unit: '次/年'
    }, {
      icon: boltIcon,
      name: '发电企业数量',
      num: totalData.producer || 0,
      unit: '家'
    }];

    /* 客户名称 */
    const customerName = (
      <FormItem
        {...formItemLayout}
        label="客户名称"
      >
        {getFieldDecorator('name', {
          initialValue: tabIndex === '1' ? '交易中心' : '',
          rules: [{
            required: true, message: '请选择客户！',
          }],
        })(
          <Select
            onChange={this.customerChange}
            disabled={tabIndex === '1'}
          >
            {
              customerList.map(item => (
                <Option key={item.id} value={item.id} >{item.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
    );

    /* 联系人 */
    const contact = (
      <FormItem
        {...formItemLayout}
        label="联系人"
      >
        {getFieldDecorator('contact', {
          initialValue: tabIndex === '1' ? '交易中心' : '',
          rules: [{
            required: true, message: '请填写联系人！',
          }],
        })(
          <Select
            disabled={tabIndex === '1'}
            onChange={this.contactChange}
          >
            {
              customerContacts.map(item => (
                <Option key={item.id} phone={item.mobile} value={item.id} >{item.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
    );

    const contactPhone = (
      <FormItem
        {...formItemLayout}
        label="联系人电话"
      >
        {getFieldDecorator('phone', {
          rules: [{
            required: true, message: '请填写联系人电话！',
          }],
        })(
          <Input type="number" maxLength={11} />
        )}
      </FormItem>
    );

    /* 选择月份 */
    const monthPicker = (
      <FormItem
        {...formItemLayout}
        label="时间"
      >
        {getFieldDecorator('month', {
          rules: [{
            required: true, message: '请选择时间',
          }],
        })(
          <MonthPicker
            onChange={this.modalTimeChange}
            format="YYYY年MM月"
          />
        )}
      </FormItem>
    );

    /* 价差 */
    const price = (
      <FormItem
        {...formItemLayout}
        label="价差"
      >
        <Row>
          <Col span={5}>
            {getFieldDecorator('price', {
              rules: [{
                required: true, message: '请填写价差！',
              }],
            })(
              <Input type="number" style={{display: 'inline-black'}} />
            )}
          </Col>
          <Col span={5} push={1}>
            <span>厘/千瓦时</span>
          </Col>
        </Row>
      </FormItem>
    );

    /* 电量 */
    const powerNum = (
      <FormItem
        {...formItemLayout}
        label="电量"
      >
        <Row>
          <Col span={5}>
            {getFieldDecorator('powerNum', {
              rules: [{
                required: true, message: '请填写电量！',
              }],
            })(
              <Input type="number" style={{display: 'inline-black'}} />
            )}
          </Col>
          <Col span={5} push={1}>
            <span>万千瓦时</span>
          </Col>
        </Row>
      </FormItem>
    );

    /* 选择年份 */
    const yearSelect = (
      <FormItem
        {...formItemLayout}
        label="时间"
      >
        {getFieldDecorator('year', {
          rules: [{
            required: true, message: '请选择时间',
          }],
          initialValue: 2018,
        })(
          <Select
            style={{width: '35%'}}
            onChange={this.modalTimeChange}
          >
            {
              yearOptions
            }
          </Select>
        )}
      </FormItem>
    );

    const totalPower = (
      <FormItem
        {...formItemLayout}
        label="总电量"
      >
        <Row>
          <Col span={5}>
            {getFieldDecorator('totalPower', {
            })(
              <span>{monthPowerTotal}</span>
            )}
          </Col>
          <Col span={5} push={1}>
            <span>万千瓦时</span>
          </Col>
        </Row>
      </FormItem>
    );

    // 每个月的购电量输入
    const monthPowerInput = (
      <Row>
        {
          (() => {
            const mi = [];
            let i = 1;
            while (i < 13) {
              let strIndex = `0${i}`;
              strIndex = strIndex.slice(strIndex.length - 2);
              const p = i;
              mi.push(
                <Col span={4}>
                  <FormItem
                    label={`${strIndex}月`}
                    colon={false}
                  >
                    {getFieldDecorator(`mp${i}`, {
                      initialValue: monthPower[i-1],
                    })(
                      <Input type="number" onChange={(e) => {this.monthPowerChange(e, p - 1)}} />
                    )}
                  </FormItem>
                </Col>
              );
              i++ ;
            }
            return mi;
          })()
        }
      </Row>
    );

    const modalBtn = {};
    if (actionType === 'SEARCH') {
      modalBtn.footer = null;
    }

    return (
      <Layout className="completeInfoLayout" locale={zhCN}>
        {/* 头部header */}
        <Lheader history={this.props.history} menubox={"/seller/buypower"}></Lheader>
        <Content style={{padding: '0 50px'}}>
          {/* 面包屑 */}
          <div style={{margin: '16px 0'}}>
            <span>您当前的位置:   </span><Breadcrumb.Item className="location">售电业务</Breadcrumb.Item>
            <Breadcrumb.Item>购电管理</Breadcrumb.Item>
            <div className="select-box">
              <Select defaultValue={selectedYear} onChange={this.yearSelectChange} >
                {
                  yearOptions
                }
              </Select>
            </div>
          </div>
          {/* 内容 */}
          <Spin
            size="large"
            spinning={Boolean(mainSpinning)}
            tip="加载中..."
          >
            <div style={{minHeight: 762}} className="buy-power-manage-main">
              <div className="total-info-box">
                {
                  cards.map((item, index) => {
                    return (
                      <Card key={index} {...item} />
                    );
                  })
                }
              </div>
              <div className="item-info-box">
                <span className="item-info-title">购电组成</span>
                <div className="item-comprise">
                  <div className="item-comprise-left">
                    <ReactEcharts
                      option={this.getCompriseOptions()}
                    />
                  </div>
                  <div className="item-comprise-right">
                    <div style={{width: '70%'}}>
                      <ReactEcharts
                        option={this.getPercentCompriseOptions()}
                      />
                    </div>
                    <div style={{width: '30%'}} className="total-detail">
                      <span>双边长协</span>
                      <span className="num">{compriseBilateralTotal}  ({
                        compriseBilateralTotal ? (compriseBilateralTotal*100/compriseTotal).toFixed(2) : 0
                      }%)</span>
                      <span>月度竞价</span>
                      <span className="num">{compriseBiddingTotal}  ({
                        compriseBiddingTotal ? (compriseBiddingTotal*100/compriseTotal).toFixed(2) : 0
                      }%)</span>
                      {/*<span>集中挂牌</span>*/}
                      {/*<span className="num">{compriseCentralizedTotal}  ({*/}
                        {/*compriseCentralizedTotal ? (compriseCentralizedTotal*100/compriseTotal).toFixed(2) : 0*/}
                      {/*}%)</span>*/}
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-info-box">
                <span className="item-info-title borderLeftPink">购电成本</span>
                <div className="item-comprise">
                  <div className="item-comprise-left">
                    <ReactEcharts
                      option={this.getCostOptions()}
                    />
                  </div>
                  <div className="item-comprise-right">
                    <div style={{width: '65%'}}>
                      <ReactEcharts
                        option={this.getPriceOptions()}
                      />
                    </div>
                    <div style={{width: '30%'}} className="total-detail">
                      <span>最低价格</span>
                      <span className="num">{powerPriceInfo.minSpread}</span>
                      <span>最高价格</span>
                      <span className="num">{powerPriceInfo.maxSpread}</span>
                      <span>平均价格</span>
                      <span className="num">{powerPriceInfo.avgSpread}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-info-box">
                <span className="item-info-title borderLeftGreen">购电记录</span>
                <Button className="table-btn" onClick={this.add} type="primary">新增购电记录</Button>
                <Table
                  className="table-main"
                  pagination={false}
                  columns={this.getTableColumns()}
                  dataSource={buyList}
                  scroll={{y: 250}}
                />
              </div>
            </div>
          </Spin>
        </Content>
        <Lfooter />
        <Modal
          title={modalTitle}
          visible={modalShow}
          bodyStyle={{padding: 0}}
          okText="确定"
          cancelText="取消"
          width="65%"
          {...modalBtn}
          onCancel={() => {this.setState({modalShow: false})}}
          onOk={this.modalOk}
        >
          <Spin
            spinning={Boolean(mainSpinning)}
          >
            <div className="modal-content">
              <Tabs className="tab-class" activeKey={tabIndex} onChange={this.tabChange}>
                <TabPane tab="月度竞价" key="1">
                  <Form>
                    {
                      [customerName, contact, monthPicker, price, powerNum]
                    }
                  </Form>
                </TabPane>
                <TabPane tab="双边长协" key="2">
                  <Form>
                    {
                      [customerName, contact, contactPhone, price, totalPower, yearSelect, monthPowerInput]
                    }
                  </Form>
                </TabPane>
              </Tabs>
              <div className={`system-advice ${tabIndex === '1' ? '' : 'pdb60'}`}>
                <h3>系统建议</h3>
                <div className="blueFont textCenter">{modalTime.year ? `${modalTime.year}年` : ''}
                  {modalTime.month ? `${modalTime.month}月` : ''}</div>
                <div className="advice-item">
                  <h4>电量情况</h4>
                  <span className="blueFont">{
                    systemSuggest.power - systemSuggest.reportPower > 0 ?
                      systemSuggest.power - systemSuggest.reportPower : '电量不足'
                  }</span>
                </div>
                <div className="advice-item">
                  <h4>负荷预测</h4>
                  <span className="blueFont">{systemSuggest.forecastPower}</span>
                </div>
                <div className="advice-item">
                  <h4>用户申报电量</h4>
                  <span className="blueFont">{systemSuggest.reportPower}</span>
                </div>
                <div className="advice-item">
                  <h4>已购电量</h4>
                  <span className="blueFont">{systemSuggest.power}</span>
                </div>
                <div className="advice-item">
                  <h4>{tabIndex === '1' ? '上月统一出清价格' : '平均价差'}</h4>
                  <span className="blueFont">{systemSuggest.avg}</span>
                </div>
                <div>
                  <h4>建议购电量</h4>
                  <div className="greenFont textCenter">20000-30000</div>
                </div>
              </div>
            </div>
          </Spin>
        </Modal>
      </Layout>
    )
  }
}

const CompleteInfo = Form.create()(completeInfo);

export default CompleteInfo;