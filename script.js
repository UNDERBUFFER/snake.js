
'use strict';
const MAP_X = 560
const MAP_Y = 320
const FIGURE_X = 40
const FIGURE_Y = 40

const div = document.getElementById('block1')
let snake = []

const randomInteger = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

Array.prototype.rotate = function() {
    let res = this.slice(1)
    res.push(...this.slice(0, 1))
    return res
}

// получение стартовой позиции:
let x = randomInteger(0, (MAP_X / FIGURE_X) - 1) * 40
let y = randomInteger(0, (MAP_Y / FIGURE_Y) - 1) * 40

snake.push([x, y])

document.addEventListener('keydown', (event) => {
    // определение зажатой клавиши:
    switch (event.key) {
        case 'ArrowUp':
            if ((y - FIGURE_Y) < 0)
                y = MAP_Y - FIGURE_Y
            else
                y -= FIGURE_Y
            break;
        case 'ArrowDown':
            if ((y + FIGURE_Y) >= MAP_Y)
                y = 0
            else
                y += FIGURE_Y
            break;
        case 'ArrowLeft':
            if ((x - FIGURE_X) < 0)
                x = MAP_Y - FIGURE_X
            else
                x -= FIGURE_X
            break;
        case 'ArrowRight':
            if ((x + FIGURE_X) >= MAP_X)
                x = 0
            else
                x += FIGURE_X
            break;
    }
    snake = snake.rotate()
    snake[0] = [x, y]
    console.log(snake[0])
})

for (let block of snake) {
    const innerDiv = document.createElement('div')
    innerDiv.className = 'block2'
    innerDiv.style.background = 'red'
    innerDiv.style.marginLeft = `${block[0]}px`
    innerDiv.style.marginTop = `${block[1]}px`
    div.appendChild(innerDiv)
}

