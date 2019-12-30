import React from 'react';
import { Layout } from 'antd';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { child_routes } from '../../route'
import authHOC from '../../utils/auth'

import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import NavPath from '../NavPath'

// import './LayoutPage.less';
// 在路由组件调用anth函数，每一个路由都验证这个
const { Content } = Layout;

class LayoutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { navpath } = this.props;
    return (
      <div>
        <Layout style={{ height: '100%', minHeight: '970px', maxHeight: '970px' }} className='ant-layout-has-sider'>
          <Sidebar />
          <Layout>
            <Header />
            <NavPath data={navpath} />
            <Content style={{ margin: '5 0 0 5', background: 'white' }}>
              {child_routes.map((route, index) => (
                <Route key={index} path={route.path} component={authHOC(route.component)} exactly={route.exactly} />
              ))}
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    navpath: state.menu.navpath
  };
};

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutPage);