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
    btn = app.AddButton(lay, "Save Page 2")
    btn.SetOnTouch(function() {
        myPdf.SetZoom( 2 ) // enlarge first to make it readable
        myPdf.Save(2, "page2.png", OnSave) // save the second page as png image
    })
    
    // add the layout to the app
    app.AddLayout( lay )
}

function OnSave() {
    app.ShowPopup("Page 2 has been saved!")
}