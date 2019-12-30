import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';

// 公司主页
// import companyIndex from './containers/companyIndex/companyIndex';
// 免责声明
import disclaimer from './containers/Disclaimer/disclaimer';
// 产品和订单
import tradingIndex from './containers/tradingCenter/tradingCenter';
import tradingIndex2 from './containers/tradingCenter/tradingCenter2';
import tradingcontract from './containers/tradingCenter/tradingContract';
import notice from './containers/tradingCenter/notice';
import product from './containers/SELLER/product/product'
import order from './containers/SELLER/product/order'


// 登录
import customerLogin from './containers/Login/customerLogin/login';
import producerLogin from './containers/Login/producerLogin/login';
import sellerManageLogin from './containers/Login/sellerLogin/manage/login';
import sellerOperationLogin from './containers/Login/sellerLogin/operation/login';
// 注册
import customerRegister from './containers/Register/normalRegister/customerRegister/register';
import producerRegister from './containers/Register/normalRegister/producerRegister/register';
import sellerRegister from './containers/Register/sellerRegister/register';
import customerSuccess from './containers/Register/normalRegister/customerRegister/Success';
import producerSuccess from './containers/Register/normalRegister/producerRegister/Success';
import sellerSuccess from './containers/Register/sellerRegister/Success';

// 预支付
import PrePay from './containers/SELLER/prePay';

// 支付
import Pay from './containers/SELLER/pay';

// 发电厂 PRODUCER
// import producerIndex from './containers/PRODUCER/index';
// import producerContractManage from './containers/PRODUCER/contractManage/contractManage';
// import producerContractDetail from './containers/PRODUCER/contractManage/contractDetail/contractDetail';
// import producerUploadContract from './containers/PRODUCER/contractManage/uploadContract/uploadContract';
// import producerAddNewContract from './containers/PRODUCER/contractManage/addNewContract/addNewContract';
// import producerPowerMarket from './containers/PRODUCER/powerMarket';
// import producerdetails from './containers/PRODUCER/powerMarket/details';
// import producerPowerManage from './containers/PRODUCER/powerManage';
// import producerPreview from './containers/PRODUCER/contractManage/previewContract/preview';
// import producerUserCenter from './containers/PRODUCER/userCenter/userCenter';
// import producerCompleteInfo from './containers/PRODUCER/completeInfo/completeInfo';
// import producerAdduser from './containers/Register/normalRegister/producerRegister/addUser';
// import producermycontract from './containers/Register/normalRegister/producerRegister/mycontract';
// import producerAccountMemo from './containers/PRODUCER/accountMemo/accountMemo';
// import producerForeCasting from './containers/PRODUCER/foreCasting/foreCasting';
// 售电户 SELLER
import sellerIndex from './containers/SELLER/index';
// import sellerContractManage from './containers/SELLER/contractManage/planContract/longPlanContract/contractManage';
// import sellerUploadContract from './containers/SELLER/contractManage/planContract/uploadContract/uploadContract';
// import sellerAddNewContract from './containers/SELLER/contractManage/planContract/addNewContract/addNewContract';
// import sellerContractDetail from './containers/SELLER/contractManage/planContract/contractDetail/contractDetail';
// import sellerYearContract from './containers/SELLER/contractManage/planContract/yearContract/yearContract';
// import sellerCompanyContract from './containers/SELLER/contractManage/planContract/companyContract/companyContract';
// import sellerMonthContract from './containers/SELLER/contractManage/planContract/monthContract/monthContract';
// import sellerMonthCompany from './containers/SELLER/contractManage/planContract/monthContract/monthCompany';
// import sellerBiddingCompanyYear from './containers/SELLER/contractManage/biddingContract/companyContract/companyContract';
// import sellerBiddingMonth from './containers/SELLER/contractManage/biddingContract/monthContract/monthContract';
// import sellerBiddingMonthCompany from './containers/SELLER/contractManage/biddingContract/monthContract/monthCompany';
// import sellerBiddingYear from './containers/SELLER/contractManage/biddingContract/yearContract/contractManage';
// import sellerBiddingCompany from './containers/SELLER/contractManage/biddingContract/companyContract/contractManage';
// import sellerMonthBidding from './containers/SELLER/contractManage/biddingContract/monthBidding/monthBidding';
// import sellerBiddingAdd from './containers/SELLER/contractManage/biddingContract/biddingAdd/biddingAdd';
// import sellerBiddingDetail from './containers/SELLER/contractManage/biddingContract/biddingDetail/biddingDetail';
import sellerPowerManage from './containers/SELLER/powerManage';
import sellerPowerMarket from './containers/SELLER/powerMarket';
import sellerdetails from './containers/SELLER/powerMarket/details';
import sellerPreview from './containers/SELLER/contractManage/previewContract/preview';
import sellersettleview from './containers/SELLER/contractManage/previewContract/settleview';
import sellertrading from './containers/SELLER/powerMarket/tradingcenter';
import sellerUserCenter from './containers/SELLER/userCenter/userCenter';
import sellerCompleteInfo from './containers/SELLER/completeInfo/completeInfo';
import sellerUserInfo from './containers/SELLER/editUserInfo/editUserInfo';
import sellerAdduser from './containers/Register/sellerRegister/addUser';
import sellermycontract from './containers/Register/sellerRegister/mycontract';
import sellerAccountMemo from './containers/SELLER/accountMemo/accountMemo';
import sellerForeCasting from './containers/SELLER/foreCasting/foreCasting';
import selleruseplan from './containers/SELLER/negotiatePrice/useplan';
import selleruseplanago from './containers/SELLER/negotiatePrice/useplanago';
import selleruseplanagoall from './containers/SELLER/negotiatePrice/useplanagoall';
import sellermonth from './containers/SELLER/negotiatePrice/month';
import sellermonthago from './containers/SELLER/negotiatePrice/monthago';
import sellermonthagoall from './containers/SELLER/negotiatePrice/monthagoall';
import sellersettle from './containers/SELLER/Settlement/settlement';
import selleruseradmin from './containers/SELLER/useradmin/useradmin';
import sellerpowerplan from './containers/SELLER/powerplan/powerplan';
import sellercustomeradmin from './containers/SELLER/useradmin/customeradmin';
import sellercustomerdetail from './containers/SELLER/useradmin/customerdetail';
import sellerbuypower from './containers/SELLER/powerplan/buypower';
import sellerdecomposepower from './containers/SELLER/powerplan/decomposepower';
import sellerdetailcasting from './containers/SELLER/foreCasting/detailscasting';
import StatementsManage from './containers/SELLER/statementsManage';
import sellerpowercollection from './containers/SELLER/powercollection/powercollection';

