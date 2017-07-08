import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


const listStyle ={
	display:'none'
}


export default class MessageList extends Component{	 
	render(){

		const {url,user} = this.props;
		const renderList = () =>{
			if(url === undefined || url === "" || url.length === 0){
                 return(
					     <li style={listStyle}></li>
					   );
			}else{
				return(
			             <li>{user} <a href={url} target="_blank">My current location</a></li>
					  );
			}
		}
		return(
			<div>
				<ol>
					{
						this.props.message.map(function(text, index){
						return <li key={index}>{text}</li>
					})
					}
				{renderList()}
	         </ol>
			</div>
		);
	}
}


		MessageList.propTypes ={
		message:PropTypes.array.isRequired,
			url(props,propName,component){
			if(!(propName in props)){
				throw new TypeError(`${propName} is undefined`);
			}else if(!(propName.includes('google.com') > -1)){
				throw new TypeError(`${propName} is incorrect`);
			}
		},
			user:PropTypes.string.isRequired,
	}