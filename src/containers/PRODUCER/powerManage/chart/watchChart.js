import React from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends React.Component {
    componentDidMount() {
		var myChart = echarts.init(document.getElementById('watch'));
					myChart.setOption({
						color: ["#f04864", "#fbd438", "#4fcb74"],
						series: [{
							name: '用电偏差',
							type: 'gauge',
							detail: {
								formatter: '{value}%'
							},
							axisLine: {
								show: true,
								lineStyle: {
									width: 30,
									shadowBlur: 0,
									color: [
										[0.3, '#67e0e3'],
										[0.7, '#37a2da'],
										[1, '#fd666d']
									]
								}
							},
							data: [{
								value: 1.2,
								name: '偏差率',
							}]
						}]
		});
	}
    render() {
        return (
            <div id="watch" style={{ width: 300, height: 300 }}>
			</div>
        );
    }
}

export default EchartsTest;