// 买电用户 CUSTOMER
// import customerIndex from './containers/CONSUMER/index';
// import customerContractManage from './containers/CONSUMER/contractManage/planContract/longPlanContract/contractManage';
// import customerContractDetail from './containers/CONSUMER/contractManage/planContract/contractDetail/contractDetail';
// import customerMonthBidding from './containers/CONSUMER/contractManage/biddingContract/monthBidding/monthBidding';
// import customerBiddingDetail from './containers/CONSUMER/contractManage/biddingContract/biddingDetail/biddingDetail';
// import customerPowerManage from './containers/CONSUMER/powerManage';
// import customerPowerMarket from './containers/CONSUMER/powerMarket';
// import customerdetails from './containers/CONSUMER/powerMarket/details';
// import customerPreview from './containers/CONSUMER/contractManage/previewContract/preview';
// import customersettleview from './containers/CONSUMER/contractManage/previewContract/settleview';
// import customerUserCenter from './containers/CONSUMER/userCenter/userCenter';
// import customerCompleteInfo from './containers/CONSUMER/completeInfo/completeInfo';
// import customerAdduser from './containers/Register/normalRegister/customerRegister/addUser';
// import customermycontract from './containers/Register/normalRegister/customerRegister/mycontract';
// import customerAccountMemo from './containers/CONSUMER/accountMemo/accountMemo';
// import customeruseplan from './containers/CONSUMER/negotiatePrice/useplan';
// import customermonth from './containers/CONSUMER/negotiatePrice/month';
// import customerForeCasting from './containers/CONSUMER/foreCasting/foreCasting';
// import customersettle from './containers/CONSUMER/Settlement/settlement';
// import customeruseplanagoall from './containers/CONSUMER/negotiatePrice/useplanagoall';
// import customermonthagoall from './containers/CONSUMER/negotiatePrice/monthagoall';
// import registerServiceWorker from './registerServiceWorker';

