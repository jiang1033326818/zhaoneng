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
        let dom1 = document.getElementById('commonTime3');

        var myChart = echarts.init(dom1);
        // 绘制图表
        myChart.setOption({
            // tooltip: {
            //     trigger: 'item',
            //     formatter: "{a} <br/>{b}: {c} ({d}%)"
            // },
            // legend: {
            //     orient: 'vertical',
            //     x: 'left',
            //     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            // },
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '12',
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
                        {
                            value:635,
                            name:'长协',
                            itemStyle:{
                                normal:{
                                    color:'#4fcb74'
                                }
                            }

                        },
                        {
                            value:335,
                            name:'竞价',
                            itemStyle:{
                                normal:{
                                    color:'#2c7ecb'
                                }
                            }

                        },
                    ]
                }
            ]
        });

    }
    render() {
        return (
            <div id="commonTime3" style={{  height: 90 }} ></div>
        );
    }
}

export default EchartsTest;