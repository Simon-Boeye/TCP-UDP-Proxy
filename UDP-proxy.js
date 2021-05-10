"use strict"
const dgram = require('dgram');

class UDPProxy {
    constructor(localPort, remotePort, remoteAddr) {
        this.localPort = localPort;
        this.remotePort = remotePort;
        this.remoteAddr = remoteAddr;
    }

    startServer(localPort, remotePort, remoteAddr) {
        const server = dgram.createSocket('udp4', function (msg) {
            console.log('From client to proxy: ', msg);
            
            const remoteSocket = dgram.createSocket('udp4');
            remoteSocket.connect(remotePort, remoteAddr, () => {
                remoteSocket.send(Buffer.from(msg));
            });

            remoteSocket.on('message', function (data) {
                console.log('From remote to proxy: ', data);
                server.send(Buffer.from(data),localPort);
            });
        });

        server.bind(localPort);
        console.log("UDP server accepting connection on port: " + localPort);
    }
}

module.exports = UDPProxy;