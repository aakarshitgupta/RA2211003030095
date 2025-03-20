const axios = require("axios");
const url = "http://20.244.56.144/test/auth";
const about = {
    companyName: 'goMart',
    clientID: 'b407b09a-2e3a-40e5-a24a-91449868d3bf',
    clientSecret: 'WotwzrXMszkRfJBF',
    ownerName: 'Akarshit Gupta',
    ownerEmail: 'ag8251@srmist.edu.in',
    rollNo: 'RA2211003030095'
  }

  axios.post(url,about, {headers: {"Content-Type":"application/json"}}).then(response => {
    console.log( response.data);
}).catch((error)=>{
    console.error(error.response);
});