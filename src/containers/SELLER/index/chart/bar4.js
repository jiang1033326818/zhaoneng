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
        let dom1 = document.getElementById('commonTime12');

        let myChart = echarts.init(dom1);
        // 绘制图表
        myChart.setOption({
            title: {
                text: '剩余可分配电量',
                textStyle:{
                    color:"#000000",
                    fontSize:"14",
                    fontWeight:"500",
                }
            },
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['八月', '九月', '十月', '十一月', '十二月', '一月', '二月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        });

    }
    render() {
        return (
            <div id="commonTime12" style={{  height: 120,width:"100%" }} ></div>
        );
    }
}

export default EchartsTest;