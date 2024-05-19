## PDFViewer
v0.1.1

> Under development!

A DroidScript Plugin to open and view pdf files.

Author: _hamacjumar_

Contributors: 

### Build
To build and use this plugin, `zip` the root directory of this project and name it `PDFViewer.zip`. Paste the zip file into the `Plugins` folder of DroidScript and restart DroidScript.

> NOTE: Do not include the `samples` folder and files such as `.gitignore`, `build.sh`, `mypdf.pdf` and `README.md`,  in the zip file as it will only take space in your plugin.

### Usage 
```js
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
    
```

#### Dependency
Uses **pdf.js** library by Mozilla<br>


> Note: _For contributors, just add your GitHub account name._