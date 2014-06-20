var arguments = process.argv.slice(2);
var net = require('net')
var chatServer = net.createServer()
chatServer.on('connection', function(client) { client.write('Hi!\n'); client.write('Bye!\n');
client.end() })

chatServer.listen(arguments[0]);