/**
 * 合同预览
 * 姜海鹏 2018/6/13
 */
import React from 'react'
import {Button,List} from 'antd'
import './previewset.less'
import  data from  './preview.json'

let newdata = data.data
const data2 = [
    <div className={'center'}>{'结算状态 : 已结清 '}</div>,
    <div className={'center'}>{ '总用电量 :      10000万千瓦时'}</div>,
    <div className={'center'}>{ '总金额 :        500万元'}</div>,
    <div className={'center'}>{'长期用电协议包含用电量 : 500万千万时'}</div>,
    <div className={'center'}>{  '长期用电协议总金额 : 500万千万时'}</div>,
    <div className={'center'}>{   '竞价用电协议总金额 : 500万千万时'}</div>,


];
export  default class settleview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            companyCode: 'SELLER',
            displaybutton:"block"
        }
    }
    returnlast =()=>{
        this.props.history.go(-1);
    }

    returnprint =()=>{
        this.setState({
            dispplaybutton:"none",
        })
        setTimeout(
            () => { window.print(); },
            100
        );

        setTimeout(
            () => { this.setState({dispplaybutton:"block"}) },
            200
        );
    }


    render() {

        return (
            <div className={`previewBox`}>
                <div className={`previewlight`}></div>
                <div className={`previewcontent`}>
                    {/*<div className={`returnlast`} onClick={this.returnlast}>*/}
                    {/*<Icon type="close-circle-o" />*/}
                    {/*</div>*/}
                    <Button type="primary" className={"downloadit"} onClick={this.returnprint} style={{display:this.state.dispplaybutton,left:"200px"}} >{"打印"}</Button>
                    <Button type="primary" className={"downloadit"} onClick={this.returnlast} style={{display:this.state.dispplaybutton,right:"200px"}} >{"返回"}</Button>
                    <div className={`pretop`}>
                        <p> <span>{newdata.jiafang}</span>{"一"}月与<span>{newdata.yifang}</span>公司电力结算信息明细</p>
                        <div className={`prehr`}></div>
                    </div>

                    <div style={{margin:"10px 4%"}}>
                        <List
                            //header={<div></div>}
                            //footer={<div></div>}
                            bordered
                            dataSource={data2}
                            renderItem={item => (<List.Item>{item}</List.Item>)}
                        />
                    </div>


                    <div className={`prebottom`}>
                        <p>{"第1页 共"} <span>{"1"}</span>{"页"}</p>
                    </div>
                </div>
            </div>

        )
    }
}
