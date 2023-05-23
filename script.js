const container = document.querySelector('.container');
let bw = true;
let rgb = false;
let grey = false;
let gridLines = true;
let rowSize = 16;
let colSize = 16;
let color = 'black';

//Build Grid and Listen for Mouse Hover on loading of page
window.addEventListener('DOMContentLoaded', (event) => {
    buildGrid();
    colorBox();
});

function buildGrid(){
    for (let i = 0; i < colSize; i++){
        const grid = document.createElement('div');
        grid.classList.add('row');
        container.appendChild(grid);
        buildRow(grid);
    }
}

function buildRow(row){
    for (let j = 0; j < rowSize; j++){
        const box = document.createElement('div');
        box.classList.add('box');
        row.appendChild(box);
    }
}

function colorBox(){
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('mouseover', () => chooseColor(box));
    });
}

function chooseColor(box){
    switch (color){
        case 'black':
            box.style.backgroundColor = 'black';
            break;
        case 'rgb':
            box.style.backgroundColor = getRandomColor();
            break;
        case 'grey':
            colorGreyScale(box);
            break;
    }
}

function getRandomColor(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

const reset = document.querySelector('#reset');
reset.addEventListener('click', () => {
    container.replaceChildren();
    buildGrid();
    toggleGridLines();
    colorBox();
});

//EventListeners to modify which style of coloring is used
const black = document.querySelector('#black');
black.addEventListener('click', () => color = 'black');

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', () => color = 'rgb');

const greyscale = document.querySelector('#greyscale');
greyscale.addEventListener('click', () => color = 'grey');

const grid = document.querySelector('#grid');
grid.addEventListener('change', () => {
    if (grid.checked){
        gridLines = true;
        toggleGridLines();
    }
    else{
        gridLines = false;
        toggleGridLines();
    }
})

function toggleGridLines(){
    const boxes = document.querySelectorAll('.box');
    if (gridLines){
        boxes.forEach(box => box.style.border = 'solid 1px black');
    }
    else {
        boxes.forEach(box => box.style.border = '0');
    }
}

//Take user input for Grid Size and rebuild the grid
const gridSize = document.querySelector('#gridSize');
gridSize.addEventListener('submit', (e) => {
    e.preventDefault();
    let rowInput = document.getElementById('rows');
    let colInput = document.getElementById('cols');
    container.replaceChildren();
    rowSize = rowInput.value;
    colSize = colInput.value;
    buildGrid();
    toggleGridLines();
    colorBox();
});

function colorGreyScale(cell){
    let shade = cell.style.backgroundColor;
    if (shade === '' || shade === 'black'){
        //default null and black cells (from Black mode) to 10% less than white
        cell.style.backgroundColor = 'rgb(230, 230, 230)';
    }
    else {
        //grab the 'r' value from the rgb field and use that to convert to greyscale
        //obviously not perfect as all 3 values should be considered for true greyscale
        //but for the purposes of this project let's keep things simpler
        let shadeSlice = parseInt(shade.slice(4,7));
        cell.style.backgroundColor = calculateGreyShade(shadeSlice);
    }
}

function calculateGreyShade(shade){
    //run through all 256 possible 'r' values, when there's a match make the box
    //roughly 10% darker
    for (let i = 255; i >= 0; i--){
        if (shade == i){
            let j = i - 26;
            return 'rgb(' + j + ', ' + j + ', ' + j + ')';
        }
    }
}