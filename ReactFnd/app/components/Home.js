import React,{Component} from 'react';
import ReactDOM from 'react-dom';
const io = require('socket.io-client');

import Form  from './form';
import MessageList from './MessageList';


const socket = io.connect(); 

export default class Home extends Component{
	constructor(props){
		super(props);
		this.handleMsgVal = this.handleMsgVal.bind(this);
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

    componentWillMount(){
		socket.on('connect',()=>{
		  console.log('Connected to Server');
		});
		socket.on('new Message',(msg)=>{
			console.log('new Message',msg);
		});
		socket.on('disconnect',()=>{
			console.log('Disconencted from Server');
		});
	}
	
	componentDidMount(){
		socket.on('new Message',(msgObj)=>{
			 let msgStore = [];
			 msgStore.push(`${msgObj.from}.  ${msgObj.text}`);
			let totalMsg = this.state.text.concat(msgStore);	
			this.setState({text:totalMsg});
		})
	}
	
	render(){
		return(
			<div>
				<div> 
					<MessageList message={this.state.text} />
				</div>	
				<div>
					<Form handleMsgValue = {this.handleMsgVal} />
				</div>
			</div>	 
		); 
	}
}

