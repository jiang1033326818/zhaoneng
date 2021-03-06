/**
 * 合同预览
 * 姜海鹏 2018/6/13
 */
import React from 'react'
import {Button} from 'antd'
import './preview.less'
import  data from  './preview.json'

let newdata = data.data

export  default class preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            companyCode: 'SELLER',
            displaybutton:"block"
        }
    }
    returnlast =()=>{
        this.props.history.go(-1);
    }

    returnprint =()=>{
        this.setState({
            dispplaybutton:"none",
        })
        setTimeout(
            () => { window.print(); },
            100
        );

        setTimeout(
            () => { this.setState({dispplaybutton:"block"}) },
            200
        );
    }


    render() {

        return (
            <div className={`previewBox`}>
                <div className={`previewlight`}></div>



                <div className={`previewcontent`}>
                    {/*<div className={`returnlast`} onClick={this.returnlast}>*/}
                    {/*<Icon type="close-circle-o" />*/}
                    {/*</div>*/}
                    <Button type="primary" className={"downloadit"} onClick={this.returnprint} style={{display:this.state.dispplaybutton,top:"50px"}} >{"打印"}</Button>
                    <Button type="primary" className={"downloadit"} onClick={this.returnlast} style={{display:this.state.dispplaybutton,top:"0"}} >{"返回"}</Button>
                    <div className={`pretop`}>
                        <p> <span>{newdata.jiafang}</span>公司与<span>{newdata.yifang}</span>公司电力交易合同</p>
                        <div className={`prehr`}></div>
                    </div>
                    <div className={`precon`}>
                        <div className={"prepad"}>甲方合同编号:  <span>{""}</span></div>
                        <div className={"prepad"}>乙方合同编号:  <span>{""}</span></div>
                        <h3><span>{newdata.jiafang}</span></h3>
                        <h1>{"电力交易合同"}</h1>
                    </div>
                    <div className={`prebottom`}>
                        <p>{"第1页 共"} <span>{newdata.num}</span>{"页"}</p>
                    </div>
                </div>

                <div className={`previewcontent`}>
                    <div className={`pretop`}>
                        <p> <span>{newdata.jiafang}</span>公司与<span>{newdata.yifang}</span>公司电力交易合同</p>
                        <div className={`prehr`}></div>
                    </div>
                    <div className={`precon`}>
                        <h2>{"目录"}</h2>
                        <h4>{"第一章 定义和解释"}</h4>
                        <h4>{"第二章 双方陈述"}</h4>
                        <h4>{"第三章 双方权利和义务"}</h4>
                        <h4>{"第四章 交易电量和电价"}</h4>
                        <h4>{"第五章 电能计量"}</h4>
                        <h4>{"第六章 结算和支付"}</h4>
                        <h4>{"第七章 合同变更与解除"}</h4>
                        <h4>{"第八章 合同违约和补偿"}</h4>
                        <h4>{"第九章 不可抗力"}</h4>
                        <h4>{"第十章 争议的解决"}</h4>
                        <h4>{"第十一章 适用法律"}</h4>
                        <h4>{"第十二章 合同生效和期限"}</h4>
                        <h4>{"第十三章 其他"}</h4>

                    </div>
                    <div className={`prebottom`}>
                        <p>{"第2页 共"} <span>{newdata.num}</span>{"页"}</p>
                    </div>
                </div>

                <div className={`previewcontent`}>
                    <div className={`pretop`}>
                        <p> <span>{newdata.jiafang}</span>公司与<span>{newdata.yifang}</span>公司电力交易合同</p>
                        <div className={`prehr`}></div>
                    </div>
                    <div className={`precon`}>
                        <p><span>{newdata.jiafang}</span>公司与<span>{newdata.yifang}</span>签署以下合约:</p>
                        <p>1、购电方（电力用户，以下简称甲方）：<span>{newdata.jiafang}</span>
                            系一家具有法人资格/经法人单位授权的	企业，企业所在地为：北京市朝阳区三里屯，在工商行政管理局登记注册，税务登记号：648646546	，住所：首开幸福广场	，法定代表人/授权代理人：姜海鹏	。
                            甲方联络通讯信息如下：
                            联系人：姜海鹏	电子邮箱：10333326818@qq.com
                            手 机：15555555555	办公电话：8989898</p>
                        <p>
                            2、售电方（售电公司，以下简称乙方）：
                            <span>{newdata.yifang}</span>，系一家具有法人资格/经法人单位授权的售电公司，企业所在地为广东省广州市，在广东省工商行政管理局登记注册，并具备售电
                            资格（在电力交易中心售电企业编号SD687456 ），税务登记号为：646546	，住所：东莞	，法定代表人/授权代理人：姜海鹏	。
                            乙方联络通讯如下：
                            联系人：帅鹏	电子邮箱：65454@163.com  手 机：15555555555	办公电话：010-6547894
                        </p>
                        <h4>鉴于</h4>
                        <p>1、甲方在北京 拥有并经营管理一家用电电压等级为6645 千伏（KV），总用电容量为6465 千瓦（KVA）或变压器容量为6456 千伏安（KVA）的用电企业。</p>
                        <p>2、乙方在北京	拥有合法售电经营资格，并具有国家相关法规及文件规定的售电设施、场所和专业能力。</p>
                        <p>甲、乙双方通过广东电力交易中心及电网企业的输配电网络完成购售电交易，双方根据国家有关法律、法规，按照《广东省售电侧改革试点实施方案（试行）》及相关配套改革方案（粤发改能电[2017]48号），本着平等、自愿、公平和诚信的原则，经协商一致，签订本合同。</p>
                    </div>
                    <div className={`prebottom`}>
                        <p>{"第3页 共"} <span>{newdata.num}</span>{"页"}</p>
                    </div>
                </div>



                <div className={`previewcontent`}>
                    <div className={`pretop`}>
                        <p> <span>{newdata.jiafang}</span>公司与<span>{newdata.yifang}</span>公司电力交易合同</p>
                        <div className={`prehr`}></div>
                    </div>
                    <div className={`precon`}>
                        <h4 style={{textAlign:"center"}}>{"第一章 定义和解释"}</h4>
                        <p>1.1 定义</p>
                        <p>1.1.1 电力批发交易：是指发电企业与售电公司或电力大用户之间通过市场化方式进行的电力交易活动的总称。现阶段，是指发电企业、售电公司、电力大用户等市场主体通过双边协商、集中竞争等方式开展的中长期电量交易。</p>
                        <p>1.1.2 电力零售交易：是指售电公司与中小型终端电力用户（电力一般用户）开展的电力交易活动的总称。</p>
                        <p>1.1.3 合约交易电量：是指本合同项下约定的计划参与电力市场交易的电量。其中按时间区分的命名为月度合约电量和年度合约电量；按电力交易类型区分的命名为双边协商合约电量和集中竞价合约电量等。</p>
                        <p>1.1.4 双边协商合约电量：是指售电方依据电力市场规则，在满足电力调度机构安全校核要求并经电力交易机构认定的前提下，以“双边协商”的方式与发电企业交易的合约电量。</p>
                        <p>1.1.5 集中竞价合约电量：是指售电方依据电力市场规则，以“集中竞价” 的方式与发电企业交易的合约电量。</p>
                        <p>1.1.6 交割电量：是指广东省交易中心依据电力市场交易规则，为本合同出具的结算凭据中的抄表电量，即为本合同结算电量。其中按时间区分命名为月度交割电量和年度交割电量；按电力交易类型区分的命名为双边协商交易交割电量和集中竞价交易交割电量。</p>
                        <p>1.1.7 偏差电量：是指电力用户实际交割电量与合约交易电量之差。</p>
                        <p>1.1.8 中标电量：是指电力用户委托售电公司参与电力交易市场通过集中竞价竞得的交易电量。</p>
                        <p>1.1.9 计量点：指在电网企业与甲方签署《供用电合同》中约定的计量电力交易电量的电能计量装置关口表安装位置。</p>
                        <p>1.1.10 购电收益（价差电费）：是指甲方按本合同项下约定的度电差价和结算方式计算得出的收益（价差电费）。依据国家相关政策规定，现阶段电力交易市场交易价差结果小于零，购电收益计算过程及结果，负值为收入项，正值为支出项。</p>
                        <p>1.1.11 偏差电量考核金：依据《广东电力市场交易基本规则（试行）》进行偏差电量考核计算得到的偏差考核金额。</p>
                        <p>1.1.12 结算月：是指电力用户已使用电能的按公历计算的自然月。</p>
                        <p>1.1.13 电网企业：是指拥有输电网、配电网运营权（包括地方电力公司、趸售区域供电公司），承担其供电营业区保底供电服务的企业。在广东省是指广东电网公司、广州供电局有限公司、深圳供电局有限公司或其他按照相关规定在广东省内获得输配电网运营权的公司。各市场主体保持与电网企业的电费结算和支付方式不变，并由电网企业承担电力用户侧欠费风险，保障交易电费资金安全。</p>
                        <p>1.1.14 紧急情况：指电力系统发生事故或发电、输配电、用电设备发生重大事故，电网频率或者电压超规定范围，输变电设备负载超过规定值，主干线路功率超过规定的稳定限额以及其他威胁电网安全运行，有可能破坏电网稳定，导致电网瓦解以至大面积停电等运行情况，并且该情况在结束后得到电力监管机构确认。</p>
                    </div>
                    <div className={`prebottom`}>
                        <p>{"第4页 共"} <span>{newdata.num}</span>{"页"}</p>
                    </div>
                </div>

                <div className={`previewcontent`}>
                    <div className={`pretop`}>
                        <p> <span>{newdata.jiafang}</span>公司与<span>{newdata.yifang}</span>公司电力交易合同</p>
                        <div className={`prehr`}></div>
                    </div>
                    <div className={`precon`}>

                        <p>1.1.15 工作日：指除星期六、星期日及法定节假日以外的公历日。</p>
                        <p>1.1.16 不可抗力：指不能预见、不能避免并不能克服的客观情况。包括：火山爆发、龙卷风、海啸、暴风雨、泥石流、山体滑坡、水灾、火灾、超设计标准的地震、台风、雷电、雾闪等，以及核辐射、战争、瘟疫、骚乱等。</p>
                        <p>1.2解释</p>
                        <p>1.2.1 本合同中的标题仅为阅读方便，不应被视为本合同的组成部分，亦不应以任何方式影响对本合同的解释。</p>
                        <p>1.2.2 本合同附件与正文具有同等的法律效力。</p>
                        <p>1.2.3 本合同对任何一方的合法承继者或受让人具有约束力，但当事人另有约定的除外。遇有本款约定的情形时，相关义务人应当依法履行必要的通知义务及完备的法律手续。</p>
                        <p>1.2.4 除上下文另有要求外，本合同所指的日、月、年均为公历日、月、年。</p>
                        <p>1.2.5 本合同中的“包括”一词指：包括但不限于。</p>
                        <h4 style={{textAlign:"center"}}>{"第二章 双方陈述"}</h4>
                        <p>2.1 甲、乙双方任何一方在此向对方陈述如下：</p>
                        <p>2.1.1 本方为一家依法设立并合法存续的企业，有权签署并有能力履行本合同。</p>
                        <p>2.1.2 本方签署和履行本合同所需的一切手续（包括办理必要的政府批准、取得营业执照和电力业务许可证等）均已办妥并合法有效。</p>
                        <p>2.1.3 在签署本合同时，任何法院、仲裁机构、行政机关或监管机构均未作出任何足以对本方履行本合同产生重大不利影响的判决、裁定、裁决或具体的行政行为。</p>
                        <p>2.2 本方为签署本合同所需的内部授权程序均已完成，签署本合同的是本方法定代表人或授权代理人，并且本合同生效后即对双方具有法律约束力。</p>
                        <p>2.3如国家法律、法规发生变化或者政府有关部门、机构出台有关规定、规则，合同双方同意按照法律、法规和规则予以调整和修改。</p>
                    </div>
                    <div className={`prebottom`}>
                        <p>{"第5页 共"} <span>{newdata.num}</span>{"页"}</p>
                    </div>
                </div>

                <div className={`previewcontent`}>
                    <div className={`pretop`}>
                        <p> <span>{newdata.jiafang}</span>公司与<span>{newdata.yifang}</span>公司电力交易合同</p>
                        <div className={`prehr`}></div>
                    </div>
                    <div className={`precon`}>
                        <h4 style={{textAlign:"center"}}>{"第三章 双方权利和义务"}</h4>
                        <p>1.1 甲方的权利包括</p>
                        <p>3.1.1 根据与电网企业签订的《供用电合同》，按照国家有关法规享用电网企业提供的有关接入和用电服务。</p>
                        <p>3.1.2 与乙方协商制定用电计划和设备检修计划。</p>
                        <p>3.1.3 获得乙方履行本合同义务相关的信息、资料及查阅电网企业的关口信息数据。</p>
                        <p>3.1.4 本合同及附件约定的甲方的其他权利。</p>
                        <p>3.2 甲方的义务包括：</p>
                        <p>3.2.1 按照国家有关法规、规定和技术规范，运行、维护用电设施，合理控制用电。</p>
                        <p>3.2.2 向乙方或市场运营机构提供电力交易容量、电量、负荷曲线及其他生产运行信息，包括：《用户用电信息表》（附件一）、电费通知单、电费发票（复印件或扫描件）、电表号等。</p>
                        <p>3.2.3 发生紧急情况时，按照相关规定执行。</p>
                        <p>3.2.4 按电力相关规定和与电网企业签署的《供用电合同》，按时缴纳电力交易电量相关费用，包括：购电费、输配电费、缴纳政府性基金与附加、承担交叉补贴等。</p>
                        <p>3.2.5 向乙方提供与履行本合同相关的其他信息。</p>
                        <p>3.2.6 电力用户无法履约的，应提前45天书面告知电网企业、相关售电公司、电力交易机构以及其他相关方，将所有已签订的购售电合同履行完毕或转让，处理好相关事宜</p>
                        <p>3.2.7 本合同及附件约定的甲方其他义务。</p>
                        <p>3.3 乙方权利包括：</p>
                        <p>3.3.1 获得甲方履行本合同义务相关的信息、资料及查阅关口计量数据。</p>
                        <p>3.3.2 获得甲方与履行本合同相关的生产计划和检修计划信息。</p>
                        <p>3.3.3 按相关规定收取电力交易电量相关费用。</p>
                        <p>3.4 乙方的义务包括：</p>
                        <p>3.4.1 按照国家有关法律、规定和技术规范。为甲方提供电力交易服务，做好需求侧管理及用能服务，参与批发市场交易并按规定结算。</p>
                        <p>3.4.3 向甲方和电网企业提供与履行本合同相关的其他信息。</p>
                        <p>3.4.4 本合同及附件约定的乙方的其他义务。</p>
                    </div>
                    <div className={`prebottom`}>
                        <p>{"第6页 共"} <span>{newdata.num}</span>{"页"}</p>
                    </div>
                </div>

                <div className={`previewcontent`}>
                    <div className={`pretop`}>
                        <p> <span>{newdata.jiafang}</span>公司与<span>{newdata.yifang}</span>公司电力交易合同</p>
                        <div className={`prehr`}></div>
                    </div>
                    <div className={`precon`}>
                        <h4 style={{textAlign:"center"}}>{"第四章 交易电量和电价"}</h4>
                        <p>4.1 甲、乙双方按照《广东电力市场交易基本规则（试行）》开展电力零售交易。</p>
                        <p>4.2 本合同双方同意，自 2018年6 月 14日至 2019年十二月31日，甲方愿意向乙方总购电约 9844654000万千瓦时，其中首年度购电3131230 万千瓦时。</p>
                        <p>4.3 计算公式使用变量定义：</p>
                        <p>Q 双边协商：是指条款4.2约定电量中用于月度双边协商的电量。
                            Q 月度竞价：是指甲申报经乙方确认的甲方用于月度集中竞价的那部分电量。
                            Q 月度中标：是指通过月度集中竞价成交的电量。
                            Q 月度市场：月度双边协商交易电量与集中竞争交易电量之和。
                            Q 实际：是指甲方每月实际用电量。
                            Q 偏差：甲方月度实际用电量与月度交易电量之差，即Q 偏差＝Q 实际－（Q 双
                            边协商+Q 月度中标）。
                            C 约定：是指条款4.2中甲乙双方确认的价差。
                            C 月度竞价：是指电力交易市场月度集中竞价交易后经电力交易中心和相关政府机构确认的统一出清价差。
                            s：是指条款4.6中约定的甲方收益比例。
                            g：是指偏差电量百分比（偏差率），g＝Q 偏差/（Q 双边协商+Q 月度中标）。</p>
                        <p>甲、乙双方同意按广东电力交易中心的最新规定执行，即甲方按《供用电合同》、《广东电力市场交易基本规则（试行）》及本合同相关约定与电网企业结算电费；乙方按《2017年售电公司与发电企业直接交易及电网企业输配电服务三方合同》及本合同相关约定与电网企业结算。</p>
                        <p>甲、乙双方均不得擅自解除合同。如果因甲方原因导致合同解除，则甲方应赔偿乙方因此而遭受的损失；如果因乙方原因导致合同解除，则乙方应赔偿甲方因此而遭受的损失。</p>
                        <p>凡因执行本合同所发生的与本合同有关的一切争议，双方应协商解决，也可提请电力监管机构和政府电力行业主管部门调解。协商或调解不成的，任何一方依法提请广州市人民法院通过诉讼程序解决。</p>
                        <p>如果自不可抗力发生后百日内，双方不能就继续履行合同的或解除本合同达成一致意见，任何一方有权书面通知另一方解除本合同，并报电力监管机构或政府相关部门备案。</p>
                        <p>任何与本合同有关的通知、文件和合规的账单等均须以书面方式进行。通过挂号信、快递或当面送交的，经收件方签字确认即被认为送达；若以传真、电子邮件方式发出并被接收，即视为送达。所有通知、文件和合规的账单等均在送达或接收后方能生效。一切通知、账单、资料或文件等应按照约定的联络信息发给对方，直至一方书面通知另一方变更联络信息为止。</p>

                    </div>
                    <div className={`prebottom`}>
                        <p>{"第7页 共"} <span>{newdata.num}</span>{"页"}</p>
                    </div>
                </div>
                <div className={`previewcontent`}>
                    <div className={`pretop`}>
                        <p> <span>{newdata.jiafang}</span>公司与<span>{newdata.yifang}</span>公司电力交易合同</p>
                        <div className={`prehr`}></div>
                    </div>
                    <div className={`precon`}>
                        <h4 style={{textAlign:"center"}}>{"第五章 其他"}</h4>
                        <p>5.1 本合同正式一式伍份，甲乙双方各执贰份，交电力交易中心一份。</p>
                        <br/>
                        <br/>
                        <br/>
                        <p>甲方：<span>{newdata.jiafang}</span></p>
                        <p>法定代表人/授权代理人：姜海鹏</p>
                        <p>签字日期：2018	年	6月	14日</p>
                        <br/>
                        <br/>
                        <br/>
                        <p>乙方：<span>{newdata.yifang}</span></p>
                        <p>法定代表人/授权代理人：无名氏</p>
                        <p>签字日期：2018	年	6月	14日</p>
                        <br/>
                        <br/>
                        <p>签订地点:新东路首开幸福广场</p>
                        <p>本合同的生效条件是：本合同经双方法定代表人或授权代理人签字并加盖公章</p>
                        <p>本合同有效期：自2018 年 6月 14日至 2019年	6月14	日止（以本合同实际履行完毕时间为准）。</p>
                    </div>
                    <div className={`prebottom`}>
                        <p>{"第7页 共"} <span>{newdata.num}</span>{"页"}</p>
                    </div>
                </div>










            </div>
        )
    }
}
