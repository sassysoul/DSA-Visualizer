


const canvasEle = document.getElementById('cav1');
const context = canvasEle.getContext('2d');
let startPosition = {x: 0, y: 0};
let lineCoordinates = {x: 0, y: 0};
let isDrawStart = false;

context.strokeStyle= "#8ab6d6"
context.lineWidth= 2
const getClientOffset = (event) => {
    const {pageX, pageY} = event.touches ? event.touches[0] : event;
    const x = pageX - canvasEle.offsetLeft;
    const y = pageY - canvasEle.offsetTop;

    return {
       x,
       y
    }
}

const drawLine = (e) => {

   mySVG.redrawLines();
   context.beginPath();
   context.moveTo(startPosition.x   , startPosition.y);
   context.lineTo(lineCoordinates.x , lineCoordinates.y);

   if (direction == "D") {


   let headlen = 16; // length of head in pixels
	let dx = Number(lineCoordinates.x) - Number(startPosition.x);
	let dy = lineCoordinates.y - startPosition.y;
	let angle = Math.atan2(dy, dx);
	context.moveTo( startPosition.x,  startPosition.y);
	context.lineTo(lineCoordinates.x, lineCoordinates.y);
	context.lineTo(lineCoordinates.x - headlen * Math.cos(angle - Math.PI / 6),  lineCoordinates.y - headlen * Math.sin(angle - Math.PI / 6));
	context.moveTo(lineCoordinates.x,  lineCoordinates.y);
	context.lineTo(lineCoordinates.x - headlen * Math.cos(angle + Math.PI / 6),  lineCoordinates.y - headlen * Math.sin(angle + Math.PI / 6));
   }
   context.stroke();
}




const mouseDownListener = (e) => {

   if (e.shiftKey ==false) {
      return false;
   }


   if ($(e.target).parent("div.vert").length) {


      first=  $("#"+e.target.id).parent().attr("id");


  }

else  first=  e.target.id;


if (document.getElementById(first).classList[0] != "vert") {

   return false;
   }


$("#graphinput").css({"visibility" : " hidden"})




  startPosition = getClientOffset(event);
   isDrawStart = true;
   mySVG.redrawLines();


}

const mouseMoveListener = (event) => {
  if(!isDrawStart) return;
  lineCoordinates = getClientOffset(event);
  clearCanvas();

  drawLine();

}

const mouseupListener = (e) => {


   if (e.shiftKey ==false) {
      isDrawStart = false;
      clearCanvas();
      mySVG.redrawLines();
      return false;
   }


   if ($(e.target).parent("div.vert").length) {
      second =  $(e.target).parent().attr("id");
  }


  else  second=  e.target.id;


  if (document.getElementById(second).classList[0] != "vert") {
   isDrawStart = false;
   clearCanvas();
   mySVG.redrawLines();
   return false;
   }




let mousex = e.clientX+40;
let mousey = e.clientY+40;

$("#graphinput").css({ "top" :`${mousey}px`, "left" :`${mousex}px`  , "visibility" : "visible"})
$("#graphinput").focus();
  isDrawStart = false;
  clearCanvas();
  mySVG.redrawLines();

}

const clearCanvas = () => {
   context.clearRect(0, 0, canvasEle.width, canvasEle.height);
}

document.addEventListener('mousedown', mouseDownListener);
document.addEventListener('mousemove', mouseMoveListener);
document.addEventListener('mouseup', mouseupListener);


canvasEle.addEventListener('touchstart', mouseDownListener);
canvasEle.addEventListener('touchmove', mouseMoveListener);
canvasEle.addEventListener('touchend', mouseupListener);
