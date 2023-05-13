const { useRef, useEffect, useState } = React


export function Canvas() {

    let startPos = { x: 0, y: 0 }
    let isDrawing = false
    let ctx
    let gUserColor = 'black'
    const canvasRef = useRef()
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


    useEffect(() => {
        const canvas = canvasRef.current
        ctx = canvas.getContext('2d')
        addMouseListeners()
        addTouchListeners()
    }, [])

    
    function addMouseListeners() {
        canvasRef.current.addEventListener('mousedown', onDown)
        canvasRef.current.addEventListener('mousemove', onMove)
        canvasRef.current.addEventListener('mouseup', onUp)
    }

    function addTouchListeners() {
        canvasRef.current.addEventListener('touchstart', onDown)
        canvasRef.current.addEventListener('touchmove', onMove)
        canvasRef.current.addEventListener('touchend', onUp)
    }

    function drawLine(x, y, xEnd, yEnd, color) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(xEnd, yEnd)
        ctx.lineWidth = 3
        ctx.strokeStyle = color
        ctx.stroke()
    }

    function getEvPos(ev) {
        let pos = {
            x: ev.offsetX,
            y: ev.offsetY,
        }
        if (TOUCH_EVS.includes(ev.type)) {
            ev.preventDefault()
            ev = ev.changedTouches[0]
            pos = {
                x: ev.pageX + ev.target.offsetLeft - ev.target.clientLeft - 37,
                y: ev.pageY + ev.target.offsetTop - ev.target.clientTop - 37,
            }
            console.log('pos: ', pos)
        }
        return pos
    }


    function onDown(ev) {
        const pos = getEvPos(ev)
        isDrawing = true
        startPos = pos
        console.log(pos);
    }

    function onMove(ev) {
        if (!isDrawing) {
            console.log('not drawing');
            return
        }
        const pos = getEvPos(ev)
        const dx = pos.x
        const dy = pos.y
        drawLine(startPos.x, startPos.y, dx, dy, gUserColor)
        startPos = pos
        console.log(pos);
    }

    function onUp() {
        isDrawing = false
    }

    function onDownloadCanvas(elLink) {
        const data = canvasRef.current.toDataURL()
        elLink.href = data
        elLink.download = 'my-img.jpg'
    }
    
    function drawImgFromlocal() {
        let file = document.querySelector('.upload').value
        console.log('file: ', file)
        const img = new Image()
        img.src = file
        img.onload = () => {
            ctx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        }
    }
    
    function onImgInput(ev) {
        loadImageFromInput(ev, renderImg)
    }
    
    function loadImageFromInput(ev, onImageReady) {
        const reader = new FileReader()
        reader.onload = function (event) {
            let img = new Image()
            img.src = event.target.result
            img.onload = () => onImageReady(img)
        }
        reader.readAsDataURL(ev.target.files[0])
    }
    
    function renderImg(img) {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    
    function onUploadImg() {
        const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
        function onSuccess(uploadedImgUrl) {
            const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
            console.log(encodedUploadedImgUrl)
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
        }
        doUploadImg(imgDataUrl, onSuccess)
    }
    
    function doUploadImg(imgDataUrl, onSuccess) {
        const formData = new FormData()
        formData.append('img', imgDataUrl)
        const XHR = new XMLHttpRequest()
        XHR.onreadystatechange = () => {
            if (XHR.readyState !== XMLHttpRequest.DONE) return
            if (XHR.status !== 200) return console.error('Error uploading image')
            const { responseText: url } = XHR
            console.log('Got back live url:', url)
            onSuccess(url)
        }
        XHR.onerror = (req, ev) => {
            console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
        }
        XHR.open('POST', '//ca-upload.com/here/upload.php')
        XHR.send(formData)
    }
    

    // function onSave() {
    //     const canvas = canvasRef.current;
    //     const dataUrl = canvas.toDataURL();
      
    //     const note = keepService.getEmptyNote();
    //     note.type = 'NoteImg';
    //     note.info = { url: dataUrl };
      
    //     keepService.save(note)
    //       .then(() => {
    //         console.log('Note saved successfully');
          
    //       })
    //       .catch(error => {
    //         console.error('Failed to save note:', error);
    //       });
    //   }





    return (

        <div className="canvas-container">
            <canvas ref={canvasRef} className="canvas" width="330" height="400"></canvas>
        </div>

    )
}