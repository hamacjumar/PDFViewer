app.LoadPlugin( "PDFViewer" )

function OnStart() {
    
    pdf = app.CreatePDFViewer()
    
    lay = app.CreateLayout("Linear", "VCenter,FillXY")
    
    myPdf = pdf.AddView(lay, "mypdf.pdf", 1, 0.4, "page")
    myPdf.SetOnLoad( OnLoad )
    
    app.AddLayout( lay )
}

function OnLoad() {
    sld = app.AddSeekBar(lay, 0.8, 0.1)
    sld.SetRange( 3 )
    sld.SetOnChange(function(value) {
        myPdf.SetZoom( value )
    })
    
    btn = app.AddButton(lay, "Zoom")
    btn.SetOnTouch(function() {
        myPdf.SetZoom( 1.5 )
    })
}

