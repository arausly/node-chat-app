import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';



const contStyle = {
	backgroundColor:"#fff",
	opacity:0.65,
	marginBottom:"1rem",
	borderRadius:5,
	width:"auto",
	color:"#000",
	border:"1px solid rgba(255,255,255,0.7)",
};

const userStyle = {
    height:"2rem",
	width:"10rem",
	margin:"10px 4.5rem",
	listStyleType:"none",
	color:"#000",
	textAlign:"center",
	paddingTop:"1rem"
}

const headerStyle ={
	textAlign:"center",
}


const concatStyle = Object.assign({},contStyle,userStyle);

export default class Members extends Component{

	render(){
		const {users} = this.props;
		
		
		return(
		     <div>
			    <h1 style={headerStyle}>Members</h1>
			    <ul>
			     {
					users.map((user,index)=>{
						return (
								  <li key={index} style={concatStyle}>{user}</li>
						       );
			      	})
					
			     }
			    </ul>
			 </div>
		);
	}
}
			
Members.propTypes ={
 users:PropTypes.array.isRequired
};