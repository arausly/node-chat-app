import React,{Component} from 'react';
import ReactDOM from 'react-dom';
const io = require('socket.io-client');
const moment = require('moment');
import {
	Redirect
} from 'react-router-dom';

import Form  from './form';
import MessageList from './MessageList';
import Members from './Members';



const socket = io.connect(); 


export default class Home extends Component{
	constructor(props){
		super(props);
		this.handleMsgVal = this.handleMsgVal.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.deparam = this.deparam.bind(this);
		this.state = {
			text:[],
			location:{
				url:'',
				user:'',
				time:''
			},
			status:'pending',
			isFetching:false,
			userDetails:{
				userName:'',
				room:''
			},
			members:[]
		}
	}


	handleMsgVal(val){
		this.setState({status:"pending"});
		socket.emit('createMessage',{
			from:"Arausi Daniel",
			text:val
		},()=>{
			this.setState({status:'finished'});
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
		
		this.deparam();
	}
	
	
//	scrollToBottom(){
//	  let clientHeight = ReactDOM.findDOMNode(this.msgBody).clientHeight;
//	  let scrollTop    = ReactDOM.findDOMNode(this.msgBody).scrollTop;
//	  let scrollHeight = ReactDOM.findDOMNode(this.msgBody).scrollHeight;
//	  	
//     console.log('clientHeight',clientHeight,'scrollTop',scrollTop,'scrollHeight',scrollHeight);
//       //=> clientHeight 108, scrollTop 0, scrollHeight 124
//		
//	}
	// from unifor resource identifier(uri) convert back to an objects,
	deparam() {
		let uri = window.location.search;
		//"?name=arausi&room=some+course"
		let nameParser = uri.match(/\w+&/);
		let realName = nameParser.map(txt => txt.substring(0, (txt.length - 1)));
		let userName = realName[0];
		let roomParser = uri.match(/&.*=\w+\+?[\w+]+/ig);
		let roomParserVal = roomParser[0];
		let rmRoom = roomParserVal.replace(/^&room=/, '');
		let room = rmRoom.replace(/\+/ig, ' ');
		this.setState({
			userDetails:{
				userName,
				room
			}
		})
	}
	
	componentDidMount(){
		socket.on('new Message',(msgObj)=>{
			 let msgStore = [];
			 let time = moment(msgObj.createdAt).format('h:mm a'); 
			 let msgBox = {
				 from:msgObj.from,
				 time,
				 text:msgObj.text,
			 };
			 msgStore.push(msgBox);
			let totalMsg = this.state.text.concat(msgStore);	
			this.setState({text:totalMsg});
		
		})
		socket.emit('joinRoom',this.state.userDetails,(err)=>{
			if(err){
				window.location.href ="/";
			}else{
				console.log('no Error');
			}
		})
		
		socket.on('updateUserList',(usersArray)=>{
			 this.setState({members:[]});
			  let members = []; 
			   usersArray.map(user =>{
				   members.push(user.name);
			   });
			  let newMembers = this.state.members.concat(members);
			  this.setState({members:newMembers});
		})
	}
	
	    handleClick(){
		if(!navigator.geolocation){
			return alert('Your browser does not support geolocation')
		}
			this.setState({isFetching:true});
		navigator.geolocation.getCurrentPosition((position)=>{
			console.log(position);
			socket.emit('createLocationMessage',{
				latitude:position.coords.latitude,
				longitude:position.coords.longitude,
			})
		},()=>{
			 alert('unable to fetch current location');
			 this.setState({isFetching:false});
		});
			
		
		socket.on('newLocationMessage',(message)=>{
			 this.setState({
				             location:{
								 url:`${message.url}`,
				                 user:`${message.from}`,
                                 time:`${moment(message.createdAt).format('h:mm a')}`
							  },
				             isFetching:false,
			              });
		})
	}
	
	render(){
		return(
			<div>
			 <div className="people">
			      <Members users={this.state.members}/>
			    </div>
			  <div className="list-form">
				<div> 
					<MessageList className="message-list" message={this.state.text}  location={this.state.location} ref={msg =>{this.msgBody = msg }}/>
				</div>	
				<div className="form-component">
					<Form handleMsgValue = {this.handleMsgVal} handleClick = {this.handleClick} newStatus ={this.state.status} fetching ={this.state.isFetching}/>
				</div>
			    </div>
			</div>	 
		); 
	}
}

