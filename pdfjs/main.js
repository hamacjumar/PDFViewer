
// ensure this is added and loaded
pdfjsLib.GlobalWorkerOptions.workerSrc = "build/pdf.worker.js"

var pdfDocument, viewportScale = null

var url = new URL( location.href )
var usp = url.searchParams

const pdfFile = usp.get("file") // pdf file
const options = usp.get("opt") // options

// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument( pdfFile )
loadingTask.promise.then(async pdf => {
    // pdf is loaded
    pdfDocument = pdf
    render( 1 )
    
    // create connection to server
    var metadata = await pdf.getMetadata()
    var numPages = pdf.numPages
    var data = {
        info: metadata.info,
        pageCount: numPages
    }
    server.Send({
        cmd: "docInfo",
        value: data
    })
    
}, function (reason) {
    // PDF loading error
    console.error( reason )
})

function render(page, customScale) {

    var pageNumber = page
    var scale = customScale || viewportScale

    pdfDocument.getPage( pageNumber ).then(function( page ) {

        var canvas = document.getElementById("canvas")
        var context = canvas.getContext("2d")
        
        if(!viewportScale && typeof viewportScale !== "number") {
            var vp = page.getViewport({scale: 1})
            viewportScale = window.innerWidth / vp.width
            scale = viewportScale
        }

        var viewport = page.getViewport({scale: scale})

        canvas.width = Math.floor( viewport.width )
        canvas.height = Math.floor( viewport.height )
        canvas.style.width = Math.floor(viewport.width) + "px"
        canvas.style.height =  Math.floor(viewport.height) + "px"

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        }
        page.render( renderContext )

        if( options.includes("page") ) {
            canvas.style.boxShadow = "0px 1px 4px 2px rgba(0, 0, 0, 0.25)"
            canvas.style.margin = "2rem"
        }
    })
}

// handle zoom event
function setZoom( zoom ) {
    viewportScale = zoom
    render( 1 )
}






