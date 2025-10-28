const socket = io()
socket.emit("churan");


socket.on("churan",function(){
    console.log("churan recieved");
});