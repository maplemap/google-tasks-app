import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

import './LoginPage.less';

class LoginPage extends React.Component {
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
                            onClick={this.props.onLogin}
                        />
                    </div>
                    <img
                        src='./img/desk.png'
                        className='LoginPage__image'
                    />
                </div>
            </div>
        )
    }
}

export default LoginPage;
