const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

        // Set canvas dimensions explicitly (adjust as needed for desired resolution)
const scaleFactor = window.devicePixelRatio;
canvas.width = canvas.offsetWidth * scaleFactor;
canvas.height = 400 * scaleFactor;

// Scale the context to match the device's pixel ratio
ctx.scale(scaleFactor, scaleFactor);

