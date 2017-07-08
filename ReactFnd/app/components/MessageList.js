import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';




export default class MessageList extends Component{	 
	render(){

		return(
			<div>
			<ol>
			{
				this.props.message.map(function(text, index){
				return <li key={index}>{text}</li>
			})
	       }
	    </ol>	
		</div>
	);
}
}


MessageList.propTypes ={
 message:PropTypes.array.isRequired,
}