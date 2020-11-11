import React, { Component } from 'react';
import {connect} from 'react-redux';

import FormLogin from './../components/FormLogin';
import UserControl from './../components/UserControl';

class LoginPage extends Component {
	render() {
		let {users} = this.props;
		return (
  			<div>
			    {this.showArea()}
			</div>
		);
	}

	showArea(){
		if(this.props.isAuthenticated === false) {
			return <FormLogin />;
		}else if (this.props.isAuthenticated === true){
            return <UserControl username={this.props.username} />;
        }
	}
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.userToken !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}
export default connect(mapStateToProps, null)(LoginPage);
