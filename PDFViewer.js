
/** # PDFViewer
 * Create a PDF viewer component. This will start a server to handle and process the reading, parsing and rendering pdf files.
 * @param {num} [port=8888] Port to be use by the PDF viewer server.
 * @returns dso-PDFViewer
 */
app.CreatePDFViewer = function( port ) {
    return new PDFViewer( port )
}

class PDFViewer {
    constructor( port ) {
        this.name = "PDFViewer"
        this.port = port || 8888
        this.id = -1
        this.views = []
        this.pdfLibs = ".pdfviewer"
        this.ip = "127.0.0.1"
        
        // Copy the plugin assets into the app's hidden folder (.pdfviewer)
        this.plugPath = app.GetPrivateFolder("Plugins")+"/"+this.name.toLowerCase()+"/pdfjs"
        app.CopyFolder(this.plugPath, this.pdfLibs)
        
        this.server = app.CreateWebServer( this.port )
        this.server.SetFolder( app.GetAppPath() )
        this.server.SetOnReceive( this._handleMessage.bind(this) )
        this.server.Start()
    }
    
    _handleMessage(msg, ip, id) {
        var data = JSON.parse( msg )
        if( !data.cmd ) return console.log(this.name+" : Received undefined command from client. ID:"+id)
    	switch( data.cmd ) {
            case "docInfo": this._setDocInfo(data.value, id); break;
            default: 
        }
	}
	
	_setDocInfo(info, id) {
	    var view = this.views.find(m => m.data.id == id)
        if( !view ) return
        view.data.docInfo = info
        // call onLoad callback handler for this view
        if( view.data.cb_onLoad ) view.data.cb_onLoad( info )
    }
    
    /** ### View
     * View a pdf file into a given layout.
     * @param {dso-Layout} lay 
     * @param {str_path} file 
     * @param {num_frac} width 
     * @param {num_frac} height 
     * @param {str_com} options `"Controls"`, `"Page"`, `"FitWidth"`, `"FitHeight"`
     */
     
     // Options definitions:
     // Controls: Render mozilla pdf viewer
     // Page: Add shadow to pdf pages
     // FitWidth: The pdf page width will fit the entire width of the view.
     // FitHeight: the pdf page height will fit the entire height of the view.
    AddView(lay, file="", width, height, options="") {
        
        this.id ++
        
        if( !file.includes(".pdf") ) return console.log(this.name+" : File is not PDF.")
        
        // check first if file exist
        if( !app.FileExists(file) ) return console.log(this.name+" : File does not exists.")
        
        file = "../" + file
        
        // create a webview where to load and render the pdf file
        var web = app.AddWebView(lay, width, height, "NoScrollBars,IgnoreErrors,NoCors")
        
        // save important data into the webview data prop
        web.data.options = options.toLowerCase()
        web.data.file = file
        web.data.index = this.id
        web.data.id = this.id + 1 // websocket client id
        web.data.server = this.server
        web.data.ip = this.ip
        
        // push the webview into the views array
        this.views.push( web )
        
        // register custom methods
        
        web.SetOnLoad = function( onLoad ) { this.data.cb_onLoad = onLoad }
        
        /** ### Save
         * Save a page as an image. If page number is not provided, it will save all the pages.
         * @param {num} pageIndex Page number
         */
        web.Save = function( pageIndex ) {}
        
        web.Next = function() {}
    
    	web.Previous = function() {}
    	
    	/** ### GetIndex
    	 * Returns the index of the current view
    	 */
    	web.GetIndex = function() { return this.data.index }
    	
    	// Get document data
    	web.GetDocument = function() {}
    	
    	web.SetZoom = function( zoom ) {
    	    var data = {
                cmd: "zoom",
                value: [zoom] // array to allow multiple args using spred operator cmd(...value)
            }
            var msg = JSON.stringify( data )
            this.data.server.SendText(msg, this.data.ip, this.data.id)
        }
    	
    	// just for testing purposes
    	var params = "file="+file+"&opt="+web.data.options+"&id="+web.data.id
    	web.LoadUrl("http://127.0.0.1:8888/"+this.pdfLibs+"/index.html?"+params)
        
        // return the webview control
        return web
    }
    
    /** ### GetView
     * Returns the view of a given view index.
     * @param {num} index The index of the corresponding view.
     */
    GetView( index ) { return this.views[index] }
}

