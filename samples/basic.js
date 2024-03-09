// Load the PDFViewer plugin at the top of your script
app.LoadPlugin( "PDFViewer" )

function OnStart() {
    // create an instance of the PDFViewer component
    pdf = app.CreatePDFViewer()
    
    // create a fullscreen layout with object vertically centered
    lay = app.CreateLayout("Linear", "VCenter,FillXY")
    
    // add a pdf viewer control into the layout
    myPdf = pdf.AddView(lay, "mypdf.pdf", 0.8, 0.5)
    
    // add a button into the layout to zoom out the pdf view when click
    btn = app.AddButton(lay, "Zoom")
    btn.SetOnTouch(function() {
        myPdf.SetZoom( 0.3 )
    })
    
    // add the layout to the app
    app.AddLayout( lay )
}