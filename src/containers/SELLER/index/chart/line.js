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
        let dom1 = document.getElementById('commonTime4');

        var myChart = echarts.init(dom1);
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'AABB001',
                textStyle:{
                    color:"#000000",
                    fontSize:"18",
                    fontWeight:"600",
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

            xAxis:  {
                type: 'category',
                //boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月',],
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#d6d6d7',//坐标值得具体的颜色

                    }
                }
            },
            yAxis: {
                type: 'value',
                // axisLabel: {
                //     formatter: '{value} W'
                // },
                axisPointer: {
                    snap: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#d6d6d7',//坐标值得具体的颜色

                    }
                }
            },

            series : [
                {
                    name:'完成合同',
                    type:'bar',
                    //stack: '总量',
                    /*itemStyle : { normal: {label : {show: true, position: 'insideTop',textStyle:{color:'#000'}}}},*/
                    data:[10,12,15,18,22],
                    barWidth : 35,
                    itemStyle:{
                        normal:{
                            color:'#00bfff'
                        }
                    },
                },

            ]
        });

    }
    render() {
        return (
            <div id="commonTime4" style={{  height: 350 }} ></div>
        );
    }
}

export default EchartsTest;