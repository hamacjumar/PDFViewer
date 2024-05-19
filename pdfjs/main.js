
// ensure this is added and loaded
pdfjsLib.GlobalWorkerOptions.workerSrc = "build/pdf.worker.js"

var pdfDocument,
	viewportScale = null,
	currPage = 1,
	isPresentationMode = false,
	canvas = [],
	numPages = 0,
	pdfPages = [],
	isDocPage = false

const viewerEl = document.getElementById( "viewer" )

var url = new URL( location.href )
var usp = url.searchParams

const pdfFile = usp.get("file") // pdf file
const options = usp.get("opt") // options

// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument( pdfFile )
loadingTask.promise.then(async pdf => {
    // pdf is loaded
    pdfDocument = pdf
    var metadata = await pdf.getMetadata()
    numPages = pdf.numPages
    
    if( options.includes("presentation") ) {
        isPresentationMode = true
        await renderPresentationMode()
    }
    else {
        isPresentationMode = false
        isDocPage = options.includes("page")
        await renderDocumentMode()
    }
    
    // create connection to server
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

async function renderPresentationMode() {
    viewerEl.classList.add("document-mode")
    var el = document.createElement("canvas")
    viewerEl.appendChild( el )
    canvas[0] = el
    await render(currPage, el)
}

async function renderDocumentMode() {
    viewerEl.classList.add("presentation-mode")
    if( isDocPage ) {
        viewerEl.classList.add("pages")
    } 
    for(var i=0; i<numPages; i++) {
        var el = document.createElement("canvas")
        viewerEl.appendChild( el )
        canvas[i] = el
        await render(i+1, el)
    }
}

async function render(page, canvas, customScale) {

    var pageNumber = page || currPage
    var scale = customScale || viewportScale
    
    var pdfPage = pdfPages[page-1]
    if( !pdfPage ) {
        pdfPage = await pdfDocument.getPage( pageNumber )
        pdfPages[page-1] = pdfPage
    }
    
    var context = canvas.getContext("2d")
        
    if(!viewportScale && typeof viewportScale !== "number") {
        var vp = pdfPage.getViewport({scale: 1})
        var innerWidth = window.innerWidth
        if( isDocPage ) innerWidth -= 24
        viewportScale = innerWidth / vp.width
        scale = viewportScale
    }

    var viewport = pdfPage.getViewport({scale: scale})

    canvas.width = Math.floor( viewport.width )
    canvas.height = Math.floor( viewport.height )
    canvas.style.width = Math.floor(viewport.width) + "px"
    canvas.style.height =  Math.floor(viewport.height) + "px"

    var renderContext = {
        canvasContext: context,
        viewport: viewport
    }
    pdfPage.render( renderContext )
}

// handle zoom event
function setZoom( zoom ) {
    viewportScale = zoom
    if( isPresentationMode ) {
        render(currPage, canvas[0])
    }
    else {
        for(var i=0; i<numPages; i++) {
            render(i+1, canvas[i])
        }
    }
}
// handle page load
function setPage( page ) {
    if(!page || page == currPage) return
    currPage = page
    if( isPresentationMode ) {
        render(currPage, canvas[0])
    }
    else { // for document just scroll to that canvas
        var el = canvas[currPage-1]
        if( el ) {
            el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        }
    }
}
function setPageOffset( offset ) {
    if(typeof offset == "number" && isDocPage) {
        for(var i=0; i<numPages; i++) {
            var el = canvas[i]
            el.style.marginBottom = offset+"px"
        }
    }
}

// handle pinch zoom event
var pinch = false
document.addEventListener("touchstart", function( event ) {
    pinch = (event.touches.length === 2)
})
document.addEventListener("touchend", function( event ) {
    document.ontouchstart = null
    document.ontouchend = null
    if( pinch ) {
        var scl = window.visualViewport.scale
        if(scl !== viewportScale) {
            viewportScale = scl
            // render()
        }
        pinch = false
    }
})







