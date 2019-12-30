import React from "react";
import { withRouter } from "react-router-dom";

const validate = function (history) {
	// 这里写登录的逻辑
  const isLoggedIn = !!window.sessionStorage.getItem("obj");
  const companyType = window.sessionStorage.getItem("type");
  if (!isLoggedIn && (history.location.pathname !== "/login")) {
    if (companyType === 'CONSUMER') {
      history.replace("/login");
    } else if (companyType === 'SELLER') {
      history.replace("/login");
    } else if (companyType === 'PRODUCER') {
      history.replace("/login");
    } else {
      history.replace("/login");
    }
  }
};

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export default function authHOC(BaseComponent) {
  class Restricted extends React.Component {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }
    checkAuthentication(params) {
      const { history } = params;
      validate(history);
    }
    render() {
      return <BaseComponent {...this.props} />;
    }
  }
  return withRouter(Restricted);
}
