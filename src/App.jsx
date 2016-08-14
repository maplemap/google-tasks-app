import React from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.less';


class App extends React.Component {
    render(){
        return(
            <MuiThemeProvider>
              <div className="App">
                <div className="content">
                  {this.props.children}
                </div>
              </div>
            </MuiThemeProvider>
        )
    }
}

export default App;
