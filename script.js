const boxes = document.querySelectorAll('.node');
const container = document.getElementById('container');

let isMoving = false;
let startX, startY;
let currentBox;

boxes.forEach(box => {
    box.addEventListener('mousedown', startMove);
});

document.addEventListener('mouseup', stopMove);

function startMove(event) {
    isMoving = true;

    // Store the initial mouse position when the mouse button is pressed
    startX = event.clientX;
    startY = event.clientY;

    // Store the initial position of the box
    const rect = this.getBoundingClientRect();
    offsetX = rect.left;
    offsetY = rect.top;
    
    currentBox = this;

    // Prevent text selection during dragging
    event.preventDefault();
}

function stopMove() {
    isMoving = false;
}

document.addEventListener('mousemove', moveBox);

function moveBox(event) {
    if (isMoving && currentBox) {
        // Calculate the new position of the box based on the mouse movement
        const newX = event.clientX - 2 * startX + offsetX;
        const newY = event.clientY - 2 * startY + offsetY;

        // Update the position of the current box
        currentBox.style.left = `${newX}px`;
        currentBox.style.top = `${newY}px`;
    }
}