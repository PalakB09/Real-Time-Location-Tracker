const socket= io(); //connection req will go in the backend

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude}=position.coords;
        socket.emit('sendLocation',{latitude,longitude});
    },(error)=>{
        console.log(error);
    },{
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    })
}


const map = L.map("map").setView([0,0],10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Open street map"
}).addTo(map);