import authHOC from './util/auth'

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Switch>
				{/* 免责声明 */}
				<Route path='/disclaimer' exact component={disclaimer} />
				{/* 公共登录路由 */}
				<Route path='/' exact component={sellerOperationLogin} />
				<Route path='/tradingcenter' exact component={tradingIndex} />
				<Route path='/tradingcenter2' exact component={tradingIndex2} />
				<Route path='/tradingcontract' exact component={tradingcontract} />
				<Route path='/notice' exact component={notice} />
				<Route path='/customer/login' component={customerLogin} />
				<Route path='/producer/login' component={producerLogin} />
				<Route path='/seller/managelogin' component={sellerManageLogin} />
				<Route path='/login/login' component={sellerOperationLogin} />
                <Route path='/login' component={sellerOperationLogin} />
				{/* 公共注册路由 */}
				<Route path='/register' component={sellerRegister} />
				<Route path='/register/register' component={sellerRegister} />
				<Route path='/customer/register' component={customerRegister} />
				<Route path='/producer/register' component={producerRegister} />
        <Route path='/Success' component={sellerSuccess} />
        <Route path='/customer/Success' component={customerSuccess} />
        <Route path='/producer/Success' component={producerSuccess} />
        <Route path='/product' component={product} />
        <Route path='/order' component={order} />
				{/* 发电厂路由 PRODUCER */}
				{/*<Route path='/producer/index' component={authHOC(producerIndex)} />*/}
				{/*<Route path='/producer/contractmanage' component={authHOC(producerContractManage)} />*/}
				{/*<Route path='/producer/contractdetail' component={authHOC(producerContractDetail)} />*/}
				{/*<Route path='/producer/uploadcontract' component={authHOC(producerUploadContract)} />*/}
				{/*<Route path='/producer/addnewcontract' component={authHOC(producerAddNewContract)} />*/}
				{/*<Route path='/producer/powermarket' component={authHOC(producerPowerMarket)} />*/}
				{/*<Route path='/producer/details' component={authHOC(producerdetails)} />*/}
				{/*<Route path='/producer/powermanage' component={authHOC(producerPowerManage)} />*/}
        {/*<Route path='/producer/preview' component={authHOC(producerPreview)} />*/}
				{/*<Route path='/producer/usercenter' component={authHOC(producerUserCenter)} />*/}
				{/*<Route path='/producer/completeinfo' component={authHOC(producerCompleteInfo)} />*/}
        {/*<Route path='/producer/adduser' component={authHOC(producerAdduser)} />*/}
        {/*<Route path='/producer/mycontract' component={authHOC(producermycontract)} />*/}
				{/*<Route path='/producer/accountmemo' component={authHOC(producerAccountMemo)} />*/}
				{/*<Route path='/producer/forecasting' component={authHOC(producerForeCasting)} />*/}


				{/* 售电户路由 SELLER */}
				<Route path='/seller/index' component={authHOC(sellerIndex)} />
				{/*/!* 长协合同管理路由快 *!/*/}
				{/*<Route path='/seller/contractmanage' component={authHOC(sellerContractManage)} />*/}
				{/*/!* 长协计划合同详情 *!/*/}
				{/*<Route path='/seller/contractdetail/:id' component={authHOC(sellerContractDetail)} />*/}
				{/*<Route path='/seller/uploadcontract' component={authHOC(sellerUploadContract)} />*/}
				{/*<Route path='/seller/addnewcontract' component={authHOC(sellerAddNewContract)} />*/}
				{/*/!* 长协年度合同 *!/*/}
				{/*<Route path='/seller/yearcontract' component={authHOC(sellerYearContract)} />*/}
				{/*/!* 长协公司详情 *!/*/}
				{/*<Route path='/seller/companycontract/:year' component={authHOC(sellerCompanyContract)} />*/}
				{/*/!* 长协月度详情 *!/*/}
				{/*<Route path='/seller/monthcontract/:year' component={authHOC(sellerMonthContract)} />*/}
				{/*/!* 公司月度详情 *!/*/}
				{/*<Route path='/seller/companymonth/:month' component={authHOC(sellerMonthCompany)} />*/}
				{/*/!* 月竞年度合同 *!/*/}
				{/*<Route path='/seller/yearbidding' component={authHOC(sellerBiddingYear)} />*/}
				{/*/!* 月竞公司详情 *!/*/}
				{/*<Route path='/seller/companybidding/:year' component={authHOC(sellerBiddingCompanyYear)} />*/}
				{/*/!* 月竞月度详情 *!/*/}
				{/*<Route path='/seller/monthbidding/:year' component={authHOC(sellerBiddingMonth)} />*/}
				{/*/!* 月竞公司月度详情 *!/*/}
				{/*<Route path='/seller/companybidding/:month' component={authHOC(sellerBiddingMonthCompany)} />*/}
				{/*<Route path='/seller/companybidding' component={authHOC(sellerBiddingCompany)} />*/}
				{/*<Route path='/seller/biddingcontract' component={authHOC(sellerMonthBidding)} />*/}
				{/*<Route path='/seller/biddingadd' component={authHOC(sellerBiddingAdd)} />*/}
				{/*<Route path='/seller/biddingdetail/:id' component={authHOC(sellerBiddingDetail)} />*/}

				<Route path='/seller/powermarket' component={authHOC(sellerPowerMarket)} />
				<Route path='/seller/details' component={authHOC(sellerdetails)} />
				<Route path='/seller/trading' component={authHOC(sellertrading)} />
				<Route path='/seller/powermanage' component={authHOC(sellerPowerManage)} />
				<Route path='/seller/preview' component={authHOC(sellerPreview)} />
				<Route path='/seller/settleview' component={authHOC(sellersettleview)} />
				<Route path='/seller/usercenter' component={authHOC(sellerUserCenter)} />
				<Route path='/seller/completeinfo' component={authHOC(sellerCompleteInfo)} />
				<Route path='/seller/edituserinfo' component={authHOC(sellerUserInfo)} />
				<Route path='/seller/adduser' component={authHOC(sellerAdduser)} />
				<Route path='/seller/mycontract' component={authHOC(sellermycontract)} />
				<Route path='/seller/accountmemo' component={authHOC(sellerAccountMemo)} />
				<Route path='/seller/forecasting' component={authHOC(sellerForeCasting)} />
        <Route path='/seller/useplan' component={authHOC(selleruseplan)} />
        <Route path='/seller/useplanyear' component={authHOC(selleruseplanago)} />
        <Route path='/seller/statistics' component={authHOC(selleruseplanagoall)} />
        <Route path='/seller/month' component={authHOC(sellermonth)} />
        <Route path='/seller/monthyear' component={authHOC(sellermonthago)} />
        <Route path='/seller/monthstatistics' component={authHOC(sellermonthagoall)} />
				{/* 结算管理StatementsManage */}
				<Route path='/seller/statements' component={authHOC(StatementsManage)} />
				<Route path='/seller/settle' component={authHOC(sellersettle)} />
                <Route path='/seller/useradmin' component={authHOC(selleruseradmin)} />
                <Route path='/seller/powerplan' component={authHOC(sellerpowerplan)} />
                <Route path='/seller/customeradmin' component={authHOC(sellercustomeradmin)} />
                <Route path='/seller/customerdetail' component={authHOC(sellercustomerdetail)} />
                <Route path='/seller/buypower' component={authHOC(sellerbuypower)} />
                <Route path='/seller/decompose' component={authHOC(sellerdecomposepower)} />
                <Route path='/seller/detailcasting' component={authHOC(sellerdetailcasting)} />
                <Route path='/seller/powercollection' component={authHOC(sellerpowercollection)} />

				{/*预支付*/}
				<Route path='/prepay' component={authHOC(PrePay)} />
				{/* 支付 */}
				<Route path='/pay' component={authHOC(Pay)} />
				{/* 买电用户 CUSTOMER */}
				{/*<Route path='/customer/index' component={authHOC(customerIndex)} />*/}
				{/*<Route path='/customer/contractmanage' component={authHOC(customerContractManage)} />*/}
				{/*<Route path='/customer/contractdetail/:id' component={authHOC(customerContractDetail)} />*/}
				{/*<Route path='/customer/biddingcontract' component={authHOC(customerMonthBidding)} />*/}
				{/*<Route path='/customer/biddingdetail/:id' component={authHOC(customerBiddingDetail)} />*/}
				{/*<Route path='/customer/powermarket' component={authHOC(customerPowerMarket)} />*/}
				{/*<Route path='/customer/details' component={authHOC(customerdetails)} />*/}
				{/*<Route path='/customer/powermanage' component={authHOC(customerPowerManage)} />*/}
        {/*<Route path='/customer/preview' component={authHOC(customerPreview)} />*/}
        {/*<Route path='/customer/settleview' component={authHOC(customersettleview)} />*/}
				{/*<Route path='/customer/usercenter' component={authHOC(customerUserCenter)} />*/}
				{/*<Route path='/customer/completeinfo' component={authHOC(customerCompleteInfo)} />*/}
        {/*<Route path='/customer/adduser' component={authHOC(customerAdduser)} />*/}
        {/*<Route path='/customer/mycontract' component={authHOC(customermycontract)} />*/}
				{/*<Route path='/customer/accountmemo' component={authHOC(customerAccountMemo)} />*/}
        		{/*<Route path='/customer/useplanyear' component={authHOC(customeruseplan)} />*/}
        		{/*<Route path='/customer/monthyear' component={authHOC(customermonth)} />*/}
                {/*<Route path='/customer/monthstatistics' component={authHOC(customermonthagoall)} />*/}
                {/*<Route path='/customer/statistics' component={authHOC(customeruseplanagoall)} />*/}
				{/*<Route path='/customer/forecasting' component={authHOC(customerForeCasting)} />*/}
        {/*<Route path='/customer/settle' component={authHOC(customersettle)} />*/}
			</Switch>
		</div>
	</BrowserRouter>
	, document.getElementById('root'));
// registerServiceWorker();
