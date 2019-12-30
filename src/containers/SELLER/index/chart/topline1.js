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
        let dom1 = document.getElementById('commonTime20');

        //let myChart = echarts.init(dom1);
        // 绘制图表
        var myChart = echarts.init(dom1);
        // 绘制图表
        myChart.setOption({
            title: {
                text: '用户月均交易电量',
                textStyle:{
                    color:"#000000",
                    fontSize:"14",
                    fontWeight:"500",
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                left: '1%',
                right: '4%',
                bottom: '3%',
                top:"23%",
                containLabel: true
            },

            xAxis: {
                boundaryGap: false,
                show:false,
                axisTick: {
                    show: false
                },
                data: ["2016","2016","2016","2016","2016",],
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },

            },
            yAxis: {
                show:false,
                type: 'value',
                boundaryGap: [0, '100%'],
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                axisTick: {
                    show: false
                }
            },

            series : [
                {

                    /*itemStyle : { normal: {label : {show: true, position: 'insideTop',textStyle:{color:'#000'}}}},*/
                    data:[12,15,18,13,10],
                    name: '模拟数据',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#1890ff'
                    },
                    areaStyle: {
                        color: '#00bfff'
                    },
                },

            ]
        });

    }
    render() {
        return (
            <div id="commonTime20" style={{  height: 120,width:"100%" }} ></div>
        );
    }
}

export default EchartsTest;