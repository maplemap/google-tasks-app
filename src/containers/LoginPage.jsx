import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

import SessionStore from '../stores/SessionStore';
import SessionActions from '../actions/SessionActions';

import LoginPage from '../components/LoginPage.jsx';

function getStateFromFlux() {
    return {
        isLoggedIn: SessionStore.isLoggedIn()
    }
}


class LoginPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = getStateFromFlux();

        SessionStore.addChangeListener(this._onChange)
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.isLoggedIn) {
            const {location} = this.props;

            if(location.state && location.state.nextPathname) {
                this.context.router.replace(location.state.nextPathname)
            } else {
                this.context.router.replace('/lists');
            }
        }
    }

    componentWillUnmount() {
        SessionStore.removeChangeListener(this._onChange)
    }

    handleLogIn() {
        SessionActions.authorize();
    }

    render(){
        return(
            <LoginPage onLogin={this.handleLogIn} />
        )
    }

    _onChange = () => {
        this.setState(getStateFromFlux);
    }
}

LoginPageContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};


export default LoginPageContainer;
