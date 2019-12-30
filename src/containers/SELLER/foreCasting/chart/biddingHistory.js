import React, {Component} from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入电状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

class EchartsTest extends Component {
    state = {
        newdata: {},
        zql:[]
    }

    componentDidMount() {

    }


    componentWillReceiveProps(nextProps){
        let dom1 = document.getElementById('charts2');
        var myChart = echarts.init(dom1);
        myChart.showLoading();
        let zql = []
        let {data} = nextProps;

        if (data !== []&&data!==null) {
            for (let i in data.month) {
                zql.push(((1-(Math.abs(data.forecastPower[i] - data.actualPower[i]))/data.actualPower[i]) * 100).toFixed(2)<0?0:((1-(Math.abs(data.forecastPower[i] - data.actualPower[i]))/data.actualPower[i]) * 100).toFixed(2))
            }
        }
        myChart.hideLoading();




        // 绘制图表

        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {},
            grid: {
                left: '2%',
                right: '2%',
                bottom: '3%',
                top: "13%",
                containLabel: true
            },
            legend: {
                data: ["实际电量",'预测电量','结算电量',  '申报电量',  "准确率"]
            },
            xAxis: [
                {
                    type: 'category',
                    data: data.month,
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            type: 'solid',
                            color: '#d6d6d7',//左边线的颜色
                            width: '2'//坐标线的宽度
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '电量',
                    axisLabel: {
                        formatter: '{value} Kwh'
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            type: 'solid',
                            color: '#d6d6d7',//左边线的颜色
                            width: '2'//坐标线的宽度
                        }
                    },
                },
                {
                    type: 'value',
                    name: '准确率',
                    axisLabel: {
                        formatter: '{value} %'
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            type: 'solid',
                            color: '#d6d6d7',//左边线的颜色
                            width: '2'//坐标线的宽度
                        }
                    },
                }
            ],
            series: [
                {
                    name: '预测电量',
                    type: 'bar',
                    data: data.forecastPower,
                    color: "#4ecb74",
                    barWidth: 14,
                },
                {
                    name: '实际电量',
                    type: 'bar',
                    data: data.actualPower,
                    color: "#9760e3",
                    barWidth: 14,
                },
                {
                    name: '结算电量',
                    type: 'bar',
                    data: data.settlementPower,
                    color: "#3ba1ff",
                    barWidth: 14,
                },

                {
                    name: '申报电量',
                    type: 'bar',
                    data: data.reportPower,
                    color: "#fad337",
                    barWidth: 14,
                },
                {
                    name: "准确率",
                    type: 'line',
                    yAxisIndex: 1,
                    data: zql<0?0:zql,
                    color: "#fa9b65",
                },

            ]
        });


    }

    render() {

        return (
            <div id="charts2" style={{height: 350}}></div>
        );
    }
}

export default EchartsTest;
