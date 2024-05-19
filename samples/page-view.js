
// This plugin is used to create a plugin that supports WYSIWYG Edtor or the Layout Extension

// Plugin Name
var name = "PDFViewer"

function OnStart() {
    
    plugDir = app.GetPrivateFolder("Plugins") + "/" + name.toLowerCase()
    docsDir = app.GetAppPath()+"/../.edit/docs/plugins/"+ name.toLowerCase()
    
    app.DeleteFolder( plugDir )
    app.DeleteFolder( docsDir )
    app.DeleteFolder( ".pdfviewer" )
    
    app.MakeFolder( plugDir )
    app.MakeFolder( docsDir )
  
    // Files required for the plugin
    app.CopyFile("PDFViewer.js", plugDir+"/"+name+".js")  // copy source code to the Plugins folder
    app.CopyFile("index.html", "pdfjs/index.html")
    app.CopyFile("styles.css", "pdfjs/styles.css")
    app.CopyFile("main.js", "pdfjs/main.js")
    app.CopyFile("server.js", "pdfjs/server.js")
    
    // Folders required for the plugin
    app.CopyFolder("pdfjs", plugDir+"/pdfjs")
    
    
    app.LoadPlugin( name )
    
    pdf = app.CreatePDFViewer()
    
    lay = app.CreateLayout("Linear", "VCenter,FillXY")
    
    // web = app.AddWebView(lay, 1, 1, "NoCors")
    // web.LoadUrl("pdfjs/web/viewer.html")
    
    app.AddLayout( lay )
    
    
    myPdf = pdf.AddView(lay, "mypdf.pdf", 1, 0.4, "page")
    myPdf.SetOnLoad(info => {
        console.log( info.info.Title )
    })
    
    sld = app.AddSeekBar(lay, 0.8, 0.1)
    sld.SetRange( 3 )
    sld.SetOnChange(function(value) {
        console.log( value )
        myPdf.SetZoom( value )
    })
    
    btn = app.AddButton(lay, "Zoom")
    btn.SetOnTouch(function() {
        myPdf.SetZoom( 1.5 )
    })
}

