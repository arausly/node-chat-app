import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';

import Main from './components/Main';
import Home from './components/Home'; 
import LoginPage from './components/Login';
import pageNotFound from './components/PageNotFound';
import SignInPage from './components/SignInPage';



require('style-loader!css-loader!sass-loader!styles/styles.scss');

ReactDOM.render(
	<Router>
	<Main>
	<Switch>
	    <Route exact={true} path="/" component={SignInPage} />
	    <Route exact={true} path="/login" component={LoginPage}/>
	    <Route path="/chat" component={Home} />
		<Route component={pageNotFound}/>
	</Switch>
    </Main>
	</Router>,
	document.getElementById('main')
);