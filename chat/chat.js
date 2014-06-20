var net = require('net');
var chatServer = net.createServer(), clientList = [];

chatServer.on('connection', function(client) {
client.name = client.remoteAddress + ':' + client.remotePort;
client.write('Hi ' + client.name + '!\n');
clientList.push(client);
log_clients(client.name);
client.on('data', function(data) { broadcast(data, client)
})

client.on('end', function() { clientList.splice(clientList.indexOf(client), 1)
})


});





function broadcast(message, client) {
var cleanup = []
for(var i=0;i<clientList.length;i+=1) {
if(client !== clientList[i]) {
if(clientList[i].writable) {
 clientList[i].write(client.name + " says " + message)
} 
else {
 cleanup.push(clientList[i])
 clientList[i].destroy()
}
} }
//Remove dead Nodes out of write loop to avoid trashing loop index for(i=0;i<cleanup.length;i+=1) {
clientList.splice(clientList.indexOf(cleanup[i]), 1) 
}







function log_clients(name)
{
	var date = new Date();
	var fs = require('fs');
	fs.appendFile("logs/logs.txt", name+" : "+date+" "+"\n", function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
}


function log_chat(msg)
{
	var date = new Date();
	var fs = require('fs');
	fs.appendFile("logs/log_chats.txt", msg+" : "+date+" "+"\n", function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	}); 
}

chatServer.listen(9000)