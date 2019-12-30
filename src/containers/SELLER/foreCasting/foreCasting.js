import React from 'react';
import { Layout, Breadcrumb,Modal,LocaleProvider,InputNumber  } from 'antd';
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import './foreCasting.less';
//import userdata from '../../../components/icon/userdata.png'
import chartdata from '../../../components/icon/chartdata.png'
//import buydata from '../../../components/icon/buydata.png';
import zhCN from "antd/lib/locale-provider/zh_CN";
const { Content } = Layout;
export  default class forceCasting extends React.Component {
	constructor(props){
		super();
		this.state = {
			current: 'first',
			userName: 'buyer',
			location: '负荷预测',
			company: 'buyer',
            visible: false,
            xishu:0.00,
		}
	}
    chooseFile=()=>{
	    localStorage.setItem("huiguimoxing","GBR")
        localStorage.setItem("huiguixishu",this.state.xishu)
        this.props.history.push(`/seller/detailcasting`);
	}
    chooseFile2=()=>{
        localStorage.setItem("huiguimoxing","BAYES_RIDGE")
        localStorage.setItem("huiguixishu",this.state.xishu)
        this.props.history.push(`/seller/detailcasting`);
    }
    chooseFile3=()=>{
        localStorage.setItem("huiguimoxing","LINEAR_REGRESSION")
        localStorage.setItem("huiguixishu",this.state.xishu)
        this.props.history.push(`/seller/detailcasting`);
    }
    chooseFile4=()=>{
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        localStorage.setItem("huiguimoxing","CUSTOMIZE")
        localStorage.setItem("huiguixishu",this.state.xishu)
        this.props.history.push(`/seller/detailcasting`);
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    onChange =(e)=>{
        console.log(e);
        this.setState({
            xishu:e
        })
	}

  render() {
    return (
      <Layout className="layout">
				<Lheader history={this.props.history} menubox={"/seller/forecasting"}></Lheader>
    		<Content style={{ padding: '0 50px' }}>
      		<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>您当前的位置:   </Breadcrumb.Item><Breadcrumb.Item className="location">{this.state.location}</Breadcrumb.Item>
      		</Breadcrumb>
      		<div style={{ background: '#fff', padding: 24, minHeight: 660 }} className="castContent">
				<h2>负荷预测</h2>

				<h3 style={{marginTop:"100px",textAlign:"center",fontWeight:"600",marginBottom:"30px",width:"100%"}}>请选择一个预测模型</h3>
                <div className={`three`}>
                    <div className={`color   color1`}  onClick={this.chooseFile} >
                        <img src={chartdata} alt=""/>
                        <p className={`import`}>梯度增强回归</p>
                    </div>


                    <div className={`color   color2`}  onClick={this.chooseFile2} >
                        <img src={chartdata} alt=""/>

                        <p className={`import`}>贝叶斯岭回归</p>
                    </div>
                </div>

                {/*<div className={`mobanthree`}>*/}
                    {/*<p className={`moban`} onClick={this.down1}>数据模板下载</p>*/}
                    {/*<p className={`moban`} style={{marginLeft: "20%"}} onClick={this.down2}>数据模板下载</p>*/}
                    {/*/!*<p className={`moban`} style={{marginLeft:"20%"}}>数据模板下载</p>*!/*/}
                {/*</div>*/}

                <div className={`three`}>
                    <div className={`color   color3`} onClick={this.chooseFile3} >
                        <img src={chartdata} alt=""/>
                        <p className={`import`}>普通线性回归</p>
                    </div>

                    <div className={`color   color4`} onClick={this.chooseFile4} >
                        <img src={chartdata} alt=""/>
                        <p className={`import`}>自定义系数回归</p>
                    </div>
                </div>

                <LocaleProvider locale={zhCN}>
                    <Modal
                        title="设置系数"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p style={{fontSize:"16px",fontWeight:"600",marginBottom:"10px" }}>正在设置 &nbsp;&nbsp;&nbsp;&nbsp; <span style={{color:"#1890ff"}}>自定义系数模型</span></p>

						<span style={{fontSize:"16px" }}>预测系数: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <InputNumber min={0} max={10} step={0.01}  defaultValue={0}  onChange={this.onChange} />
						<p style={{fontSize:"16px",marginTop:"10px" }}>输入0~10之间的数字,精确到0.01</p>

                    </Modal>
                </LocaleProvider>



			</div>
    		</Content>
    	<Lfooter></Lfooter>
  	</Layout>
  	)
  }
}