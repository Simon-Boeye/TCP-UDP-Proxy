"use strict"
const net = require('net');

class TCPProxy{
    constructor(localPort, remotePort, remoteAddr){
        this.localPort = localPort;
        this.remotePort = remotePort;
        this.remoteAddr = remoteAddr;
    }

    startServer(localPort, remotePort, remoteAddr){
        const server = net.createServer(function (localSocket) {
            localSocket.on('data', function (msg) {
                console.log('From client to proxy: ', msg);

                const remoteSocket = new net.Socket();            
                remoteSocket.connect(remotePort, remoteAddr,()=>{
                    remoteSocket.write(msg);
                });               

                remoteSocket.on('data', function (data) {
                    console.log('From remote to proxy: ', data);
                    localSocket.write(data);
                });
            });
        });
        
        server.listen(localPort);
        console.log("TCP server accepting connection on port: " + localPort);
    }
}

module.exports = TCPProxy;


