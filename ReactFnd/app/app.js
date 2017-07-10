import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import Home from './components/Home'; 




require('style-loader!css-loader!sass-loader!styles/styles.scss');

ReactDOM.render(
	 <Home />,
	document.getElementById('main')
)