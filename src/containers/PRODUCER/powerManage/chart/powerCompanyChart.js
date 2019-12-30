import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['实际用电','剩余电量']
            },
            series: [
                {
                    name:'电厂合同电量排名',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        }
                    },
                    data:[
                        {
                          value:500000000,
													name:'广东第一发电厂',
													itemStyle:{
														normal:{
																color:'#3ba1ff'
														}
													}
                        },
                        {
													value:125000000,
													name:'广东第二发电厂',
													itemStyle:{
														normal:{
																color:'#4fcb74'
														}
													}
												},
												{
													value:125000000,
													name:'广东第三发电厂',
													itemStyle:{
														normal:{
																color:'#fbd438'
														}
													}
												},
												{
													value:125000000,
													name:'广东第四发电厂',
													itemStyle:{
														normal:{
																color:'#f04864'
														}
													}
												},
												{
													value:125000000,
													name:'广东第五发电厂',
													itemStyle:{
														normal:{
																color:'#9860e5'
														}
													}
												},
												{
													value:72500000,
													name:'其他',
													itemStyle:{
														normal:{
																color:'#37cbcb'
														}
													}
												},
                    ]
                }
            ]
        });
    }
    render() {
        return (
            <div id="main" style={{ width: 300, height: 300 }}></div>
        );
    }
}

export default EchartsTest;