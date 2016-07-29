import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {Router, Route, browserHistory} from "react-router";

import './styles/main.less';

import App from './App.jsx';
import Page from './components/Page.jsx';

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/page" component={Page}/>
      </Route>
    </Router>,
    document.getElementById("main")
);
