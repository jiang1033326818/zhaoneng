import React, {Component} from 'react';
import api from '../../../../api/tools.js';
import {Row, Col, Select} from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

const Option = Select.Option;

class EchartsTest extends Component {
    constructor(props) {
        super();
        this.state = {
            value: 'gbr',
            year: '2018'
        }
    }

    componentDidMount() {
        this.handleMessage(this.state.value, this.state.year);
    }

    handleMessage = (value, year) => {
        let {name1, name2} = this.props;
        let dom1 = document.getElementById('bilateralHistory');
        var resizeWorldMapContainer1 = function () {
            dom1.style.width = (window.innerWidth - 250) / 2 + 'px';
            dom1.style.height = (window.innerHeight - 250) / 2 + 'px';
        }
        resizeWorldMapContainer1();
        var myChart = echarts.init(dom1);
        let option = {
            title: {
                text: '双边预测历史对比',
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
                            color: '#1890ff'
                        }
                    }
                },
                {
                    name: name2,
                    type: 'line',
                    data: [],
                    itemStyle: {
                        normal: {
                            color: '#f04864'
                        }
                    }
                }
            ]
        };
        myChart.showLoading();
        const param = {
            'algorithmName': value,
            'year': year
        }
        let headers = {
            'authorization': sessionStorage.obj
        }
        let url = '/api/forecast/bilateral/history';
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
            resizeWorldMapContainer1();
            myChart.resize();
        });
    }
    handleChange = (value) => {
        this.setState({
            value: value
        });
        this.handleMessage(value, this.state.year);
    }
    handleYearChange = (value) => {
        this.setState({
            year: value
        });
        this.handleMessage(this.state.value, value);
    }

    render() {
        return (
            <Row>
                <Row>
                    <Col span={24}>
                        <Select defaultValue="2018" onChange={this.handleYearChange} className="monthSel">
                            <Option value="2018">2018</Option>
                            <Option value="2017">2017</Option>
                            <Option value="2016">2016</Option>
                            <Option value="2015">2015</Option>
                            <Option value="2014">2014</Option>
                        </Select>
                        <Select defaultValue="gbr" onChange={this.handleChange} className="classSel">
                            <Option value="gbr">梯度增强回归</Option>
                            <Option value="bayes_ridge">贝叶斯岭回归</Option>
                            <Option value="linear_regression">普通线性回归</Option>
                            <Option value="elastic_net">弹性网络回归</Option>
                            <Option value="svr">支持向量机回归</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <div id="bilateralHistory" style={{width: 800, height: 400}} className="lineChart"></div>
                </Row>
            </Row>
        );
    }
}

export default EchartsTest;