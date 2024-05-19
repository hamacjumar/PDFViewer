app.LoadPlugin( "PDFViewer" )

function OnStart() {
     
    pdf = app.CreatePDFViewer() 
    
    lay = app.CreateLayout("Linear", "VCenter,FillXY")
    
    myPdf = pdf.AddView(lay, "mypdf.pdf", 1, 0.4, "presentation")
    myPdf.SetOnLoad( OnLoad )
    
    app.AddLayout( lay )
}

function OnLoad( info ) {
    // next button
    btnNext = app.AddButton(lay, "Next")
    btnNext.SetMargins(0, 0.1, 0, 0)
    btnNext.SetOnTouch(function() {
        myPdf.Next()
    })
    
    // previous button
    btnPrevious = app.AddButton(lay, "Back")
    btnPrevious.SetOnTouch(function() {
        myPdf.Previous()
    })
}