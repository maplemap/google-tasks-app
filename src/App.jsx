import React from "react";

import './App.less';

class App extends React.Component {
    render(){
        return(
            <div className="App">
              asdasd
              <div className="content">
                {this.props.children}
              </div>
            </div>
        )
    }
}

export default App;
