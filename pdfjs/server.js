
class Server {
    constructor() {
        console.log(window.location.host)
        this.server = new WebSocket("ws://" + window.location.host)
        this.server.onopen = this.ws_onopen.bind(this)
        this.server.onmessage = this.ws_onmessage.bind(this)
        this.server.onclose = this.ws_onclose.bind(this)
        this.server.onerror = this.ws_onerror.bind(this)
        
        var url = new URL( location.href )
        var usp = url.searchParams
        this.id = usp.get("id") // server id
        this.ip = ""
        
        this.Send = this.Send.bind(this)
    }
    
    Send( data ) {
        var msg = JSON.stringify( data )
        this.server.send( msg )
    }

    ws_onopen() {
        console.log("open")
    }

    ws_onmessage( msg ) {
        var data = JSON.parse(msg.data)
        if( !data.cmd ) return // no command received
        switch( data.cmd ) {
            case "zoom": setZoom(...data.value); break;
            case "page": setPage(...data.value); break;
            case "page-offset": setPageOffset(...data.value); break;
            default: console.log("Undefined command");
        }
    }

    ws_onclose() {
        console.log("close")
    }

    ws_onerror(e) {
        console.log( e )
    }
}

const server = new Server()

