const container = document.querySelector('.container');
let bw = true;
let rgb = false;
let gridLines = true;
let rowSize = 16;
let colSize = 16;

buildGrid();

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

colorBox();

function colorBox(){
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('mouseover', () => {
            if (bw){
                box.style.backgroundColor = 'black';
            }
            else if (rgb){
                box.style.backgroundColor = getRandomColor();
            }
        });
    });
}

function getRandomColor(){
    return randomColor = `#` +(Math.random()*0xFFFFFF<<0).toString(16);
}

const reset = document.querySelector('#reset');
reset.addEventListener('click', () => {
    container.replaceChildren();
    buildGrid();
    colorBox();
});

const black = document.querySelector('#black');
black.addEventListener('click', () => {
    bw = true;
    rgb = false;
});

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', () => {
    bw = false;
    rgb = true;
});

const grid = document.querySelector('#grid');
grid.addEventListener('change', (e) => {
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

const gridSize = document.querySelector('#gridSize');
gridSize.addEventListener('submit', (e) => {
    e.preventDefault();
    let rowInput = document.getElementById('rows');
    let colInput = document.getElementById('cols');
    container.replaceChildren();
    rowSize = rowInput.value;
    colSize = colInput.value;
    buildGrid();
    colorBox();
});