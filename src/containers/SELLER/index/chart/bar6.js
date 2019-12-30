import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入电状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

class EchartsTest extends Component {
    componentDidMount() {
        let dom1 = document.getElementById('commonTime14');

        var myChart = echarts.init(dom1);
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: "50%",
                y:80,
                data:['冶金','化工','制造业','服装箱包','产业园',"其他"]
            },
            grid: {
                left: '8%',
                right: 500,
                bottom: '1%',
                containLabel: true
            },
            series: [
                {
                    name:'行业分布',
                    type:'pie',
                    radius: ['50%', '65%'],
                    center: ['25%','50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'冶金'},
                        {value:310, name:'化工'},
                        {value:234, name:'制造业'},
                        {value:135, name:'服装箱包'},
                        {value:1548, name:'产业园'},
                        {value:885, name:'其他'},
                    ]
                }
            ]
        });

    }
    render() {
        return (
            <div id="commonTime14" style={{  height: 300,width:"100%" }} ></div>
        );
    }
}

export default EchartsTest;