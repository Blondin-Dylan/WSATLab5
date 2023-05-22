const { WebSocketServer } = require('ws');

const wsConnection = require('./wsConnection.js');


class wsServer {

    lastUserId = 1;  
    wsConnections = { connections: [] };
    constructor(httpServer) {
        this.wss = new WebSocketServer({ server: httpServer }); 

        this.wss.on('connection', (ws) => { 
            let conn = new wsConnection(ws, this, this.lastUserId++); 
            this.wsConnections.connections.push(conn);
            conn.sendMessage("hello from server");
        });
    }

    clientDisconnected = function (sender) {
        const posConn = this.wsConnections.connections.indexOf(sender);
        this.wsConnections.connections.splice(posConn, 1);
        this.broadcastMessage(sender, 'disconnected');
    }

    broadcastMessage = function (sender, msg) {
        for (const wsc of this.wsConnections.connections) {
            if (wsc.userId != sender.userId) {
                wsc.sendMessage(`${msg}`,sender);
            }
        }
    }
}

module.exports = wsServer;