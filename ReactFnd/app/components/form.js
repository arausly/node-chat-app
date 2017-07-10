import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';



export default class Form extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLocation =  this.handleLocation.bind(this);
	}
	
	componentWillReceiveProps(nextProps){
		if(this.props.newStatus !== nextProps.newStatus){
			   this.refs.inputVal.value = ""
		}
	}

	handleSubmit(e){
		e = e === undefined ? window.event : e; 
		e.preventDefault();
		let msg = this.refs.inputVal.value;
		if(msg.length !==0){
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

render() {
		const disabledStyle = {
			opacity: 0.6,
			paddingLeft: '0.35rem',
			paddingRight:'0.1rem',
			right:20,
		};
		const undisabledStyle = {
			opacity: 1
		};
		let {fetching} = this.props, disabled;
		(fetching === true) ? disabled = "disabled": disabled = "false";
		const decideStyle = (disabled === "disabled") ? disabledStyle : undisabledStyle;
	    const renderSendLocalBtn = () =>{
			 const fetchingTxt = {
				 __html:'Sending Location..'
			 };
			
			const nonFetchingTxt ={
			    __html:'Send Location'	 
			};
			
		  return (fetching === true) ? fetchingTxt : nonFetchingTxt;
		
		}
		return(
			<div>	
				<form onSubmit = {this.handleSubmit}>
					<input name="message" type ="text" placeholder="Enter Text" ref ="inputVal" autoFocus autoComplete="off"/>
					<button className="sendBtn">Send</button>
				</form>
				<span>
					<a type="button" className="location" onClick={this.handleLocation()}  disabled={disabled} style={decideStyle} dangerouslySetInnerHTML={renderSendLocalBtn()}/>
				</span>
			</div>	 
		);
}
}


Form.propTypes = {

	handleMsgValue:PropTypes.func.isRequired,
	handleClick:PropTypes.func.isRequired,
	newStatus(props,propName,component){
		if(!propName in props){
			throw new ReferenceError(`${propName} is not defined`);
		}else if(!(typeof propName === "string")){
			throw new TypeError(`${propName} is invalid`);
		}
	},
   fetching:PropTypes.bool.isRequired,
};