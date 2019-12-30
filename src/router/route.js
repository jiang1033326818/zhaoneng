import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import Config from '../config/index';
import layout from '../component/layout/layout'; // 布局界面
import login from '../containers/login/login'; // 登录界面

/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
	render() {
		// 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
		return (
			<div>{this.props.children}</div>
		);
	}
}

// const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

// 主页
const index = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../containers/index/index').default)
	}, 'index');
}

// 合同管理
const contractManage = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../containers/contractManage/index').default)
	}, 'contractManage');
}

// 用电管理
const powermanage = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../containers/powerManage/index').default)
	}, 'powermarket');
}

// 电力交易
const powermarket = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../containers/powerMarket/index').default)
	}, 'powermarket');
}

// 电力交易详情
const details = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../containers/powerMarket/details').default)
	}, 'details');
}

// 注册页面
const register = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../containers/register/index').default)
	}, 'register');
}

// 完善资料页面
const supplement = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../containers/supplement/index').default)
	}, 'supplement');
}

// 登录验证
const requireAuth = (nextState, replace) => {
	let token = (new Date()).getTime() - Config.localItem('USER_AUTHORIZATION');
	if(token > 7200000) {
		// 模拟token保存2个小时
		replace({
			pathname:'/login',
			state: {nextPathname: nextState.location.pathname0}
		});
	}
}

const RouteConfig = (
	<Router history={browserHistory}>
		<Route path="/index" component={layout} onEnter={requireAuth}>
			<IndexRoute getComponent={index} onEnter={requireAuth} />
			<Route path="/index" getComponent={index} onEnter={requireAuth} />
			<Route path="/contractmanage" getComponent={contractManage} onEnter={requireAuth} />
			<Route path="/powermanage" getComponent={powerManage} onEnter={requireAuth} />
      <Route path="/powermarket" getComponent={powerMarket} onEnter={requireAuth} />
			<Route path="/register" getComponent={register} onEnter={requireAuth} />
			<Route path="/details" getComponent={details} onEnter={requireAuth} />

			<Route path="/supplement" getComponent={supplement} onEnter={requireAuth} />
		</Route>
		// 所有的访问，都跳转到Roots
		<Route path="/login" component={Roots}>
			<IndexRoute component={login} />
		</Route>
		<Redirect from="*" to="/login" />
	</Router>
);
export default RouteConfig;