import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

import SessionStore from '../stores/SessionStore';
import SessionActions from '../actions/SessionActions';

import './LoginPage.less';

function getStateFromFlux() {
    return {
        isLoggedIn: SessionStore.isLoggedIn()
    }
}


class LoginPage extends React.Component {
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
            <div className="LoginPage">
                <div className='LoginPage__banner'>
                    <div className='LoginPage__text'>
                        <h1>New Google tasks</h1>
                        <p>Organise your life!</p>
                        <RaisedButton
                            className='login-button'
                            label='Log in with Google'
                            onClick={this.handleLogIn}
                        />
                    </div>
                    <img
                        src='/img/desk.png'
                        className='LoginPage__image'
                    />
                </div>
            </div>
        )
    }

    _onChange = () => {
        this.setState(getStateFromFlux);
    }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};


export default LoginPage;
