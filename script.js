const container = document.querySelector('.container');

buildGrid();

function buildGrid(){
    for (let i = 0; i < 4; i++){
        const grid = document.createElement('div');
        grid.classList.add('row');
        container.appendChild(grid);
        buildRow(grid);
    }
}

function buildRow(row){
    for (let j = 0; j < 4; j++){
        const box = document.createElement('div');
        box.classList.add('box');
        row.appendChild(box);
    }
}