"use strict"
const prompt = require('prompt');
const TCPProxy = require('./TCP-proxy');
const UDPProxy = require('./UDP-proxy');

let proxy;

prompt.start();

console.log('1. TCP proxy\n2. UDP proxy');


prompt.get([{
    name: 'option',
    description: 'type proxy',
    type: 'integer',
    required: true
}, 'localPort', 'remotePort', 'remoteAddress'], function (err, result) {
    if (err) {
        console.error(err);
    }

    try {
        if (result.option === 1) {
            proxy = new TCPProxy(result.localPort, result.remotePort, result.remoteAddress);
        }else if (result.option === 2){
            proxy = new UDPProxy(result.localPort, result.remotePort, result.remoteAddress);
        }
        
        proxy.startServer(proxy.localPort, proxy.remotePort, proxy.remoteAddr);

    } catch (err) {
        console.error(err);
    }

});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

