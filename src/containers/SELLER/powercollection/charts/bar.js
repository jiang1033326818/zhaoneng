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


    // componentDidMount(){
    //
    // }

    componentDidMount(){
        let dom1 = document.getElementById('commonTime500');
        var myChart = echarts.init(dom1);
        myChart.showLoading();

        let { dianbiao } = this.props;
        // 绘制图表
        console.log(dianbiao)

        myChart.hideLoading();
        myChart.setOption({
            title: {
                text: dianbiao===undefined?"AABB001":dianbiao,
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
                top:"13%",
                containLabel: true
            },

            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月',"六月","七月"],
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

            series: [
                {
                    name: '模拟数据',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#1890ff'
                    },
                    areaStyle: {
                        color: '#e8f4ff'
                    },
                    data: [10,15,98,35,87.32,99,79]
                }
            ]
        });

    }
    render() {
        return (
            <div id="commonTime500" style={{  height: 350 }} ></div>
        );
    }
}

export default EchartsTest;