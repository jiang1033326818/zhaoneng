import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入电状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
class EchartsTest extends Component {

    componentDidMount() {
        let {name1,name2}=this.props
        let dom1 = document.getElementById('commonCrop2');
        // 用于使chart自适应高度和宽度，通过窗体高度计算容器高宽
        var resizeWorldMapContainer3 = function() {
            dom1.style.width = (window.innerWidth-250)/2 + 'px';
            dom1.style.height = (window.innerHeight-250)/2 + 'px';
        }
        // 设置容器高宽
        resizeWorldMapContainer3();
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(dom1);
        // 绘制图表
        myChart.setOption({
            title: {
                text: '金额结算'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[name1,name2]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:name1,
                    type:'line',
                    //stack: '总量',
                    data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    itemStyle:{
                        normal:{
                            color:'#9860e5'
                        }
                    }
                },
                {
                    name:name2,
                    type:'line',
                    //stack: '总量',
                    data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    itemStyle:{
                        normal:{
                            color:'#4fcb74'
                        }
                    }
                },
            ]
        });
        window.addEventListener('resize',function(){
            resizeWorldMapContainer3();
            myChart.resize();
        });
    }
    render() {
        return (
            <div id="commonCrop2" style={{ height: 300 }} className="lineChart2"></div>
        );
    }
}

export default EchartsTest;