import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('count'));
        myChart.setOption({
					color: ['#3398DB'],
					tooltip : {
							trigger: 'axis',
							axisPointer : {
									type : 'shadow'
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
									data : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
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
									name:'每月计划发电收入',
									type:'bar',
									barWidth: '60%',
									data:[350, 900, 1100, 1500, 1350, 1650, 1000, 1300, 700, 1000, 1450, 550]
							}
					]
        });
    }
    render() {
        return (
            <div id="count" style={{ width: 300, height: 160 }} className="chartContainer"></div>
        );
    }
}

export default EchartsTest;