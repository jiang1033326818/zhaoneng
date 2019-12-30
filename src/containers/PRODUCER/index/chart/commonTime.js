import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('commonTime'));
        myChart.setOption({
					title: {
						text: '发电量同期对比'
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
									name:'今年预计发电',
									type:'line',
									data:[7000, 18000, 22000, 23000, 17000, 33000, 20000, 26000, 14000, 20000, 29000, 11000],
									itemStyle:{
										normal:{
												color:'#9860e5'
										}
									}
							},
							{
									name:'去年预计发电',
									type:'line',
									data:[6000, 17000, 21000, 22000, 16000, 32000, 19000, 25000, 13000, 19000, 28000, 10000],
									itemStyle:{
										normal:{
												color:'#4fcb74'
										}
									}
							},
							{
									name:'今年实际发电',
									type:'line',
									data:[31000, 25000, 24000, 20000, 12000, 15000],
									itemStyle:{
										normal:{
												color:'#fbd438'
										}
									}
							},
							{
									name:'去年同期发电',
									type:'line',
									data:[30000, 24000, 23000, 19000, 11000, 14000],
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
            <div id="commonTime" style={{ width: 600, height: 300 }} className="lineChart"></div>
        );
    }
}

export default EchartsTest;