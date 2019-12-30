import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentDidMount() {
				var myChart = echarts.init(document.getElementById('count'));
				var posList = [
					'left', 'right', 'top', 'bottom',
					'inside',
					'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
					'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
			];

			myChart.configParameters = {
					rotate: {
							min: -90,
							max: 90
					},
					align: {
							options: {
									left: 'left',
									center: 'center',
									right: 'right'
							}
					},
					verticalAlign: {
							options: {
									top: 'top',
									middle: 'middle',
									bottom: 'bottom'
							}
					},
					position: {
							options: echarts.util.reduce(posList, function (map, pos) {
									map[pos] = pos;
									return map;
							}, {})
					},
					distance: {
							min: 0,
							max: 100
					}
			};

			myChart.config = {
					rotate: 90,
					align: 'left',
					verticalAlign: 'middle',
					position: 'insideBottom',
					distance: 15,
					onChange: function () {
							var labelOption = {
									normal: {
											rotate: myChart.config.rotate,
											align: myChart.config.align,
											verticalAlign: myChart.config.verticalAlign,
											position: myChart.config.position,
											distance: myChart.config.distance
									}
							};
							myChart.setOption({
									series: [{
											label: labelOption
									}, {
											label: labelOption
									}, {
											label: labelOption
									}, {
											label: labelOption
									}]
							});
					}
			};
				var labelOption = {
					normal: {
							show: false,
							position: myChart.config.position,
							distance: myChart.config.distance,
							align: myChart.config.align,
							verticalAlign: myChart.config.verticalAlign,
							rotate: myChart.config.rotate,
							formatter: '{c}  {name|{a}}',
							fontSize: 16,
							rich: {
									name: {
											textBorderColor: '#fff'
									}
							}
					}
				};
        // 绘制图表
        myChart.setOption({
					color: ['#3ba1ff', '#4fcb74', '#fbd438'],
					tooltip: {
							trigger: 'axis',
							axisPointer: {
									type: 'shadow'
							}
					},
					legend: {
							data: ['用户委托电量', '结算电量', '购电量(双边+竞价)',]
					},
					// toolbox: {
					// 		show: true,
					// 		orient: 'vertical',
					// 		left: 'right',
					// 		top: 'center',
					// 		feature: {
					// 				mark: {show: true},
					// 				dataView: {show: true, readOnly: false},
					// 				magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
					// 				restore: {show: true},
					// 				saveAsImage: {show: true}
					// 		}
					// },
					calculable: true,
					xAxis: [
							{
									type: 'category',
									axisTick: {show: false},
									data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','十一月','十二月']
							}
					],
					yAxis: [
							{
									type: 'value'
							}
					],
					series: [
						{
							name: '用户委托电量',
							type: 'bar',
							barGap: 0,
							label: labelOption,
							data: [12300, 12344, 11022, 9922, 8920, 12452, 12131,14520,15200,16870,14230,11937]
					},
					{
							name: '结算电量',
							type: 'bar',
							label: labelOption,
							data: [12590, 13583, 10020 ,10000 ,9000, 13452, 12150,14200,15200,16870,14230,11200]
					},
					{
							name: '购电量(双边+竞价)',
							type: 'bar',
							label: labelOption,
							data: [12600, 14000, 11000, 10000, 9000, 14000, 12500, 14200, 15200, 16900 ,15000,12000]
					},
					]
			});
    }
    render() {
        return (
            <div id="count" style={{ width: 1200, height: 500 }}></div>
        );
    }
}

export default EchartsTest;