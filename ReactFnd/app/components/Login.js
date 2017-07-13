import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	Link
} from 'react-router-dom';
import PropTypes from 'prop-types';


const form_bg = {
	backgroundColor: "#1abc9c",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "auto",
	position: "relative",
	height: 680,
	margin: 0,
	padding: 0,

}

const form_el = {
	backgroundColor: "#ffffff",
	opacity: 0.93,
	border: "0.6px solid #1abc9c",
	borderRadius: 8,
	padding: "1rem"
}

const concatbg_el = Object.assign({}, form_bg, form_el);

const input = {
	borderwidth: 1,
	borderRadius: 2,
	padding: 2,
}
const input_hd = {
	textAlign: "center",
	fontSize: "1.2rem",
}

const btn = {
	backgroundColor: "#2d999d",
	marginTop: "0.3rem",
	height: "2.3rem",
	marginTop: "1rem",
	border: "1px solid #2d999d",
	borderRadius: 2,
	cursor: "pointer",
	width: "11rem",
	color: "#fff",
	textDecoration: "none",
	textAlign: "center",


}

export default class LoginPage extends Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
		//		this.renderErrorMsg = this.renderErrorMsg.bind(this); 
	}
	handleClick(e) {
		e.preventDefault();
		let userName = this.name.value,
			room = this.room.value;
		if (userName.length !== 0 && room.length !== 0) {
			this.name.value = "";
			this.room.value = "";
			//handle space in room text,
			let roomQuery = room.replace(/\s/g, '+');
			window.location.href = `/chat?name=${userName}room=${roomQuery}`;
		} else {
			this.name.focus();
		}
	}

//	renderErrorMsg() {
//		const forName = {__html:"username can\'t be empty"};
//		const forRoom = {__html:'room must be specified'};
//        
//	
//		if (ReactDOM.findDOMNode(this.name).value.length === 0 && !(ReactDOM.findDOMNode(this.name).value.match(/^.*$/))) {
//			return forName;
//		} else if (ReactDOM.findDOMNode().room.value.length === 0 && !(that.room.value.match(/^.*$/))) {
//			return forRoom;
//		}
//	}
		render(){
			return(
					<div className="form_bg" style={form_bg}>
						<div className="form-el" style={form_el}>
							<div>
								<h4 style={input_hd}>Join a chat room</h4> 
							</div>
								<div style={input}>
									<h4><label htmlFor="user">Username</label></h4>
									<input id="user" name="username" placeholder="username" autoFocus autoComplete="off" ref={e=>{this.name = e}} />
								</div>
								<div style={input}>
									<h4><label htmlFor="room">Chat Room</label></h4>
									<input id="room" name="chat_room" placeholder="chat room" autoComplete="on" ref={e=>{this.room = e}} />
								</div>
								<div>
								<Link to="/chat"><button style={btn} onClick={this.handleClick} >Login</button></Link>
								</div>
						</div>
					</div>	
			)
		}
	}
LoginPage.propTypes ={
	handleCollect:PropTypes.func.isRequired,
}