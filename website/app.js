/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=e32478fe18ea0e7eab9385983090fb94";
let zip;

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const feelings = document.getElementById('feelings').value;
    zip = document.getElementById('zip').value;
    console.log(newDate);
    getWeather()
    .then(function (data) {
        postData('/newData', {temperature: data.main.temp, date: data.date, userResponse: data.userResponse})
    })
}

const getWeather = async () => {
    const res = await fetch(baseUrl+zip+apiKey)
    try {
        const data = await res.json();
        console.log(data);
    } catch(error) {
        console.log("error", error);
    }
}

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
             return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}
