
'use strict';
const MAP_X = 560
const MAP_Y = 320
const FIGURE_X = 20
const FIGURE_Y = 20

const div = document.getElementById('block1')
let snake = []
let fruit = []
let direction = 'ArrowRight'

const randomInteger = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const paint = () => {
    const oldElements = document.getElementsByClassName('block2')
    for (let element of oldElements) {
        if (element.id == 'fruit')
            continue
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

const shedule = () => {
    setTimeout(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': direction}))
        shedule()
    }, 100)
}

const getRandomFruit = () => {
    if (fruit.length != 0)
        div.removeChild(document.getElementById('fruit'))
    for(let i = 0; i < 10; i++) {
        const x = randomInteger(0, (MAP_X / FIGURE_X) - 1) * FIGURE_X
        const y = randomInteger(0, (MAP_Y / FIGURE_Y) - 1) * FIGURE_Y
        if (!snake.includes([x, y]))
            fruit = [x, y]
            const innerDiv = document.createElement('div')
            innerDiv.className = 'block2'
            innerDiv.id = 'fruit'
            innerDiv.style.background = 'red'
            innerDiv.style.marginLeft = `${x}px`
            innerDiv.style.marginTop = `${y}px`
            div.appendChild(innerDiv)
            return
    }
    align('Ты выиграл!')
    document.location.reload(true)
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
    if (x == fruit[0] && y == fruit[1]) {
        let newSnake = [[x, y]]
        newSnake.push(...snake)
        snake = newSnake
        getRandomFruit()
    }
    else {
        snake[0] = [x, y]
    }
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

getRandomFruit()
shedule()

