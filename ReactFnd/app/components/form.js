import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';



export default class Form extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLocation =  this.handleLocation.bind(this);
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
	
    handleLocation(){
		return ()=>{
		   this.props.handleClick();
		}
	}
	
	
	render(){
		return(
			<div>	
			<form onSubmit = {this.handleSubmit}>
			<input name="message" type ="text" placeholder="Enter Text" ref ="inputVal"/>
			<button>Send</button>
			</form>
			<div>
		   	 <button onClick={this.handleLocation()}>Send Location</button>
			</div>
			</div>	 
		);
	}
}


Form.propTypes = {

	handleMsgValue:PropTypes.func.isRequired,
	handleClick:PropTypes.func.isRequired,

};