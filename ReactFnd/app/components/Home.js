import React,{Component} from 'react';
import ReactDOM from 'react-dom';
const io = require('socket.io-client');

import Form  from './form';
import MessageList from './MessageList';

//const decidePath = () =>{
//	if(process.env.NODE_ENV="development" || process.env.PORT == 9000){
//		 const path = "http://localhost:9000"
//		 return path;
//	}
//}

const socket = io.connect("http://localhost:9000"); 

export default class Home extends Component{
	constructor(props){
		super(props);
		this.handleMsgVal =this.handleMsgVal.bind(this);
		this.state = {
			text:[]
		}
	}


	handleMsgVal(val){

		socket.emit('createMessage',{
			from:"Arausi Daniel",
			text:val
		},function(info){
			console.log(info);
		});
	}
	
	componentDidMount(){
		socket.on('new Message',(msgObj)=>{
			 let msgStore = []; 
			 msgStore.push(msgObj.text);
			let totalMsg = this.state.text.concat(msgStore);
			this.setState({text:totalMsg});
		})
	}
  


	render(){
		return(
			<div>
			<Form handleMsgValue = {this.handleMsgVal} />
			<div> 
			<MessageList message={this.state.text} />
			</div>	
			</div>	 
		); 
	}
}

