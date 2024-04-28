const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

        // Set canvas dimensions explicitly (adjust as needed for desired resolution)
const scaleFactor = window.devicePixelRatio;
canvas.width = canvas.offsetWidth * scaleFactor;
canvas.height = 400 * scaleFactor;

// Scale the context to match the device's pixel ratio
ctx.scale(scaleFactor, scaleFactor);

// Draw on the canvas
/*ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(50, 50);
ctx.lineWidth = 2;
ctx.lineCap = "round";
ctx.stroke();

ctx.beginPath();
ctx.arc(95, 50, 20, 0, 2 * Math.PI);
ctx.fillStyle = "red";
ctx.fill();
ctx.lineWidth = 2;
ctx.strokeStyle = "black";
ctx.stroke();*/

//ctx.beginPath();
//ctx.moveTo(canvas.height / 2, 0);
//ctx.lineTo(canvas.height / 2, 100);
//ctx.lineWidth = 2;
//ctx.stroke();