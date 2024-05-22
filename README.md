## PDFViewer
v0.1.1

> Under development!

A DroidScript Plugin to open and view pdf files.

## Build
To build and use this plugin, `zip` the root directory of this project and name it `PDFViewer.zip`. Paste the zip file into the `Plugins` folder of DroidScript and restart DroidScript.

> NOTE: Do not include the `samples` folder and files such as `.gitignore`, `build.sh`, `mypdf.pdf` and `README.md`,  in the zip file as it will only take space in your plugin.

## Usage 
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

By default, the pdf will be rendered as document where you can scroll the pages vertically.
If you want to display one page at a time, pass a `"presentation"` option like this:
```js
myPdf = pdf.AddView(lay, "mypdf.pdf", 0.8, 0.5, "presentation")
```
If you want to render the pdf as a page or paper just add a `"page"` option like this:
```js
myPdf = pdf.AddView(lay, "mypdf.pdf", 0.8, 0.5, "document,page")
```
> Works only on pdf view of type `document`

To navigate to pages, just call the `SetPage` method like this:
```js
myPdf.SetPage( 3 ) // show the third page
```
To zoom the pdf viewer, call the `SetZoom` method like this:
```js
myPdf.SetZoom( 1.5 ) // 150% enlarge
```
- equal to 1 ---> PDF view fits the width of the layout.
- less than 1 ---> Zoom out
- greater than 1 ---> Zoom in

You can also add page offset (bottom margin) for pdf view of type document and displayed as page like this:
```js
myPdf.SetPageOffset( 24 ) // page bottom margin in pixels
```

#### Dependency
Uses **pdf.js** library by Mozilla<br>


> Note: _For contributors, just add your GitHub account name._

Author: _hamacjumar_

Contributors: 


## Donations
[See the list of donors for this amazing plugin](https://pdfviewer-plugin-backers.firebaseapp.com/)

### How to donate
This plugin is free and maintained solely by me. If you find this plugin helpful and want to have it constantly updated for an amazing features, you can donate through my Paypal account here.

Paypal: **paypal.me/jumarhamac**

Any amount is highly appreciated. Provide a message when you donate stating your name and a short information about you or your company which is no more than 20 words. Follow the guide below. I will add your name in the list of donors for this project.

Message format:
```md
Title: PDFViewer-Plugin Donation
Name: [name]
Info: [short information about you]
Logo: [link to your downloadable logo]
```

Example message:
```md
Title: PDFViewer-Plugin Donation
Name: gineerslife
Info: Freelancer and droidscript plugins creator.
Logo: https://drive.google.com/id=....
```

Donations will be categorize as follows:
- 0-10 USD: Bronze Backers
- 11-25 USD: Silver Supporters
- 26-50 USD: Gold Givers
- 51-100 USD: Platinum Patrons
- 101 USD and above: Diamond Donors

Diamond Donors will be posted directly on all locations, sites, docs where this plugin is published.