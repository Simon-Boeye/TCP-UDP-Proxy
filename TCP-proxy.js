"use strict"
let net = require('net');

class TCPProxy{
    constructor(localPort, remotePort, remoteAddr){
        this.localPort = localPort;
        this.remotePort = remotePort;
        this.remoteAddr = remoteAddr;
    }

    startServer(localPort, remotePort, remoteAddr){
        let server = net.createServer(function (localSocket) {
            localSocket.on('data', function (msg) {
                console.log('From client to proxy ', msg.toString());

                let remoteSocket = new net.Socket();            
                remoteSocket.connect(remotePort, remoteAddr,()=>{
                    remoteSocket.write(msg);
                });               

                remoteSocket.on("data", function (data) {
                    console.log('From remote to proxy', data.toString());
                    localSocket.write(data);
                });
            });
        });
        
        server.listen(localPort);
        console.log("TCP server accepting connection on port: " + this.localPort);
    }
}

module.exports = TCPProxy;


