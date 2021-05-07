"use strict"
let net = require('net');

class TCPProxy{
    constructor(localPort, remotePort, remoteAddr){
        this.localPort = localPort;
        this.remotePort = remotePort;
        this.remoteAddr = remoteAddr;
    }

    startServer(){
        let server = net.createServer(function (socket) {
            socket.on('data', function (msg) {
                console.log('  ** START **');
                console.log('<< From client to proxy ', msg.toString());
                let serviceSocket = new net.Socket();
                serviceSocket.connect(parseInt(remotePort), remoteAddr, function () {
                    console.log('>> From proxy to remote', msg.toString());
                    serviceSocket.write(msg);
                });
                serviceSocket.on("data", function (data) {
                    console.log('<< From remote to proxy', data.toString());
                    socket.write(data);
                    console.log('>> From proxy to client', data.toString());
                });
            });
        });
        
        server.listen(localPort);
        console.log("TCP server accepting connection on port: " + localPort);
    }
}

module.exports = TCPProxy;


