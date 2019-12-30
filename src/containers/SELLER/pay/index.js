import React from 'react';
import {
  Layout,
  Form,
  Spin,
} from 'antd';
import QRCode from 'qrcode.react';


import './index.less';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import zhCN from "antd/lib/locale-provider/zh_CN";
import wxPayDesc from '../../../components/icon/wxPayDesc.png';
import 'moment/locale/zh-cn';
import { getYearOptions } from '../../utils/utils';

const { Content } = Layout;

class statementsManage extends React.Component {
  constructor() {
    super();
    this.state = {
      payMode: 'wx'
    };
  }

  /* 改变支付方式 */
  changePayMode(mode){
    this.setState({
      payMode: mode
    });
  };

  render() {
    const { payMode } = this.state;

    return (
      <Layout className="pay-main" locale={zhCN}>
        {/* 头部header */}
        <Lheader history={this.props.history} menubox={"/seller/statements"}></Lheader>
        <Content style={{padding: '0 50px'}}>
          {/* 面包屑 */}
          <div style={{margin: '16px 0'}}>
            <span>您当前的位置:  在线支付</span>
          </div>
          {/* 内容 */}
          <div className="content-main">
            <div className="QRCode-container">
              <QRCode value="http://facebook.github.io/react/" />
              <img className="desc-img" src={wxPayDesc} alt=""/>
            </div>
            <div></div>
          </div>
        </Content>
        <Lfooter />
      </Layout>
    )
  }
}

const StatementsManage = Form.create()(statementsManage);

export default StatementsManage;