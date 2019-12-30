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
import QRCode from 'qrcode.react';


import './index.less';
import wxPayIcon from '../../../components/icon/WePayLogo.png';
import zfbPayIcon from '../../../components/icon/zfbPayIcon.png';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import zhCN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';

import { getYearOptions } from '../../utils/utils';

const { Content } = Layout;
const { Option } = Select;
const FormItem = Form.Item;

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


class statementsManage extends React.Component {
  constructor() {
    super();
    this.state = {
      payMode: 'wx',
      payModalShow: false,
      modalTitle: '微信支付'
    };
  }

  /* 改变支付方式 */
  changePayMode(mode){
    this.setState({
      payMode: mode,
      modalTitle: mode === 'wx' ? '微信支付' : '支付宝支付'
    });
  };

  toPay() {
    this.setState({payModalShow: true});
    // this.props.history.push(`/seller/pay`);
  }

  render() {
    const { payMode, payModalShow, modalTitle } = this.state;

    return (
      <Layout className="prePay-main" locale={zhCN}>
        {/* 头部header */}
        <Lheader history={this.props.history} menubox={"/seller/statements"}></Lheader>
        <Content style={{padding: '0 50px'}}>
          {/* 面包屑 */}
          <div style={{margin: '16px 0'}}>
            <span>您当前的位置:  订单信息确认</span>
          </div>
          {/* 内容 */}
          <div className="content-main">
            <div>
              <span>订单信息</span>
              <div>
                <span>售电业务</span>
                <div className="mgl30">
                  <span>服务1</span><br />
                  <span>服务2</span><br />
                  <span>服务3</span>
                </div>
              </div>
            </div>
            <div className="pay-method-choose">
              <span>支付方式选择：</span>
              <div className="pay-method-choose mgl30">
                <div onClick={this.changePayMode.bind(this, 'wx')} className={`pay-method-item ${payMode === 'wx' ? 'selectedPayMode' : ''}`}><img className="pay-icon-w" src={wxPayIcon} alt=""/></div>
                <div onClick={this.changePayMode.bind(this, 'zfb')} className={`pay-method-item ${payMode === 'zfb' ? 'selectedPayMode' : ''}`}><img className="pay-icon-z" src={zfbPayIcon} alt=""/></div>
              </div>
            </div>
            <div className="button-container">
              <Button type="primary" onClick={this.toPay.bind(this)}>去支付</Button>
            </div>
          </div>
        </Content>
        <Lfooter />
        <Modal
          visible={payModalShow}
          onCancel={() => { this.setState({payModalShow: false}); }}
          onOk={() => { this.setState({payModalShow: true}); }}
          title={modalTitle}
        >
          <div className="QRCode-container">
            <div className="QRCode-desc">
              <span>金额</span>
              <span>￥333.00</span>
            </div>
            <QRCode value="http://facebook.github.io/react/" />
          </div>
        </Modal>
      </Layout>
    )
  }
}

const StatementsManage = Form.create()(statementsManage);

export default StatementsManage;