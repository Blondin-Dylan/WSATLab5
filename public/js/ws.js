
class WebSocketService {

    connection = null;
    onmessage = null;
    constructor() {
        this.connection = new WebSocket('wss://' + window.location.host);

        this.connection.onmessage = (ev) => {
            console.log(JSON.parse(ev.data));
            if (this.onmessage != null) {
                this.onmessage(JSON.parse(ev.data));
            }
        };

    }

    sendMessage(msg) {
        let dataMsg = { type: 'message', data: msg };
        this.connection.send(JSON.stringify(dataMsg));
    }
}
export default WebSocketService;