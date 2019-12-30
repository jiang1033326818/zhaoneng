import React, {Component} from 'react';
import api from '../../../../api/tools.js';
import {Row, Col, Select} from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

const Option = Select.Option;

class EchartsTest extends Component {
    constructor(props) {
        super();
        this.state = {
            value: 'gbr'
        }
    }

    componentDidMount() {
        this.handleMessage(this.state.value);
    }

    handleMessage = (value) => {
        let {name1, name2} = this.props;
        var dom2 = document.getElementById('bilateralForecast');
        var resizeWorldMapContainer2 = function () {
            dom2.style.width = (window.innerWidth - 250) / 2 + 'px';
            dom2.style.height = (window.innerHeight - 250) / 2 + 'px';
        }
        resizeWorldMapContainer2();
        var myChart = echarts.init(dom2);
        let option = {
            title: {
                text: '双边预测',
                textStyle: {
                    fontSize: 15
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [name1, name2]
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
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                type: 'value',
                name: '万千瓦时'
            },
            series: [
                {
                    name: name1,
                    type: 'line',
                    data: [],
                    itemStyle: {
                        normal: {
                            color: '#9860e5'
                        }
                    }
                },
                {
                    name: name2,
                    type: 'line',
                    data: [],
                    itemStyle: {
                        normal: {
                            color: '#4fcb74'
                        }
                    }
                }
            ]
        };
        myChart.showLoading();
        const param = {
            'algorithmName': value
        }
        let headers = {
            'authorization': sessionStorage.obj
        }
        let url = '/api/forecast/bilateral/forecast';
        api.get(url, headers, param,
            (res) => {
                let actuclList = res.content.actualList;
                let forecastList = res.content.forecastList;
                let actucValueList = [];
                let forecastValueList = [];
                actuclList.forEach((item) => {
                    actucValueList.push(item.value);
                });
                forecastList.forEach((item) => {
                    forecastValueList.push(item.value);
                });
                myChart.hideLoading();
                myChart.setOption({
                    series: [{name: name1, data: actucValueList}, {name: name2, data: forecastValueList}]
                });
            },
            (err) => {
                myChart.hideLoading();
                myChart.setOption({
                    series: [{name: '暂无数据', data: []}]
                });
            }
        );
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            resizeWorldMapContainer2();
            myChart.resize();
        });
    }
    // 双边预测改变
    handleChange = (value) => {
        this.setState({
            value: value
        });
        this.handleMessage(value);
    }

    render() {
        return (
            <Row>
                <Row>
                    <Col span={8} offset={16} style={{textAlign: 'center'}}>
                        <Select defaultValue="gbr" onChange={this.handleChange}>
                            <Option value="gbr">梯度增强回归</Option>
                            <Option value="bayes_ridge">贝叶斯岭回归</Option>
                            <Option value="linear_regression">普通线性回归</Option>
                            <Option value="elastic_net">弹性网络回归</Option>
                            <Option value="svr">支持向量机回归</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <div id="bilateralForecast" style={{width: 800, height: 400}} className="lineChart"></div>
                </Row>
            </Row>
        );
    }
}

export default EchartsTest;
