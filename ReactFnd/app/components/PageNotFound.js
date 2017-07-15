import React,{Component} from 'react';
import ReactDOM from 'react-dom';


const errStyle ={
	fontWeight:'bold',
	display:'flex',
	justifyContent:"center",
	fontSize:'3.5rem',
	textAlign:'center',
}

const pageNotFound = ({location}) =>(
	<div>
	  <h1 style={errStyle}>Error 404 &nbsp; <code>{location.pathname}</code> &nbsp; Page Not Found</h1>
	</div>
)

export default pageNotFound;