const DEFAULT_COLOR = "#333333";
const DEFAULT_GRID_COLOR = "#f0f0f050";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const grid = document.querySelector("#grid");
const slider = document.querySelector("#slider");
const sldrLbl = document.querySelector("#slider-label");
const clearBtn = document.querySelector("#clear");
const colorPicker = document.querySelector("#color-picker");
const eraserBtn = document.querySelector("#eraser");
const colorBtn = document.querySelector("#color");
const randomColorsBtn = document.querySelector("#rainbow");

let gridSquareCount = Math.pow(currentSize, 2);
slider.value = currentSize;
sldrLbl.innerHTML = `Grid size: ${currentSize} x ${currentSize}`;
colorPicker.value = currentColor;

function setMode(newMode){
    activateButton(newMode);
}

slider.oninput = (e) => getSliderValue(e);
clearBtn.onclick = () => clear();
colorPicker.oninput = (e) => currentColor = colorPicker.value;
eraserBtn.onclick = () => { 
    currentMode = "eraser";
    activateButton();
}
colorBtn.onclick = () => {
     currentMode = "color";
    activateButton();
    }
randomColorsBtn.onclick = () => {
    currentMode = "random";
    activateButton();
}

function createGrid(){
    grid.innerHTML = "";
    const squareSize = 488 / currentSize;
    for(let i = 0; i < gridSquareCount; i++){
       let div = document.createElement("div");
       div.style.cssText = `width: ${squareSize -2}px`;
       div.addEventListener("mouseover", changeColor);
       div.addEventListener("mousedown", changeColor);
       grid.appendChild(div);
    }
}

function activateButton(){
    if(currentMode === "color"){
        colorBtn.classList.add("active");
        randomColorsBtn.classList.remove("active");
        eraserBtn.classList.remove("active");
    } else if (currentMode === "random"){
        colorBtn.classList.remove("active");
        randomColorsBtn.classList.add("active");
        eraserBtn.classList.remove("active");
    } else if(currentMode === "eraser"){
        colorBtn.classList.remove("active");
        randomColorsBtn.classList.remove("active");
        eraserBtn.classList.add("active");
    }
}

function getSliderValue(e){
    currentSize = e.target.value;
    sldrLbl.innerHTML = `Grid size: ${currentSize} x ${currentSize}`;
    gridSquareCount = Math.pow(currentSize, 2);
    createGrid();
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e){
    if(e.type === "mouseover" && !mouseDown) return;
    if(currentMode === "color"){
        e.target.style.background = currentColor;
    } else if (currentMode === "random"){
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        e.target.style.background = `rgb(${red},${green},${blue})`;
    } else if(currentMode === "eraser"){
        e.target.style.background = DEFAULT_GRID_COLOR;
    }
}

function clear(){
    grid.innerHTML = "";
    createGrid();
}

window.onload = () => {
    activateButton();
    createGrid();
}
