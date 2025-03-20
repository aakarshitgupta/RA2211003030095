const axios = require("axios");
const { response } = require("express");

const url = "http://20.244.56.144/test/register";
const about = {
    companyName : "goMart",
    ownerName : "Rahul",
    rollno  : "RA2211003030095",
    ownerEmail : "rahul@abc.edu",
    accessCode : "SUfGJv"
}
axios.post(url,about, {headers: {"Content-Type":"application/json"}}).then(response => {
    console.log( response.data);
}).catch(console.error(error.message));