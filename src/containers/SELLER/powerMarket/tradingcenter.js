import React from 'react';
import {Layout,Steps, Button, message} from 'antd'
const Step = Steps.Step;

//import '../../CONSUMER/negotiatePrice/price.less';
const steps = [{
    title: '第一步',
    content: '双方确认',
}, {
    title: '第二步',
    content: '查看过滤合同,如果不符合,退回',
}, {
    title: '第三步',
    content: '交易双方审核',
}, {
    title: '第四步',
    content: '申报成功',
},
    {
        title: '第五步',
        content: '发布批次公告',
    }];

export  default class details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }


    render() {
        const { current } = this.state;

            return (
                <Layout className="layout">
                   <h1>交易中心</h1>
                    <div className={`priceBox`} style={{height:"1000px",padding:"30px 10%"}}>
                        <div style={{width:"80%"}}>
                            <Steps current={current}>
                                {steps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>
                            <div className="steps-content" style={{margin:"50px 0"}}>{steps[this.state.current].content}</div>
                            <div className="steps-action" >
                                {
                                    this.state.current < steps.length - 1
                                    &&
                                    <Button type="primary" onClick={() => this.next()}>下一步</Button>
                                }
                                {
                                    this.state.current === steps.length - 1
                                    &&
                                    <Button type="primary" onClick={() => message.success('完成交易!')}>{"交易完成"}</Button>
                                }
                                {
                                    this.state.current > 0
                                    &&
                                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                        {"退回"}
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </Layout>
            )


    }
}