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
		this.handleClick = this.handleClick.bind(this)
		this.state = {
			text:[],
			locationUrl:'',
			locationUser:''
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
	
	    handleClick(){
		if(!navigator.geolocation){
			return alert('Your browser does not support geolocation')
		}
		navigator.geolocation.getCurrentPosition((position)=>{
			console.log(position);
			socket.emit('createLocationMessage',{
				latitude:position.coords.latitude,
				longitude:position.coords.longitude,
			})
		},()=>{
			 alert('unable to fetch current location');
		});
		
		socket.on('newLocationMessage',(message)=>{
			 this.setState({
				             locationUrl:`${message.url}`,
						     locationUser:`${message.from}`
			              });
		})
	}
	
	render(){
		return(
			<div>
				<div> 
					<MessageList message={this.state.text}  url={this.state.locationUrl} user={this.state.locationUser}/>
				</div>	
				<div>
					<Form handleMsgValue = {this.handleMsgVal} handleClick = {this.handleClick} />
				</div>
			</div>	 
		); 
	}
}

