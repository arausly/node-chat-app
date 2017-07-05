const express = require('express');
const path = require('path');

let app = express();

app.use(express.static(path.join(__dirname,'..','ReactFnd','public')));

let port = process.env.PORT || 9000;



app.listen(port,()=>{
	console.log(`app is listening on port ${port}`);
});


