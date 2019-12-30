import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('commonCrop'));
        myChart.setOption({
					title: {
						text: '发电收入同期对比'
					},
					tooltip: {
							trigger: 'axis'
					},
					legend: {
							data:['今年预计发电','去年预计发电','今年实际发电','去年同期发电','今年预计收入','去年预计收入','今年实际收入','去年同期收入']
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
									name:'今年预计收入',
									type:'line',
									data:[350, 900, 1100, 1500, 1350, 1650, 1000, 1300, 700, 1000, 1450, 550],
									itemStyle:{
										normal:{
												color:'#9860e5'
										}
									}
							},
							{
									name:'去年预计收入',
									type:'line',
									data:[300, 800, 1000, 1300, 1250, 1550, 900, 1200, 600, 9000, 1250, 700],
									itemStyle:{
										normal:{
												color:'#4fcb74'
										}
									}
							},
							{
									name:'今年实际收入',
									type:'line',
									data:[1550, 1250, 1200, 1000, 600, 750],
									itemStyle:{
										normal:{
												color:'#fbd438'
										}
									}
							},
							{
									name:'去年同期收入',
									type:'line',
									data:[1250, 1050, 900, 600, 900, 800],
									itemStyle:{
										normal:{
												color:'#f04864'
										}
									}
							},
					]
        });
    }
    render() {
        return (
            <div id="commonCrop" style={{ width: 600, height: 300 }} className="lineChart"></div>
        );
    }
}

export default EchartsTest;