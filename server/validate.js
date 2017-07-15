const isValid = (string) =>{
	if(typeof string === "string" && string.trim().length > 0){
		 return true;
	}
	return false;
}

module.exports = {
	isValid,
}