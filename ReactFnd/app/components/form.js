import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


export default class Form extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(e){
		e = e === undefined ? window.event : e; 
		e.preventDefault();
		let msg = this.refs.inputVal.value;
		if(msg.length !==0){
			this.refs.inputVal.value = "";
			this.props.handleMsgValue(msg);
		}else{
			this.refs.inputVal.focus();
		}
	}

	render(){
		return(
			<div>	
			<form onSubmit = {this.handleSubmit}>
			<input name="message" type ="text" placeholder="Enter Text" ref ="inputVal"/>
				<button>Send</button>
				</form>
				</div>	 
			);
}
}

Form.propTypes = {

	handleMsgValue:PropTypes.func.isRequired

};