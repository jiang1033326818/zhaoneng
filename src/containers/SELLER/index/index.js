import React from 'react';
import {Layout, Breadcrumb, Row, Col, Icon, Progress, Divider, Tabs} from 'antd';
import ReactEcharts from 'echarts-for-react';
import './index.less';
import  "echarts-liquidfill";
import Lfooter from '../../../components/layout/Ifooter.js';
import Lheader from '../common/Iheader.js';
import Bchart from './chart/line.js'
import api from "../../../api/tools";
// import createG2 from 'g2-react';
// import { Stat } from 'g2';
const {Content} = Layout;
const TabPane = Tabs.TabPane;

let jiaoyiall=0




export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'first',
            userName: '',
            location: '驾驶舱',
            company: '',
            message1: '广东省广州市***集团，2019年度购电1000MW',
            message2: '平台升级在即，发力现货交易市场，区块链+AI技术，智胜未来！',
            notice: [],
            policy: [],
            cancelNum: 0,
            unconfirmedNum: 0,
            pendingNum: 0,
            confirmedNum: 0,
            top: [],
            report: {},
            customer: null,
            monthpower: [],
            plus: null,
            adata:[],
            bdata:[],
            monthdata:[],
            powerall:[20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7],
            industry:[],
            jiaoyipower:[],
            hysj:[],
            hyname:[],
            sixpower:[],
            money:[],
            monthstr:[],
            twelve:[],
            power1:0,
            power2:0,
            jiaoyiall:0,
        }
    }


    //用电排名10
    getindextop() {
        let headers2 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params2 = null
        //console.log(params)
        let url2 = '/api/dashboard/top/customer/10'
        api.get(url2, headers2, params2,
            (res) => {

                this.setState({
                    top: res.content
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    //申报完成度
    getindexreport() {
        let headers2 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params2 = null
        //console.log(params)
        let url2 = '/api/dashboard/count/report'
        api.get(url2, headers2, params2,
            (res) => {

                this.setState({
                    report: res.content
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    //各个企业数量
    getindexcustomer() {
        let headers2 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params2 = null
        //console.log(params)
        let url2 = '/api/dashboard/count/customer'
        api.get(url2, headers2, params2,
            (res) => {
                this.setState({
                    customer: res.content
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    //用户月均交易电量
    getindexmonthpower() {
        let headers2 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params2 = null
        //console.log(params)
        let url2 = '/api/dashboard/avg/customer'
        api.get(url2, headers2, params2,
            (res) => {
                console.log(res,"月均交易电量")
                let jiaoyipower=[]

               // let jiaoyiall2=0
                for(let i in res.content){
                    jiaoyipower.push(res.content[i].actualPower===null?0:res.content[i].actualPower)
                    jiaoyiall=jiaoyiall+(res.content[i].actualPower===null?0:res.content[i].actualPower)
                }
                console.log(jiaoyiall,7001)
                this.setState({
                    monthpower: res.content,
                    jiaoyipower:jiaoyipower,
                    jiaoyiall:jiaoyiall,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    //客户增量列表
    getindexplus() {
        let headers2 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params2 = null
        //console.log(params)
        let url2 = '/api/dashboard/summary/customer'
        api.get(url2, headers2, params2,
            (res) => {

                let adata=[]
                let bdata=[]
                let monthdata=[]
                for(let i in res.content){
                    adata.push(res.content[i].producer===null?0:res.content[i].producer)
                    bdata.push(res.content[i].customer===null?0:res.content[i].customer)
                    monthdata.push(res.content[i].month)
                }
                this.setState({
                    adata:adata,
                    bdata:bdata,
                    monthdata:monthdata,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    //用电行业分布
    getindextype(){
        let headers2 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params2 = null
        //console.log(params)
        let url2 = '/api/dashboard/distribution/customer'
        api.get(url2, headers2, params2,
            (res) => {

                let data1=[];
                let data2=[];
                for(let i in res.content){

                     data1.push(
                         {
                             name:res.content[i].yearStr===null?0:res.content[i].yearStr,
                             value:res.content[i].actualPower===null?0:res.content[i].actualPower
                         }
                     )
                     //data1[i].value=res.content[i].actualPower
                     data2.push(res.content[i].yearStr===null?0:res.content[i].yearStr)
                }

                this.setState({
                    hysj: data1,
                    hyname: data2,
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    //购电成本构成
    getindexmoney(){
        let headers2 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params2 = null
        //console.log(params)
        let url2 = '/api/dashboard/cost/purchase'
        api.get(url2, headers2, params2,
            (res) => {
                console.log(res,"money")
                let money=[]
                let month=[]
                for(let i in res.content){
                    money.push(res.content[i].avg)
                    month.push(res.content[i].power)
                }
                this.setState({
                    money:money,
                    sixpower:month
                })
            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    //十二个月内电量
    getindextwelve(){
        let headers2 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params2 = null
        //console.log(params)
        let url2 = '/api/dashboard/summary/power'
        api.get(url2, headers2, params2,
            (res) => {
                console.log(res,"money")
                let money=[]
                let month=[]
                for(let i in res.content){
                    money.push(res.content[i].actualPower)
                    month.push(res.content[i].monthStr)
                }
                this.setState({
                    monthstr:month,
                    twelve:money,
                })

            },
            (err) => {
                console.log("failed" + err)
            }
        );
    }

    //当月购售电情况
    getindexseller(){
        let headers2 = {
            'Authorization': sessionStorage.obj,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        let params2 = null
        //console.log(params)
        let url2 = '/api/dashboard/surplus/power'
        api.get(url2, headers2, params2,
            (res) => {

                this.setState({
                    power1:res.content.power,
                    power2:res.content.surplusPower,
                })

            },
            (err) => {
                console.log("failed" + err)
            }
        );

    }



    componentDidMount() {
        // let date = new Date();
        // let year=date.getFullYear()
        // let year2=date.getMonth()+1;
        // let month=year+"-"+year2

        this.getindextop();
        this.getindexreport();
        this.getindexcustomer();
        this.getindexmonthpower();
        this.getindexplus();
        this.getindextype();
        this.getindexmoney();
        this.getindextwelve();
        this.getindexseller()
    }

    callback = (e) => {
        console.log(e)
    };

    getFirstOption0 = (data,data2) => {
        //const data = [20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7];
        //const date = ['1968/10/4', '1968/10/5', '1968/10/6', '1968/10/7', '1968/10/8', '1968/10/9', '1968/10/10', '1968/10/11', '1968/10/12', '1968/10/13', '1968/10/14', '1968/10/15', '1968/10/16', '1968/10/17', '1968/10/18', '1968/10/19', '1968/10/20', '1968/10/21', '1968/10/22'];
        //console.log(data,'riqi')
        return {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                show: false
            },
            grid: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data,
                scale: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: false
            },
            yAxis: {
                type: 'value',
                min: 'dataMin',
                max: 'dataMax',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: true
            },

            series: [
                {
                    name: '电量',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: 'rgb(151, 95, 228)'
                    },
                    areaStyle: {
                        color: 'rgb(151, 95, 228)'
                    },
                    data: data2
                }
            ]
        }
    };

    /* 获取累计电力电量图表配置 */
    getFirstOption = (data,month) =>  {
        //const data = [20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7];
        //const date = ['1968/10/4', '1968/10/5', '1968/10/6', '1968/10/7', '1968/10/8', '1968/10/9', '1968/10/10', '1968/10/11', '1968/10/12', '1968/10/13', '1968/10/14', '1968/10/15', '1968/10/16', '1968/10/17', '1968/10/18', '1968/10/19', '1968/10/20', '1968/10/21', '1968/10/22'];
        return {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                show: false
            },
            grid: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: month,
                scale: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: false
            },
            yAxis: {
                type: 'value',
                min: 'dataMin',
                max: 'dataMax',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: true
            },

            series: [
                {
                    name: '用电企业',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: 'rgb(151, 95, 228)'
                    },
                    areaStyle: {
                        color: 'rgb(151, 95, 228)'
                    },
                    data: data
                }
            ]
        }
    };


    getFirstOption2 = (data,month) => {
        //const data = [20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7];
        //const date = ['1968/10/4', '1968/10/5', '1968/10/6', '1968/10/7', '1968/10/8', '1968/10/9', '1968/10/10', '1968/10/11', '1968/10/12', '1968/10/13', '1968/10/14', '1968/10/15', '1968/10/16', '1968/10/17', '1968/10/18', '1968/10/19', '1968/10/20', '1968/10/21', '1968/10/22'];
        return {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                show: false
            },
            grid: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: month,
                scale: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: false
            },
            yAxis: {
                type: 'value',
                min: 'dataMin',
                max: 'dataMax',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: true
            },

            series: [
                {
                    name: '发电企业',
                    type: 'bar',
                    smooth: true,
                    symbol: 'none',
                    color:"#1890ff",
                    sampling: 'average',
                    itemStyle: {
                        color:"#1890ff",
                    },
                    areaStyle: {
                        color:"#1890ff",
                    },
                    data: data
                }
            ]
        }
    };

    //用户月均交易电量
    getFirstOption3 = (data) => {
        //const data = [20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7];
        //const date = ['1968/10/4', '1968/10/5', '1968/10/6', '1968/10/7', '1968/10/8', '1968/10/9', '1968/10/10', '1968/10/11', '1968/10/12', '1968/10/13', '1968/10/14', '1968/10/15', '1968/10/16', '1968/10/17', '1968/10/18', '1968/10/19', '1968/10/20', '1968/10/21', '1968/10/22'];
        return {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                show:true,
                text: '用户月均交易电量',
                textStyle:{
                    color:"#000000",
                    fontSize:"14",
                    fontWeight:"500",
                }
            },
            grid: {
                x: 0,
                y: 20,
                x2: 0,
                y2: 0
            },

            xAxis: {
                type: 'category',
                //boundaryGap: false,
                data: ["一月",'二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                scale: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: false
            },
            yAxis: {
                type: 'value',
                min: 'dataMin',
                max: 'dataMax',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: true
            },

            series: [
                {
                    name: '交易电量',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#3ba1ff'
                    },
                    areaStyle: {
                        color: '#cceafe'
                    },
                    data: data
                }
            ]
        }
    };

    //用户月均预计收入
    getFirstOption4 = (data) => {
        //const data = [20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7];
        //const date = ['1968/10/4', '1968/10/5', '1968/10/6', '1968/10/7', '1968/10/8', '1968/10/9', '1968/10/10', '1968/10/11', '1968/10/12', '1968/10/13', '1968/10/14', '1968/10/15', '1968/10/16', '1968/10/17', '1968/10/18', '1968/10/19', '1968/10/20', '1968/10/21', '1968/10/22'];
        return {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                show:true,
                text: '用户月均预计收入',
                textStyle:{
                    color:"#000000",
                    fontSize:"14",
                    fontWeight:"500",
                }
            },
            grid: {
                x: 0,
                y: 20,
                x2: 0,
                y2: 0
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ["一月",'二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                scale: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: false
            },
            yAxis: {
                type: 'value',
                min: 'dataMin',
                max: 'dataMax',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: true
            },

            series: [
                {
                    name: '预计收入(万元)',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#81dbe4'
                    },
                    areaStyle: {
                        color: '#dff6f8'
                    },
                    data: data
                }
            ]
        }
    };

    //用电企业行业分布
    getFirstOption5 = (data,data2) => {
        //const data = [20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7];
        //const date = ['1968/10/4', '1968/10/5', '1968/10/6', '1968/10/7', '1968/10/8', '1968/10/9', '1968/10/10', '1968/10/11', '1968/10/12', '1968/10/13', '1968/10/14', '1968/10/15', '1968/10/16', '1968/10/17', '1968/10/18', '1968/10/19', '1968/10/20', '1968/10/21', '1968/10/22'];

        return {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: "50%",
                y:80,
                data:data2
            },
            grid: {
                left: '8%',
                right: 500,
                bottom: '1%',
                containLabel: true
            },
            series: [
                {
                    name:'行业分布',
                    type:'pie',
                    radius: ['50%', '65%'],
                    center: ['25%','50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:data
                }
            ]
        }
    };

    //购电成本构成
    getFirstOption6 = (data,data2) => {
        //const data = [20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7];
        //const date = ['1968/10/4', '1968/10/5', '1968/10/6', '1968/10/7', '1968/10/8', '1968/10/9', '1968/10/10', '1968/10/11', '1968/10/12', '1968/10/13', '1968/10/14', '1968/10/15', '1968/10/16', '1968/10/17', '1968/10/18', '1968/10/19', '1968/10/20', '1968/10/21', '1968/10/22'];
        return {
            title: {
                text: '购电成本构成',
                textStyle:{
                    color:"#000000",
                    fontSize:"14",
                    fontWeight:"500",
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
                top:"23%",
                containLabel: true
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data,
                scale: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: true
            },
            yAxis: {
                type: 'value',
                min: 'dataMin',
                max: 'dataMax',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        type: 'solid',
                        color: '#d6d6d7',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
                show: true
            },

            series : [
                {
                    name:'电量',
                    type:'bar',
                    //stack: '总量',
                    /*itemStyle : { normal: {label : {show: true, position: 'insideTop',textStyle:{color:'#000'}}}},*/
                    data:data2,
                    barWidth : 10,
                    itemStyle:{
                        normal:{
                            color:'#00bfff'
                        }
                    },
                },

            ]
        }
    };

    //销售额趋势
    getFirstOption7 = (data,data2) => {
        //const data = [20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7];
        //const date = ['1968/10/4', '1968/10/5', '1968/10/6', '1968/10/7', '1968/10/8', '1968/10/9', '1968/10/10', '1968/10/11', '1968/10/12', '1968/10/13', '1968/10/14', '1968/10/15', '1968/10/16', '1968/10/17', '1968/10/18', '1968/10/19', '1968/10/20', '1968/10/21', '1968/10/22'];
        return {
            title: {
                text: '销售额趋势',
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
                //boundaryGap: false,
                data: data,
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

            series : [
                {
                    name:'销售电量',
                    type:'bar',
                    //stack: '总量',
                    /*itemStyle : { normal: {label : {show: true, position: 'insideTop',textStyle:{color:'#000'}}}},*/
                    data:data2,
                    barWidth : 20,
                    itemStyle:{
                        normal:{
                            color:'#00bfff'
                        }
                    },
                },

            ]
        }
    };

    //水球图(剩余可分配电量)
    getFirstOption8 = (data) => {
        //const data = [20.512549107518215, 15, 11, 6, 16, 11, 14, 15, 1, 1, 17, 15, 18, 4, 8, 3, 8, 16, 18, 7];
        //const date = ['1968/10/4', '1968/10/5', '1968/10/6', '1968/10/7', '1968/10/8', '1968/10/9', '1968/10/10', '1968/10/11', '1968/10/12', '1968/10/13', '1968/10/14', '1968/10/15', '1968/10/16', '1968/10/17', '1968/10/18', '1968/10/19', '1968/10/20', '1968/10/21', '1968/10/22'];
        return {
            title: {
                text: '剩余可分配电量',
                textStyle:{
                    color:"#000000",
                    fontSize:"14",
                    fontWeight:"500",
                }
            },
            series: [{
                type: 'liquidFill',
                data: [data],
                radius: '95%',
                //shape: 'pin',
                center: ['43%', '50%'],
                //amplitude: 0,
                // waveAnimation: false,
                fontSize:14,
                color: ['#4aadff'],
                outline: {
                    show: false
                },
                backgroundStyle: {
                    shadowColor: '#dddddd',
                    shadowBlur: 20,
                    //color:"red"

                },
                label: {
                    normal: {
                        textStyle: {
                            color: '#3ba1ff',
                            insideColor: '#444444',
                            fontSize: 16
                        }
                    }
                }

                }]

        }
    };


    render() {
        console.log(this.state.jiaoyiall,7000)
        return (
            <Layout className="layout">
                {/* 头部header */}
                <Lheader history={this.props.history} menubox={"/seller/index"}></Lheader>
                <Content style={{padding: '0 50px'}}>
                    {/* 面包屑 */}
                    <Row>
                        <Col span={16}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>您当前的位置: </Breadcrumb.Item><Breadcrumb.Item
                                className="location">{this.state.location}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    {/* 内容 */}
                    <div style={{background: '#f0f2f5', padding: 24, minHeight: 760}} className="contentindex">
                        <div className={'topfour'}>
                            <div className={'topfour0'}>
                                <div className={'index_dw'}>
                                    单位:万千瓦时
                                </div>
                                <div className={'topfour1'}>
                                    <p>累计电力电量 <Icon type="info-circle" theme="outlined"/></p>
                                    <h2>{0+this.state.jiaoyiall}</h2>
                                    {/*<Achart/>*/}
                                    {/*<div style={{height:"120px"}}>*/}
                                    <ReactEcharts
                                        style={{width: '100%', height: '30px'}}
                                        option={this.getFirstOption0(this.state.monthstr,this.state.twelve)}
                                        className="canvasBox"
                                    />
                                    <Divider/>
                                    <div>月均交易电量:{this.state.jiaoyiall/12}</div>
                                </div>
                            </div>
                            <div className={'topfour0'} style={{marginLeft: "2.6%"}}>
                                <div className={'topfour1'}>
                                    <p>申报完成度 <Icon type="info-circle" theme="outlined"/></p>
                                    <h2>{this.state.report.total === 0 ? "0%" : this.state.report.done / this.state.report.total + "%"}</h2>
                                    {/*<div style={{height:"120px"}}>*/}
                                    <div>
                                        <Progress
                                            percent={this.state.report.total === 0 ? 0 : this.state.report.done / this.state.report.total * 100}
                                            status="active"/>
                                    </div>
                                    <Divider/>
                                    <div>未指派:{this.state.report.undistributed === null ? 0 : this.state.report.undistributed}</div>
                                </div>
                            </div>
                            <div className={'topfour0'} style={{marginLeft: "2.6%"}}>
                                <div className={'index_dw'}>
                                    单位:家
                                </div>
                                <div className={'topfour1'}>
                                    <p>发电企业 <Icon type="info-circle" theme="outlined"/></p>
                                    <h2>{this.state.customer === null ? 0 : this.state.customer.producer}</h2>
                                    {/*<div style={{height:"120px"}}>*/}
                                    <ReactEcharts
                                        style={{width: '100%', height: '30px'}}
                                        option={this.getFirstOption2(this.state.adata,this.state.monthdata)}
                                        className="canvasBox"
                                    />
                                    <Divider/>
                                    <div>待审核:{this.state.customer === null ? 0 : this.state.customer.producerUnfinished}</div>
                                </div>
                            </div>
                            <div className={'topfour0'} style={{marginLeft: "2.8%"}}>
                                <div className={'index_dw'}>
                                    单位:家
                                </div>
                                <div className={'topfour1'}>
                                    <p>用电企业数量 <Icon type="info-circle" theme="outlined"/></p>
                                    <h2>{this.state.customer === null ? 0 : this.state.customer.customer}</h2>
                                    {/*<div style={{height:"120px"}}>*/}
                                    <ReactEcharts
                                        style={{width: '100%', height: '30px'}}
                                        option={this.getFirstOption(this.state.bdata,this.state.monthdata)}
                                        className="canvasBox"
                                    />
                                    <Divider/>
                                    <div>待审核:{this.state.customer === null ? 0 : this.state.customer.customerUnfinished}</div>
                                </div>
                            </div>
                        </div>

                        {/*第二部分预计收入和交易电量*/}
                        <div style={{clear: "both"}}></div>
                        <div className={'indexzzz'}>
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane tab="交易电量" key="1">
                                    <div className={`index_z0`}>
                                        <div className={`index_z0_left`}>
                                            <ReactEcharts
                                                style={{width: '100%', height: '350px'}}
                                                option={this.getFirstOption7(this.state.monthstr,this.state.twelve)}
                                                className="canvasBox"
                                            />
                                        </div>
                                        <div className={`index_z0_right`}>
                                            <h2>用电企业排名</h2>
                                            <div className={'index_dw'}>
                                                单位:万千瓦时
                                            </div>
                                            <div style={{clear: "both"}}></div>
                                            <div style={{marginTop: "20px"}}>
                                                {
                                                    this.state.top[0] !== null && this.state.top.map((value, key) => {
                                                        return (
                                                            <div className={'index_right_bl'}>
                                                                <div
                                                                    className={key > 2 ? 'index_right_yuan2' : "index_right_yuan"}>{key + 1}</div>
                                                                <div
                                                                    className={'index_right_right0'}>{value.customerName}</div>
                                                                <div
                                                                    className={'index_right_right'}>{value.settlementPower}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </TabPane>
                                <TabPane tab="预计收入" key="2" disabled>
                                    <div className={`index_z0`}>
                                        <div className={`index_z0_left`}>
                                            <Bchart/>
                                        </div>
                                        <div className={`index_z0_right`}>
                                            <h2>用电企业排名</h2>
                                            <div>

                                            </div>
                                            <div style={{clear: "both"}}></div>
                                            {/*<div style={{marginTop: "20px"}}>*/}
                                            {/*{*/}
                                            {/*this.state.top && this.state.top.map((value, key) => {*/}
                                            {/*return (*/}
                                            {/*<div className={'index_right_bl'}>*/}
                                            {/*<div*/}
                                            {/*className={key > 2 ? 'index_right_yuan2' : "index_right_yuan"}>{key + 1}</div>*/}
                                            {/*<div*/}
                                            {/*className={'index_right_right0'}>{value.customerName}</div>*/}
                                            {/*<div*/}
                                            {/*className={'index_right_right'}>{value.settlementPower}</div>*/}
                                            {/*</div>*/}
                                            {/*)*/}
                                            {/*})*/}
                                            {/*}*/}
                                            {/*</div>*/}
                                        </div>

                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>

                        {/*第三部分电力交易洞察*/}
                        <div className={`bottom_zzz`}>
                            <div className={'bottom_zzz_left'}>
                                <h2>电力交易员洞察</h2>
                                <Divider/>
                                <div className={`dongcha1`}>
                                    <div>
                                        <ReactEcharts
                                            style={{width: '100%', height: '100px'}}
                                            option={this.getFirstOption3(this.state.jiaoyipower)}
                                            className="canvasBox"
                                        />
                                        <div className={'index_dw'}>
                                            单位:万千瓦时
                                        </div>
                                    </div>
                                    <div>
                                        <ReactEcharts
                                            style={{width: '100%', height: '100px'}}
                                            option={this.getFirstOption4(this.state.money)}
                                            className="canvasBox"
                                        />
                                        <div className={'index_dw'}>
                                            单位:万元
                                        </div>
                                    </div>
                                </div>

                                <div className={`dongcha1`}>
                                    <div>
                                        <ReactEcharts
                                            style={{width: '100%', height: '120px'}}
                                            option={this.getFirstOption8(this.state.power2===null?0:this.state.power1===0?0:this.state.power2/this.state.power1)}
                                            className="canvasBox"
                                        />
                                   
                                        <div className={'index_dw'}>
                                            10月
                                        </div>
                                    </div>
                                    <div>
                                        <ReactEcharts
                                            style={{width: '100%', height: '120px'}}
                                            option={this.getFirstOption6(this.state.money,this.state.sixpower)}
                                            className="canvasBox"
                                        />
                                        <div className={'index_dw'}>
                                            厘/万千瓦时
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'bottom_zzz_right'}>
                                <h2>用电企业行业分布</h2>
                                <Divider/>
                                <div>
                                    <ReactEcharts
                                        style={{width: '100%', height: '300px'}}
                                        option={this.getFirstOption5(this.state.hysj,this.state.hyname)}
                                        className="canvasBox"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Lfooter></Lfooter>
            </Layout>
        )
    }
}