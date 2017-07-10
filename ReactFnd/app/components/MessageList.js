import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


const listStyle ={
	display:'none'
}

const noStyle = {
  listStyleType:"none",
} 

const transparent={
	opacity:0.65,
	fontSize:(1.1 * 16),
}

const bolden ={
	fontWeight:"bold",
	marginRight:"0.5rem",
}

const addSpace ={
	marginBottom:"1rem",
}

//const concatStyle = Object.assign({},noStyle,addSpace);

export default class MessageList extends Component{	 
	render(){

		const {location,message} = this.props;
		const renderList = () =>{
			if(location.url === undefined || location.url === "" || location.url.length === 0){
                 return(
					     <li style={listStyle}></li>
					   );
			}else{
				return(
			             <li><div><span style={bolden} >{location.user}</span> <span style={transparent}>{location.time}</span></div><a href={location.url} target="_blank">My current location</a></li>
					  );
			}
		}
		return(
			<div>
				<ul style={noStyle} >
					{
						message.map((text,index)=>{
			            
						return <li key={index} style={addSpace}><div><span style={bolden}>{text.from}</span><span style={transparent}>{text.time}</span></div>{text.text}</li>
					})
					}
				{renderList()}
	         </ul>
			</div>
		);
	}
}

MessageList.propTypes = {
	message: PropTypes.array.isRequired,
	location:PropTypes.object.isRequired,
}