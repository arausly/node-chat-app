import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	NavLink
} from 'react-router-dom';

import axios from 'axios';



const container = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "relative",
}

const errText = {
	color:"#ff0000"
};



export default class SignInPage extends Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
		this.renderWarning = this.renderWarning.bind(this);
		this.state = {
			name: "",
			errTxt: "",
		}
	}

	handleClick(e) {
		e.preventDefault();
		e = e === undefined ? window.event : e;
		let name = this.name.value;
		let initialPwd = this.initPass.value;
		let confirmedPwd = this.confPass.value;
		let email = this.email.value;
		if (name.length !== 0 && initialPwd.length !== 0 && confirmedPwd.length !== 0 && email.length !== 0) {
			this.initPass.value = "";
			this.confPass.value = "";

			if (initialPwd !== confirmedPwd) {
				this.setState({
					errTxt: "err"
				});
				this.initPass.focus();

			} else if (initialPwd === confirmedPwd) {
				this.setState({errTxt:""});
				this.name.value = "";
				this.email.value = "";
				axios.post('/signIn', {
					name,
					password: confirmedPwd,
					email
				}).then(res => {
					if (res) {
						alert('Yea');
					}
				}).catch(err => {
					if (err) {
						alert('Nah')
					}
				})
			}
		} else {
			this.name.focus();
		}
	}

	renderWarning() {
		const {
			errTxt
		} = this.state;
		
		if (errTxt === "") {
			const txt = {
				__html: ""
			}
			return txt;
		} else if (errTxt === "err") {
			const txt = {
				__html: "Password Mismatch"
			}
			return txt;
		}
	}
	
	render(){
		return(
			<div style={container}>
				<div>
					<div>
						<input type="text" placeholder="username" ref= {e =>this.name = e} autoFocus autoComplete="off"/>
					</div>
			        <div>
						<input type="email" placeholder="email" ref= {e =>this.email = e} />
					</div>
					<div>
						<input type="password" placeholder="password" ref={e =>this.initPass = e} autoComplete="off" />
					</div>
					<div>
						<input type="password" placeholder="confirm password" ref={e => this.confPass = e}/>
					</div>
			        <div>
			             <p dangerouslySetInnerHTML={this.renderWarning()} style={errText}/>
			        </div>
					<NavLink to="/login">Or Login Here</NavLink>
			        <div>
					<button onClick={this.handleClick} >Create account </button>
			       
			        </div>
				</div>
			</div>  
		)
	}
}