import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['实际用电','剩余电量','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'电量使用',
                    type:'pie',
                    radius: ['40%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            width:"200px",
                            height:"200px"
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
                            show: false,
                        }
                    },
                    data:[
                        {
                            value:78, 
                            name:'78%',
                            itemStyle:{
                                normal:{
                                    color:'#4ad2ff'
                                }
                            },
                        },
                        {
                            value:22, 
                            name:'',
                            itemStyle:{
                                normal:{
                                    color:'#dddddd'
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
            <div id="main" style={{ width: 200, height: 250 }}></div>
        );
    }
}

export default EchartsTest;