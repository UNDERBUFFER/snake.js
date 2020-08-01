
'use strict';
const MAP_X = 560
const MAP_Y = 320
const FIGURE_X = 20
const FIGURE_Y = 20

const div = document.getElementById('block1')
let snake = []
let direction = 'ArrowRight'

const randomInteger = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const paint = () => {
    const oldElements = document.getElementsByClassName('block2')
    for (let element of oldElements) {
        // todo: добавить исключение для будущего фрукта
        div.removeChild(element)
    }

    for (let block of snake) {
        const innerDiv = document.createElement('div')
        innerDiv.className = 'block2'
        innerDiv.style.background = 'green'
        innerDiv.style.marginLeft = `${block[0]}px`
        innerDiv.style.marginTop = `${block[1]}px`
        div.appendChild(innerDiv)
    }
}

const move = (event) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key))
        direction = event.key
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
                x = MAP_X - FIGURE_X
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
}

Array.prototype.rotate = function() {
    let res = this.slice(1)
    res.push(...this.slice(0, 1))
    return res
}


let x = randomInteger(0, (MAP_X / FIGURE_X) - 1) * FIGURE_X
let y = randomInteger(0, (MAP_Y / FIGURE_Y) - 1) * FIGURE_Y

snake.push([x, y])
for (let val = 1; val <= 4; val++)
    snake.push([snake[val - 1][0] - 20, y])


document.addEventListener('keydown', (event) => {
    move(event)
    paint()
})

const shedule = () => {
    setTimeout(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': direction}))
        shedule()
    }, 100)
}

shedule()

