const moment = require('moment');

let createdAt = 1000;
let date = moment(createdAt);
let timeStamp = date.format('h:mm:ss');
let oldTimeStamp = moment.unix(moment().unix()).format('YYYY Do');
let newTimeStamp = moment.unix(moment().valueOf()).format('YYYY Do');
console.log(newTimeStamp);
console.log(oldTimeStamp);