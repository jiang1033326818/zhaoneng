import React, { Component } from 'react';

import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['实际用电','剩余电量']
            },
            series: [
                {
                    name:'收入占比',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        }
                    },
                    data:[
                        {
                            value:78,
                            name:'双边',
                            itemStyle:{
                                normal:{
                                    color:'#1890ff'
                                }
                            },
                        },
                        {
                            value:22,
                            name:'竞价',
                            itemStyle:{
                                normal:{
                                    color:'#00ffcb'
                                }
                            },
                        }

                    ]
                }
            ]
        });
    }
    render() {
        return (
            <div id="main" style={{ width: 120, height: 120 }} className="pieChartContainer"></div>
        );
    }
}

export default EchartsTest;